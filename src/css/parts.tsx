import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO, rand } from "../vscode/theme";

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const C_ORANGE = "#FF6B35";
export const C_GOLD = "#FFD700";
export const C_PURPLE = "#A855F7";
export const C_CYAN = "#22D3EE";
export const C_GREEN = "#34D399";
export const C_RED = "#FF5C5C";

/* VS Code Dark+ palette */
export const T_TAG = "#569CD6";
export const T_ATTR = "#9CDCFE";
export const T_STR = "#CE9178";
export const T_PLAIN = "#D4D4D4";
export const T_COMMENT = "#6A9955";
export const T_SEL = "#FFD166";
export const T_PROP = "#7DD3FC";
export const T_VAL = "#FF8A65";

export const popAt = (
  frame: number,
  fps: number,
  delay: number,
  damping = 13,
  stiffness = 150,
) => spring({ frame: frame - delay, fps, config: { damping, stiffness } });

export const fadeUp = (frame: number, start: number, end: number, distance = 60) => {
  const p = interpolate(frame, [start, end], [0, 1], clamp);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * distance}px)`,
  };
};

export const breathe = (frame: number, fps: number, speed = 2.4) =>
  0.5 + 0.5 * Math.sin((frame / fps) * speed);

/* ------------------------------------------------------------------ */
/* Stage                                                               */
/* ------------------------------------------------------------------ */

/** Dark-blue stage with grid, orange/purple orbs and rising particles. */
export const Stage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const orbs = [
    { x: 120, y: 260, s: 720, c: "#FF6B35", o: 0.16 },
    { x: 980, y: 560, s: 760, c: "#A855F7", o: 0.3 },
    { x: 180, y: 1380, s: 820, c: "#3B82F6", o: 0.28 },
    { x: 900, y: 1740, s: 700, c: "#FF6B35", o: 0.13 },
  ];

  const particles = Array.from({ length: 44 }, (_, i) => {
    const speed = 0.35 + rand(i * 3.1) * 0.8;
    const y = 1980 - ((t * 120 * speed + rand(i) * 2100) % 2100);
    const size = 4 + rand(i * 7.7) * 9;
    const colors = ["#60A5FA", "#A855F7", "#FFD700", "#FF6B35", "#22D3EE"];
    return {
      x: rand(i * 5.3) * 1080,
      y,
      size,
      color: colors[i % colors.length],
      opacity: 0.18 + rand(i * 2.2) * 0.5,
      blur: rand(i * 9.4) > 0.65 ? 3 : 0,
    };
  });

  const symbols = [
    { s: "</>", x: 70, y: 240, d: 0 },
    { s: "{ }", x: 860, y: 300, d: 1.2 },
    { s: "#", x: 100, y: 1660, d: 2.1 },
    { s: ";", x: 930, y: 1480, d: 0.7 },
    { s: ".css", x: 70, y: 1080, d: 1.8 },
    { s: "link", x: 850, y: 1180, d: 2.6 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(176deg,#08102A 0%,#12245C 22%,#1E3A8A 52%,#3B1D86 82%,#0D0A26 100%)",
        overflow: "hidden",
      }}
      durationInFrames={1470}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 95% 78% at 50% 44%, black 20%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 78% at 50% 44%, black 20%, transparent 76%)",
        }}
      />
      {orbs.map((o, i) => {
        const pulse = 1 + 0.08 * Math.sin(t * 1.4 + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o.x - o.s / 2,
              top: o.y - o.s / 2,
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${o.c} 0%, transparent 68%)`,
              opacity: o.o,
              scale: `${pulse}`,
              filter: "blur(16px)",
            }}
          />
        );
      })}
      {symbols.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y + Math.sin(t * 1.1 + p.d) * 26,
            fontFamily: MONO,
            fontSize: 50,
            fontWeight: 900,
            color: "rgba(255,255,255,0.11)",
            rotate: `${Math.sin(t + p.d) * 8}deg`,
          }}
        >
          {p.s}
        </div>
      ))}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2.4}px ${p.color}`,
            filter: p.blur ? "blur(3px)" : undefined,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 48%, transparent 42%, rgba(3,6,20,0.45) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg,#FF6B35,#FFD700,#A855F7,#22D3EE)",
        }}
      />
    </AbsoluteFill>
  );
};

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top: 18,
        left: 40,
        right: 40,
        height: 7,
        borderRadius: 10,
        background: "rgba(255,255,255,0.15)",
        overflow: "hidden",
        zIndex: 90,
      }}
    >
      <div
        style={{
          width: `${(frame / durationInFrames) * 100}%`,
          height: "100%",
          borderRadius: 10,
          background: "linear-gradient(90deg,#FF6B35,#FFD700,#A855F7,#22D3EE)",
        }}
      />
    </div>
  );
};

/** Small CSS shield brand mark, pinned top-left. */
export const CssMark: React.FC<{ style?: CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      top: 44,
      left: 46,
      display: "flex",
      alignItems: "center",
      gap: 12,
      zIndex: 80,
      ...style,
    }}
  >
    <svg width={54} height={54} viewBox="0 0 100 100">
      <path d="M14 4h72l-7 78-29 14-29-14z" fill="#1B3FA8" stroke="#7DD3FC" strokeWidth="3" />
      <path d="M50 13v78l23-11 6-67z" fill="#0F2A70" />
      <text
        x="50"
        y="67"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="46"
        fontWeight="900"
        fill="#7DD3FC"
      >
        3
      </text>
    </svg>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 30,
        fontWeight: 900,
        letterSpacing: 3,
        color: "rgba(255,255,255,0.8)",
      }}
    >
      CSS
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Headline                                                            */
/* ------------------------------------------------------------------ */

export const HeadlinePanel: React.FC<{
  children: ReactNode;
  color?: string;
  step?: string;
  style?: CSSProperties;
  fontSize?: number;
}> = ({ children, color = C_CYAN, step, style, fontSize = 60 }) => (
  <div
    style={{
      position: "absolute",
      top: 128,
      left: 50,
      right: 50,
      display: "flex",
      justifyContent: "center",
      zIndex: 40,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: step ? "20px 34px 20px 24px" : "24px 40px",
        borderRadius: 30,
        background: "rgba(5,10,30,0.9)",
        border: `3px solid ${color}99`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.55), 0 0 44px ${color}33`,
        backdropFilter: "blur(8px)",
        direction: "rtl",
      }}
    >
      {step ? (
        <div
          style={{
            flexShrink: 0,
            width: 66,
            height: 66,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(145deg, ${color}, ${color}77)`,
            color: "#08102A",
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 900,
            boxShadow: `0 0 30px ${color}66`,
          }}
        >
          {step}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: FONT,
          fontSize,
          fontWeight: 900,
          lineHeight: 1.35,
          color: "#FFFFFF",
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

/** LTR-isolated code token for use inside Arabic sentences. */
export const K: React.FC<{ children: ReactNode; color?: string; size?: number }> = ({
  children,
  color = "#FFFFFF",
  size,
}) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: size,
      fontWeight: 700,
      color,
      direction: "ltr",
      unicodeBidi: "isolate",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

export const NotePill: React.FC<{
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
  fontSize?: number;
  icon?: string;
}> = ({ children, color = C_GOLD, style, fontSize = 46, icon }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      padding: "18px 40px",
      borderRadius: 100,
      background: "rgba(5,10,30,0.92)",
      border: `3px solid ${color}`,
      boxShadow: `0 0 38px ${color}55, 0 16px 40px rgba(0,0,0,0.5)`,
      fontFamily: FONT,
      fontSize,
      fontWeight: 900,
      color: "#FFFFFF",
      direction: "rtl",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {icon ? <span style={{ fontSize: fontSize * 1.08 }}>{icon}</span> : null}
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Editor + browser chrome                                             */
/* ------------------------------------------------------------------ */

export const EditorFrame: React.FC<{
  width: number;
  tab?: string;
  tabs?: string[];
  language?: string;
  children: ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  showStatus?: boolean;
  statusLine?: string;
  saved?: boolean;
}> = ({
  width,
  tab = "index.html",
  tabs,
  language = "HTML",
  children,
  style,
  bodyStyle,
  showStatus = true,
  statusLine = "Ln 4, Col 21",
  saved = true,
}) => (
  <div
    style={{
      width,
      borderRadius: 24,
      background: "#14182E",
      border: "2px solid rgba(125,211,252,0.42)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.62), 0 0 60px rgba(59,130,246,0.28)",
      overflow: "hidden",
      direction: "ltr",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "16px 22px",
        background: "linear-gradient(90deg,#1B2140,#252C56)",
        borderBottom: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
      <div style={{ marginLeft: 12, display: "flex", gap: 6 }}>
        {(tabs ?? [tab]).map((name) => {
          const active = name === tab;
          const isCss = name.endsWith(".css");
          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 18px",
                borderRadius: 9,
                background: active ? "#14182E" : "rgba(255,255,255,0.05)",
                color: active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                fontFamily: MONO,
                fontSize: 22,
                borderTop: active
                  ? `2px solid ${isCss ? C_CYAN : C_ORANGE}`
                  : "2px solid transparent",
              }}
            >
              <span style={{ color: isCss ? C_CYAN : C_ORANGE, fontSize: 18 }}>
                {isCss ? "#" : "</>"}
              </span>
              {name}
              {active && !saved ? (
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#E2E8F0",
                    display: "inline-block",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginLeft: "auto",
          color: "rgba(255,255,255,0.42)",
          fontFamily: MONO,
          fontSize: 20,
          whiteSpace: "nowrap",
        }}
      >
        Visual Studio Code
      </div>
    </div>
    <div
      style={{
        position: "relative",
        padding: "22px 26px 24px",
        minHeight: 120,
        background:
          "linear-gradient(180deg, rgba(20,24,46,1) 0%, rgba(16,20,42,1) 100%)",
        ...bodyStyle,
      }}
    >
      {children}
    </div>
    {showStatus ? (
      <div
        style={{
          height: 34,
          background: "linear-gradient(90deg,#0B63C5,#2563EB)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "0 20px",
          color: "#fff",
          fontFamily: MONO,
          fontSize: 18,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span>◉ main*</span>
        <span>{statusLine}</span>
        <span>UTF-8</span>
        <span style={{ marginLeft: "auto" }}>
          {"{ }"} {language}
        </span>
      </div>
    ) : null}
  </div>
);

export const BrowserFrame: React.FC<{
  width: number;
  url?: string;
  children: ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}> = ({ width, url = "localhost:5500", children, style, bodyStyle }) => (
  <div
    style={{
      width,
      borderRadius: 24,
      background: "#F8FAFC",
      border: "2px solid rgba(255,255,255,0.72)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.58), 0 0 55px rgba(255,107,53,0.14)",
      overflow: "hidden",
      direction: "ltr",
      ...style,
    }}
  >
    <div
      style={{
        height: 54,
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "0 18px",
        background: "#E2E8F0",
        borderBottom: "1px solid #CBD5E1",
      }}
    >
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5F57" }} />
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FEBC2E" }} />
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#28C840" }} />
      <div
        style={{
          flex: 1,
          marginLeft: 8,
          padding: "7px 16px",
          borderRadius: 100,
          background: "#fff",
          color: "#334155",
          fontFamily: MONO,
          fontSize: 20,
          textAlign: "left",
        }}
      >
        🔒 {url}
      </div>
    </div>
    <div
      style={{
        position: "relative",
        background: "#FFFFFF",
        color: "#0F172A",
        direction: "rtl",
        ...bodyStyle,
      }}
    >
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Code rendering                                                      */
/* ------------------------------------------------------------------ */

export type Part = {
  t: string;
  c?: string;
  hl?: boolean;
  roundStart?: boolean;
  roundEnd?: boolean;
  dim?: boolean;
  style?: CSSProperties;
};

export type Line = {
  parts: Part[];
  dim?: boolean;
  active?: boolean;
  size?: number;
};

const partLen = (p: Part) => p.t.length;
const lineLen = (l: Line) => l.parts.reduce((a, p) => a + partLen(p), 0);
export const totalLen = (lines: Line[]) => lines.reduce((a, l) => a + lineLen(l), 0);

const revealParts = (parts: Part[], n: number): Part[] => {
  let left = n;
  const out: Part[] = [];
  for (const p of parts) {
    if (left <= 0) break;
    const take = Math.min(p.t.length, left);
    out.push({ ...p, t: p.t.slice(0, take) });
    left -= take;
  }
  return out;
};

export const CodeBlock: React.FC<{
  lines: Line[];
  fontSize?: number;
  lineHeight?: number;
  typed?: number;
  caret?: boolean;
  lineNumbers?: boolean;
  startLine?: number;
  style?: CSSProperties;
  dimUnwritten?: boolean;
}> = ({
  lines,
  fontSize = 30,
  lineHeight,
  typed,
  caret = false,
  lineNumbers = true,
  startLine = 1,
  style,
  dimUnwritten = false,
}) => {
  const frame = useCurrentFrame();
  const lh = lineHeight ?? Math.round(fontSize * 1.62);
  let left = typed ?? Infinity;
  let caretLine = -1;

  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize,
        lineHeight: `${lh}px`,
        direction: "ltr",
        textAlign: "left",
        color: T_PLAIN,
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const len = lineLen(line);
        let parts: Part[] = line.parts;
        let showCaret = false;
        if (typed !== undefined) {
          if (left <= 0) {
            parts = [];
            if (dimUnwritten) return null;
          } else if (left < len) {
            parts = revealParts(line.parts, left);
            caretLine = i;
            showCaret = true;
            left = 0;
          } else {
            left -= len;
          }
        }
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              background: line.active ? "rgba(125,211,252,0.07)" : undefined,
              borderLeft: line.active ? `3px solid ${C_CYAN}` : "3px solid transparent",
              opacity: line.dim ? 0.32 : 1,
            }}
          >
            {lineNumbers ? (
              <div
                style={{
                  width: 52,
                  flexShrink: 0,
                  paddingRight: 16,
                  textAlign: "right",
                  color: i === caretLine ? C_CYAN : "#4B5563",
                  fontSize: fontSize * 0.8,
                  userSelect: "none",
                }}
              >
                {startLine + i}
              </div>
            ) : null}
            <div style={{ whiteSpace: "pre", minHeight: lh }}>
              {parts.map((p, j) => (
                <span
                  key={j}
                  style={{
                    color: p.c ?? T_PLAIN,
                    background: p.hl ? "rgba(255,107,53,0.22)" : undefined,
                    boxShadow: p.hl ? "inset 0 -3px 0 rgba(255,107,53,0.9)" : undefined,
                    borderRadius: p.hl
                      ? `${p.roundStart ? 8 : 0}px ${p.roundEnd ? 8 : 0}px ${
                          p.roundEnd ? 8 : 0
                        }px ${p.roundStart ? 8 : 0}px`
                      : undefined,
                    padding: p.hl ? "2px 0" : undefined,
                    opacity: p.dim ? 0.45 : 1,
                    ...p.style,
                  }}
                >
                  {p.t}
                </span>
              ))}
              {showCaret ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: fontSize * 1.05,
                    marginLeft: 2,
                    verticalAlign: "-4px",
                    background: frame % 30 < 19 ? C_CYAN : "transparent",
                  }}
                />
              ) : null}
              {caret && line.active && !showCaret ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: fontSize * 1.05,
                    marginLeft: 2,
                    verticalAlign: "-4px",
                    background: frame % 30 < 19 ? C_CYAN : "transparent",
                  }}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Character width of Consolas-like mono at a given size. */
export const charW = (fontSize: number) => fontSize * 0.55;

/* ------------------------------------------------------------------ */
/* Effects                                                             */
/* ------------------------------------------------------------------ */

const Star: React.FC<{ size: number; color: string; style?: CSSProperties }> = ({
  size,
  color,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ display: "block", filter: `drop-shadow(0 0 10px ${color})`, ...style }}
  >
    <path
      d="M20 0 C22 13 27 18 40 20 C27 22 22 27 20 40 C18 27 13 22 0 20 C13 18 18 13 20 0Z"
      fill={color}
    />
  </svg>
);

export const SparkleBurst: React.FC<{
  start: number;
  x: number;
  y: number;
  count?: number;
  radius?: number;
  colors?: string[];
  duration?: number;
}> = ({
  start,
  x,
  y,
  count = 14,
  radius = 260,
  colors = [C_GOLD, C_CYAN, C_ORANGE, "#FFFFFF", C_PURPLE],
  duration = 28,
}) => {
  const frame = useCurrentFrame();
  if (frame < start) return null;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + rand(i + start) * 0.6;
        const dist = radius * (0.5 + rand(i * 3.7 + start) * 0.65);
        const delay = Math.floor(rand(i * 7.1 + start) * 8);
        const p = interpolate(frame, [start + delay, start + delay + duration], [0, 1], clamp);
        if (p <= 0 || p >= 1) return null;
        const size = (14 + rand(i * 4.4) * 22) * (1 - p * 0.45);
        const cx = x + Math.cos(angle) * dist * p;
        const cy = y + Math.sin(angle) * dist * p + p * p * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - size / 2,
              top: cy - size / 2,
              opacity: 1 - p,
              transform: `scale(${1.1 - p * 0.5}) rotate(${p * 120}deg)`,
              zIndex: 70,
              pointerEvents: "none",
            }}
          >
            <Star size={size} color={colors[i % colors.length]} />
          </div>
        );
      })}
    </>
  );
};

export const Twinkles: React.FC<{
  count?: number;
  seed?: number;
  colors?: string[];
  box?: { x: number; y: number; w: number; h: number };
}> = ({
  count = 16,
  seed = 0,
  colors = [C_GOLD, C_CYAN, C_PURPLE, C_ORANGE],
  box,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const b = box ?? { x: 50, y: 140, w: 980, h: 1640 };
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const k = i + seed * 31;
        const size = 7 + rand(k * 2.9) * 14;
        const tw = 0.2 + 0.8 * Math.abs(Math.sin(t * 2.4 + i * 0.8));
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x + rand(k * 4.7) * b.w,
              top: b.y + rand(k * 8.3) * b.h + Math.sin(t * 1.2 + i) * 18,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity: tw * 0.75,
              boxShadow: `0 0 ${size * 2.4}px ${c}`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

