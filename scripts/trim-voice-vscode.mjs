// Trims leading/trailing silence from the VS Code voice clips and prints the
// phrase boundaries (speech segments) so scene keyframes can be synced.
// Run: node scripts/trim-voice-vscode.mjs
import { readdir, rename } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "voice", "vscode");
const FFMPEG = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe");
const FFPROBE = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe");

const HEAD_PAD = 0.06;
const TAIL_PAD = 0.12;
const NOISE = "-35dB";
const MIN_SILENCE = "0.22";

const durationOf = async (path) => {
  const { stdout } = await run(FFPROBE, [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path,
  ]);
  return parseFloat(stdout.trim());
};

const detectSilence = async (path) => {
  const { stderr } = await run(FFMPEG, [
    "-i", path, "-af", `silencedetect=noise=${NOISE}:d=${MIN_SILENCE}`, "-f", "null", "-",
  ]);
  const silences = [];
  const re = /silence_start:\s*([0-9.]+)[\s\S]*?silence_end:\s*([0-9.]+)/g;
  let m;
  while ((m = re.exec(stderr))) silences.push([parseFloat(m[1]), parseFloat(m[2])]);
  // silence that runs to EOF has no silence_end
  const lastStart = /silence_start:\s*([0-9.]+)\s*$/m.exec(stderr)?.[1];
  if (lastStart !== undefined && !silences.some(([s]) => Math.abs(s - parseFloat(lastStart)) < 0.01)) {
    silences.push([parseFloat(lastStart), Infinity]);
  }
  return silences;
};

const files = (await readdir(dir))
  .filter((f) => /^scene[1-8]-.*\.mp3$/.test(f))
  .sort();

console.log("id".padEnd(10), "newDur".padStart(7), " speech segments (seconds, relative to trimmed start)");
console.log("-".repeat(88));

for (const f of files) {
  const path = join(dir, f).replaceAll("\\", "/");
  const dur = await durationOf(path);
  const silences = await detectSilence(path);

  const lead = silences.length && silences[0][0] < 0.05 ? silences[0][1] : 0;
  const last = silences[silences.length - 1];
  const tail = last && last[1] === Infinity ? dur - last[0] : last && last[1] > dur - 0.15 ? dur - last[1] : 0;

  const start = Math.max(0, lead - HEAD_PAD);
  const end = Math.min(dur, dur - tail + TAIL_PAD);

  const tmp = path.replace(/\.mp3$/, ".trim.mp3");
  await run(FFMPEG, [
    "-y", "-i", path,
    "-af", `atrim=start=${start.toFixed(3)}:end=${end.toFixed(3)},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11`,
    "-ar", "44100", "-b:a", "192k", "-codec:a", "libmp3lame", tmp,
  ]);
  await rename(tmp, path);

  // re-analyze trimmed file
  const newDur = await durationOf(path);
  const segs = [];
  let cursor = 0;
  for (const [s, e] of await detectSilence(path)) {
    if (s > cursor) segs.push([cursor, s]);
    if (e === Infinity) { cursor = newDur; break; }
    cursor = e;
  }
  if (cursor < newDur - 0.05) segs.push([cursor, newDur]);

  const id = f.replace(/\.mp3$/, "");
  console.log(
    id.padEnd(10),
    newDur.toFixed(2).padStart(7),
    " ",
    segs.map(([a, b]) => `${a.toFixed(2)}-${b.toFixed(2)}`).join("  ")
  );
}
