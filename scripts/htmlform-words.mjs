// Dump narration words within given second ranges so scene-internal
// animation beats can be timed to the voice. Run: node scripts/htmlform-words.mjs <s0> <s1>
import { readFile } from "node:fs/promises";

const t = JSON.parse(
  await readFile(new URL("./htmlform-voice-transcript.json", import.meta.url), "utf8")
);
const s0 = Number(process.argv[2] ?? 0);
const s1 = Number(process.argv[3] ?? 999);
for (const c of t.chunks) {
  if (c.timestamp[0] >= s0 && c.timestamp[0] <= s1) {
    console.log(
      c.timestamp[0].toFixed(2) + "-" + c.timestamp[1].toFixed(2),
      JSON.stringify(c.text.trim())
    );
  }
}
