import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
import { MONO } from "../../vscode/theme";
import { ColorWheel, SceneShell, hslToHex } from "../parts";

const L = (parts: Part[], active?: boolean): Line => ({ parts, active });
const p = (t: string, c?: string): Part => ({ t, c });

const CODE_RED: Line[] = [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L([p("  color", T_PROP), p(": ", T_PLAIN), p("#e74c3c", T_VAL), p(";", T_PLAIN)]),
  L([p("}", T_PLAIN)]),
];
const CODE_GREEN: Line[] = [
  L([p(".", T_SEL), p("title", T_SEL), p(" {", T_PLAIN)]),
  L([p("  color", T_PROP), p(": ", T_PLAIN), p("#27ae60", T_VAL), p(";", T_PLAIN)]),
  L([p("}", T_PLAIN)]),
];
const BASE_LEN = ".title {".length + "  color: ".length;

export const HexScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.5 + 0.5 * Math.sin(t * 5);

  const head = popAt(frame, fps, 2);
  const sub = popAt(frame, fps, 16);
  const wheelIn = popAt(frame, fps, 6, 14, 140);
  const hexIn = popAt(frame, fps, 26);
  const editor = popAt(frame, fps, 168, 14, 140);
  const result = popAt(frame, fps, 196, 14, 140);
  const coolors = popAt(frame, fps, 322);

  /* wheel spins and lands on green */
  const angle = interpolate(frame, [8, 172], [0, 480], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const picked = hslToHex(((angle % 360) + 360) % 360, 100, 50);

  /* type the rule, then backspace the hex and retype a new one */
  const redLen = totalLen(CODE_RED);
  const greenLen = totalLen(CODE_GREEN);
  const typedRed =
    frame < 248
      ? Math.min(redLen, Math.floor(interpolate(frame, [176, 224], [0, redLen], clamp)))
      : Math.max(BASE_LEN, Math.floor(interpolate(frame, [248, 264], [redLen, BASE_LEN], clamp)));
  const typedGreen = Math.floor(interpolate(frame, [264, 300], [BASE_LEN, greenLen], clamp));

  const greenIn = interpolate(frame, [292, 316], [0, 1], clamp);
  const flash = interpolate(frame, [292, 297, 316], [0, 0.8, 0], clamp);

  return (
    <SceneShell seed={4}>
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, head),
          transform: `scale(${0.78 + 0.22 * head})`,
        }}
      >
        <NotePill color={C_GOLD} fontSize={58}>
          كود <K color={C_GOLD}>HEX</K> = أقوى طريقة 🏆
        </NotePill>
      </div>
      <div
        style={{
          position: "absolute",
          top: 248,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, sub),
          transform: `translateY(${(1 - sub) * 24}px)`,
        }}
      >
        <NotePill color={C_CYAN} fontSize={46}>
          <K color={C_CYAN}># + 6 حروف</K>
        </NotePill>
      </div>

      {/* rotating color wheel */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, wheelIn),
          transform: `scale(${0.7 + 0.3 * wheelIn}) rotate(${(1 - wheelIn) * -40}deg)`,
        }}
      >
        <ColorWheel size={420} angle={angle} />
      </div>

      {/* picked hex code */}
      <div
        style={{
          position: "absolute",
          top: 818,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          opacity: Math.min(1, hexIn),
          transform: `translateY(${(1 - hexIn) * 26}px)`,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: picked,
            border: "5px solid #FFFFFF",
            boxShadow: `0 0 ${30 + glow * 30}px ${picked}`,
          }}
        />
        <div
          style={{
            fontFamily: MONO,
            fontSize: 84,
            fontWeight: 900,
            color: picked,
            direction: "ltr",
            textShadow: `0 0 ${26 + glow * 30}px ${picked}99`,
          }}
        >
          {picked}
        </div>
      </div>

      {/* editor: retype hex */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 980,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame width={940} tab="style.css" language="CSS" statusLine="Ln 2, Col 24">
          {frame < 264 ? (
            <CodeBlock lines={CODE_RED} fontSize={38} lineHeight={62} typed={typedRed} caret />
          ) : (
            <CodeBlock lines={CODE_GREEN} fontSize={38} lineHeight={62} typed={typedGreen} caret />
          )}
        </EditorFrame>
      </div>

      {/* result card: red -> green */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1330,
          width: 900,
          height: 230,
          borderRadius: 26,
          background: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.7)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 40,
          padding: "0 56px",
          boxSizing: "border-box",
          opacity: Math.min(1, result),
          transform: `scale(${0.92 + 0.08 * result})`,
        }}
      >
        <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#E74C3C",
              border: "5px solid #0F172A",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#27AE60",
              border: "5px solid #0F172A",
              opacity: greenIn,
            }}
          />
        </div>
        <div style={{ position: "relative", fontSize: 76, fontWeight: 900, height: 96 }}>
          <span
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "#E74C3C",
              opacity: 1 - greenIn,
            }}
          >
            عنوان أحمر
          </span>
          <span
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "#27AE60",
              opacity: greenIn,
              textShadow: `0 0 30px rgba(39,174,96,${0.35 + glow * 0.3})`,
            }}
          >
            عنوان أخضر
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

      {/* resource badge */}
      <div
        style={{
          position: "absolute",
          top: 1630,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, coolors),
          transform: `scale(${0.6 + 0.4 * coolors})`,
        }}
      >
        <NotePill color={C_GREEN} fontSize={46}>
          🌐 <K color={C_GREEN}>coolors.co</K>
        </NotePill>
      </div>

      <SparkleBurst
        start={292}
        x={540}
        y={1445}
        count={20}
        radius={300}
        duration={30}
        colors={[C_GREEN, C_GOLD, "#FFFFFF"]}
      />
    </SceneShell>
  );
};
