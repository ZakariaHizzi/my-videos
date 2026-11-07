import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C_CYAN,
  C_GOLD,
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
import { Ruler, SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const codeFor = (value: string): Line[] => [
  L([p(".", T_SEL), p("paragraph", T_SEL), p(" {", T_PLAIN)]),
  L(
    [
      p("  line-height", T_PROP),
      p(": ", T_PLAIN),
      p(value, T_VAL),
      p(";", T_PLAIN),
    ],
    true,
  ),
  L([p("}", T_PLAIN)]),
];

const BASE = codeFor("1.6");

const PARA = [
  "الخط الجميل يجعل القراءة أسهل بكثير.",
  "المسافة المريحة بين الأسطر تريح العين.",
  "تقدر تغيّرها بسهولة بخاصية line-height.",
  "جرّب القيم المختلفة بنفسك الآن!",
];

const FS = 34;
const BAND_GAP = 5;

/** 42-50s: line-height — the gaps between the lines open and close. */
export const LineHeightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);
  const rulerIn = popAt(frame, fps, 64);
  const pillIn = popAt(frame, fps, 66);

  const typed =
    frame < 58
      ? Math.floor(interpolate(frame, [8, 58], [0, totalLen(BASE)], clamp))
      : Infinity;

  /* 1.6 → 1 → 1.5 → 2 → 1.6 */
  const lh = interpolate(
    frame,
    [58, 94, 98, 128, 132, 162, 166, 196, 200, 230],
    [1.6, 1.6, 1, 1, 1.5, 1.5, 2, 2, 1.6, 1.6],
    clamp,
  );
  const label =
    frame < 96 ? "1.6" : frame < 130 ? "1" : frame < 164 ? "1.5" : frame < 198 ? "2" : "1.6";

  const blockH = PARA.length * FS * lh + (PARA.length - 1) * BAND_GAP;
  const rulerH = blockH + 24;

  return (
    <SceneShell seed={6}>
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
          <K color="#FFFFFF">line-height</K> = ارتفاع السطر 📐
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
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 16">
          <CodeBlock lines={codeFor(label)} fontSize={42} lineHeight={68} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: paragraph + ruler */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 640,
          width: 900,
          height: 470,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + glow * 30}px rgba(34,211,238,0.18)`,
          overflow: "hidden",
          opacity: Math.min(1, preview),
          transform: `scale(${0.92 + 0.08 * preview})`,
        }}
      >
        {/* text lines with visible line boxes */}
        <div
          style={{
            position: "absolute",
            left: 40,
            top: (470 - blockH) / 2,
            width: 718,
          }}
        >
          {PARA.map((line, i) => (
            <div
              key={i}
              style={{
                height: FS * lh,
                display: "flex",
                alignItems: "center",
                borderRadius: 8,
                background:
                  i % 2 === 0
                    ? "rgba(30,58,138,0.08)"
                    : "rgba(168,85,247,0.08)",
                marginBottom: i < PARA.length - 1 ? BAND_GAP : 0,
              }}
            >
              <span
                style={{
                  fontSize: FS,
                  fontWeight: 700,
                  color: "#1E3A8A",
                  whiteSpace: "nowrap",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* ruler */}
        <div
          style={{
            position: "absolute",
            left: 816,
            top: (470 - rulerH) / 2,
            opacity: Math.min(1, rulerIn),
            transform: `translateX(${(1 - rulerIn) * 60}px)`,
          }}
        >
          <Ruler height={rulerH} label={String(Math.round(lh * 10) / 10)} />
        </div>
      </div>

      {/* comfort pill */}
      <div
        style={{
          position: "absolute",
          top: 1190,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, pillIn),
          transform: `translateY(${(1 - pillIn) * 30}px)`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={46}>
          <K color={C_GOLD}>1.5</K> أو <K color={C_GOLD}>1.6</K> = مريح 👌
        </NotePill>
      </div>

      <SparkleBurst start={98} x={540} y={875} count={16} radius={300} duration={28} />
      <SparkleBurst start={166} x={540} y={875} count={20} radius={360} duration={30} colors={[C_CYAN, C_GOLD, "#FFFFFF"]} />
    </SceneShell>
  );
};
