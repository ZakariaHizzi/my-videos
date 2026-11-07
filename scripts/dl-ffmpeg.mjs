// Downloads ffmpeg essentials zip with progress
const url = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip";
const out = "C:\\Users\\dz astore\\AppData\\Local\\Temp\\opencode\\ffmpeg-essentials.zip";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
if (!res.ok) throw new Error("HTTP " + res.status);
const total = Number(res.headers.get("content-length") || 0);
console.log("total bytes:", total);
let done = 0;
let lastLog = Date.now();
const { createWriteStream } = await import("node:fs");
const file = createWriteStream(out);
for await (const chunk of res.body) {
  file.write(chunk);
  done += chunk.length;
  if (Date.now() - lastLog > 15000) {
    lastLog = Date.now();
    console.log(`progress: ${(done / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB`);
  }
}
file.end();
await new Promise((r) => file.on("finish", r));
console.log("DONE bytes:", done);
