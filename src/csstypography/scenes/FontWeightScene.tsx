import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C_GOLD,
  C_ORANGE,
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
import { SceneShell, WeightSlider } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const codeFor = (value: string): Line[] => [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L(
    [
      p("  font-weight", T_PROP),
      p(": ", T_PLAIN),
      p(value, T_VAL),
      p(";", T_PLAIN),
    ],
    true,
  ),
  L([p("}", T_PLAIN)]),
];

const BASE = codeFor("bold");

/** 25-33s: font-weight — bold → normal → light, then a 100→900 sweep. */
export const FontWeightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);
  const sliderIn = popAt(frame, fps, 56);
  const pillIn = popAt(frame, fps, 66);

  const typed =
    frame < 58
      ? Math.floor(interpolate(frame, [8, 58], [0, totalLen(BASE)], clamp))
      : Infinity;

  /* keyword steps, then a full thin → thick sweep */
  let label: string;
  let value: number;
  if (frame < 90) {
    label = "bold";
    value = 700;
  } else if (frame < 120) {
    label = "normal";
    value = 400;
  } else if (frame < 150) {
    label = "300";
    value = 300;
  } else if (frame < 166) {
    value = interpolate(frame, [150, 166], [300, 100], clamp);
    label = String(Math.max(100, Math.round(value / 100) * 100));
  } else {
    value = interpolate(frame, [166, 226], [100, 900], clamp);
    label = String(Math.round(value / 100) * 100);
  }

  const renderWeight = Math.max(200, Math.min(900, Math.round(value / 100) * 100));
  const heavy = renderWeight >= 800;

  return (
    <SceneShell seed={4}>
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
        <NotePill color={C_ORANGE} fontSize={56}>
          <K color="#FFFFFF">font-weight</K> = سمك الخط 💪
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
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 17">
          <CodeBlock lines={codeFor(label)} fontSize={42} lineHeight={68} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: the same word at different thickness */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 650,
          width: 900,
          height: 400,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + glow * 30}px rgba(255,107,53,${0.12 + (renderWeight - 200) / 700 * 0.3})`,
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
              fontSize: 132,
              fontWeight: renderWeight,
              color: "#1E3A8A",
              lineHeight: 1.1,
              textShadow: heavy
                ? `0 6px 34px rgba(255,107,53,${0.3 + glow * 0.3})`
                : "0 4px 18px rgba(30,58,138,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            خط عريض
          </span>
        </div>
      </div>

      {/* weight slider 100 → 900 */}
      <div
        style={{
          position: "absolute",
          top: 1180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, sliderIn),
          transform: `translateY(${(1 - sliderIn) * 30}px)`,
        }}
      >
        <WeightSlider value={value} width={940} />
      </div>

      {/* summary pill */}
      <div
        style={{
          position: "absolute",
          top: 1470,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, pillIn),
          transform: `translateY(${(1 - pillIn) * 30}px)`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={46}>
          <K color={C_GOLD}>normal, bold, 900</K>
        </NotePill>
      </div>

      <SparkleBurst start={90} x={540} y={850} count={18} radius={320} duration={30} />
      <SparkleBurst start={166} x={540} y={1285} count={20} radius={380} duration={32} colors={[C_ORANGE, C_GOLD, "#FFFFFF"]} />
    </SceneShell>
  );
};
