// Arabic voiceover for the VS Code short (YouTube/Instagram vertical).
// Provider: Google Translate TTS (works without an API key; Edge TTS is blocked on this network).
// Post-processed with the bundled Remotion ffmpeg: loudness-normalized MP3, 44.1 kHz, 192 kbps.
//
// Run: node scripts/generate-voice-vscode.mjs
import { writeFile, mkdir, rm, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "voice", "vscode");
const tmpDir = join(root, "public", "voice", ".tmp");

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

// One punchy line per scene, sized to the scene slot (target = seconds the
// clip must fit into). Tech terms are transliterated so the TTS pronounces
// them correctly for an Arabic audience.
const SCENES = [
  {
    id: "hook",
    file: "scene1-hook.mp3",
    target: 4.6,
    text: "عايز تبني موقعك الأول، بس مش عارف تبدأ منين؟",
  },
  {
    id: "intro",
    file: "scene2-intro.mp3",
    target: 6.6,
    text: "الإجابة واحدة: فيجوال ستوديو كود، محرر الأكواد اللي هتكتب فيه كل حاجة!",
  },
  {
    id: "features",
    file: "scene3-features.mp3",
    target: 7.6,
    text: "والأجمل إنه مجاني مية بالمية، خفيف وسريع جدًا، وقوي ومرن يناسب كل المستويات.",
  },
  {
    id: "languages",
    file: "scene4-languages.mp3",
    target: 9.6,
    text: "وبيدعم كل لغات البرمجة: إتش تي إم إل، وسي إس إس، وجافا سكريبت، وبايثون، وبي إتش بي، وأكتر من كده!",
  },
  {
    id: "web",
    file: "scene5-web.mp3",
    target: 9.6,
    text: "لو بتعلم برمجة الويب، ده بالنسبة لك جنة: كل أدوات الموقع في مكان واحد ومرتبة قدامك.",
  },
  {
    id: "live",
    file: "scene6-live.mp3",
    target: 9.6,
    text: "ومع إضافة لايف سيرفر، تعدّل في الكود وتشوف النتيجة في المتصفح لحظيًا، من غير ريفريش!",
  },
  {
    id: "hype",
    file: "scene7-hype.mp3",
    target: 4.6,
    text: "ابدأ النهارده خطوة بخطوة، وإنت أكيد قادر تتعلم!",
  },
  {
    id: "cta",
    file: "scene8-cta.mp3",
    target: 4.6,
    text: "لو مهتم بمفاهيم البرمجة، تابعني الآن!",
  },
];

function splitChunks(text, max = 180) {
  const parts = text.split(/(?<=[!؟?.،,])\s+/);
  const chunks = [];
  let cur = "";
  for (const p of parts) {
    if ((cur + " " + p).trim().length <= max) {
      cur = (cur + " " + p).trim();
    } else {
      if (cur) chunks.push(cur);
      cur = p;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

async function ttsChunk(text) {
  const url =
    "https://translate.google.com/translate_tts?ie=UTF-8&q=" +
    encodeURIComponent(text) +
    "&tl=ar&client=tw-ob";
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`TTS HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function durationOf(file) {
  const { stdout } = await run(FFPROBE, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ]);
  return parseFloat(stdout.trim());
}

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

const timing = [];

for (const s of SCENES) {
  console.log(`Generating ${s.file} ...`);
  const chunks = splitChunks(s.text);
  const bufs = [];
  for (const c of chunks) {
    bufs.push(await ttsChunk(c));
    await new Promise((r) => setTimeout(r, 250));
  }
  const rawPath = join(tmpDir, s.file);
  await writeFile(rawPath, Buffer.concat(bufs));

  // Studio pass: nudge pitch up ~6% (fresher, younger) and speed to an
  // energetic ~1.38x overall, then loudness-normalize into 44.1 kHz / 192 kbps MP3.
  const outPath = join(outDir, s.file);
  const encode = async (tempo) => {
    // atempo accepts 0.5..2.0 per node; chain if the fit needs more.
    const nodes = [];
    let left = tempo;
    while (left > 2) {
      nodes.push(2);
      left /= 2;
    }
    while (left < 0.5) {
      nodes.push(0.5);
      left /= 0.5;
    }
    nodes.push(left);
    const atempo = nodes.map((n) => `atempo=${n.toFixed(4)}`).join(",");
    await run(FFMPEG, [
      "-y",
      "-i",
      rawPath,
      "-af",
      `asetrate=24000*1.06,aresample=44100,atempo=1.302,${atempo},loudnorm=I=-16:TP=-1.5:LRA=11`,
      "-ar",
      "44100",
      "-b:a",
      "192k",
      "-codec:a",
      "libmp3lame",
      outPath,
    ]);
    return durationOf(outPath);
  };

  let dur = await encode(1);
  if (dur > s.target) {
    // Speed the line up just enough to land inside its scene slot.
    const fit = dur / (s.target - 0.1);
    if (fit > 1.3) {
      console.warn(
        `  ! ${s.id} needs ${fit.toFixed(2)}x to fit ${s.target}s - shorten the text`
      );
    }
    dur = await encode(Math.min(fit, 1.6));
  }
  const bytes = (await readFile(outPath)).length;
  timing.push({ ...s, duration: dur });
  console.log(`  ${dur.toFixed(2)}s / target ${s.target}s  ${(bytes / 1024).toFixed(1)} KB`);
}

await rm(tmpDir, { recursive: true, force: true });

console.log("\nTIMING");
for (const t of timing) console.log(`  ${t.id.padEnd(12)} ${t.duration.toFixed(2)}s`);
console.log("\nDone. Files in public/voice/vscode/");
