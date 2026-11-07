import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock, VscodeWindow } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN = { x: 70, y: 170, w: 940 };
const LINE_H = 56;
const BROWSER_Y = 790;

const BODY = "<body>";
const PAR = "<p>مرحباً</p>";

const Caret: React.FC = () => {
  const frame = useCurrentFrame();
  const on = frame % 30 < 18;
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: 34,
        marginLeft: 3,
        verticalAlign: "-7px",
        background: on ? "#569CD6" : "transparent",
      }}
    />
  );
};

const Line: React.FC<{
  children: React.ReactNode;
  indent?: number;
}> = ({ children, indent = 0 }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 30,
      lineHeight: `${LINE_H}px`,
      height: LINE_H,
      whiteSpace: "pre",
      direction: "ltr",
      textAlign: "left",
      marginLeft: indent * 30,
    }}
  >
    {children}
  </div>
);

/** 35-45s: type <body><p>مرحباً</p></body> and watch the browser render it. */
export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 130 } });
  const n1 = Math.round(
    interpolate(frame, [14, 40], [0, BODY.length], { ...clamp, easing: Easing.linear }),
  );
  const n2 = Math.round(
    interpolate(frame, [46, 92], [0, PAR.length], { ...clamp, easing: Easing.linear }),
  );

  const APPLY = 106;
  const applied = frame >= APPLY;
  const flash = frame >= APPLY ? interpolate(frame, [APPLY, APPLY + 20], [0.9, 0], clamp) : 0;
  const border = frame >= APPLY ? interpolate(frame, [APPLY, APPLY + 40], [1, 0], clamp) : 0;
  const sitePop = spring({ frame: frame - APPLY, fps, config: { damping: 11, stiffness: 190 } });
  const arrow = fadeUp(frame, 100, 118);
  const cap1 = fadeUp(frame, 118, 140);
  const cap2 = fadeUp(frame, 148, 170);

  const chevron = ((frame - APPLY) % 16) / 16;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={8} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <Line>
            <span style={{ color: "#C586C0" }}>{"<!DOCTYPE html>"}</span>
          </Line>
          <Line>
            <span style={{ color: "#7DD3FC" }}>{"<html>"}</span>
          </Line>
          <Line indent={1}>
            <span style={{ color: "#C586C0" }}>{BODY.slice(0, n1)}</span>
            {n2 === 0 && n1 > 0 ? <Caret /> : null}
          </Line>
          <Line indent={2}>
            <span style={{ color: "#7DD3FC" }}>{PAR.slice(0, n2)}</span>
            {n2 > 0 && n2 < PAR.length ? <Caret /> : null}
          </Line>
          <Line indent={1}>
            <span
              style={{
                color: "#C586C0",
                opacity: frame >= 96 ? 1 : 0.25,
              }}
            >
              {"</body>"}
            </span>
          </Line>
          <Line>
            <span
              style={{
                color: "#7DD3FC",
                opacity: frame >= 96 ? 1 : 0.25,
              }}
            >
              {"</html>"}
            </span>
          </Line>
        </VscodeWindow>
      </div>

      {/* arrow row */}
      <div
        style={{
          position: "absolute",
          top: 690,
          left: 0,
          width: 1080,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          direction: "ltr",
          zIndex: 14,
          opacity: arrow.opacity,
          transform: arrow.translate,
        }}
      >
        <div
          style={{
            padding: "14px 28px",
            borderRadius: 16,
            background: "rgba(6,10,30,0.9)",
            border: `3px solid ${COLORS.purple}`,
            color: COLORS.purple,
            fontFamily: MONO,
            fontSize: 36,
            fontWeight: 900,
            boxShadow: `0 0 28px ${COLORS.purple}55`,
          }}
        >
          {"</>"}
        </div>
        {[0, 1, 2].map((i) => {
          const local = (chevron + i / 3) % 1;
          return (
            <div
              key={i}
              style={{
                fontSize: 48,
                color: applied ? COLORS.gold : "rgba(255,255,255,0.28)",
                opacity: applied ? 0.35 + 0.65 * local : 0.3,
                translate: `${local * 22 - 11}px 0px`,
                textShadow: applied ? `0 0 20px ${COLORS.gold}` : "none",
              }}
            >
              ➜
            </div>
          );
        })}
      </div>

      {/* browser */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: BROWSER_Y,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 0%",
        }}
      >
        <BrowserMock
          width={WIN.w}
          url="localhost:5500"
          bodyStyle={{
            minHeight: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F8FAFC",
          }}
        >
          {applied ? (
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#0F172A",
                direction: "rtl",
                lineHeight: 1.3,
                fontFamily: FONT,
                opacity: Math.min(1, sitePop),
                transform: `scale(${0.7 + 0.3 * sitePop})`,
                textShadow: "0 12px 34px rgba(15,23,42,0.2)",
              }}
            >
              مرحباً
            </div>
          ) : (
            <div style={{ width: 240, height: 16, borderRadius: 8, background: "#E2E8F0" }} />
          )}
        </BrowserMock>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 26,
            background: "#fff",
            opacity: flash,
            pointerEvents: "none",
          }}
        />        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: 32,
            border: `5px solid ${COLORS.green}`,
            opacity: border,
            boxShadow: `0 0 46px ${COLORS.green}`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* captions */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.55)" }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ direction: "ltr", unicodeBidi: "isolate" }}>Head</span>
            <span> = إعدادات </span>
            <span>⚙️</span>
          </div>
        </CopyPanel>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1590,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap2.opacity,
          transform: cap2.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(34,211,238,0.55)" }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ direction: "ltr", unicodeBidi: "isolate" }}>Body</span>
            <span> = محتوى مرئي </span>
            <span>👁️</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
