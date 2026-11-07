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

/* One vibrant color per HTML form tag. */
export const C_FORM = "#FFD700"; // gold  — the container
export const C_INPUT = "#22D3EE"; // cyan  — fields
export const C_BUTTON = "#F472B6"; // pink  — the submit button

/* Attribute colors (the "magic" part of the lesson). */
export const C_TYPE = "#A855F7"; // purple — type
export const C_PLACEHOLDER = "#60A5FA"; // blue   — placeholder
export const C_REQUIRED = "#FF6B35"; // orange — required (warning)

/* VS Code Dark+ syntax palette. */
export const C_TAG = "#569CD6";
export const C_ATTR = "#9CDCFE";
export const C_STR = "#CE9178";
export const C_PLAIN = "#D4D4D4";

export type Tok = { t: string; c: string };

/** True if the string contains Arabic script (needs bidi isolation in LTR views). */
export const isArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

/** Split one line of HTML into colored tokens (tag / attribute / string / plain). */
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

/** Total characters of the first `upto` lines. */
export const cumChars = (lines: string[], upto: number) =>
  lines.slice(0, upto).reduce((s, l) => s + lineChars(l), 0);

export const totalChars = (lines: string[]) => cumChars(lines, lines.length);

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

/** Multi-line typewriter code with syntax highlighting, caret and pointer.
 *  `glowAttrs` highlights named attributes (e.g. "required") with a box. */
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
                  // Arabic content inside the LTR code view: isolate it so the
                  // bidi algorithm doesn't reverse/garble the glyphs.
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

/* ------------------------------------------------------------------ */
/* Rendered form controls (the "browser output" look)                  */
/* ------------------------------------------------------------------ */

/** A browser-styled input field. Shows gray placeholder when empty, dots for
 *  password type, a blue focus ring and a red border + bubble on error. */
export const RenderInput: React.FC<{
  placeholder?: string;
  value?: string;
  type?: "text" | "password" | "email" | "number";
  width?: number;
  fontSize?: number;
  focused?: boolean;
  error?: boolean;
  style?: CSSProperties;
}> = ({
  placeholder,
  value = "",
  type = "text",
  width = 560,
  fontSize = 38,
  focused = false,
  error = false,
  style,
}) => {
  const isPw = type === "password";
  const shown = isPw ? "•".repeat(value.length) : value;
  const hasValue = value.length > 0;
  return (
    <div
      style={{
        position: "relative",
        width,
        boxSizing: "border-box",
        padding: `${Math.round(fontSize * 0.62)}px ${Math.round(fontSize * 0.7)}px`,
        borderRadius: 14,
        background: "#FFFFFF",
        border: `3px solid ${error ? "#EF4444" : focused ? "#3B82F6" : "#CBD5E1"}`,
        boxShadow: focused
          ? "0 0 0 5px rgba(59,130,246,0.22)"
          : "inset 0 2px 6px rgba(15,23,42,0.06)",
        fontFamily: FONT,
        fontSize,
        fontWeight: 600,
        color: "#0F172A",
        textAlign: "right",
        direction: "rtl",
        lineHeight: 1.2,
        ...style,
      }}
    >
      {hasValue ? (
        <span>{shown}</span>
      ) : (
        <span style={{ color: "#94A3B8", fontWeight: 500 }}>{placeholder}</span>
      )}
    </div>
  );
};

/** A browser-styled submit button with a press / success state. */
export const RenderButton: React.FC<{
  label: string;
  width?: number;
  fontSize?: number;
  pressed?: boolean;
  success?: boolean;
  style?: CSSProperties;
}> = ({ label, width = 560, fontSize = 38, pressed = false, success = false, style }) => (
  <div
    style={{
      width,
      boxSizing: "border-box",
      padding: `${Math.round(fontSize * 0.6)}px 0`,
      borderRadius: 14,
      background: success
        ? "linear-gradient(180deg,#22C55E,#15803D)"
        : "linear-gradient(180deg,#6366F1,#4338CA)",
      color: "#FFFFFF",
      fontFamily: FONT,
      fontSize,
      fontWeight: 900,
      textAlign: "center",
      direction: "rtl",
      boxShadow: pressed
        ? "inset 0 3px 10px rgba(0,0,0,0.35)"
        : "0 8px 20px rgba(67,56,202,0.45)",
      transform: pressed ? "translateY(2px) scale(0.985)" : "none",
      ...style,
    }}
  >
    {success ? `تم بنجاح ✓` : label}
  </div>
);

/** Small caption row pairing an emoji with Arabic copy, used under diagrams. */
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

/** A gentle fade+rise used to seat Arabic copy panels. */
export const fadeUp = (frame: number, start: number, end: number, distance = 70) => {
  const opacity = interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: undefined,
  });
  const y = interpolate(frame, [start, end], [distance, 0], {
    ...clamp,
  });
  return { opacity, translate: `0px ${y}px` };
};

/** Wraps children in the translucent panel used to seat on-screen Arabic copy. */
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
