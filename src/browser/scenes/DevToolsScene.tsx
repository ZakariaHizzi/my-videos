import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { ClickRipple, CopyPanel, MouseCursor } from "../../vscode/lang/parts";
import { Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN = { x: 60, y: 700, w: 960 };
const KEY = { x: 400, y: 420, w: 280, h: 210 };
// voice: "اضغط F12" f18-48 · panel when "هتلاقي أدوات المطور" f48+ · select on "تشوف الكود" f132
const PRESS = 26;
const PANEL_IN = 36;
const SELECT = 128;

const KW = "#569CD6";
const ATTR = "#9CDCFE";
const STR = "#CE9178";
const PLAIN = "#D4D4D4";

const Tag: React.FC<{ parts: { t: string; c: string }[]; indent: number; hot: boolean; bg: string }> = ({
  parts,
  indent,
  hot,
  bg,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: 46,
      paddingLeft: 16 + indent * 26,
      fontFamily: MONO,
      fontSize: 25,
      whiteSpace: "pre",
      direction: "ltr",
      textAlign: "left",
      background: hot ? bg : "transparent",
      borderRadius: 6,
      marginRight: 8,
      marginLeft: 8,
    }}
  >
    {parts.map((p, i) => (
      <span key={i} style={{ color: p.c }}>
        {p.t}
      </span>
    ))}
  </div>
);

const PanelIcon: React.FC<{ c: string; s?: number }> = ({ c, s = 12 }) => (
  <div style={{ width: s, height: s, borderRadius: 3, background: c }} />
);

/** 32.4-39.2s: press F12, Chrome's Developer Tools open and the inspector picks an element. */
export const DevToolsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 22);
  const win = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 130 } });
  const panel = spring({ frame: frame - PANEL_IN, fps, config: { damping: 16, stiffness: 140 } });
  const pressed = interpolate(frame, [PRESS, PRESS + 6, PRESS + 14], [0, 1, 0], clamp);
  const selected = spring({ frame: frame - SELECT, fps, config: { damping: 12, stiffness: 190 } });
  const pulse = 0.55 + 0.45 * Math.sin(t * 5.5);

  const keyP = interpolate(frame, [4, 22], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const kx = interpolate(keyP, [0, 1], [980, KEY.x + KEY.w / 2 - 26]);
  const ky = interpolate(keyP, [0, 1], [1780, KEY.y + KEY.h / 2 - 26]);

  const insp = interpolate(frame, [96, SELECT], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const ix = interpolate(insp, [0, 1], [KEY.x + KEY.w / 2, 300]);
  const iy = interpolate(insp, [0, 1], [KEY.y + KEY.h / 2, 1030]);

  const panelW = 430;
  const pageW = WIN.w - 52 - panelW;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={12} seed={6} />

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
        <CopyPanel style={{ padding: "26px 44px", borderColor: "rgba(255,215,0,0.45)" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 8px 32px rgba(0,0,0,0.55)",
            }}
          >
            <span
              style={{
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.gold,
                textShadow: "0 0 26px rgba(255,215,0,0.6)",
              }}
            >
              F12
            </span>
            <span> = أدوات المطور 🛠️</span>
          </div>
        </CopyPanel>
      </div>

      {/* F12 keycap */}
      <div
        style={{
          position: "absolute",
          left: KEY.x,
          top: KEY.y,
          width: KEY.w,
          height: KEY.h,
          zIndex: 22,
          opacity: frame >= 4 ? 1 : 0,
          transform: `translateY(${pressed * 16}px) scale(${frame >= 4 ? 1 : 0.6})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            background: "linear-gradient(180deg,#131A3A,#0A1130)",
            boxShadow: `0 ${22 - pressed * 16}px ${44 - pressed * 20}px rgba(0,0,0,0.65)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 36,
            background: pressed
              ? "linear-gradient(180deg,#0E1533,#151D45)"
              : "linear-gradient(180deg,#243063,#141C42)",
            border: `3px solid ${pressed ? COLORS.cyan : "rgba(125,211,252,0.5)"}`,
            boxShadow: pressed
              ? `0 0 26px ${COLORS.cyan}66, inset 0 0 30px rgba(34,211,238,0.25)`
              : `0 0 34px rgba(59,130,246,0.4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 84,
            fontWeight: 900,
            color: "#FFFFFF",
            direction: "ltr",
          }}
        >
          F12
        </div>
      </div>
      <ClickRipple frame={frame} at={PRESS} x={KEY.x + KEY.w / 2 - 20} y={KEY.y + KEY.h / 2} color={COLORS.cyan} />

      {/* chrome window */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          zIndex: 10,
          opacity: Math.min(1, win),
          transform: `scale(${0.93 + 0.07 * win})`,
          transformOrigin: "50% 0%",
        }}
      >
        <BrowserMock
          width={WIN.w}
          url="localhost:5500"
          bodyStyle={{
            padding: 0,
            minHeight: 660,
            display: "flex",
            direction: "ltr",
            background: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* rendered page */}
          <div style={{ width: pageW, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: 58,
                background: "#F1F5F9",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: "linear-gradient(135deg,#A855F7,#22D3EE)",
                }}
              />
              <div style={{ width: 100, height: 12, borderRadius: 6, background: "#CBD5E1" }} />
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                {[48, 40, 56].map((w) => (
                  <div key={w} style={{ width: w, height: 10, borderRadius: 5, background: "#E2E8F0" }} />
                ))}
              </div>
            </div>
            <div
              style={{
                padding: "46px 28px",
                background: "linear-gradient(130deg,#1E3A8A 0%,#4C1D95 60%,#7C3AED 100%)",
              }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    fontSize: 66,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    direction: "rtl",
                    lineHeight: 1.25,
                    textShadow: "0 8px 26px rgba(0,0,0,0.35)",
                  }}
                >
                  مرحباً
                </div>
                {/* inspector highlight */}
                <div
                  style={{
                    position: "absolute",
                    inset: -8,
                    border: "3px solid #3B82F6",
                    background: "rgba(56,139,253,0.32)",
                    opacity: Math.min(1, selected),
                    borderRadius: 4,
                    boxShadow: `0 0 ${18 + pulse * 16}px rgba(56,139,253,0.8)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: -8,
                    top: -40,
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: "#3B82F6",
                    color: "#fff",
                    fontFamily: MONO,
                    fontSize: 22,
                    opacity: Math.min(1, selected),
                    direction: "ltr",
                    whiteSpace: "nowrap",
                  }}
                >
                  h1
                </div>
              </div>
              <div
                style={{
                  width: "88%",
                  height: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.5)",
                  marginTop: 26,
                }}
              />
              <div
                style={{
                  width: "66%",
                  height: 12,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.5)",
                  marginTop: 10,
                }}
              />
              <div style={{ width: 140, height: 48, borderRadius: 24, background: "#FFD700", marginTop: 26 }} />
            </div>
            <div style={{ display: "flex", gap: 16, padding: 24 }}>
              {["#22D3EE", "#A855F7", "#FFD700"].map((c) => (
                <div
                  key={c}
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: 14,
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: c }} />
                  <div style={{ width: "82%", height: 10, borderRadius: 5, background: "#E2E8F0", marginTop: 12 }} />
                </div>
              ))}
            </div>
          </div>

          {/* devtools panel */}
          <div
            style={{
              width: panelW,
              background: "#1E1E1E",
              borderLeft: "1px solid #3A3A3A",
              display: "flex",
              flexDirection: "column",
              transform: `translateX(${(1 - Math.min(1, panel)) * 100}%)`,
              opacity: panel > 0.01 ? 1 : 0,
            }}
          >
            <div
              style={{
                height: 44,
                background: "#252526",
                borderBottom: "1px solid #3A3A3A",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 14px",
                direction: "ltr",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 22,
                  color: "#E6EDF3",
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: "#2D2D30",
                }}
              >
                Elements
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <PanelIcon c="#7DD3FC" />
                <PanelIcon c="#A855F7" />
                <PanelIcon c="#FFD700" />
              </div>
            </div>
            <div style={{ padding: "12px 0", direction: "ltr" }}>
              <Tag indent={0} hot={false} bg="#264F78" parts={[{ t: "<html>", c: KW }]} />
              <Tag indent={1} hot={false} bg="#264F78" parts={[{ t: "<body>", c: KW }]} />
              <Tag
                indent={2}
                hot={false}
                bg="#264F78"
                parts={[
                  { t: "<div ", c: KW },
                  { t: 'class', c: ATTR },
                  { t: "=", c: PLAIN },
                  { t: '"hero"', c: STR },
                  { t: ">", c: KW },
                ]}
              />
              <Tag
                indent={3}
                hot={frame >= SELECT}
                bg="#264F78"
                parts={[{ t: "<h1>مرحباً</h1>", c: "#E6EDF3" }]}
              />
              <Tag indent={2} hot={false} bg="#264F78" parts={[{ t: "</div>", c: KW }]} />
              <Tag indent={1} hot={false} bg="#264F78" parts={[{ t: "</body>", c: KW }]} />
              <Tag indent={0} hot={false} bg="#264F78" parts={[{ t: "</html>", c: KW }]} />
            </div>
          </div>
        </BrowserMock>
      </div>

      {/* cursor: to the key, then to the element */}
      {frame >= 4 ? (
        <MouseCursor x={keyP < 1 ? kx : ix} y={keyP < 1 ? ky : iy} size={58} />
      ) : null}
    </AbsoluteFill>
  );
};
