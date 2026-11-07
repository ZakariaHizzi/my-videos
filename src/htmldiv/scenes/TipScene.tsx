import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, popAt } from "../../css/parts";
import { Caption, Chip, C_RED, SceneShell } from "../parts";

/** Three nested divs — the "div soup" we are warning about. */
const Nest: React.FC<{ frame: number; fps: number; warn: number }> = ({ frame, fps, warn }) => {
  const on = interpolate(frame, [34, 54], [0, 1], clamp);
  const layers = [
    { inset: 0, d: 34 },
    { inset: 96, d: 48 },
    { inset: 192, d: 62 },
  ];
  const W = 880;
  const H = 880;
  return (
    <div style={{ position: "relative", width: W, height: H, opacity: Math.min(1, on) }}>
      {layers.map((l, i) => {
        const s = popAt(frame, fps, l.d, 13, 160);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: l.inset,
              top: l.inset,
              right: l.inset,
              bottom: l.inset,
              borderRadius: 30,
              border: `5px ${i === 2 ? "solid" : "dashed"} ${i === 2 ? "#FDBA74" : "rgba(255,92,92,0.85)"}`,
              background: i === 2 ? "rgba(255,92,92,0.16)" : "transparent",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 24,
              boxSizing: "border-box",
              opacity: Math.min(1, s),
              transform: `scale(${0.7 + 0.3 * s})`,
              boxShadow: warn > 0.01 ? `0 0 ${20 + warn * 30}px rgba(255,92,92,${warn * 0.7})` : "none",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 44,
                fontWeight: 700,
                color: i === 2 ? "#FDBA74" : "#FF8A8A",
                direction: "ltr",
              }}
            >
              {"<div>"}
            </span>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          right: -34,
          top: -44,
          fontSize: 110,
          opacity: warn,
          transform: `scale(${0.4 + 0.6 * warn}) rotate(${(1 - warn) * -40}deg)`,
          filter: "drop-shadow(0 0 22px rgba(255,60,60,0.9))",
        }}
      >
        ❌
      </div>
    </div>
  );
};

/** 53-58s: golden tip — do not stack divs without a reason. */
export const TipScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const warn = interpolate(frame, [58, 80], [0, 1], clamp);
  const fix = popAt(frame, fps, 74, 14, 200);
  const pulse = 1 + 0.09 * Math.sin(t * 6);

  return (
    <SceneShell seed={7}>
      <Caption appear={4} color={C_RED} fontSize={54} style={{ top: 140 }}>
        ⚠️ لا تكثر من div بدون سبب!
      </Caption>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 340,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Nest frame={frame} fps={fps} warn={warn} />
      </div>

      {/* big warning badge */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 1080,
          fontSize: 150,
          opacity: Math.min(1, warn),
          transform: `scale(${(0.4 + 0.6 * warn) * pulse})`,
          filter: "drop-shadow(0 0 30px rgba(255,60,60,0.95))",
          zIndex: 14,
        }}
      >
        ⚠️
      </div>

      {/* the fix: semantic tags instead of div soup */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1330,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, fix),
          transform: `translateY(${(1 - fix) * 44}px)`,
          zIndex: 12,
        }}
      >
        <div
          style={{
            padding: "24px 46px",
            borderRadius: 20,
            background: "rgba(16,185,129,0.14)",
            border: "4px solid #34D399",
            boxShadow: "0 0 34px rgba(52,211,153,0.45)",
            fontSize: 46,
            fontWeight: 800,
            color: "#A7F3D0",
            whiteSpace: "nowrap",
          }}
        >
          ✅ الحل: استخدم &lt;section&gt; أو &lt;header&gt;
        </div>
      </div>

      <Chip label="<section>" x={110} y={1560} color="#34D399" appear={96} rotate={-6} />
      <Chip label="<header>" x={640} y={1590} color="#22D3EE" appear={106} rotate={5} />
      <Chip label="<div>" x={330} y={1730} color={C_RED} appear={116} rotate={4} />
    </SceneShell>
  );
};
