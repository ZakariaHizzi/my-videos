import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock, VscodeWindow } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { Line, clamp } from "../parts";

const WIN = { x: 70, w: 940 };
const BROWSER_Y = 190;
const EDITOR_Y = 1360;

const HEADS = [
  { n: "1", size: 58 },
  { n: "2", size: 50 },
  { n: "3", size: 43 },
  { n: "4", size: 37 },
  { n: "5", size: 32 },
  { n: "6", size: 27 },
];

const at = (i: number) => 30 + i * 9;

/** 6.9-15.6s: h1-h6 appear one by one, each smaller, with code in sync below. */
export const HeadingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 130 } });
  const ed = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 130 } });
  const cap1 = fadeUp(frame, 90, 112);
  const cap2 = fadeUp(frame, 176, 198);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={12} seed={9} box={{ x: 30, y: 1000, w: 1020, h: 400 }} />

      {/* rendered result */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: BROWSER_Y,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserMock
          width={WIN.w}
          url="localhost:5500"
          bodyStyle={{ padding: 30, minHeight: 620, background: "#F8FAFC" }}
        >
          {HEADS.map((h, i) => {
            const s = spring({
              frame: frame - at(i),
              fps,
              config: { damping: 12, stiffness: 180 },
            });
            if (s <= 0.001) return null;
            const flash = interpolate(frame, [at(i), at(i) + 14], [1, 0], clamp);
            return (
              <div
                key={h.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  direction: "ltr",
                  marginBottom: 12,
                  opacity: Math.min(1, s),
                  transform: `translateX(${(1 - s) * 60}px)`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(180deg,#FFE44D,${COLORS.gold})`,
                    color: "#14182E",
                    fontSize: 34,
                    fontWeight: 900,
                    boxShadow: `0 0 ${18 + flash * 30}px rgba(255,215,0,${0.4 + flash * 0.5})`,
                  }}
                >
                  {h.n}
                </div>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#7DD3FC",
                    background: "rgba(30,58,138,0.1)",
                    border: "2px solid rgba(125,211,252,0.5)",
                    borderRadius: 10,
                    padding: "6px 12px",
                    flexShrink: 0,
                  }}
                >
                  {`<h${h.n}>`}
                </span>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    direction: "rtl",
                    fontSize: h.size,
                    fontWeight: 900,
                    color: "#0F172A",
                    lineHeight: 1.25,
                    textShadow: flash > 0.05 ? `0 0 ${flash * 26}px rgba(34,211,238,0.8)` : "none",
                  }}
                >
                  عنوان الموقع
                </div>
              </div>
            );
          })}
        </BrowserMock>
      </div>

      {/* captions */}
      <div
        style={{
          position: "absolute",
          top: 1000,
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
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.gold,
                textShadow: `0 0 20px ${COLORS.gold}`,
              }}
            >
              {"<h1>"}
            </span>
            <span> = الأكبر والأهم 👑</span>
          </div>
        </CopyPanel>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1180,
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
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.cyan,
                textShadow: `0 0 20px ${COLORS.cyan}`,
              }}
            >
              {"<h6>"}
            </span>
            <span> = الأصغر 🔹</span>
          </div>
        </CopyPanel>
      </div>

      {/* code editor in sync */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: EDITOR_Y,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, ed),
          transform: `scale(${0.92 + 0.08 * ed})`,
          transformOrigin: "50% 0%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML" showStatus={false}>
          {HEADS.map((h, i) => {
            const on = frame >= at(i);
            const flash = interpolate(frame, [at(i), at(i) + 14], [1, 0], clamp);
            return (
              <Line key={h.n} lineHeight={50} fontSize={28}>
                <span
                  style={{
                    background: flash > 0.03 ? `rgba(255,215,0,${0.18 * flash})` : undefined,
                    opacity: on ? 1 : 0.22,
                  }}
                >
                  <span style={{ color: "#7DD3FC" }}>{`<h${h.n}>`}</span>
                  <span style={{ color: "#CE9178" }}>عنوان الموقع</span>
                  <span style={{ color: "#7DD3FC" }}>{`</h${h.n}>`}</span>
                </span>
              </Line>
            );
          })}
        </VscodeWindow>
      </div>
    </AbsoluteFill>
  );
};
