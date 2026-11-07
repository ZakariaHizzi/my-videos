// Free Arabic TTS via Microsoft Edge (no API key needed)
// Voice: ar-AE-HamdanNeural (male, energetic with +rate/+pitch)
// Output: public/voice/htmlformvoice.mp3 (full narration for HtmlFormShorts)
//
// NOTE: edge-tts-universal@1.4.0 hardcodes the legacy synthesis host
// speech.platform.bing.com, which Microsoft returns HTTP 403 for since
// Oct 2026 (endpoint migrated). This script patches the library to the new
// host api.msedgeservices.com before importing it (idempotent).
// Run: node scripts/generate-htmlform-voice.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "voice", "htmlformvoice.mp3");

const NEW_HOST = "wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1?Ocp-Apim-Subscription-Key=${TRUSTED_CLIENT_TOKEN}";
const OLD_URL = "var WSS_URL = `wss://${BASE_URL}/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}`;";

for (const f of ["dist/index.cjs", "dist/index.js"]) {
  const p = join(root, "node_modules", "edge-tts-universal", f);
  const src = readFileSync(p, "utf8");
  if (src.includes(NEW_HOST)) {
    console.log(`${f}: already patched`);
    continue;
  }
  if (!src.includes(OLD_URL)) {
    console.warn(`${f}: expected URL line not found - skipping (library may have changed)`);
    continue;
  }
  writeFileSync(p, src.replace(OLD_URL, `var WSS_URL = \`${NEW_HOST}\`;`));
  console.log(`${f}: patched to api.msedgeservices.com`);
}

const { EdgeTTS } = await import("edge-tts-universal");

const VOICE = "ar-AE-HamdanNeural";
// +26% lands the narration at ~58.9s so it fits a clean 60s short with a tail.
const RATE = process.env.VOICE_RATE ?? "+26%";
const PITCH = "+6Hz";

const TEXT =
  "إزاي تعمل نموذج في موقعك، زي تسجيل دخول بالظبط؟ السر كله في تلات وسوم بس! " +
  "القاعدة الذهبية: كل حاجة جوه الفورم، الفورم هو الحاوية الكبيرة اللي بتحط جواها كل الخانات والأزرار. " +
  "بنبدأ بالإنبوت، اللي هو العنصر بتاع الخانات. تايب تكست للنص العادي، وتايب باسوورد لكلمة السر وبتتحول لنقاط ما حدش يقرأها. " +
  "وبنضيف بلايس هولدر عشان نوضح للمستخدم، ونضيف ريكوايرد عشان نخلي الخانة إجبارية، ولو فاضية المتصفح مش هينزلك. " +
  "وعندك تايبات تانية مهمين: إيميل للبريد، نمبر للأرقام، تشيك بوكس للاختيار المتعدد، وراديو للاختيار الواحد بس. " +
  "وزر الإرسال بنكتبه بوتون، وتايب سبمت، عشان يبعت بيانات الفورم كله. " +
  "يعني ببساطة: فورم للحاوية، إنبوت لكل خانة، وبوتون للإرسال. إن كنت مهتم بمفاهيم البرمجة، تابعني!";

const gen = async (attempt) => {
  console.log(`Generating htmlformvoice.mp3 with ${VOICE} (attempt ${attempt})...`);
  const tts = new EdgeTTS(TEXT, VOICE, { rate: RATE, pitch: PITCH });
  const result = await tts.synthesize();
  return Buffer.from(await result.audio.arrayBuffer());
};

let buf;
try {
  buf = await gen(1);
} catch (e) {
  // New host rate-limits bursts with HTTP 429 - retry after a pause
  if (String(e).includes("429")) {
    console.log("Rate limited (429), waiting 8s...");
    await new Promise((r) => setTimeout(r, 8000));
    buf = await gen(2);
  } else {
    throw e;
  }
}

if (buf.length < 10000) {
  throw new Error(`Suspiciously small audio: ${buf.length} bytes`);
}
writeFileSync(outPath, buf);
console.log(`Saved ${(buf.length / 1024).toFixed(1)} KB -> ${outPath}`);
