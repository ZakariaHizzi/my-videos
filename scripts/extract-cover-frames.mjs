// Pulls still frames out of each site screen-recording and saves them for the
// 1600x1200 covers.
//
// Frames are cut as 9:16 portrait slices (reel/Shorts shape) out of the
// horizontal walkthrough: a centered vertical strip of the page content, so
// the cover's "REEL FRAMES" strip shows real reel-shaped frames.
//
// Run: node scripts/extract-cover-frames.mjs
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FFMPEG = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe");
const FFPROBE = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe");

/** name -> seek points as a fraction of the clip duration (10 reel frames) */
const JOBS = {
  restaurant: [0.1, 0.2, 0.3, 0.42, 0.55, 0.65, 0.72, 0.8, 0.88, 0.95],
  hospital: [0.08, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.88, 0.95],
  travel: [0.08, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.88, 0.95],
  ecommerce: [0.08, 0.2, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.88, 0.95],
  university: [0.05, 0.15, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.88, 0.95],
};

// optional: `node scripts/extract-cover-frames.mjs restaurant` runs one clip
const only = process.argv.slice(2);
const entries = Object.entries(JOBS).filter(([name]) => only.length === 0 || only.includes(name));

const outDir = join(root, "public", "stills");
await mkdir(outDir, { recursive: true });

// The recordings are full-screen browser captures: 80px of chrome on top and
// the Windows taskbar at the bottom. Crop both off (plus the recorder's
// watermark/scrollbar on the right edge) so the stills read as pure page.
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
  // Reel shape: a 9:16 portrait window onto the page, centered horizontally.
  const cropW = Math.round((contentH * 9) / 16);
  const cropX = Math.round((contentW - cropW) / 2);
  const crop = `${cropW}:${contentH}:${cropX}:${CHROME_TOP}`;

  for (let i = 0; i < at.length; i++) {
    const t = +(duration * at[i]).toFixed(2);
    const file = join(outDir, `${name}-${i + 1}.jpg`);
    await run(FFMPEG, [
      "-y", "-ss", String(t), "-i", src,
      "-frames:v", "1",
      "-vf", `crop=${crop},scale=-2:800`,
      "-q:v", "2",
      file,
    ]);
    console.log(`${name}-${i + 1}.jpg  @ ${t}s  (crop ${crop})`);
  }
  console.log(`clip ${name}.mp4 = ${duration.toFixed(1)}s\n`);
}
