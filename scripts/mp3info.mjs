import fs from "node:fs";
const buf = fs.readFileSync("public/voice/cssbasicsvoice.mp3");
let i = 0;
if (buf.toString("ascii", 0, 3) === "ID3") {
  const size =
    ((buf[6] & 0x7f) << 21) |
    ((buf[7] & 0x7f) << 14) |
    ((buf[8] & 0x7f) << 7) |
    (buf[9] & 0x7f);
  i = 10 + size;
  console.log("ID3v2 size", size);
}
while (i < buf.length && !(buf[i] === 0xff && (buf[i + 1] & 0xe0) === 0xe0)) i++;
console.log("frame at", i);
const h = buf.readUInt32BE(i);
console.log("header", h.toString(16));
const mpegVersion = (h >> 19) & 3;
const layer = (h >> 17) & 3;
const bitrateIndex = (h >> 12) & 15;
const sampleRateIndex = (h >> 10) & 3;
const padding = (h >> 9) & 1;
const bitratesV1L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
const srsV1 = [44100, 48000, 32000, 0];
const bitrate = bitratesV1L3[bitrateIndex] * 1000;
const sr = srsV1[sampleRateIndex];
console.log("mpegVersion", mpegVersion, "layer", layer, "bitrate", bitrate, "sr", sr, "padding", padding);
const frameSize = Math.floor((144 * bitrate) / sr) + padding;
console.log("frameSize", frameSize);
const audioBytes = buf.length - i;
const frames = Math.floor(audioBytes / frameSize);
const duration = (frames * 1152) / sr;
console.log("audioBytes", audioBytes, "frames", frames, "duration", duration, "seconds");
console.log("frames at 30fps", Math.round(duration * 30));
