import fs from "node:fs";
const wav = fs.readFileSync("public/voice/cssbasicsvoice.wav");
const view = new DataView(wav.buffer, wav.byteOffset, wav.byteLength);
const sampleRate = view.getUint32(24, true);
const bits = view.getUint16(34, true);
const off = 44;
const total = (wav.length - off) / (bits / 8);
const chunk = sampleRate * 5;
for (let s = 0; s < total; s += chunk) {
  let sum = 0, n = 0;
  for (let i = s; i < Math.min(s + chunk, total); i++) {
    const v = view.getInt16(off + i * 2, true) / 32768;
    sum += v * v;
    n++;
  }
  const rms = Math.sqrt(sum / n);
  const db = 20 * Math.log10(rms + 1e-9);
  console.log(`${(s / sampleRate).toFixed(0).padStart(2, "0")}-${((s + chunk) / sampleRate).toFixed(0).padStart(2, "0")}s RMS=${rms.toFixed(4)} (${db.toFixed(1)} dB)`);
}
