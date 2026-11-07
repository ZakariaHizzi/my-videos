// Compute TransitionSeries sequence durations so each cut completes exactly
// when its narration topic's lead-in sentence starts. Run: node scripts/htmlform-plan.mjs
import { readFile } from "node:fs/promises";

const T = 12; // transition overlap
const FPS = 30;

const t = JSON.parse(
  await readFile(new URL("./htmlform-voice-transcript.json", import.meta.url), "utf8")
);
const chunks = t.chunks.map((c) => ({ text: c.text.trim(), s: c.timestamp[0] }));

// ONE unique anchor word per scene = the START of that topic's narration, so a
// scene with a code-typing intro has room to type before its keyword is spoken.
const anchors = [
  { scene: "Hook", key: "أريد" },
  { scene: "GoldenRule", key: "قبل" }, // "قبل ما نبدأ" -> golden rule lead-in
  { scene: "InputType", key: "لالعناصر" }, // "للعناصر نستخدم إنبوت"
  { scene: "Attrs", key: "مهمين" }, // "عندك خصصيتين مهمين" -> placeholder+required
  { scene: "TypeValues", key: "وعندك" }, // "وعندك كمان أنواع تانية"
  { scene: "Button", key: "والزر" }, // "والزر بنستخدم button"
  { scene: "Summary", key: "ببساطة" }, // "يعني ببساطة" -> recap
  { scene: "CTA", key: "مهتم" }, // "إن كنت مهتم" -> follow CTA
];

const a = anchors.map((an) => {
  const hit = chunks.find((c) => c.text.includes(an.key));
  if (!hit) throw new Error("anchor not found: " + an.key);
  return { scene: an.scene, frame: Math.round(hit.s * FPS), word: hit.text, s: hit.s };
});

console.log("anchors (cut completes here):");
for (const x of a)
  console.log(" ", x.scene.padEnd(12), "f" + String(x.frame).padStart(4), x.s.toFixed(2) + "s", JSON.stringify(x.word));

for (let i = 1; i < a.length; i++)
  if (a[i].frame <= a[i - 1].frame) console.log("  !! non-monotonic at", a[i].scene);

// scene i's transition should COMPLETE at a[i].frame -> start_i = a[i].frame - T
// start_i = sum(dur[0..i-1]) - i*T  =>  sum_{j<i} dur_j = a[i].frame + (i-1)*T
const n = a.length;
const cum = [];
for (let i = 1; i < n; i++) cum[i] = a[i].frame + (i - 1) * T;
cum[0] = 0;
const totalNeeded = 1800 + (n - 1) * T;
cum[n] = totalNeeded;
const dur = [];
for (let i = 0; i < n; i++) dur[i] = cum[i + 1] - cum[i];

console.log("\ndurations (apply to HtmlFormShorts.tsx):");
let sum = 0;
dur.forEach((d, i) => {
  sum += d;
  const start = cum[i] - i * T;
  const visible = start + d;
  console.log(
    " ",
    a[i].scene.padEnd(12),
    String(d).padStart(4),
    (d / FPS).toFixed(2) + "s",
    " visible f" + start + ".." + visible,
    " @" + (start / FPS).toFixed(2) + "s"
  );
});
console.log("\nsum =", sum, "-> final =", sum - (n - 1) * T, "frames");
console.log("durations:", dur.join(", "));
