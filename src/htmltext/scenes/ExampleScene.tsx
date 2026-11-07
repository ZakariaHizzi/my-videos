import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp } from "../../vscode/theme";
import { BrowserMock, VscodeWindow } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { Caret, Line, clamp, totalChars, typedLines, typedSegments } from "../parts";

const WIN = { x: 70, w: 940 };

const LINES = [
  "<body>",
  "<h1>مرحباً بكم!</h1>",
  "<p>هذا موقع بسيط لكنه جميل.</p>",
  "<p>تعلمنا الكثير اليوم!</p>",
  "</body>",
];
const TOTAL = totalChars(LINES);

const T0 = 8;
const T1 = 150;
const APPLY = 158;

/** 30.9-39s: type h1 + p + p and render a complete little page. */
export const ExampleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 130 } });
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );
  const shown = typedLines(LINES, n);

  const flash = interpolate(frame, [APPLY, APPLY + 18], [0.9, 0], clamp);
  const border = interpolate(frame, [APPLY, APPLY + 46], [1, 0], clamp);
  const h1s = spring({ frame: frame - APPLY, fps, config: { damping: 11, stiffness: 190 } });
  const p1s = spring({ frame: frame - APPLY - 14, fps, config: { damping: 12, stiffness: 170 } });
  const p2s = spring({ frame: frame - APPLY - 28, fps, config: { damping: 12, stiffness: 170 } });
  const arrow = fadeUp(frame, APPLY - 26, APPLY - 8);
  const cap = fadeUp(frame, APPLY + 20, APPLY + 42);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={12} seed={15} box={{ x: 30, y: 1280, w: 1020, h: 480 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 150,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          {LINES.map((_, i) => {
            const isWrapper = i === 0 || i === LINES.length - 1;
            const segs = typedSegments(LINES[i], shown[i].length);
            const typingNow = shown[i].length > 0 && shown[i].length < LINES[i].length;
            return (
              <Line key={i} indent={isWrapper ? 1 : 2}>
                {segs.map((s, j) => (
                  <span
                    key={j}
                    style={{
                      color: s.isTag ? "#7DD3FC" : "#CE9178",
                      opacity: isWrapper ? 0.75 : 1,
                    }}
                  >
                    {s.value}
                  </span>
                ))}
                {typingNow ? <Caret /> : null}
              </Line>
            );
          })}
        </VscodeWindow>
      </div>

      {/* arrow */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 60,
          color: COLORS.gold,
          textShadow: `0 0 26px ${COLORS.gold}`,
          opacity: arrow.opacity,
          transform: arrow.translate,
          zIndex: 12,
        }}
      >
        ⬇
      </div>

      {/* browser */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 720,
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
          bodyStyle={{ minHeight: 430, padding: 40, background: "#F8FAFC" }}
        >
          {frame >= APPLY ? (
            <div style={{ direction: "rtl", textAlign: "right" }}>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: "#0F172A",
                  fontFamily: FONT,
                  opacity: Math.min(1, h1s),
                  transform: `translateY(${(1 - h1s) * 26}px)`,
                  lineHeight: 1.3,
                }}
              >
                مرحباً بكم!
              </div>
              <div
                style={{
                  height: 8,
                  width: 220,
                  borderRadius: 4,
                  marginTop: 10,
                  marginBottom: 26,
                  background: "linear-gradient(90deg,#22D3EE,#A855F7)",
                  opacity: Math.min(1, h1s),
                }}
              />
              <div
                style={{
                  fontSize: 38,
                  color: "#334155",
                  fontFamily: FONT,
                  lineHeight: 1.6,
                  opacity: Math.min(1, p1s),
                  transform: `translateY(${(1 - p1s) * 18}px)`,
                }}
              >
                هذا موقع بسيط لكنه جميل.
              </div>
              <div
                style={{
                  fontSize: 38,
                  color: "#334155",
                  fontFamily: FONT,
                  lineHeight: 1.6,
                  marginTop: 12,
                  opacity: Math.min(1, p2s),
                  transform: `translateY(${(1 - p2s) * 18}px)`,
                }}
              >
                تعلمنا الكثير اليوم!
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, direction: "rtl" }}>
              <div style={{ width: "62%", height: 26, borderRadius: 10, background: "#E2E8F0" }} />
              <div style={{ width: "88%", height: 16, borderRadius: 8, background: "#EEF2F7" }} />
              <div style={{ width: "70%", height: 16, borderRadius: 8, background: "#EEF2F7" }} />
            </div>
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

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 1310,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap.opacity,
          transform: cap.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.55)" }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ direction: "ltr", unicodeBidi: "isolate", fontFamily: "'Cascadia Mono','Consolas',monospace", color: COLORS.cyan }}>
              h1 + p + p
            </span>
            <span> = محتوى موقعك 🎯</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
