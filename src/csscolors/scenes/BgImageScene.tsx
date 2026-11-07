import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
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
import { MONO } from "../../vscode/theme";
import { HeroArt, SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE: Line[] = [
  L([p(".", T_SEL), p("hero", T_SEL), p(" {", T_PLAIN)]),
  L([p("  background-image", T_PROP), p(": ", T_PLAIN), p("url('bg.jpg')", T_VAL), p(";", T_PLAIN)]),
  L([p("  background-size", T_PROP), p(": ", T_PLAIN), p("cover", T_VAL), p(";", T_PLAIN)]),
  L([p("}", T_PLAIN)]),
];

const BOX_W = 940;
const BOX_H = 620;
const ART_AR = 16 / 9;

export const BgImageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 6, 14, 140);
  const heroIn = popAt(frame, fps, 16, 14, 140);
  const sub = popAt(frame, fps, 136);

  const typed = Math.min(
    totalLen(CODE),
    Math.floor(interpolate(frame, [4, 76], [0, totalLen(CODE)], clamp)),
  );

  /* natural (contained) size -> cover: fills the whole box and crops */
  const cover = interpolate(frame, [92, 152], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const containH = BOX_W / ART_AR;
  const coverW = BOX_H * ART_AR;
  const w = BOX_W + (coverW - BOX_W) * cover;
  const h = containH + (BOX_H - containH) * cover;

  /* camera zoom once the image covers everything */
  const zoom = interpolate(frame, [178, 240], [1, 1.14], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SceneShell seed={5}>
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 126,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, head),
          transform: `scale(${0.78 + 0.22 * head})`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={54}>
          <K color="#FFFFFF">background-image</K> = صورة 🖼️
        </NotePill>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 282,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 3, Col 22">
          <CodeBlock lines={CODE} fontSize={36} lineHeight={60} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* hero element */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 700,
          width: BOX_W,
          height: BOX_H,
          opacity: Math.min(1, heroIn),
          transform: `scale(${(0.94 + 0.06 * heroIn) * zoom})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 28,
            overflow: "hidden",
            background: "#0B1224",
            border: "3px solid rgba(255,255,255,0.55)",
            boxShadow: `0 34px 80px rgba(0,0,0,0.55), 0 0 ${28 + glow * 30}px rgba(255,215,0,${0.12 + cover * 0.3})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: (BOX_W - w) / 2,
              top: (BOX_H - h) / 2,
              width: w,
              height: h,
              overflow: "hidden",
            }}
          >
            <HeroArt />
          </div>
          {cover < 0.06 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.75)",
                fontFamily: MONO,
                fontSize: 30,
                direction: "ltr",
                background: "rgba(11,18,36,0.35)",
              }}
            >
              bg.jpg
            </div>
          ) : null}
        </div>
      </div>

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 1450,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, sub),
          transform: `translateY(${(1 - sub) * 30}px)`,
        }}
      >
        <NotePill color="#22D3EE" fontSize={44}>
          <K color="#22D3EE">background-size: cover</K> = تملأ الكل
        </NotePill>
      </div>

      <SparkleBurst start={92} x={540} y={1010} count={22} radius={360} duration={34} />
    </SceneShell>
  );
};
