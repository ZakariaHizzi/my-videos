import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import {
  BrowserFrame,
  C_CYAN,
  C_GOLD,
  NotePill,
  SparkleBurst,
  clamp,
  popAt,
} from "../../css/parts";
import { BoringSite, ElegantSite, SceneShell } from "../parts";

/**
 * 0-6s hook: curious presenter in front of a boring website that
 * magically transforms into an elegant Arabic (Cairo) website.
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const h1 = popAt(frame, fps, 2);
  const h2 = popAt(frame, fps, 14);
  const site = popAt(frame, fps, 8, 14, 140);
  const pres = popAt(frame, fps, 6, 14, 130);
  const qm = popAt(frame, fps, 30);

  const morph = interpolate(frame, [58, 96], [0, 1], clamp);
  const flash = interpolate(frame, [58, 64, 84], [0, 0.9, 0], clamp);
  const glow = 0.5 + 0.5 * Math.sin(t * 5);

  return (
    <SceneShell seed={1}>
      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 112,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, h1),
          transform: `scale(${0.75 + 0.25 * h1})`,
          zIndex: 30,
        }}
      >
        <NotePill color={C_CYAN} fontSize={46}>
          عايز تعرف إزاي موقعك يبقى احترافي؟ ✍️
        </NotePill>
      </div>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, h2),
          transform: `translateY(${(1 - h2) * 30}px) scale(${0.7 + 0.3 * h2})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: "18px 46px",
            borderRadius: 20,
            background: "linear-gradient(180deg,#FFE866,#FFD700 60%,#F5B301)",
            color: "#14182E",
            fontFamily: FONT,
            fontSize: 64,
            fontWeight: 900,
            border: "3px solid #FFF3B0",
            boxShadow: `0 0 ${34 + glow * 44}px rgba(255,215,0,0.6), 0 16px 40px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          5 أدوات سحرية!
        </div>
      </div>

      {/* website behind the presenter */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 376,
          width: 880,
          zIndex: 6,
          opacity: Math.min(1, site),
          transform: `scale(${0.92 + 0.08 * site})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserFrame
          width={880}
          url={morph > 0.5 ? "my-modern-site.com" : "my-first-site.html"}
          style={{
            boxShadow:
              morph > 0.5
                ? `0 30px 80px rgba(0,0,0,0.6), 0 0 ${50 + glow * 40}px ${C_GOLD}66`
                : "0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ position: "relative", minHeight: 560 }}>
            <BoringSite />
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
                <ElegantSite frame={frame} />
              </div>
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFFFFF",
                opacity: flash,
                pointerEvents: "none",
              }}
            />
          </div>
        </BrowserFrame>
      </div>

      {/* presenter in front, looking curious */}
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 940,
          width: 620,
          zIndex: 12,
          opacity: Math.min(1, pres),
          transform: `translateY(${(1 - pres) * 60}px)`,
        }}
      ></div>

      {/* curious marks */}
      <div
        style={{
          position: "absolute",
          left: 262,
          top: 1160,
          fontSize: 78,
          fontFamily: FONT,
          fontWeight: 900,
          color: C_GOLD,
          opacity: Math.min(1, qm),
          transform: `translateY(${Math.sin(t * 2.4) * 12}px) rotate(-14deg) scale(${0.6 + 0.4 * qm})`,
          filter: `drop-shadow(0 0 18px ${C_GOLD})`,
          zIndex: 14,
        }}
      >
        ؟
      </div>
      <div
        style={{
          position: "absolute",
          left: 772,
          top: 1116,
          fontSize: 66,
          fontFamily: FONT,
          fontWeight: 900,
          color: C_CYAN,
          opacity: Math.min(1, qm),
          transform: `translateY(${Math.sin(t * 2.1 + 1) * 14}px) rotate(12deg) scale(${0.6 + 0.4 * qm})`,
          filter: `drop-shadow(0 0 18px ${C_CYAN})`,
          zIndex: 14,
        }}
      >
        ?
      </div>

      <SparkleBurst
        start={58}
        x={540}
        y={690}
        count={24}
        radius={420}
        duration={36}
      />
    </SceneShell>
  );
};
