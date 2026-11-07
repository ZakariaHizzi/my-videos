// Local Arabic transcription with word timestamps (Whisper, no API key)
// Run: node scripts/transcribe-voice.mjs
// Output: scripts/voice-002-transcript.json
import { pipeline } from "@xenova/transformers";
import { readFile, writeFile } from "node:fs/promises";

console.log("loading model Xenova/whisper-small ...");
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-small",
  { quantized: true }
);
console.log("model loaded. reading wav ...");
const buf = await readFile(
  "C:\\Users\\dz astore\\AppData\\Local\\Temp\\opencode\\voice-002-16k.wav"
);
// parse 16-bit PCM mono 16kHz, skip 44-byte WAV header
const pcm = new Int16Array(buf.buffer, buf.byteOffset + 44, (buf.length - 44) / 2);
const audio = Float32Array.from(pcm, (v) => v / 32768);
console.log("samples:", audio.length, "seconds:", (audio.length / 16000).toFixed(1));

console.log("transcribing ...");
const out = await transcriber(audio, {
  language: "arabic",
  task: "transcribe",
  chunk_length_s: 30,
  stride_length_s: 5,
  return_timestamps: "word",
});
console.log("TEXT:", out.text);
await writeFile(
  new URL("./voice-002-transcript.json", import.meta.url),
  JSON.stringify(out, null, 1),
  "utf8"
);
console.log("saved scripts/voice-002-transcript.json");
