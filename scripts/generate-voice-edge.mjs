// Free Arabic TTS via Microsoft Edge (no API key needed)
// Voice: ar-SA-HamdanNeural (male, energetic with +rate/+pitch)
// Run: node scripts/generate-voice.mjs
import { EdgeTTS } from "edge-tts-universal";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "voice");

const VOICE = "ar-SA-HamdanNeural";
const RATE = "+18%";
const PITCH = "+6Hz";

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

await mkdir(outDir, { recursive: true });

for (const s of SCENES) {
  console.log(`Generating ${s.file} ...`);
  const tts = new EdgeTTS(s.text, VOICE, { rate: RATE, pitch: PITCH });
  const result = await tts.synthesize();
  const buf = Buffer.from(await result.audio.arrayBuffer());
  await writeFile(join(outDir, s.file), buf);
  console.log(`  saved ${(buf.length / 1024).toFixed(1)} KB`);
}

console.log("Done. Files in public/voice/");
