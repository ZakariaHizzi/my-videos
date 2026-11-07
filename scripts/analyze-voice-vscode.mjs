// Analyzes the VS Code voice clips: finds leading silence and phrase gaps so
// visual keyframes can be keyed to the actual speech.
// Run: node scripts/analyze-voice-vscode.mjs
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "voice", "vscode");
const FFMPEG = join(
  root,
  "node_modules",
  "@remotion",
  "compositor-win32-x64-msvc",
  "ffmpeg.exe",
);
const FFPROBE = join(
  root,
  "node_modules",
  "@remotion",
  "compositor-win32-x64-msvc",
  "ffprobe.exe",
);

const files = (await readdir(dir))
  .filter((f) => /^scene\d-.*\.mp3$/.test(f))
  .sort();

for (const f of files) {
  const path = join(dir, f).replaceAll("\\", "/");
  const { stderr } = await run(FFMPEG, [
    "-i",
    path,
    "-af",
    "silencedetect=noise=-35dB:d=0.22",
    "-f",
    "null",
    "-",
  ]);
  const lead = /silence_start:\s*([0-9.]+)/.exec(stderr)?.[1];
  const silences = [];
  const re = /silence_start:\s*([0-9.]+)[\s\S]*?silence_end:\s*([0-9.]+)/g;
  let m;
  while ((m = re.exec(stderr))) {
    silences.push([parseFloat(m[1]), parseFloat(m[2])]);
  }
  const { stdout: durOut } = await run(FFPROBE, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    path,
  ]);
  const dur = parseFloat(durOut.trim());
  const tail = silences.length ? dur - silences[silences.length - 1][1] : 0;
  console.log(`\n${f}  dur=${dur.toFixed(2)}s  lead=${lead ?? "0"}  tail=${tail.toFixed(2)}`);
  for (const [s, e] of silences) {
    if (s < 0.05 && e < 0.6) continue; // lead-in
    if (s > dur - 0.6) continue; // tail
    console.log(`  gap ${s.toFixed(2)} -> ${e.toFixed(2)}  (${(e - s).toFixed(2)}s)`);
  }
}
