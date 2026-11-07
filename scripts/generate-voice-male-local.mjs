// Local AI MALE Arabic voiceover (offline, no API key)
// Model: Xenova/mms-tts-ara (Arabic, masculine voice)
// Run: node scripts/generate-voice-male-local.mjs
// Output: public/voice/ai-male/sceneN.wav (16kHz mono) + durations
import { pipeline } from "@xenova/transformers";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "voice", "ai-male");

const SCENES = [
  { file: "scene1-hook.wav", text: "تحلم تصبح مبرمج محترف؟ من الصفر للاحتراف!" },
  { file: "scene2-stack.wav", text: "اتش تي ام ال للهيكل! سي اس اس للأناقة! جافاسكريبت للحياة!" },
  { file: "scene3-laptop.wav", text: "شاهد، طبق، وابن بنفسك! شرح عربي مبسط من الصفر!" },
  { file: "scene4-projects.wav", text: "ابن خمسة مشاريع حقيقية! متجر، موقع شخصي، وتطبيق مهام!" },
  { file: "scene5-exercises.wav", text: "تمارين وتحديات بعد كل درس! تتعلم بالممارسة لا بالحفظ!" },
  { file: "scene6-certificate.wav", text: "شهادة إتمام ومعرض أعمال يقوي سيرتك الذاتية!" },
  { file: "scene7-support.wav", text: "اسأل أي وقت! مجتمع ومرشد يجاوبك بسرعة!" },
  { file: "scene8-cta.wav", text: "ابدأ اليوم مجانا! اضغط فولو، وتابعنا لتتعلم البرمجة من الصفر!" },
];

function floatTo16BitWav(float32, sampleRate) {
  const n = float32.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  return buf;
}

console.log("loading Xenova/mms-tts-ara ...");
const tts = await pipeline("text-to-speech", "Xenova/mms-tts-ara", {
  quantized: true,
});
console.log("model loaded.");

await mkdir(outDir, { recursive: true });

for (const s of SCENES) {
  console.log(`Synthesizing ${s.file}: ${s.text}`);
  const out = await tts(s.text);
  const audio = out.audio;
  const sr = out.sampling_rate;
  const wav = floatTo16BitWav(audio, sr);
  await writeFile(join(outDir, s.file), wav);
  console.log(`  saved ${(wav.length / 1024).toFixed(1)} KB, ${(audio.length / sr).toFixed(2)}s @${sr}Hz`);
}

console.log("Done. Files in public/voice/ai-male/");
