import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock, VscodeWindow } from "../../vscode/mocks";
import { Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const PANEL_W = 780;
const PANEL_X = (1080 - PANEL_W) / 2;

const Line: React.FC<{
  children: React.ReactNode;
  top: number;
  progress: number;
  glow: number;
  shimmer: number;
}> = ({ children, top, progress, glow, shimmer }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 40,
      right: 40,
      zIndex: 24,
      opacity: Math.min(1, progress),
      transform: `translateY(${(1 - progress) * 56}px) scale(${0.78 + 0.22 * progress})`,
    }}
  >
    <div
      style={{
        fontSize: 76,
        fontWeight: 900,
        lineHeight: 1.35,
        backgroundImage:
          "linear-gradient(105deg, #22D3EE 0%, #60A5FA 28%, #A855F7 58%, #FFD700 100%)",
        backgroundSize: "220% 100%",
        backgroundPosition: `${shimmer}% 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: `drop-shadow(0 0 ${18 + glow * 30}px rgba(168,85,247,0.7)) drop-shadow(0 12px 34px rgba(0,0,0,0.55))`,
      }}
    >
      {children}
    </div>
  </div>
);

const CodeLine: React.FC<{ children: React.ReactNode; indent?: number }> = ({
  children,
  indent = 0,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 27,
      lineHeight: "52px",
      height: 52,
      whiteSpace: "pre",
      direction: "ltr",
      textAlign: "left",
      marginLeft: indent * 30,
    }}
  >
    {children}
  </div>
);

/** 39.2-44.5s: the takeaway - VS Code writes, the browser shows. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // voice: "VS Code هو اللي بيكتب" f31-82 · "والمتصفح هو اللي بيفهم ويعرض" f82-152
  const line1 = fadeUp(frame, 22, 42);
  const line2 = fadeUp(frame, 86, 106);
  const editor = spring({ frame: frame - 16, fps, config: { damping: 15, stiffness: 120 } });
  const site = spring({ frame: frame - 90, fps, config: { damping: 13, stiffness: 140 } });
  const arrow = fadeUp(frame, 84, 104);
  const glow = 0.45 + 0.55 * Math.sin(t * 3.2);
  const shimmer = interpolate(frame, [0, 159], [-40, 140], clamp);
  const drop = Math.sin(t * 3.6) * 8;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={20} seed={7} />

      {/* warm key light */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 1350,
          width: 1600,
          height: 1400,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(255,176,82,0.42) 0%, rgba(251,146,60,0.18) 40%, transparent 70%)",
          opacity: 0.5 + 0.35 * Math.sin(t * 1.7),
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 900,
          width: 1500,
          height: 1300,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(37,99,235,0.2) 45%, transparent 72%)",
          zIndex: 3,
        }}
      />

      <Line top={240} progress={line1.opacity} glow={glow} shimmer={shimmer}>
        <span>VS Code يكتب ✍️</span>
      </Line>

      {/* VS Code window */}
      <div
        style={{
          position: "absolute",
          left: PANEL_X,
          top: 390,
          width: PANEL_W,
          zIndex: 14,
          opacity: Math.min(1, editor),
          transform: `scale(${0.9 + 0.1 * editor}) translateY(${(1 - editor) * 46}px)`,
          transformOrigin: "50% 0%",
        }}
      >
        <VscodeWindow width={PANEL_W} tab="index.html" language="HTML">
          <CodeLine>
            <span style={{ color: "#C586C0" }}>{"<!DOCTYPE html>"}</span>
          </CodeLine>
          <CodeLine>
            <span style={{ color: "#7DD3FC" }}>{"<html>"}</span>
          </CodeLine>
          <CodeLine indent={1}>
            <span style={{ color: "#7DD3FC" }}>{"<body>"}</span>
          </CodeLine>
          <CodeLine indent={2}>
            <span style={{ color: "#7DD3FC" }}>{"<h1>"}</span>
            <span style={{ color: "#CE9178" }}>{"مرحباً"}</span>
            <span style={{ color: "#7DD3FC" }}>{"</h1>"}</span>
          </CodeLine>
          <CodeLine indent={1}>
            <span style={{ color: "#7DD3FC" }}>{"</body>"}</span>
          </CodeLine>
          <CodeLine>
            <span style={{ color: "#7DD3FC" }}>{"</html>"}</span>
          </CodeLine>
        </VscodeWindow>
      </div>

      {/* down arrow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 872,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 16,
          opacity: arrow.opacity,
          transform: `${arrow.translate} translateY(${drop}px)`,
        }}
      >
        <svg width={104} height={104} viewBox="0 0 24 24">
          <path
            d="M12 3.5V16"
            stroke={COLORS.gold}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M5.5 11L12 17.5L18.5 11"
            stroke={COLORS.gold}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <Line top={990} progress={line2.opacity} glow={glow} shimmer={shimmer + 30}>
        <span>المتصفح يعرض 👁️</span>
      </Line>

      {/* browser window */}
      <div
        style={{
          position: "absolute",
          left: PANEL_X,
          top: 1130,
          width: PANEL_W,
          zIndex: 14,
          opacity: Math.min(1, site),
          transform: `scale(${0.9 + 0.1 * site}) translateY(${(1 - site) * 46}px)`,
          transformOrigin: "50% 0%",
        }}
      >
        <BrowserMock
          width={PANEL_W}
          url="localhost:5500"
          bodyStyle={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#0F172A",
              direction: "rtl",
              lineHeight: 1.3,
              transform: `scale(${0.75 + 0.25 * Math.min(1, site)})`,
              textShadow: "0 10px 30px rgba(15,23,42,0.18)",
            }}
          >
            مرحباً
          </div>
        </BrowserMock>
      </div>
    </AbsoluteFill>
  );
};
