import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { Twinkles } from "../../browser/parts";
import {
  C_INPUT,
  C_TYPE,
  CaptionLine,
  RenderInput,
  TypedCodeBlock,
  cumChars,
  fadeUp,
  popAt,
  totalChars,
} from "../parts";

const WIN = { x: 70, w: 940 };

const LINES = [
  '<input type="text"',
  '  placeholder="اسم المستخدم">',
  '<input type="password"',
  '  placeholder="كلمة السر">',
];
const TOTAL = totalChars(LINES);

// typing window for the two input lines
const T0 = 10;
const T1 = 190;

/** 14-24s: <input> + type="text" / type="password" — the password turns to dots. */
export const InputTypeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = popAt(frame, fps, 2, 14, 130);
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], {
      ...{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      easing: Easing.linear,
    }),
  );

  // field 1 renders once its tag (lines 1-2) is typed; field 2 after lines 3-4
  const f1At = T0 + (cumChars(LINES, 2) / TOTAL) * (T1 - T0);
  const f2At = T1;

  // a user types a password -> dots appear (emphasised by a zoom)
  const typed = Math.max(
    0,
    Math.round(interpolate(frame, [210, 285], [0, 6], { ...{ extrapolateLeft: "clamp", extrapolateRight: "clamp" } })),
  );
  // camera push-in on the password field, 205 -> 300
  const zoom = interpolate(frame, [205, 300], [1, 1.34], {
    ...{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    easing: Easing.out(Easing.cubic),
  });

  const cap1 = fadeUp(frame, 24, 48);
  const cap2 = fadeUp(frame, 120, 144);
  const cap3 = popAt(frame, fps, 205, 12, 165);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={14} box={{ x: 20, y: 1360, w: 1040, h: 440 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 250,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={n} size={34} />
        </VscodeWindow>
      </div>

      {/* browser preview below */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 740,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 0%",
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: "#0B1130",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 26px 66px rgba(0,0,0,0.55)",
            padding: 28,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              textAlign: "left",
              direction: "ltr",
              marginBottom: 20,
            }}
          >
            🔒 localhost:5500
          </div>

          {/* the two live fields, zooming toward the password */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 26,
              transform: `scale(${zoom})`,
              transformOrigin: "80% 70%",
            }}
          >
            {frame >= f1At ? (
              <div style={{ opacity: Math.min(1, popAt(frame, fps, f1At, 12, 180)) }}>
                <RenderInput placeholder="اسم المستخدم" width={700} fontSize={40} />
              </div>
            ) : null}
            {frame >= f2At ? (
              <div style={{ opacity: Math.min(1, popAt(frame, fps, f2At, 12, 180)) }}>
                <RenderInput
                  placeholder="كلمة السر"
                  type="password"
                  value={"s".repeat(typed)}
                  width={700}
                  fontSize={40}
                  focused={typed > 0}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* caption 1: <input> = the element */}
      <div
        style={{
          position: "absolute",
          top: 1400,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CaptionLine icon="✏️" text="input = العنصر" color={C_INPUT} appear={24} fontSize={52} />
      </div>

      {/* caption 2: type="text" */}
      <div
        style={{
          position: "absolute",
          top: 1530,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: cap2.opacity,
          transform: cap2.translate,
        }}
      >
        <CaptionLine
          icon="📝"
          text="type='text' = نص عادي"
          color={C_TYPE}
          appear={120}
          fontSize={48}
        />
      </div>

      {/* caption 3: type="password" — pops with the dots */}
      <div
        style={{
          position: "absolute",
          top: 1660,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: Math.min(1, cap3 * 1.5),
          transform: `scale(${0.7 + 0.3 * cap3})`,
        }}
      >
        <div
          style={{
            padding: "20px 46px",
            borderRadius: 100,
            background: "rgba(6,10,30,0.94)",
            border: `3px solid ${C_TYPE}`,
            boxShadow: `0 0 30px ${C_TYPE}66`,
            fontSize: 50,
            fontWeight: 900,
            color: "#FFFFFF",
            direction: "rtl",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 52 }}>🔒</span>{" "}
          <span style={{ fontFamily: MONO, color: C_TYPE, direction: "ltr" }}>
            type='password'
          </span>{" "}
          = كلمة سر
        </div>
      </div>
    </AbsoluteFill>
  );
};
