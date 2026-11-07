import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C_CYAN,
  C_GOLD,
  CodeBlock,
  EditorFrame,
  K,
  NotePill,
  T_PLAIN,
  T_PROP,
  T_SEL,
  T_VAL,
  clamp,
  popAt,
  totalLen,
} from "../../css/parts";
import type { Line, Part } from "../../css/parts";
import { OpacitySlider, SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE: Line[] = [
  L([p(".", T_SEL), p("badge", T_SEL), p(" {", T_PLAIN)]),
  L([
    p("  opacity", T_PROP),
    p(": ", T_PLAIN),
    p("0.7", T_VAL),
    p(";", T_PLAIN),
  ]),
  L([p("}", T_PLAIN)]),
];

export const OpacityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 6, 14, 140);
  const stage = popAt(frame, fps, 30, 14, 140);
  const sliderIn = popAt(frame, fps, 56);
  const labL = popAt(frame, fps, 70);
  const labR = popAt(frame, fps, 78);

  const typed = Math.min(
    totalLen(CODE),
    Math.floor(interpolate(frame, [4, 52], [0, totalLen(CODE)], clamp)),
  );

  /* sweep the full range, then settle on the coded value */
  const value = interpolate(frame, [64, 86, 110, 138], [1, 0, 1, 0.7], clamp);
  const elementIn = interpolate(frame, [60, 68], [0, 1], clamp);

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
        <NotePill color={C_GOLD} fontSize={58}>
          <K color="#FFFFFF">opacity</K> = شفافية 👻
        </NotePill>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 300,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame
          width={940}
          tab="style.css"
          language="CSS"
          statusLine="Ln 2, Col 14"
        >
          <CodeBlock
            lines={CODE}
            fontSize={40}
            lineHeight={66}
            typed={typed}
            caret
          />
        </EditorFrame>
      </div>

      {/* preview: striped backdrop + element that turns transparent */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 760,
          width: 840,
          height: 400,
          borderRadius: 28,
          overflow: "hidden",
          border: "3px solid rgba(255,255,255,0.5)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
          opacity: Math.min(1, stage),
          transform: `scale(${0.92 + 0.08 * stage})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(45deg,#F97316 0 60px,#A855F7 60px 120px,#22D3EE 120px 180px,#FFD700 180px 240px)",
          }}
        />
        {/* element bounds always visible */}
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 70,
            width: 600,
            height: 260,
            borderRadius: 24,
            border: "4px dashed rgba(255,255,255,0.85)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 70,
            width: 600,
            height: 260,
            borderRadius: 24,
            background: "linear-gradient(135deg,#0EA5E9,#2563EB)",
            boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 ${20 + glow * 24}px rgba(34,211,238,0.6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 900,
            opacity: value * elementIn,
          }}
        >
          بطاقة
        </div>
      </div>

      {/* slider */}
      <div
        style={{
          position: "absolute",
          top: 1310,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, sliderIn),
          transform: `translateY(${(1 - sliderIn) * 30}px)`,
        }}
      >
        <OpacitySlider value={value} width={880} />
      </div>

      {/* range labels */}
      <div
        style={{
          position: "absolute",
          top: 1470,
          left: 100,
          width: 380,
          display: "flex",
          justifyContent: "flex-start",
          opacity: Math.min(1, labL),
        }}
      >
        <NotePill color={C_CYAN} fontSize={42}>
          0 = شفاف
        </NotePill>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1470,
          right: 100,
          width: 380,
          display: "flex",
          justifyContent: "flex-end",
          opacity: Math.min(1, labR),
        }}
      >
        <NotePill color={C_GOLD} fontSize={42}>
          1 = كامل
        </NotePill>
      </div>
    </SceneShell>
  );
};
