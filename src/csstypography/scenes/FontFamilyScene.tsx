import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import {
  C_CYAN,
  C_GOLD,
  C_PURPLE,
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
import { GoogleFontsBadge, SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE: Line[] = [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L(
    [
      p("  font-family", T_PROP),
      p(": ", T_PLAIN),
      p("'Cairo', sans-serif", T_VAL),
      p(";", T_PLAIN),
    ],
    true,
  ),
  L([p("}", T_PLAIN)]),
];

/** 15-25s: font-family — a plain system font becomes the Cairo font. */
export const FontFamilyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 4, 14, 140);
  const preview = popAt(frame, fps, 12, 14, 140);
  const pillIn = popAt(frame, fps, 168);
  const badge = popAt(frame, fps, 182);

  const typed =
    frame < 68
      ? Math.floor(interpolate(frame, [8, 68], [0, totalLen(CODE)], clamp))
      : Infinity;

  /* dramatic morph: system font → Cairo */
  const morph = interpolate(frame, [118, 158], [0, 1], clamp);
  const flash = interpolate(frame, [118, 125, 146], [0, 0.85, 0], clamp);
  const afterScale = interpolate(frame, [118, 140, 162], [1, 1.14, 1.06], clamp);

  return (
    <SceneShell seed={3}>
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
        <NotePill color={C_PURPLE} fontSize={56}>
          <K color="#FFFFFF">font-family</K> = نوع الخط 🔤
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
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 32">
          <CodeBlock lines={CODE} fontSize={38} lineHeight={64} typed={typed} caret />
        </EditorFrame>
      </div>

      {/* live preview: plain → Cairo */}
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
          boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${30 + morph * (30 + glow * 30)}px rgba(168,85,247,${0.1 + morph * 0.4})`,
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
          {/* before: plain system font */}
          <span
            style={{
              position: "absolute",
              fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
              fontSize: 92,
              fontWeight: 400,
              color: "#475569",
              opacity: 1 - morph,
              whiteSpace: "nowrap",
            }}
          >
            مرحباً بكم في موقعنا
          </span>
          {/* after: modern Cairo font */}
          <span
            style={{
              position: "absolute",
              fontFamily: FONT,
              fontSize: 92,
              fontWeight: 900,
              background: "linear-gradient(90deg,#1E3A8A 0%,#A855F7 55%,#FF6B35 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: morph,
              transform: `scale(${afterScale})`,
              filter: `drop-shadow(0 6px 22px rgba(168,85,247,${0.25 + glow * 0.3}))`,
              whiteSpace: "nowrap",
            }}
          >
            مرحباً بكم في موقعنا
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

      {/* pill */}
      <div
        style={{
          position: "absolute",
          top: 1170,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, pillIn),
          transform: `translateY(${(1 - pillIn) * 30}px)`,
        }}
      >
        <NotePill color={C_CYAN} fontSize={46}>
          🌐 <K color="#FFFFFF">fonts.google.com</K>
        </NotePill>
      </div>

      {/* Google Fonts logo + FREE badge */}
      <div
        style={{
          position: "absolute",
          top: 1340,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, badge),
          transform: `scale(${0.7 + 0.3 * badge})`,
        }}
      >
        <GoogleFontsBadge />
      </div>

      <SparkleBurst start={118} x={540} y={875} count={24} radius={380} duration={34} />
      <SparkleBurst start={182} x={540} y={1400} count={16} radius={300} duration={28} colors={[C_GOLD, "#FFFFFF", C_CYAN]} />
    </SceneShell>
  );
};
