// Free Arabic TTS via Microsoft Edge (no API key needed)
// Voice: ar-SA-HamdanNeural (male, energetic with +rate/+pitch)
// Output: public/voice/htmltextvoice.mp3 (full narration for HtmlTextShorts)
//
// NOTE: edge-tts-universal@1.4.0 hardcodes the legacy synthesis host
// speech.platform.bing.com, which Microsoft returns HTTP 403 for since
// Oct 2026 (endpoint migrated). This script patches the library to the new
// host api.msedgeservices.com before importing it (idempotent).
// Run: node scripts/generate-htmltext-voice.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "voice", "htmltextvoice.mp3");

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
const RATE = "+18%";
const PITCH = "+6Hz";

const TEXT =
  "إزاي تعرف تكتب نصوص وعنوين في موقعك؟ الـ HTML عندها 7 أدوات سحرية! " +
  "للعنوين عندها h1 لحد h6، الـ h1 هو العنوان الرئيسي والأهم، وكل مرة يكبر العنوان يصغر. " +
  "والنصوص العادية بنستخدم p اللي معناها فقرة، بتحط النص جواها وبيطلع منظم تلقائيا. " +
  "وعندك كمان br لعمل سطر جديد، strong لتغميق النص، و em لميله. كل واحد ليه استخدام خاص. " +
  "يعني ببساطة ابدأ بـ h1 للعنوان الرئيسي وبعدها p للفقرات، وهكذا تبني محتوى موقعك. " +
  "بس قاعدة ذهبية: استخدم h1 مرة واحدة بس في الصفحة وخلي البقية h2 وh3 للعناوين الفرعية. " +
  "إن كنت مهتم بمفاهيم البرمجة، تابعني!";

const gen = async (attempt) => {
  console.log(`Generating htmltextvoice.mp3 with ${VOICE} (attempt ${attempt})...`);
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
