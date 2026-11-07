import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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

/* One vibrant color per concept. */
export const C_LINK = "#3B82F6"; // blue  — the <a> anchor
export const C_HREF = "#FFD700"; // gold  — href destination
export const C_TARGET = "#22D3EE"; // cyan  — target="_blank" new tab
export const C_UL = "#A855F7"; // purple — <ul> unordered list
export const C_LI = "#F472B6"; // pink   — <li> list item
export const C_ARROW = "#34D399"; // green  — navigation arrow

/* VS Code Dark+ syntax palette. */
export const C_TAG = "#569CD6";
export const C_ATTR = "#9CDCFE";
export const C_STR = "#CE9178";
export const C_PLAIN = "#D4D4D4";

export type Tok = { t: string; c: string };

export const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

export const tokenize = (src: string): Tok[] => {
  const out: Tok[] = [];
  const push = (t: string, c: string) => {
    if (!t) return;
    const last = out[out.length - 1];
    if (last && last.c === c) last.t += t;
    else out.push({ t, c });
  };
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "<") {
      let j = i + 1;
      const closing = src[j] === "/";
      if (closing) j++;
      const m = /^[a-zA-Z][\w-]*/.exec(src.slice(j));
      const name = m ? m[0] : "";
      push("<" + (closing ? "/" : "") + name, C_TAG);
      i = j + name.length;
      continue;
    }
    if (ch === ">") {
      push(">", C_TAG);
      i++;
      continue;
    }
    if (/\s/.test(ch)) {
      push(ch, C_PLAIN);
      i++;
      continue;
    }
    const m = /^[a-zA-Z][\w-]*/.exec(src.slice(i));
    if (m) {
      push(m[0], C_ATTR);
      i += m[0].length;
      continue;
    }
    if (ch === "=") {
      push("=", C_PLAIN);
      i++;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const q = ch;
      let j = i + 1;
      while (j < src.length && src[j] !== q) j++;
      push(src.slice(i, Math.min(j + 1, src.length)), C_STR);
      i = j + 1;
      continue;
    }
    push(ch, C_PLAIN);
    i++;
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

const lineChars = (line: string) => tokenize(line).reduce((a, t) => a + t.t.length, 0);

export const cumChars = (lines: string[], upto: number) =>
  lines.slice(0, upto).reduce((s, l) => s + lineChars(l), 0);

export const totalChars = (lines: string[]) => cumChars(lines, lines.length);

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

export const TypedCodeBlock: React.FC<{
  lines: string[];
  typed: number;
  size?: number;
  glowAttrs?: string[];
  glowOn?: boolean;
  showPointer?: boolean;
  style?: CSSProperties;
}> = ({ lines, typed, size = 40, glowAttrs = [], glowOn = false, showPointer = true, style }) => {
  const lh = Math.round(size * 1.75);
  let left = typed;
  let caretLine = -1;
  const rows: Tok[][] = [];
  for (let i = 0; i < lines.length; i++) {
    const toks = tokenize(lines[i]);
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
          {toks.map((tk, j) => {
            const glow = glowOn && tk.c === C_ATTR && glowAttrs.includes(tk.t.trim());
            return (
              <span
                key={j}
                style={{
                  color: tk.c,
                  background: glow ? "rgba(255,107,53,0.22)" : undefined,
                  boxShadow: glow ? "0 0 26px rgba(255,107,53,0.85)" : undefined,
                  borderRadius: glow ? 10 : undefined,
                  padding: glow ? "1px 7px" : undefined,
                  ...(isArabic(tk.t)
                    ? { direction: "rtl", unicodeBidi: "isolate" }
                    : null),
                }}
              >
                {tk.t}
              </span>
            );
          })}
          {i === caretLine ? <Caret h={size * 0.95} /> : null}
          {i === caretLine && showPointer ? <Pointer size={size} /> : null}
        </div>
      ))}
    </div>
  );
};

export const CaptionLine: React.FC<{
  icon: string;
  text: string;
  color: string;
  appear: number;
  fontSize?: number;
}> = ({ icon, text, color, appear, fontSize = 46 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 165);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        opacity: Math.min(1, s),
        transform: `translateY(${(1 - s) * 26}px)`,
      }}
    >
      <span style={{ fontSize: fontSize * 1.05 }}>{icon}</span>
      <span
        style={{
          fontFamily: FONT,
          fontSize,
          fontWeight: 900,
          color: "#FFFFFF",
          textShadow: `0 0 22px ${color}99, 0 6px 20px rgba(0,0,0,0.55)`,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const fadeUp = (frame: number, start: number, end: number, distance = 70) => {
  const opacity = interpolate(frame, [start, end], [0, 1], {
    ...clamp,
  });
  const y = interpolate(frame, [start, end], [distance, 0], {
    ...clamp,
  });
  return { opacity, translate: `0px ${y}px` };
};

export const CopyPanel: React.FC<{
  children: ReactNode;
  borderColor?: string;
  style?: CSSProperties;
}> = ({ children, borderColor = "rgba(125,211,252,0.35)", style }) => (
  <div
    style={{
      display: "inline-block",
      padding: "26px 44px",
      borderRadius: 30,
      background: "rgba(6,10,30,0.93)",
      border: `2px solid ${borderColor}`,
      boxShadow: "0 20px 54px rgba(0,0,0,0.5), 0 0 44px rgba(59,130,246,0.25)",
      backdropFilter: "blur(6px)",
      fontFamily: FONT,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ---------- Rendered browser output: nav menu + bullet list ---------- */

export const RenderNavMenu: React.FC<{
  items: { label: string; active?: boolean }[];
  width?: number;
  fontSize?: number;
  vertical?: boolean;
}> = ({ items, width = 760, fontSize = 34, vertical = false }) => (
  <div
    style={{
      width,
      boxSizing: "border-box",
      padding: "14px 18px",
      borderRadius: 14,
      background: "linear-gradient(180deg,#1E3A8A,#14285A)",
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      alignItems: "center",
      justifyContent: vertical ? "flex-start" : "space-around",
      gap: vertical ? 10 : 8,
      boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    }}
  >
    {items.map((it, i) => (
      <div
        key={i}
        style={{
          padding: `${Math.round(fontSize * 0.35)}px ${Math.round(fontSize * 0.7)}px`,
          borderRadius: 10,
          background: it.active ? "rgba(255,215,0,0.25)" : "transparent",
          color: it.active ? "#FFD700" : "#FFFFFF",
          fontFamily: FONT,
          fontSize,
          fontWeight: 800,
          direction: "rtl",
          borderBottom: it.active ? "3px solid #FFD700" : "3px solid transparent",
        }}
      >
        {it.label}
      </div>
    ))}
  </div>
);

export const RenderBulletList: React.FC<{
  items: string[];
  width?: number;
  fontSize?: number;
}> = ({ items, width = 760, fontSize = 38 }) => (
  <div
    style={{
      width,
      boxSizing: "border-box",
      padding: "20px 26px",
      borderRadius: 14,
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    }}
  >
    {items.map((it, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: FONT,
          fontSize,
          fontWeight: 600,
          color: "#0F172A",
          direction: "rtl",
        }}
      >
        <span style={{ color: C_UL, fontSize: fontSize * 1.1 }}>•</span>
        <span>{it}</span>
      </div>
    ))}
  </div>
);
