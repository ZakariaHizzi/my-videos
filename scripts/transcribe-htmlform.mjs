// Local Arabic transcription with word timestamps for voice/htmlformvoice.mp3
// (Whisper, no API key). Run: node scripts/transcribe-htmlform.mjs
// Prereq: ffmpeg -i public/voice/htmlformvoice.mp3 -ac 1 -ar 16000 <TEMP>/htmlform-16k.wav
// Output: scripts/htmlform-voice-transcript.json
import { pipeline } from "@xenova/transformers";
import { readFile, writeFile } from "node:fs/promises";

const WAV =
  "C:\\Users\\dz astore\\AppData\\Local\\Temp\\opencode\\htmlform-16k.wav";

console.log("loading model Xenova/whisper-small ...");
const transcriber = await pipeline(
  "automatic-speech-recognition",
  "Xenova/whisper-small",
  { quantized: true }
);
console.log("model loaded. reading wav ...");
const buf = await readFile(WAV);
let off = 12;
while (off + 8 <= buf.length) {
  const id = buf.toString("ascii", off, off + 4);
  const size = buf.readUInt32LE(off + 4);
  if (id === "data") break;
  off += 8 + size + (size % 2);
}
const dataStart = off + 8;
const pcm = new Int16Array(
  buf.buffer,
  buf.byteOffset + dataStart,
  Math.min(buf.length - dataStart, buf.readUInt32LE(off + 4)) / 2
);
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
  new URL("./htmlform-voice-transcript.json", import.meta.url),
  JSON.stringify(out, null, 1),
  "utf8"
);
console.log("saved scripts/htmlform-voice-transcript.json");
