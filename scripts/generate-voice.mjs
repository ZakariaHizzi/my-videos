// Free Arabic voiceover via Google Translate TTS (no API key, works everywhere)
// Run: node scripts/generate-voice.mjs
// For higher-quality MALE energetic voice, run instead:
//   node scripts/generate-voice-edge.mjs  (needs direct WebSocket access)
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "voice");

const SCENES = [
  { file: "scene1-hook.mp3", text: "تحلم تصبح مبرمج محترف؟ من الصفر للاحتراف!" },
  { file: "scene2-stack.mp3", text: "HTML للهيكل! CSS للأناقة! جافاسكريبت للحياة!" },
  { file: "scene3-laptop.mp3", text: "شاهد، طبق، وابن بنفسك! شرح عربي مبسط من الصفر!" },
  { file: "scene4-projects.mp3", text: "ابن خمسة مشاريع حقيقية! متجر، موقع شخصي، وتطبيق مهام!" },
  { file: "scene5-exercises.mp3", text: "تمارين وتحديات بعد كل درس! تتعلم بالممارسة لا بالحفظ!" },
  { file: "scene6-certificate.mp3", text: "شهادة إتمام ومعرض أعمال يقوي سيرتك الذاتية!" },
  { file: "scene7-support.mp3", text: "اسأل أي وقت! مجتمع ومرشد يجاوبك بسرعة!" },
  { file: "scene8-cta.mp3", text: "ابدأ اليوم مجانا! اضغط فولو، وتابعنا لتتعلم البرمجة من الصفر!" },
];

function splitChunks(text, max = 180) {
  const parts = text.split(/(?<=[!؟?.،,])\s+/);
  const chunks = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + " " + p).trim().length <= max) {
      cur = (cur + " " + p).trim();
    } else {
      if (cur) chunks.push(cur);
      cur = p;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

async function ttsChunk(text) {
  const url =
    "https://translate.google.com/translate_tts?ie=UTF-8&q=" +
    encodeURIComponent(text) +
    "&tl=ar&client=tw-ob";
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`TTS HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

await mkdir(outDir, { recursive: true });

for (const s of SCENES) {
  console.log(`Generating ${s.file} ...`);
  const chunks = splitChunks(s.text);
  const bufs = [];
  for (const c of chunks) {
    bufs.push(await ttsChunk(c));
    await new Promise((r) => setTimeout(r, 250));
  }
  const out = Buffer.concat(bufs);
  await writeFile(join(outDir, s.file), out);
  console.log(`  saved ${(out.length / 1024).toFixed(1)} KB (${chunks.length} chunk${chunks.length > 1 ? "s" : ""})`);
}

console.log("Done. Files in public/voice/");
