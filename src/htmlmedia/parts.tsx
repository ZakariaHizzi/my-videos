import React from "react";
import type { CSSProperties } from "react";
import { spring, useCurrentFrame } from "remotion";
import { MONO } from "../vscode/theme";

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

/* ------------------------------------------------------------------ */
/* Syntax highlighting (VS Code Dark+ palette)                         */
/* ------------------------------------------------------------------ */

export const C_TAG = "#569CD6"; // tag names + brackets
export const C_ATTR = "#9CDCFE"; // attribute names
export const C_STR = "#CE9178"; // attribute values
export const C_PLAIN = "#D4D4D4"; // punctuation / whitespace

export type Tok = { t: string; c: string };

/** Minimal HTML tokenizer good enough for single tags. */
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

/** Blinking text caret. */
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

export const MousePointer: React.FC<{ size?: number }> = ({ size = 42 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 40 52"
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: 1,
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

/** Typewriter code line with syntax highlighting, caret and mouse pointer. */
export const TypedCode: React.FC<{
  code: string;
  typed: number;
  size?: number;
  glowAttrs?: string[];
  glowOn?: boolean;
  caret?: boolean;
  pointer?: boolean;
  style?: CSSProperties;
}> = ({ code, typed, size = 40, glowAttrs = [], glowOn = false, caret = true, pointer = true, style }) => {
  const toks = React.useMemo(() => tokenize(code), [code]);
  const vis = revealTokens(toks, typed);
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: size,
        lineHeight: 1.7,
        whiteSpace: "pre",
        direction: "ltr",
        textAlign: "left",
        color: C_PLAIN,
        ...style,
      }}
    >
      {vis.map((tk, i) => {
        const isLast = i === vis.length - 1;
        const glow = glowOn && tk.c === C_ATTR && glowAttrs.includes(tk.t.trim());
        return (
          <span
            key={i}
            style={{
              color: tk.c,
              background: glow ? "rgba(0,255,136,0.18)" : undefined,
              boxShadow: glow ? "0 0 26px rgba(0,255,136,0.75)" : undefined,
              borderRadius: glow ? 10 : undefined,
              padding: glow ? "1px 7px" : undefined,
            }}
          >
            {tk.t}
            {isLast && caret ? <Caret h={size * 0.95} /> : null}
          </span>
        );
      })}
      {pointer && typed > 0 ? <MousePointer size={size * 1.05} /> : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Small UI chips                                                      */
/* ------------------------------------------------------------------ */

/** Rounded translucent panel used to seat on-screen Arabic copy. */
export const CopyPanel: React.FC<{
  children: React.ReactNode;
  style?: CSSProperties;
  borderColor?: string;
}> = ({ children, style, borderColor = "rgba(125,211,252,0.35)" }) => (
  <div
    style={{
      display: "inline-block",
      padding: "22px 40px",
      borderRadius: 28,
      background: "rgba(6,10,30,0.93)",
      border: `2px solid ${borderColor}`,
      boxShadow: "0 20px 54px rgba(0,0,0,0.5), 0 0 44px rgba(59,130,246,0.25)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** A code token chip used by the tag-structure diagram. */
export const TokenChip: React.FC<{
  label: string;
  color: string;
  fontSize?: number;
  glow?: boolean;
  highlight?: string;
  style?: CSSProperties;
}> = ({ label, color, fontSize = 40, glow = false, highlight, style }) => (
  <div
    style={{
      display: "inline-block",
      padding: `${Math.round(fontSize * 0.3)}px ${Math.round(fontSize * 0.55)}px`,
      borderRadius: 16,
      background: highlight ?? "rgba(6,10,30,0.94)",
      border: `3px solid ${color}`,
      boxShadow: glow ? `0 0 ${34}px ${color}` : `0 0 20px ${color}44`,
      color,
      fontFamily: MONO,
      fontSize,
      fontWeight: 700,
      direction: "ltr",
      lineHeight: 1.1,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {label}
  </div>
);

/** Pill with an emoji + Arabic label used for attribute call-outs. */
export const AttrBadge: React.FC<{
  icon: string;
  label: string;
  color: string;
  fontSize?: number;
  style?: CSSProperties;
}> = ({ icon, label, color, fontSize = 38, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      padding: `${Math.round(fontSize * 0.4)}px ${Math.round(fontSize * 0.9)}px`,
      borderRadius: 100,
      background: "rgba(6,10,30,0.94)",
      border: `3px solid ${color}`,
      boxShadow: `0 0 28px ${color}66, 0 14px 30px rgba(0,0,0,0.45)`,
      fontFamily: "'Segoe UI Emoji','Cairo',sans-serif",
      fontSize,
      fontWeight: 800,
      color: "#fff",
      direction: "rtl",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span style={{ fontSize: fontSize * 1.05 }}>{icon}</span>
    <span>{label}</span>
  </div>
);
