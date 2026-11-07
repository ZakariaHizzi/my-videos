import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp, pop } from "../../theme";
import { ClickRipple, CopyPanel, MouseCursor } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN = { x: 70, y: 470, w: 940, h: 1180 };
const CODE_X = 78;
const LINE_H = 84;

const KW = "#C586C0";
const ID = "#9CDCFE";
const STR = "#CE9178";
const FN = "#DCDCAA";
const OP = "#D4D4D4";

const CODE: { t: string; c: string }[][] = [
  [{ t: "const", c: KW }, { t: " lang", c: ID }, { t: " = ", c: OP }, { t: '"js"', c: STR }, { t: ";", c: OP }],
  [{ t: "let", c: KW }, { t: " mode", c: ID }, { t: " = ", c: OP }, { t: '"auto"', c: STR }, { t: ";", c: OP }],
  [],
  [{ t: "function", c: KW }, { t: " hi", c: FN }, { t: "() {", c: OP }],
  [{ t: "  return", c: KW }, { t: " ", c: OP }, { t: '"Hello"', c: STR }, { t: ";", c: OP }],
  [{ t: "}", c: OP }],
];

const LANGS = [
  { name: "JavaScript", color: "#F7DF1E", glyph: "JS" },
  { name: "TypeScript", color: "#3178C6", glyph: "TS" },
  { name: "Python", color: "#3776AB", glyph: "Py" },
  { name: "HTML", color: "#E44D26", glyph: "<>" },
  { name: "CSS", color: "#264DE4", glyph: "{}" },
  { name: "JSON", color: "#CBCB41", glyph: "[]" },
];

const DROP = { x: 60, w: 560, rows: 6, header: 68, row: 72 };
const DROP_H = DROP.header + DROP.rows * DROP.row;
const DROP_TOP = WIN.h - 38 - 24 - DROP_H;
const PY_ROW = 2;

const cursorAt = (f: number) => ({
  x: interpolate(
    f,
    [0, 28, 70, 92, 122, 140, 166],
    [520, 520, 868, 868, 150, 150, 878],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  ),
  y: interpolate(
    f,
    [0, 28, 70, 92, 122, 140, 166],
    [300, 300, 1156, 1156, 866, 866, 1152],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  ),
});

/** 29.6-35.2s: overriding the detected language from the status bar. */
export const ManualScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const win = pop(frame, fps, 0);
  const headline = fadeUp(frame, 4, 22);
  const arrowIn = pop(frame, fps, 26);
  const arrowOut = interpolate(frame, [158, 174], [1, 0.85], clamp);
  const bounce = Math.sin(t * 4.6) * 16;

  const open = interpolate(frame, [72, 88], [0, 1], clamp);
  const close = interpolate(frame, [136, 150], [1, 0], clamp);
  const list = open * close;
  const hover = frame < 112 ? 0 : PY_ROW;
  const switched = frame >= 138;
  const flash = interpolate(frame, [138, 168], [1, 0], clamp);
  const langColor = switched ? "#4ADE80" : "#FFFFFF";

  const c = cursorAt(frame);
  const at = (f: number) => ({ frame, at: f, ...cursorAt(f) });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 85% 55% at 50% 60%, rgba(30,58,138,0.5) 0%, transparent 72%)",
      }}
    >
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 60,
          right: 60,
          zIndex: 20,
          opacity: headline.opacity,
          transform: headline.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(74,222,128,0.5)", padding: "26px 34px" }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>
            غيّرها{" "}
            <span
              style={{
                color: "#052E16",
                background: "linear-gradient(180deg,#86EFAC,#4ADE80)",
                padding: "4px 18px",
                borderRadius: 14,
                boxShadow: "0 0 34px rgba(74,222,128,0.75)",
              }}
            >
              يدوياً
            </span>{" "}
            من الأسفل 👇
          </div>
        </CopyPanel>
      </div>

      {/* ---------- window ---------- */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 24,
          overflow: "hidden",
          background: "#14182E",
          border: "2px solid rgba(74,222,128,0.4)",
          boxShadow: "0 44px 110px rgba(0,0,0,0.7), 0 0 90px rgba(34,197,94,0.25)",
          direction: "ltr",
          transformOrigin: "50% 50%",
          scale: `${0.92 + 0.08 * win}`,
          opacity: Math.min(1, win),
        }}
      >
        {/* title bar */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 58,
            background: "linear-gradient(90deg,#1B2140,#232A52)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 22px",
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
          <div
            style={{
              marginLeft: 12,
              padding: "7px 20px",
              borderRadius: 9,
              background: "rgba(255,255,255,0.1)",
              color: "#F7DF1E",
              fontFamily: MONO,
              fontSize: 22,
            }}
          >
            notes.js
          </div>
          <div
            style={{
              marginLeft: "auto",
              color: "rgba(255,255,255,0.45)",
              fontFamily: MONO,
              fontSize: 21,
            }}
          >
            Visual Studio Code
          </div>
        </div>

        {/* code */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
            fontFamily: MONO,
            fontSize: 46,
            lineHeight: `${LINE_H}px`,
            whiteSpace: "pre",
            direction: "ltr",
            textAlign: "left",
          }}
        >
          {CODE.map((line, i) => (
            <div key={i} style={{ display: "flex", height: LINE_H, alignItems: "center" }}>
              <span
                style={{
                  width: CODE_X - 18,
                  textAlign: "right",
                  color: "#5C6478",
                  fontSize: 40,
                  flexShrink: 0,
                  marginRight: 20,
                }}
              >
                {i + 1}
              </span>
              {line.map((p, j) => (
                <span key={j} style={{ color: p.c }}>
                  {p.t}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* language quick pick, anchored above the status bar */}
        <div
          style={{
            position: "absolute",
            left: DROP.x,
            top: DROP_TOP,
            width: DROP.w,
            borderRadius: 14,
            background: "#20253D",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 30px 70px rgba(0,0,0,0.75)",
            overflow: "hidden",
            opacity: list,
            transform: `translateY(${(1 - list) * 40}px) scale(${0.9 + 0.1 * list})`,
            transformOrigin: "50% 100%",
            display: list > 0.01 ? "block" : "none",
            zIndex: 30,
          }}
        >
          <div
            style={{
              height: DROP.header,
              display: "flex",
              alignItems: "center",
              padding: "0 22px",
              gap: 14,
              borderBottom: "1px solid rgba(255,255,255,0.14)",
              background: "#1A1F35",
            }}
          >
            <span style={{ color: "#9CDCFE", fontSize: 30 }}>⌕</span>
            <span style={{ color: "#E6EDF3", fontSize: 30, fontFamily: FONT, fontWeight: 700 }}>
              Select Language Mode
            </span>
          </div>
          {LANGS.map((l, i) => (
            <div
              key={l.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                height: DROP.row,
                padding: "0 22px",
                background: hover === i ? "#264F78" : "transparent",
                fontFamily: MONO,
                fontSize: 32,
                direction: "ltr",
              }}
            >
              <span
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 9,
                  background: `${l.color}2E`,
                  border: `2px solid ${l.color}`,
                  color: l.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 21,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {l.glyph}
              </span>
              <span style={{ color: "#E6EDF3" }}>{l.name}</span>
              {i === 0 && !switched ? (
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#4ADE80",
                    fontSize: 26,
                    fontFamily: FONT,
                  }}
                >
                  ✓ current
                </span>
              ) : null}
              {i === PY_ROW && hover === PY_ROW ? (
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#7DD3FC",
                    fontSize: 26,
                    fontFamily: FONT,
                  }}
                >
                  ↵
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* status bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 38,
            background: "linear-gradient(90deg,#0B63C5,#2563EB)",
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 20px",
            color: "#fff",
            fontFamily: MONO,
            fontSize: 20,
            zIndex: 25,
          }}
        >
          <span>◀ main</span>
          <span>Ln 1, Col 7</span>
          <span>UTF-8</span>
          <span style={{ marginLeft: "auto", color: langColor, fontWeight: 700 }}>
            {"{}"} {switched ? "Python" : "JavaScript"}
          </span>
        </div>

        <MouseCursor x={c.x} y={c.y} size={54} />
        <ClickRipple {...at(70)} color="#4ADE80" />
        <ClickRipple {...at(134)} color="#4ADE80" />
      </div>

      {/* ---------- callout arrow ---------- */}
      <div
        style={{
          position: "absolute",
          left: WIN.x + 792,
          top: WIN.y + 918 + bounce,
          zIndex: 45,
          opacity: Math.min(1, arrowIn) * arrowOut,
          transform: `scale(${arrowIn})`,
          transformOrigin: "50% 0%",
          filter: "drop-shadow(0 0 26px rgba(255,215,0,0.85))",
        }}
      >
        <svg width={112} height={200} viewBox="0 0 64 112" style={{ display: "block" }}>
          <path
            d="M32 6 V72"
            stroke={COLORS.gold}
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M11 56 L32 82 L53 56"
            stroke={COLORS.gold}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ring around the status bar language label */}
      <div
        style={{
          position: "absolute",
          left: WIN.x + 766,
          top: WIN.y + WIN.h - 36,
          width: 164,
          height: 34,
          borderRadius: 8,
          border: `3px solid ${switched ? "#4ADE80" : COLORS.gold}`,
          boxShadow: `0 0 ${
            20 + (switched ? flash : 0.5 + 0.5 * Math.sin(t * 4)) * 40
          }px ${switched ? "rgba(74,222,128,0.9)" : "rgba(255,215,0,0.8)"}`,
          zIndex: 46,
          opacity: interpolate(frame, [56, 72], [0, 1], clamp),
        }}
      />

      {/* success toast after the switch */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: WIN.y + WIN.h + 46,
          zIndex: 40,
          opacity: interpolate(frame, [142, 154, 166, 174], [0, 1, 1, 0], clamp),
          transform: `translateY(${
            (1 - interpolate(frame, [142, 154], [0, 1], clamp)) * 30
          }px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            padding: "20px 44px",
            borderRadius: 100,
            background: "rgba(6,40,24,0.92)",
            border: "3px solid #4ADE80",
            boxShadow: "0 0 46px rgba(74,222,128,0.55)",
            fontFamily: FONT,
            fontSize: 46,
            fontWeight: 900,
            color: "#BBF7D0",
            direction: "ltr",
          }}
        >
          <span style={{ fontSize: 44 }}>✅</span>
          <span>Python mode enabled</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
