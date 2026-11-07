import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SparkleBurst, clamp, popAt } from "../../css/parts";
import { Caption, C_BLUE, C_DIV, C_GOLD, C_PURPLE, SceneShell } from "../parts";
import { DemoCard } from "../art";

const Arrow: React.FC<{ x: number; on: number }> = ({ x, on }) => (
  <svg
    width={80}
    height={60}
    viewBox="0 0 80 60"
    style={{
      position: "absolute",
      left: x,
      top: 740,
      opacity: on,
      transform: `translateX(${(1 - on) * -26}px)`,
    }}
  >
    <path
      d="M4 30 L66 30 M66 30 L46 12 M66 30 L46 48"
      stroke={C_GOLD}
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 48-53s: div + class + CSS = a styled card. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const n1 = popAt(frame, fps, 8, 13, 165);
  const n2 = popAt(frame, fps, 38, 13, 165);
  const n3 = popAt(frame, fps, 66, 13, 165);
  const a1 = interpolate(frame, [28, 50], [0, 1], clamp);
  const a2 = interpolate(frame, [56, 78], [0, 1], clamp);
  const down = interpolate(frame, [92, 116], [0, 1], clamp);
  const res = popAt(frame, fps, 104, 13, 155);

  const node = (s: number) => ({
    opacity: Math.min(1, s),
    transform: `scale(${0.6 + 0.4 * s})`,
  });

  return (
    <SceneShell seed={6}>
      <Caption appear={4} color={C_GOLD} fontSize={58} dir="ltr" style={{ top: 190 }}>
        📦 div + 🏷️ class + 🎨 CSS
      </Caption>

      {/* node 1 — the div */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 640,
          width: 260,
          height: 260,
          borderRadius: 26,
          background: "rgba(255,107,53,0.14)",
          border: `5px dashed ${C_DIV}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxShadow: `0 0 34px ${C_DIV}55`,
          ...node(n1),
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 52, fontWeight: 700, color: C_DIV, direction: "ltr" }}>
          {"<div>"}
        </div>
        <div style={{ fontSize: 46 }}>📦</div>
      </div>

      <Arrow x={310} on={a1} />

      {/* node 2 — the class */}
      <div
        style={{
          position: "absolute",
          left: 390,
          top: 640,
          width: 300,
          height: 260,
          borderRadius: 26,
          background: "rgba(59,130,246,0.16)",
          border: `5px solid ${C_BLUE}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          boxShadow: `0 0 34px ${C_BLUE}55`,
          ...node(n2),
        }}
      >
        <div style={{ fontSize: 52 }}>🏷️</div>
        <div style={{ fontFamily: "monospace", fontSize: 40, fontWeight: 700, color: "#9CDCFE", direction: "ltr" }}>
          class=&quot;card&quot;
        </div>
      </div>

      <Arrow x={690} on={a2} />

      {/* node 3 — the CSS paint */}
      <div
        style={{
          position: "absolute",
          left: 770,
          top: 640,
          width: 260,
          height: 260,
          borderRadius: 26,
          background: "rgba(168,85,247,0.16)",
          border: `5px solid ${C_PURPLE}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxShadow: `0 0 34px ${C_PURPLE}55`,
          ...node(n3),
        }}
      >
        <div style={{ fontSize: 58 }}>🎨</div>
        <div style={{ fontFamily: "monospace", fontSize: 34, fontWeight: 700, color: "#FFD166", direction: "ltr" }}>
          .card {"{}"}
        </div>
      </div>

      {/* down to the result */}
      <svg
        width={70}
        height={110}
        viewBox="0 0 70 110"
        style={{
          position: "absolute",
          left: 505,
          top: 930,
          opacity: down,
          transform: `translateY(${(1 - down) * -18}px)`,
        }}
      >
        <path
          d="M35 6 L35 92 M35 92 L15 70 M35 92 L55 70"
          stroke={C_GOLD}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1080,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, res),
          transform: `translateY(${(1 - res) * 40}px)`,
        }}
      >
        <DemoCard lifted={0.1} white={1} pad={30} width={540} />
      </div>

      <SparkleBurst start={104} x={540} y={1300} count={24} radius={420} duration={34} />
    </SceneShell>
  );
};
