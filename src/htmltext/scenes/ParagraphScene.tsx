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
import { CopyPanel, MouseCursor } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { Caret, Line, clamp, totalChars, typedLines } from "../parts";

const WIN = { x: 70, w: 940 };
const LINE_H = 56;
const CHAR_W = 17.6;
const CODE_LEFT = 76 + 26;
const TYPED_TOP = 200 + 70 + 24;

const LINES = [
  "<p>",
  "  تعلّم البرمجة خطوة بخطوة،",
  "  وابنِ مواقع مذهلة بثقة!",
  "</p>",
];
const TOTAL = totalChars(LINES);

const WORDS = "تعلّم البرمجة خطوة بخطوة، وابنِ مواقع مذهلة بثقة!".split(" ");

const T0 = 12;
const T1 = 150;
const APPLY = 152;

/** 15.6-23.4s: type a <p> paragraph and watch it render in the browser. */
export const ParagraphScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 130 } });
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );
  const shown = typedLines(LINES, n);

  const browser = spring({ frame: frame - APPLY, fps, config: { damping: 13, stiffness: 140 } });
  const flash = interpolate(frame, [APPLY, APPLY + 18], [0.85, 0], clamp);
  const cap = fadeUp(frame, 79, 101);

  // caret position: walk the lines to find where typing is
  let consumed = 0;
  let caretLine = 0;
  for (let i = 0; i < LINES.length; i++) {
    if (n <= consumed + LINES[i].length) {
      caretLine = i;
      break;
    }
    consumed += LINES[i].length;
    caretLine = Math.min(i + 1, LINES.length - 1);
  }
  const charsBeforeCaret = LINES.slice(0, caretLine).reduce((s, l) => s + l.length, 0);
  const caretX = WIN.x + CODE_LEFT + (n - charsBeforeCaret) * CHAR_W;
  const caretY = TYPED_TOP + caretLine * LINE_H + 10;
  const typing = frame >= T0 - 4 && frame <= T1 + 4;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={12} seed={5} box={{ x: 30, y: 1280, w: 1020, h: 500 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 200,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          {LINES.map((_, i) => {
            const isTagLine = i === 0 || i === LINES.length - 1;
            return (
              <Line key={i} indent={isTagLine ? 1 : 2}>
                <span style={{ color: "#7DD3FC" }}>
                  {isTagLine ? shown[i] : ""}
                </span>
                <span style={{ color: "#CE9178" }}>
                  {isTagLine ? "" : shown[i]}
                </span>
                {i === caretLine && n < TOTAL ? <Caret /> : null}
              </Line>
            );
          })}
        </VscodeWindow>
      </div>

      {typing ? <MouseCursor x={caretX} y={caretY} size={46} /> : null}

      {/* flow arrow */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 64,
          color: COLORS.purple,
          textShadow: `0 0 26px ${COLORS.purple}`,
          opacity: interpolate(frame, [APPLY - 24, APPLY - 6], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [APPLY - 24, APPLY - 6], [20, 0], clamp)}px)`,
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
          top: 730,
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
            minHeight: 330,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F8FAFC",
          }}
        >
          {frame >= APPLY ? (
            <div
              style={{
                fontSize: 46,
                lineHeight: 1.75,
                color: "#0F172A",
                direction: "rtl",
                textAlign: "center",
                fontFamily: FONT,
                maxWidth: 760,
                opacity: Math.min(1, browser),
              }}
            >
              {WORDS.map((w, i) => {
                const s = interpolate(
                  frame,
                  [APPLY + 4 + i * 6, APPLY + 16 + i * 6],
                  [0, 1],
                  clamp,
                );
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      opacity: s,
                      transform: `translateY(${(1 - s) * 16}px)`,
                      marginLeft: 14,
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          ) : (
            <div style={{ width: 280, height: 16, borderRadius: 8, background: "#E2E8F0" }} />
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
      </div>

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap.opacity,
          transform: cap.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.5)" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.gold,
                textShadow: `0 0 22px ${COLORS.gold}`,
              }}
            >
              {"<p>"}
            </span>
            <span> = فقرة (Paragraph) 📝</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
