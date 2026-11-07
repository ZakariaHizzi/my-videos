import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FFPROBE = join(root, "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffprobe.exe");

const vids = [
  "HtmlBasics", "HtmlText", "HtmlMedia", "HtmlTable", "HtmlForm", "HtmlLinks",
  "CssBasics", "CssSelectors", "CssColors", "CssTypography", "VSCodeShort", "VSCodeLang",
];

for (const v of vids) {
  const { stdout } = await run(FFPROBE, [
    "-v", "error",
    "-show_entries", "format=duration",
    "-show_entries", "stream=width,height",
    "-of", "default=nw=1",
    join(root, "out", `${v}.mp4`),
  ]);
  console.log(v, stdout.replace(/\n/g, "  ").trim());
}
