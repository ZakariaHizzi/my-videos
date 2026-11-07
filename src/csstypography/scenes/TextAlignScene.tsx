import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  C_CYAN,
  C_GOLD,
  C_GREEN,
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
import { AlignIcon, SceneShell } from "../parts";
import type { AlignType } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const codeFor = (value: string): Line[] => [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L(
    [
      p("  text-align", T_PROP),
      p(": ", T_PLAIN),
      p(value, T_VAL),
      p(";", T_PLAIN),
    ],
    true,
  ),
  L([p("}", T_PLAIN)]),
];

const BASE = codeFor("center");

const PHASES: { at: number; name: AlignType; x: number }[] = [
  { at: 58, name: "center", x: 80 },
  { at: 104, name: "left", x: 0 },
  { at: 150, name: "right", x: 160 },
  { at: 196, name: "justify", x: 0 },
];

const ICON_ORDER: AlignType[] = ["left", "center", "right", "justify"];

const TEXT =
  "المحاذاة تغيّر شكل النص تماماً وتجعله أسهل للقراءة. النص المنتظم يعطي انطباعاً احترافياً عن موقعك ويجرّب الزوار لقراءته.";

/** 33-42s: text-align — the block slides left / center / right / justify. */
export const TextAlignScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);
  const pillIn = popAt(frame, fps, 66);

  const typed =
    frame < 58
      ? Math.floor(interpolate(frame, [8, 58], [0, totalLen(BASE)], clamp))
      : Infinity;

  /* current alignment phase */
  let idx = 0;
  for (let i = 0; i < PHASES.length; i++) {
    if (frame >= PHASES[i].at) idx = i;
  }
  const cur = PHASES[idx];
  const prevX = idx > 0 ? PHASES[idx - 1].x : cur.x;
  const slideX = interpolate(frame, [cur.at, cur.at + 16], [prevX, cur.x], clamp);
  const blockW =
    cur.name === "justify"
      ? interpolate(frame, [196, 214], [660, 820], clamp)
      : 660;

  return (
    <SceneShell seed={5}>
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
        <NotePill color={C_GREEN} fontSize={56}>
          <K color="#FFFFFF">text-align</K> = المحاذاة 🎯
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
          <CodeBlock lines={codeFor(cur.name)} fontSize={42} lineHeight={68} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: the paragraph moves */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 640,
          width: 900,
          height: 430,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + glow * 30}px rgba(52,211,153,0.18)`,
          overflow: "hidden",
          opacity: Math.min(1, preview),
          transform: `scale(${0.92 + 0.08 * preview})`,
        }}
      >
        {/* center guide */}
        <div
          style={{
            position: "absolute",
            left: 448,
            top: 30,
            bottom: 30,
            width: 3,
            background:
              "repeating-linear-gradient(180deg, rgba(30,58,138,0.35) 0 14px, transparent 14px 26px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 70,
            width: blockW,
            transform: `translateX(${slideX}px)`,
            fontFamily: FONT,
            fontSize: 36,
            lineHeight: 1.65,
            fontWeight: 700,
            color: "#1E3A8A",
            textAlign: cur.name,
            textAlignLast: cur.name === "justify" ? "justify" : undefined,
          }}
        >
          {TEXT}
        </div>
      </div>

      {/* four alignment icons */}
      <div
        style={{
          position: "absolute",
          top: 1160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {ICON_ORDER.map((type, i) => {
          const s = popAt(frame, fps, 62 + i * 12);
          const active = cur.name === type;
          const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 5 + i);
          return (
            <div
              key={type}
              style={{
                width: 210,
                height: 190,
                borderRadius: 24,
                boxSizing: "border-box",
                background: "rgba(5,10,30,0.94)",
                border: `3px solid ${active ? C_GREEN : "rgba(255,255,255,0.25)"}`,
                boxShadow: active
                  ? `0 0 ${30 + pulse * 30}px ${C_GREEN}88, 0 16px 36px rgba(0,0,0,0.5)`
                  : "0 14px 32px rgba(0,0,0,0.45)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: Math.min(1, s),
                transform: `translateY(${(1 - s) * 40}px) scale(${0.75 + 0.25 * s})`,
              }}
            >
              <AlignIcon type={type} active={active} color={C_GREEN} />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 700,
                  color: active ? C_GREEN : "rgba(255,255,255,0.7)",
                  direction: "ltr",
                }}
              >
                {type}
              </div>
            </div>
          );
        })}
      </div>

      {/* summary pill */}
      <div
        style={{
          position: "absolute",
          top: 1440,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, pillIn),
          transform: `translateY(${(1 - pillIn) * 30}px)`,
        }}
      >
        <NotePill color={C_CYAN} fontSize={44}>
          <K color={C_GOLD}>left, center, right, justify</K>
        </NotePill>
      </div>

      <SparkleBurst start={104} x={540} y={855} count={16} radius={300} duration={28} />
      <SparkleBurst start={196} x={540} y={855} count={20} radius={360} duration={30} colors={[C_GREEN, C_GOLD, "#FFFFFF"]} />
    </SceneShell>
  );
};
