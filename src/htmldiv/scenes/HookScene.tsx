import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame, SparkleBurst, clamp, popAt } from "../../css/parts";
import { Caption, Chip, C_GOLD, C_DIV, SceneShell } from "../parts";
import { CleanSite, MessySite } from "../art";

/**
 * 0-6s hook — a scattered website magically snaps into a clean,
 * sectioned one.
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const site = popAt(frame, fps, 8, 14, 140);
  const glow = 0.5 + 0.5 * Math.sin(t * 5);

  const morph = interpolate(frame, [64, 104], [0, 1], clamp);
  const flash = interpolate(frame, [64, 70, 92], [0, 0.9, 0], clamp);

  return (
    <SceneShell seed={1}>
      <Caption appear={2} color="#22D3EE" fontSize={54} style={{ top: 170 }}>
        عايز تعرف إزاي تنظم موقعك؟ 📦
      </Caption>

      <Caption appear={34} color={C_GOLD} fontSize={64} style={{ top: 380 }}>
        <span
          style={{
            background: "linear-gradient(180deg,#FFE866,#FFD700 60%,#F5B301)",
            color: "#14182E",
            padding: "4px 22px",
            borderRadius: 14,
            boxShadow: `0 0 ${28 + glow * 40}px rgba(255,215,0,0.65)`,
          }}
        >
          السر في div!
        </span>
      </Caption>

      {/* the website transforming from messy to clean */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 660,
          width: 940,
          zIndex: 6,
          opacity: Math.min(1, site),
          transform: `scale(${0.92 + 0.08 * site})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserFrame
          width={940}
          url={morph > 0.5 ? "my-clean-site.com" : "my-messy-site.html"}
          bodyStyle={{ background: "#FFFFFF" }}
          style={{
            boxShadow:
              morph > 0.5
                ? `0 30px 80px rgba(0,0,0,0.6), 0 0 ${50 + glow * 40}px rgba(255,215,0,0.5)`
                : "0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
            <MessySite />
            {morph > 0 ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: morph,
                  transform: `scale(${0.9 + 0.1 * morph})`,
                  overflow: "hidden",
                }}
              >
                <CleanSite />
              </div>
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFFFFF",
                opacity: flash,
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          </div>
        </BrowserFrame>
      </div>

      <Chip label="<div>" x={90} y={1430} color={C_DIV} appear={58} rotate={-7} />
      <Chip label="<section>" x={560} y={1400} color="#22D3EE" appear={66} rotate={6} />
      <Chip label="<header>" x={150} y={1620} color={C_GOLD} appear={74} rotate={5} />
      <Chip label="<footer>" x={640} y={1650} color="#A855F7" appear={82} rotate={-6} />

      <SparkleBurst start={64} x={540} y={950} count={26} radius={430} duration={40} />
    </SceneShell>
  );
};
