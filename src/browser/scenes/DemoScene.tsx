import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock, VscodeWindow } from "../../vscode/mocks";
import { CopyPanel, MouseCursor } from "../../vscode/lang/parts";
import { ChromeLogo, Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN_Y = 620;
const EDITOR = { x: 60, w: 470 };
const BROWSER = { x: 550, w: 470 };
const CODE_LEFT = 76 + 24 + 2 * 30;
const CHAR_W = 16.4;
const LINE_H = 52;
const TYPE_START = 30;
// voice: "تكتب سطر واحد في VS Code" f32-79
const TYPE_END = 78;
// voice: "ويظهره فوراً على الشاشة" ~f141 - flash leads into it
const APPLY = 126;

const TYPED: { t: string; c: string }[] = [
  { t: "<h1>", c: "#7DD3FC" },
  { t: "مرحباً", c: "#CE9178" },
  { t: "</h1>", c: "#7DD3FC" },
];
const TOTAL = TYPED.reduce((s, p) => s + p.t.length, 0);

const Line: React.FC<{ children: React.ReactNode; indent?: number }> = ({
  children,
  indent = 0,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 27,
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

/** 26-32.4s: type <h1>مرحباً</h1> in VS Code, Chrome shows it instantly. */
export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = fadeUp(frame, 4, 22);
  const wins = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 130 } });
  const applied = frame >= APPLY;
  const flash = interpolate(frame, [APPLY, APPLY + 20], [0.95, 0], clamp);
  const border = interpolate(frame, [APPLY, APPLY + 40], [1, 0], clamp);
  const sitePop = spring({ frame: frame - APPLY, fps, config: { damping: 11, stiffness: 190 } });
  const arrowRow = fadeUp(frame, 134, 154);

  const n = Math.round(
    interpolate(frame, [TYPE_START, TYPE_END], [0, TOTAL], {
      ...clamp,
      easing: Easing.linear,
    }),
  );

  let consumed = 0;
  const typedParts = TYPED.map((tk, i) => {
    const start = consumed;
    consumed += tk.t.length;
    const visible = tk.t.slice(0, Math.max(0, Math.min(tk.t.length, n - start)));
    return (
      <span key={i} style={{ color: tk.c }}>
        {visible}
      </span>
    );
  });

  const caretOn = frame % 30 < 18;
  const caretX = EDITOR.x + CODE_LEFT + n * CHAR_W + 4;
  const caretY = WIN_Y + 90 + 3 * LINE_H + 10;
  const chevron = ((frame - APPLY) % 16) / 16;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={5} />

      {/* title */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "26px 40px", borderColor: "rgba(255,215,0,0.45)" }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 8px 32px rgba(0,0,0,0.55)",
            }}
          >
            <span>اكتب ← </span>
            <span
              style={{
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.cyan,
                textShadow: "0 0 24px rgba(34,211,238,0.7)",
              }}
            >
              Chrome
            </span>
            <span> يعرض فوراً! ✨</span>
          </div>
        </CopyPanel>
      </div>

      {/* editor + browser */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: WIN_Y,
          width: 1080,
          opacity: Math.min(1, wins),
          transform: `scale(${0.92 + 0.08 * wins})`,
          transformOrigin: "50% 20%",
          zIndex: 8,
        }}
      >
        {/* VS Code */}
        <div style={{ position: "absolute", left: EDITOR.x, top: 0, width: EDITOR.w }}>
          <VscodeWindow width={EDITOR.w} tab="index.html" language="HTML">
            <Line>
              <span style={{ color: "#C586C0" }}>{"<!DOCTYPE html>"}</span>
            </Line>
            <Line>
              <span style={{ color: "#7DD3FC" }}>{"<html>"}</span>
            </Line>
            <Line indent={1}>
              <span style={{ color: "#7DD3FC" }}>{"<body>"}</span>
            </Line>
            <Line indent={2}>
              {typedParts}
              <span
                style={{
                  display: "inline-block",
                  width: 4,
                  height: 30,
                  marginLeft: 3,
                  verticalAlign: "-6px",
                  background: caretOn ? "#569CD6" : "transparent",
                }}
              />
            </Line>
            <Line indent={1}>
              <span style={{ color: "#7DD3FC" }}>{"</body>"}</span>
            </Line>
            <Line>
              <span style={{ color: "#7DD3FC" }}>{"</html>"}</span>
            </Line>
          </VscodeWindow>
        </div>

        {/* Chrome */}
        <div style={{ position: "absolute", left: BROWSER.x, top: 0, width: BROWSER.w }}>
          <BrowserMock
            width={BROWSER.w}
            url="localhost:5500"
            bodyStyle={{
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {applied ? (
              <div
                style={{
                  fontSize: 82,
                  fontWeight: 900,
                  color: "#0F172A",
                  direction: "rtl",
                  lineHeight: 1.3,
                  opacity: Math.min(1, sitePop),
                  transform: `scale(${0.7 + 0.3 * sitePop})`,
                  textShadow: "0 10px 30px rgba(15,23,42,0.18)",
                }}
              >
                مرحباً
              </div>
            ) : (
              <div style={{ width: 200, height: 14, borderRadius: 7, background: "#E2E8F0" }} />
            )}
          </BrowserMock>
          {/* instant flash + glow border */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 26,
              background: "#fff",
              opacity: flash,
              pointerEvents: "none",
            }}
          />
          <div
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
      </div>

      {/* caret pointer */}
      {n > 0 && n < TOTAL ? <MouseCursor x={caretX} y={caretY} size={52} /> : null}

      {/* flow arrow row */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: 1080,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          direction: "ltr",
          zIndex: 14,
          opacity: arrowRow.opacity,
          transform: arrowRow.translate,
        }}
      >
        <div
          style={{
            padding: "16px 30px",
            borderRadius: 18,
            background: "rgba(6,10,30,0.9)",
            border: `3px solid ${COLORS.cyan}`,
            color: COLORS.cyan,
            fontFamily: MONO,
            fontSize: 38,
            fontWeight: 900,
            boxShadow: `0 0 28px ${COLORS.cyan}55`,
          }}
        >
          {"</>"}
        </div>
        {[0, 1, 2].map((i) => {
          const local = (chevron + i / 3) % 1;
          const on = frame >= APPLY;
          return (
            <div
              key={i}
              style={{
                fontSize: 52,
                color: on ? COLORS.gold : "rgba(255,255,255,0.25)",
                opacity: on ? 0.35 + 0.65 * local : 0.3,
                translate: `${local * 24 - 12}px 0px`,
                textShadow: on ? `0 0 22px ${COLORS.gold}` : "none",
              }}
            >
              ➜
            </div>
          );
        })}
        <div
          style={{
            padding: 14,
            borderRadius: "50%",
            background: "rgba(6,10,30,0.9)",
            border: "3px solid rgba(255,255,255,0.35)",
            boxShadow: applied ? `0 0 34px rgba(52,168,83,0.75)` : "none",
            display: "flex",
          }}
        >
          <ChromeLogo size={56} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
