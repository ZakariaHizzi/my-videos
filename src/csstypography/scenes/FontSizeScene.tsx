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
import { SceneShell, UnitChip } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const codeFor = (size: number): Line[] => [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L(
    [
      p("  font-size", T_PROP),
      p(": ", T_PLAIN),
      p(`${size}px`, T_VAL),
      p(";", T_PLAIN),
    ],
    true,
  ),
  L([p("}", T_PLAIN)]),
];

const BASE = codeFor(32);

const UNITS = [
  { unit: "px", desc: "بكسل", color: C_CYAN },
  { unit: "em", desc: "نسبي للعنصر", color: C_PURPLE },
  { unit: "rem", desc: "نسبي للجذر", color: C_RED },
];

/** 6-15s: font-size — the title grows 32px → 48px → 64px. */
export const FontSizeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);
  const vals = popAt(frame, fps, 66);

  const typed =
    frame < 58
      ? Math.floor(interpolate(frame, [8, 58], [0, totalLen(BASE)], clamp))
      : Infinity;

  /* the text grows gradually: 32 → 48 → 64 */
  const size = interpolate(frame, [58, 95, 113, 145, 163], [32, 32, 48, 48, 64], clamp);
  const shown = frame < 95 ? 32 : frame < 145 ? 48 : 64;
  const f1 = interpolate(frame, [95, 101, 122], [0, 0.8, 0], clamp);
  const f2 = interpolate(frame, [145, 151, 172], [0, 0.8, 0], clamp);

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
        <NotePill color={C_CYAN} fontSize={56}>
          <K color="#FFFFFF">font-size</K> = حجم الخط 📏
        </NotePill>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 290,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 15">
          <CodeBlock lines={codeFor(shown)} fontSize={42} lineHeight={68} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: the title gets bigger */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 650,
          width: 900,
          height: 450,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + glow * 30}px rgba(34,211,238,${0.1 + (size - 32) / 32 * 0.3})`,
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
              fontSize: size * 2.4,
              fontWeight: 900,
              color: "#1E3A8A",
              lineHeight: 1.1,
              textShadow: `0 6px 30px rgba(30,58,138,${0.18 + glow * 0.14})`,
              whiteSpace: "nowrap",
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
            opacity: Math.max(f1, f2),
            pointerEvents: "none",
          }}
        />
      </div>

      {/* values pill */}
      <div
        style={{
          position: "absolute",
          top: 1170,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, vals),
          transform: `translateY(${(1 - vals) * 30}px)`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={48}>
          <K color={C_GOLD}>32px, 48px, 64px</K>
        </NotePill>
      </div>

      {/* unit badges */}
      <div
        style={{
          position: "absolute",
          top: 1340,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {UNITS.map((u, i) => {
          const s = popAt(frame, fps, 196 + i * 14);
          return (
            <div
              key={u.unit}
              style={{
                opacity: Math.min(1, s),
                transform: `translateY(${(1 - s) * 40}px) scale(${0.7 + 0.3 * s})`,
              }}
            >
              <UnitChip unit={u.unit} desc={u.desc} color={u.color} />
            </div>
          );
        })}
      </div>

      <SparkleBurst start={95} x={540} y={875} count={18} radius={300} duration={30} />
      <SparkleBurst start={145} x={540} y={875} count={22} radius={360} duration={32} />
    </SceneShell>
  );
};
