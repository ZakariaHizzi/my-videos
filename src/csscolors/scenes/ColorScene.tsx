import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C_CYAN,
  C_GOLD,
  C_PURPLE,
  C_RED,
  CodeBlock,
  EditorFrame,
  K,
  NotePill,
  SparkleBurst,
  T_PLAIN,
  T_PROP,
  T_SEL,
  T_VAL,
  clamp,
  popAt,
  totalLen,
} from "../../css/parts";
import type { Line, Part } from "../../css/parts";
import { SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE: Line[] = [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L([p("  color", T_PROP), p(": ", T_PLAIN), p("#e74c3c", T_VAL), p(";", T_PLAIN)], true),
  L([p("}", T_PLAIN)]),
];

const ROWS = [
  { bullet: "•", code: "red", suffix: " (اسم)", color: C_RED },
  { bullet: "•", code: "#e74c3c", suffix: " (HEX)", color: C_CYAN },
  { bullet: "•", code: "rgb(231,76,60)", suffix: "", color: C_PURPLE },
];

export const ColorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const ways = popAt(frame, fps, 26);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);

  const typed = Math.min(
    totalLen(CODE),
    Math.floor(interpolate(frame, [8, 58], [0, totalLen(CODE)], clamp)),
  );
  const redIn = interpolate(frame, [95, 118], [0, 1], clamp);
  const flash = interpolate(frame, [95, 100, 120], [0, 0.85, 0], clamp);

  return (
    <SceneShell seed={2}>
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 128,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, head),
          transform: `scale(${0.78 + 0.22 * head})`,
        }}
      >
        <NotePill color={C_RED} fontSize={58}>
          <K color="#FFFFFF">color</K> = لون النص 🖌️
        </NotePill>
      </div>

      {/* 3 ways label */}
      <div
        style={{
          position: "absolute",
          top: 258,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, ways),
          transform: `translateY(${(1 - ways) * 26}px)`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={46}>
          3 طرق:
        </NotePill>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 388,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 17">
          <CodeBlock lines={CODE} fontSize={44} lineHeight={72} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: black -> red */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 780,
          width: 900,
          height: 330,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + glow * 30}px rgba(231,76,60,${0.15 + redIn * 0.35})`,
          overflow: "hidden",
          opacity: Math.min(1, preview),
          transform: `scale(${0.92 + 0.08 * preview})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              fontSize: 104,
              fontWeight: 900,
              color: "#111827",
              opacity: 1 - redIn,
            }}
          >
            عنوان جميل
          </span>
          <span
            style={{
              position: "absolute",
              fontSize: 104,
              fontWeight: 900,
              color: "#E74C3C",
              opacity: redIn,
              textShadow: `0 0 44px rgba(231,76,60,${0.35 + glow * 0.3})`,
            }}
          >
            عنوان جميل
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#FFFFFF",
            opacity: flash,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 3 formats */}
      <div
        style={{
          position: "absolute",
          top: 1190,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {ROWS.map((r, i) => {
          const s = popAt(frame, fps, 124 + i * 22);
          return (
            <div
              key={r.code}
              style={{
                opacity: Math.min(1, s),
                transform: `translateX(${(1 - s) * (i % 2 === 0 ? -70 : 70)}px) scale(${0.8 + 0.2 * s})`,
              }}
            >
              <NotePill color={r.color} fontSize={44}>
                {r.bullet} <K color={r.color}>{r.code}</K>
                {r.suffix}
              </NotePill>
            </div>
          );
        })}
      </div>

      <SparkleBurst start={95} x={540} y={945} count={22} radius={330} duration={32} />
    </SceneShell>
  );
};
