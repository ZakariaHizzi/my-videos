import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { clamp, fadeUp } from "../parts";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line1 = fadeUp(frame, 2, 20);
  const gold = spring({ frame: frame - 26, fps, config: { damping: 11, stiffness: 170 } });
  const btn = spring({ frame: frame - 16, fps, config: { damping: 10, stiffness: 180 } });
  const arrow = spring({ frame: frame - 40, fps, config: { damping: 8, stiffness: 200 } });

  const goldGlow = 0.5 + 0.5 * Math.sin(t * 4.5);
  const btnGlow = 0.5 + 0.5 * Math.sin(t * 5.5 + 1);
  const ring = interpolate(frame, [34, 60], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={26} seed={33} colors={["#FFD700", "#22D3EE", "#A855F7"]} />

      <div
        style={{
          position: "absolute",
          left: 90,
          top: 520,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.16) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 420,
          left: 50,
          right: 50,
          zIndex: 20,
          opacity: line1.opacity,
          transform: line1.translate,
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 10px 36px rgba(0,0,0,0.6)",
            lineHeight: 1.5,
          }}
        >
          إن كنت مهتم بمفاهيم البرمجة
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 580,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: Math.min(1, gold * 1.4),
          transform: `scale(${0.55 + 0.45 * gold})`,
        }}
      >
        <div
          style={{
            fontSize: 132,
            fontWeight: 900,
            background: "linear-gradient(180deg, #FFF3B0 0%, #FFD700 55%, #E8A800 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${18 + goldGlow * 34}px rgba(255,215,0,${
              0.55 + goldGlow * 0.4
            })) drop-shadow(0 14px 30px rgba(0,0,0,0.55))`,
            lineHeight: 1.25,
          }}
        >
          تابعني! 👇
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 960,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 34,
          zIndex: 24,
          opacity: Math.min(1, btn * 1.4),
          transform: `scale(${0.6 + 0.4 * btn})`,
        }}
      >
        <div
          style={{
            position: "relative",
            padding: "30px 88px",
            borderRadius: 100,
            background: "linear-gradient(90deg, #22D3EE, #6366F1, #A855F7)",
            color: "#FFFFFF",
            fontSize: 62,
            fontWeight: 900,
            boxShadow: `0 0 ${
              34 + btnGlow * 44
            }px rgba(99,102,241,${0.55 + btnGlow * 0.35}), 0 22px 50px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          👇 تابعني
          {ring > 0 && ring < 1 ? (
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 100,
                border: `6px solid rgba(255,255,255,${0.9 * (1 - ring)})`,
                transform: `scale(${1 + ring * 0.4})`,
                pointerEvents: "none",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            fontSize: 84,
            transformOrigin: "50% 20%",
            transform: `rotate(${
              Math.sin((Math.max(0, frame - 40) / fps) * 14) *
              18 *
              Math.max(0, 1 - arrow * 0.4)
            }deg) scale(${0.6 + 0.4 * arrow})`,
            filter: `drop-shadow(0 0 ${16 + btnGlow * 22}px rgba(255,215,0,0.6))`,
          }}
        >
          👇
        </div>
      </div>
    </AbsoluteFill>
  );
};
