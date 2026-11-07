// Transcribe my voice 1.mp3 with word timestamps (Whisper, local, no API key)
// Run: node scripts/transcribe-my-voice-1.mjs
// Output: scripts/my-voice-1-transcript.json
import { pipeline } from "@xenova/transformers";
import { readFile, writeFile } from "node:fs/promises";

const wavPath = "C:\\Users\\dz astore\\AppData\\Local\\Temp\\opencode\\my-voice-1-16k.wav";
const outPath = new URL("./my-voice-1-transcript.json", import.meta.url);

console.log("loading model Xenova/whisper-small ...");
const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", {
  quantized: true,
});
console.log("model loaded. reading wav ...");
const buf = await readFile(wavPath);
const pcm = new Int16Array(buf.buffer, buf.byteOffset + 44, (buf.length - 44) / 2);
const audio = Float32Array.from(pcm, (v) => v / 32768);
console.log("samples:", audio.length, "seconds:", (audio.length / 16000).toFixed(2));

console.log("transcribing ...");
const out = await transcriber(audio, {
  language: "arabic",
  task: "transcribe",
  chunk_length_s: 30,
  stride_length_s: 5,
  return_timestamps: "word",
});
console.log("TEXT:", out.text);
await writeFile(outPath, JSON.stringify(out, null, 1), "utf8");
console.log("saved", outPath.href);
