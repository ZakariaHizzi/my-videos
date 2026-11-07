// Transcribe AI male scenes for word timings (Whisper, local)
// Run: node scripts/transcribe-ai-male.mjs
// Output: scripts/voice-ai-transcript.json
import { pipeline } from "@xenova/transformers";
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "scene1-hook.wav",
  "scene2-stack.wav",
  "scene3-laptop.wav",
  "scene4-projects.wav",
  "scene5-exercises.wav",
  "scene6-certificate.wav",
  "scene7-support.wav",
  "scene8-cta.wav",
];

console.log("loading Xenova/whisper-small ...");
const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", {
  quantized: true,
});
console.log("model loaded.");

const result = {};
for (const f of files) {
  console.log(`transcribing ${f} ...`);
  const buf = await readFile(join(root, "public", "voice", "ai-male", f));
  const pcm = new Int16Array(buf.buffer, buf.byteOffset + 44, (buf.length - 44) / 2);
  const audio = Float32Array.from(pcm, (v) => v / 32768);
  const out = await transcriber(audio, {
    language: "arabic",
    task: "transcribe",
    chunk_length_s: 30,
    stride_length_s: 5,
    return_timestamps: "word",
  });
  console.log(`  TEXT: ${out.text}`);
  result[f] = out;
}

await writeFile(join(root, "scripts", "voice-ai-transcript.json"), JSON.stringify(result, null, 1), "utf8");
console.log("saved scripts/voice-ai-transcript.json");
