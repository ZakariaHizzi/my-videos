import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp, pop, rand } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const BTN = { x: 250, y: 1230, w: 580, h: 186 };

const PersonPlus: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <circle cx="9" cy="7.5" r="4.2" fill="currentColor" />
    <path d="M1.6 20.4c0-4.1 3.3-7 7.4-7s7.4 2.9 7.4 7" fill="currentColor" />
    <path d="M19 8.5v6M16 11.5h6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

/** 53-60s: closing call to action with a glowing follow button. */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line1 = fadeUp(frame, 2, 16);
  const line2 = pop(frame, fps, 14);
  const btn = spring({ frame: frame - 26, fps, config: { damping: 12, stiffness: 200 } });

  const pulse = 0.55 + 0.45 * Math.sin(t * 6.2);
  const shine = interpolate(frame, [4, 80], [-40, 140], clamp);

  const sparks = Array.from({ length: 20 }, (_, i) => ({
    x: rand(i * 6.1) * 1040,
    y: 1920 - ((t * (160 + rand(i) * 180) + rand(i * 3.7) * 1800) % 1860),
    size: 8 + rand(i * 2.3) * 14,
    c: i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.purple : COLORS.cyan,
    o: 0.2 + rand(i * 5.5) * 0.55,
  }));

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={10} />

      {/* halo */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 1150,
          width: 1500,
          height: 1400,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.26) 0%, rgba(168,85,247,0.24) 45%, transparent 72%)",
          zIndex: 2,
        }}
      />

      {sparks.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.c,
            opacity: s.o,
            boxShadow: `0 0 ${s.size * 2.4}px ${s.c}`,
            zIndex: 3,
          }}
        />
      ))}

      {/* line 1 */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 50,
          right: 50,
          zIndex: 26,
          opacity: line1.opacity,
          transform: line1.translate,
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: "rgba(255,255,255,0.95)",
            lineHeight: 1.45,
            textShadow: "0 10px 36px rgba(0,0,0,0.6)",
          }}
        >
          إن كنت مهتم بمفاهيم البرمجة
        </div>
      </div>

      {/* line 2 */}
      <div
        style={{
          position: "absolute",
          top: 810,
          left: 40,
          right: 40,
          zIndex: 26,
          opacity: Math.min(1, line2 * 1.4),
          transform: `scale(${0.6 + 0.4 * line2})`,
        }}
      >
        <div
          style={{
            fontSize: 126,
            fontWeight: 900,
            lineHeight: 1.25,
            backgroundImage: "linear-gradient(105deg,#FFE680 0%,#FFD700 42%,#F5A623 100%)",
            backgroundSize: "220% 100%",
            backgroundPosition: `${shine}% 0`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${22 + pulse * 40}px rgba(255,215,0,0.85)) drop-shadow(0 14px 40px rgba(0,0,0,0.55))`,
          }}
        >
          تابعني! 👇
        </div>
      </div>

      {/* pointing chevrons toward the button */}
      <div
        style={{
          position: "absolute",
          top: 1010,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 24,
          opacity: Math.min(1, Math.max(0, (frame - 40) / 16)),
        }}
      >
        {[0, 1].map((i) => {
          const local = ((t * 1.9 + i * 0.5) % 1);
          return (
            <svg
              key={i}
              width={70}
              height={44}
              viewBox="0 0 24 16"
              style={{
                opacity: 0.35 + 0.65 * (1 - Math.abs(local * 2 - 1)),
                translate: `0px ${local * 14}px`,
              }}
            >
              <path
                d="M3 3 L12 12 L21 3"
                stroke={COLORS.gold}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          );
        })}
      </div>

      {/* follow button */}
      <div
        style={{
          position: "absolute",
          left: BTN.x,
          top: BTN.y,
          width: BTN.w,
          height: BTN.h,
          zIndex: 20,
          opacity: Math.min(1, btn),
          transform: `scale(${btn * (1 + 0.028 * Math.sin(t * 5.6))})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: BTN.h,
            background:
              "radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, rgba(168,85,247,0.18) 45%, transparent 72%)",
            opacity: 0.6 + pulse * 0.4,
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: BTN.h / 2,
            padding: 8,
            background: "linear-gradient(95deg,#FFD700,#A855F7 55%,#22D3EE)",
            boxShadow: `0 0 ${40 + pulse * 50}px rgba(255,215,0,0.7), 0 24px 54px rgba(0,0,0,0.6)`,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              borderRadius: BTN.h / 2,
              background: "linear-gradient(95deg,#152C7A,#4C1D95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                color: COLORS.gold,
                display: "inline-flex",
                filter: "drop-shadow(0 0 16px rgba(255,215,0,0.85))",
              }}
            >
              <PersonPlus size={60} />
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1,
                textShadow: "0 6px 22px rgba(0,0,0,0.45)",
              }}
            >
              تابعني
            </span>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shine}%`,
                width: 120,
                background:
                  "linear-gradient(100deg, transparent, rgba(255,255,255,0.42), transparent)",
                transform: "skewX(-18deg)",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
