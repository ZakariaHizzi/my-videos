// Pulls full-page landscape screenshots out of each site walkthrough for the
// 1600x1200 covers' page cards (the FrameStrip stills stay 9:16 — see
// scripts/extract-cover-frames.mjs).
//
// The recordings are full-screen browser captures: 80px of chrome on top and
// the Windows taskbar at the bottom. Crop both off (plus the recorder's
// watermark/scrollbar on the right edge) so each shot reads as pure page.
//
// Run: node scripts/extract-cover-shots.mjs [site ...]
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FFMPEG = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe");
const FFPROBE = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe");

/** name -> candidate shots as a fraction of the clip duration */
const JOBS = {
  restaurant: [0.04, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.92],
  hospital: [0.04, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.92],
  travel: [0.04, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.92],
  ecommerce: [0.04, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.92],
  university: [0.03, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.92],
};

const only = process.argv.slice(2);
const entries = Object.entries(JOBS).filter(([name]) => only.length === 0 || only.includes(name));

const outDir = join(root, "public", "shots");
await mkdir(outDir, { recursive: true });

const CHROME_TOP = 80;
const RIGHT = 28;
const TASKBAR_AT = 0.933;

for (const [name, at] of entries) {
  const src = join(root, "public", `${name}.mp4`);
  const { stdout } = await run(FFPROBE, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-show_entries", "stream=width,height",
    "-of", "default=nw=1",
    src,
  ]);
  const get = (key) => Number(new RegExp(`^${key}=(.+)$`, "m").exec(stdout)?.[1]);
  const duration = get("duration");
  const width = get("width");
  const height = get("height");
  const contentW = width - RIGHT;
  const contentH = Math.round(height * TASKBAR_AT) - CHROME_TOP;

  for (let i = 0; i < at.length; i++) {
    const t = +(duration * at[i]).toFixed(2);
    const file = join(outDir, `${name}-${i + 1}.jpg`);
    await run(FFMPEG, [
      "-y", "-ss", String(t), "-i", src,
      "-frames:v", "1",
      "-vf", `crop=${contentW}:${contentH}:0:${CHROME_TOP},scale=1400:-2`,
      "-q:v", "3",
      file,
    ]);
    console.log(`${name}-${i + 1}.jpg  @ ${t}s  (${contentW}x${contentH})`);
  }
  console.log(`clip ${name}.mp4 = ${duration.toFixed(1)}s\n`);
}
