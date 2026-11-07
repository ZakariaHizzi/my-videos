import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
import { SceneShell } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE: Line[] = [
  L([p(".", T_SEL), p("card", T_SEL), p(" {", T_PLAIN)]),
  L([
    p("  background-color", T_PROP),
    p(": ", T_PLAIN),
    p("#3498db", T_VAL),
    p(";", T_PLAIN),
  ]),
  L([
    p("  color", T_PROP),
    p(": ", T_PLAIN),
    p("white", T_VAL),
    p(";", T_PLAIN),
  ]),
  L([p("}", T_PLAIN)]),
];

export const BgColorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 5);

  const head = popAt(frame, fps, 2);
  const editor = popAt(frame, fps, 8, 14, 140);
  const card = popAt(frame, fps, 18, 14, 140);
  const tip = popAt(frame, fps, 150);

  const typed = Math.min(
    totalLen(CODE),
    Math.floor(interpolate(frame, [6, 62], [0, totalLen(CODE)], clamp)),
  );
  const fill = interpolate(frame, [80, 132], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const whiteIn = interpolate(frame, [116, 146], [0, 1], clamp);
  const flash = interpolate(frame, [80, 86, 104], [0, 0.75, 0], clamp);

  return (
    <SceneShell seed={3}>
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
        <NotePill color="#3498DB" fontSize={46}>
          <K color="#FFFFFF">background-color</K> = لون الخلفية 🎨
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
          statusLine="Ln 2, Col 24"
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

      {/* card that fills with color */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 790,
          width: 900,
          height: 480,
          borderRadius: 30,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: `0 34px 80px rgba(0,0,0,0.55), 0 0 ${30 + glow * 34}px rgba(52,152,219,${0.2 + fill * 0.4})`,
          overflow: "hidden",
          opacity: Math.min(1, card),
          transform: `scale(${0.92 + 0.08 * card})`,
        }}
      >
        {/* blue fill expanding from center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#3498DB",
            clipPath: `circle(${fill * 76}% at 50% 50%)`,
          }}
        />

        {/* content: dark text, then white text on top */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "54px 60px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              position: "relative",
              height: 84,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: "#0F172A",
                opacity: 1 - whiteIn,
              }}
            >
              عنوان الكارت
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: "#FFFFFF",
                opacity: whiteIn,
              }}
            >
              عنوان الكارت
            </span>
          </div>
          <div style={{ position: "relative", height: 22 }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                width: 640,
                height: 20,
                borderRadius: 10,
                background: "#E2E8F0",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 640 * fill,
                height: 20,
                borderRadius: 10,
                background: "rgba(255,255,255,0.75)",
              }}
            />
          </div>
          <div style={{ position: "relative", height: 22 }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                width: 500,
                height: 20,
                borderRadius: 10,
                background: "#E2E8F0",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 500 * fill,
                height: 20,
                borderRadius: 10,
                background: "rgba(255,255,255,0.55)",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 14,
              width: 260,
              height: 74,
              borderRadius: 16,
              background: "linear-gradient(90deg,#1D4ED8,#3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 34,
              fontWeight: 900,
              boxShadow: "0 10px 26px rgba(29,78,216,0.5)",
              opacity: fill,
            }}
          >
            اضغط هنا
          </div>
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

      {/* contrast tip */}
      <div
        style={{
          position: "absolute",
          top: 1420,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, tip),
          transform: `translateY(${(1 - tip) * 30}px) scale(${0.8 + 0.2 * tip})`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={46}>
          💡 خلفية غامقة ← نص فاتح
        </NotePill>
      </div>

      <SparkleBurst
        start={80}
        x={540}
        y={1030}
        count={22}
        radius={340}
        duration={32}
        colors={[C_CYAN, "#3498DB", "#FFFFFF"]}
      />
    </SceneShell>
  );
};
