import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, fadeUp } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { clamp } from "../parts";

/** 47.9-52.3s: call to action — glowing follow button and golden text. */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line1 = fadeUp(frame, 6, 26);
  const gold = spring({ frame: frame - 62, fps, config: { damping: 11, stiffness: 170 } });
  const btn = spring({ frame: frame - 78, fps, config: { damping: 10, stiffness: 180 } });
  const bell = spring({ frame: frame - 94, fps, config: { damping: 8, stiffness: 200 } });

  const goldGlow = 0.5 + 0.5 * Math.sin(t * 4.5);
  const btnGlow = 0.5 + 0.5 * Math.sin(t * 5.5 + 1);
  const ring = interpolate(frame, [96, 124], [0, 1], clamp);

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

      {/* soft spotlight */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 560,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.16) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* line 1 */}
      <div
        style={{
          position: "absolute",
          top: 330,
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

      {/* golden headline */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: Math.min(1, gold * 1.4),
          transform: `scale(${0.55 + 0.45 * gold})`,
        }}
      >
        <div
          style={{
            fontSize: 128,
            fontWeight: 900,
            background: "linear-gradient(180deg, #FFF3B0 0%, #FFD700 55%, #E8A800 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${18 + goldGlow * 34}px rgba(255,215,0,${0.55 + goldGlow * 0.4})) drop-shadow(0 14px 30px rgba(0,0,0,0.55))`,
            lineHeight: 1.25,
          }}
        >
          تابعني! 👇
        </div>
      </div>

      {/* follow button */}
      <div
        style={{
          position: "absolute",
          top: 880,
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
            boxShadow: `0 0 ${34 + btnGlow * 44}px rgba(99,102,241,${0.55 + btnGlow * 0.35}), 0 22px 50px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ marginLeft: 18 }}>＋</span> متابعة
          {/* click ripple */}
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

        {/* bell */}
        <div
          style={{
            fontSize: 84,
            transformOrigin: "50% 20%",
            transform: `rotate(${Math.sin(Math.max(0, frame - 94) / fps * 14) * 18 * Math.max(0, 1 - bell * 0.4)}deg) scale(${0.6 + 0.4 * bell})`,
            filter: `drop-shadow(0 0 ${16 + btnGlow * 22}px rgba(255,215,0,0.6))`,
          }}
        >
          🔔
        </div>
      </div>

      {/* rising micro particles */}
      {Array.from({ length: 14 }, (_, i) => {
        const seed = i * 3.7;
        const speed = 0.7 + (seed % 1) * 1.1;
        const y = 1900 - (((t * 190 * speed + seed * 260) % 2100));
        const size = 8 + ((seed * 13) % 14);
        const colors = ["#FFD700", "#22D3EE", "#A855F7"];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 60 + ((seed * 97) % 960),
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: colors[i % 3],
              opacity: 0.55,
              boxShadow: `0 0 ${size * 2.4}px ${colors[i % 3]}`,
              zIndex: 5,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
