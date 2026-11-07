import React from "react";
import type { CSSProperties } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../vscode/theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Spring pop that starts at `delay`. */
export const popAt = (
  frame: number,
  fps: number,
  delay: number,
  damping = 13,
  stiffness = 150,
) => spring({ frame: frame - delay, fps, config: { damping, stiffness } });

/* One vibrant color per HTML table tag. */
export const C_TABLE = "#FFD700"; // gold  — the container
export const C_TR = "#22D3EE"; // cyan  — rows
export const C_TD = "#A855F7"; // purple— data cells
export const C_TH = "#F472B6"; // pink  — header cells

/* VS Code Dark+ syntax palette. */
export const C_TAG = "#569CD6";
export const C_TEXT = "#CE9178";
export const C_PLAIN = "#D4D4D4";

export type Tok = { t: string; c: string };

/** True if the string contains Arabic script (needs bidi isolation in LTR views). */
export const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

/** Split one line of HTML into colored tokens (tags vs content vs whitespace). */
export const highlightLine = (line: string): Tok[] => {
  const out: Tok[] = [];
  const parts = line.split(/(<[^>]*>)/g).filter((p) => p !== "");
  for (const p of parts) {
    if (p.startsWith("<")) {
      out.push({ t: p, c: C_TAG });
      continue;
    }
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(p);
    if (!m) continue;
    const [, lead, mid, trail] = m;
    if (lead) out.push({ t: lead, c: C_PLAIN });
    if (mid) out.push({ t: mid, c: C_TEXT });
    if (trail) out.push({ t: trail, c: C_PLAIN });
  }
  return out;
};

export const revealTokens = (toks: Tok[], n: number): Tok[] => {
  let left = n;
  const res: Tok[] = [];
  for (const tk of toks) {
    if (left <= 0) break;
    const take = Math.min(tk.t.length, left);
    res.push({ t: tk.t.slice(0, take), c: tk.c });
    left -= take;
  }
  return res;
};

const lineChars = (line: string) =>
  highlightLine(line).reduce((a, t) => a + t.t.length, 0);

/** Total characters of the first `upto` lines. */
export const cumChars = (lines: string[], upto: number) =>
  lines.slice(0, upto).reduce((s, l) => s + lineChars(l), 0);

export const totalChars = (lines: string[]) => cumChars(lines, lines.length);

/** Frame at which `typed` reaches `target` chars, given a linear type range. */
export const frameAtTyped = (
  typed: number,
  total: number,
  target: number,
  t0: number,
  t1: number,
) => t0 + (Math.min(target, total) / Math.max(1, total)) * (t1 - t0);

/** Blinking block caret. */
export const Caret: React.FC<{ h?: number }> = ({ h = 40 }) => {
  const frame = useCurrentFrame();
  const on = frame % 30 < 18;
  return (
    <span
      style={{
        display: "inline-block",
        width: 5,
        height: h,
        marginLeft: 3,
        verticalAlign: "-7px",
        background: on ? "#569CD6" : "transparent",
      }}
    />
  );
};

const Pointer: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 40 52"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: 2,
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.65))",
    }}
  >
    <path
      d="M4 2 L4 41 L14 32 L21 47 L29 43 L22 29 L35 28 Z"
      fill="#FFFFFF"
      stroke="#0B1020"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  </svg>
);

/** Rounded mono chip that displays a tag name. */
export const TagChip: React.FC<{
  label: string;
  color: string;
  fontSize?: number;
  style?: CSSProperties;
}> = ({ label, color, fontSize = 36, style }) => (
  <div
    style={{
      display: "inline-block",
      padding: `${Math.round(fontSize * 0.28)}px ${Math.round(fontSize * 0.6)}px`,
      borderRadius: 14,
      background: "rgba(6,10,30,0.94)",
      border: `3px solid ${color}`,
      boxShadow: `0 0 26px ${color}55`,
      color,
      fontFamily: MONO,
      fontSize,
      fontWeight: 700,
      direction: "ltr",
      lineHeight: 1.15,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {label}
  </div>
);

/** Multi-line typewriter code with syntax highlighting, caret and pointer. */
export const TypedCodeBlock: React.FC<{
  lines: string[];
  typed: number;
  size?: number;
  showPointer?: boolean;
  style?: CSSProperties;
}> = ({ lines, typed, size = 40, showPointer = true, style }) => {
  const lh = Math.round(size * 1.75);
  let left = typed;
  let caretLine = -1;
  const rows: Tok[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const toks = highlightLine(lines[i]);
    const total = toks.reduce((a, t) => a + t.t.length, 0);
    if (left >= total) {
      rows.push(toks);
      left -= total;
    } else if (left > 0) {
      rows.push(revealTokens(toks, left));
      caretLine = i;
      left = 0;
    } else {
      rows.push([]);
    }
  }
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: size,
        lineHeight: `${lh}px`,
        whiteSpace: "pre",
        direction: "ltr",
        textAlign: "left",
        color: C_PLAIN,
        ...style,
      }}
    >
      {rows.map((toks, i) => (
        <div key={i} style={{ height: lh }}>
          {toks.map((tk, j) => (
            <span
              key={j}
              style={{
                color: tk.c,
                // Arabic content inside the LTR code view: isolate it so the
                // bidi algorithm doesn't reverse/garble the glyphs.
                ...(isArabic(tk.t)
                  ? { direction: "rtl", unicodeBidi: "isolate" }
                  : null),
              }}
            >
              {tk.t}
            </span>
          ))}
          {i === caretLine ? <Caret h={size * 0.95} /> : null}
          {i === caretLine && showPointer ? <Pointer size={size} /> : null}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Rendered table (the "browser output" look)                          */
/* ------------------------------------------------------------------ */

export type CellKind = "th" | "td";
export type CellSpec = {
  text: string;
  kind: CellKind;
  /** local frame delay for the pop-in */
  appear?: number;
};

/** A clean white HTML table with per-cell pop-in, like a real browser render. */
export const RenderTable: React.FC<{
  rows: CellSpec[][];
  width?: number;
  fontSize?: number;
  /** render every cell fully visible (for stills/covers) */
  instant?: boolean;
  cellFlash?: (r: number, c: number) => number;
  style?: CSSProperties;
}> = ({ rows, width = 760, fontSize = 40, instant = false, cellFlash, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        width,
        borderRadius: 16,
        overflow: "hidden",
        border: "3px solid #B9C4D6",
        background: "#FFFFFF",
        direction: "rtl",
        fontFamily: FONT,
        ...style,
      }}
    >
      {rows.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((cell, c) => {
            const s = instant ? 1 : popAt(frame, fps, cell.appear ?? 0, 12, 175);
            const isTh = cell.kind === "th";
            const flash = cellFlash?.(r, c) ?? 0;
            return (
              <div
                key={c}
                style={{
                  flex: 1,
                  padding: `${Math.round(fontSize * 0.55)}px ${Math.round(
                    fontSize * 0.28,
                  )}px`,
                  borderRight: c === 0 ? "none" : "2px solid #D7DFEC",
                  borderBottom: "2px solid #D7DFEC",
                  background: isTh ? "#EEF4FF" : "#FFFFFF",
                  color: isTh ? "#1D4ED8" : "#0F172A",
                  fontWeight: isTh ? 900 : 500,
                  textAlign: "center",
                  fontSize,
                  lineHeight: 1.3,
                  opacity: Math.min(1, s * 1.4),
                  transform: `scale(${0.74 + 0.26 * s})`,
                  boxShadow:
                    flash > 0
                      ? `inset 0 0 ${28 * flash}px rgba(255,215,0,${
                          0.7 * flash
                        })`
                      : undefined,
                }}
              >
                {cell.text}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
