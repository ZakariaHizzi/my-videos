import { pipeline } from "@xenova/transformers";
import fs from "node:fs";

const wav = fs.readFileSync("public/voice/cssbasicsvoice.wav");
const view = new DataView(wav.buffer, wav.byteOffset, wav.byteLength);
const sampleRate = view.getUint32(24, true);
const bits = view.getUint16(34, true);
const off = 44;
const total = (wav.length - off) / (bits / 8);

const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", {
  chunk_length_s: 30,
  stride_length_s: 5,
});

const chunkSec = 10;
const chunkSamples = chunkSec * sampleRate;
for (let start = 0; start < total; start += chunkSamples) {
  const end = Math.min(start + chunkSamples, total);
  const audio = new Float32Array(end - start);
  for (let i = 0; i < audio.length; i++) {
    audio[i] = view.getInt16(off + (start + i) * 2, true) / 32768;
  }
  const result = await transcriber(audio, {
    sampling_rate: sampleRate,
    return_timestamps: true,
    language: "arabic",
    task: "transcribe",
  });
  const text = (result.text || "").trim();
  console.log(`\n[${(start / sampleRate).toFixed(0)}-${(end / sampleRate).toFixed(0)}s] ${text}`);
  if (result.chunks) {
    for (const c of result.chunks) {
      console.log(`   ${c.timestamp[0].toFixed(2)}-${c.timestamp[1].toFixed(2)} ${c.text}`);
    }
  }
}
console.log("\nDONE");
