// Report narration word timings for the htmlform short so scene cuts can be
// locked to the voice. Run: node scripts/htmlform-sync.mjs
import { readFile } from "node:fs/promises";

const t = JSON.parse(
  await readFile(new URL("./htmlform-voice-transcript.json", import.meta.url), "utf8")
);

// Anchors = the moment each scene's key idea is spoken.
const anchors = [
  { scene: "Hook", keys: ["إزاي", "تعرف", "أنumoz", "نموزك", "أمام"] },
  { scene: "GoldenRule", keys: ["قوة", "الحاوية", "تجمع", "العناصر"] },
  { scene: "InputType", keys: ["إنبوت", "input", "تايب", "password", "باسورد"] },
  { scene: "Attrs", keys: ["placeholder", "required", "إجبار", "وضيحي"] },
  { scene: "TypeValues", keys: ["email", "number", "checkbox", "radio", "بريد", "أرقام"] },
  { scene: "Button", keys: ["button", "submit", "الزر", "بعى", "يبعى"] },
  { scene: "Summary", keys: ["ببساطة", "form", "للحوية"] },
  { scene: "CTA", keys: ["تابع", "مهتم", "البرمجة"] },
];

const chunks = t.chunks.map((c) => ({
  text: c.text.trim(),
  s: c.timestamp[0],
  e: c.timestamp[1],
}));

console.log("TOTAL AUDIO:", chunks[chunks.length - 1].e.toFixed(2), "s\n");

for (const a of anchors) {
  const hit = chunks.find((c) => a.keys.some((k) => c.text.includes(k)));
  if (hit) {
    console.log(
      a.scene.padEnd(12),
      "word=" + JSON.stringify(hit.text).padEnd(14),
      "start=" + hit.s.toFixed(2) + "s",
      "-> frame " + Math.round(hit.s * 30)
    );
  } else {
    console.log(a.scene.padEnd(12), "NOT FOUND", a.keys.join(","));
  }
}

// Also dump the first 40 words with timings for manual inspection.
console.log("\n--- first 45 words ---");
for (const c of chunks.slice(0, 45)) {
  console.log(c.s.toFixed(2) + "-" + c.e.toFixed(2), c.text);
}
