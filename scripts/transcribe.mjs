import { pipeline } from "@xenova/transformers";
import fs from "node:fs";

const wav = fs.readFileSync("public/voice/cssbasicsvoice.wav");
const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-small", {
  chunk_length_s: 30,
  stride_length_s: 5,
});
// parse WAV (16-bit PCM, mono)
const view = new DataView(wav.buffer, wav.byteOffset, wav.byteLength);
const sampleRate = view.getUint32(24, true);
const bitsPerSample = view.getUint16(34, true);
const dataOffset = 44;
const numSamples = (wav.length - dataOffset) / (bitsPerSample / 8);
const audio = new Float32Array(numSamples);
for (let i = 0; i < numSamples; i++) {
  audio[i] = view.getInt16(dataOffset + i * 2, true) / 32768;
}
const result = await transcriber(audio, { sampling_rate: sampleRate,
  return_timestamps: true,
  language: "arabic",
  task: "transcribe",
});

console.log(JSON.stringify(result, null, 2));
fs.writeFileSync("scripts/cssbasics-transcript.json", JSON.stringify(result, null, 2));
console.log("DONE");
