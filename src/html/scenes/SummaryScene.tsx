import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Page skeleton drawn as glowing "bones" (X-ray style). */
const BONES = [
  { x: 50, y: 50, w: 620, h: 64, r: 26 },
  { x: 50, y: 148, w: 620, h: 190, r: 26 },
  { x: 50, y: 372, w: 190, h: 130, r: 22 },
  { x: 265, y: 372, w: 190, h: 130, r: 22 },
  { x: 480, y: 372, w: 190, h: 130, r: 22 },
  { x: 50, y: 536, w: 400, h: 34, r: 17 },
  { x: 50, y: 590, w: 300, h: 34, r: 17 },
  { x: 50, y: 648, w: 620, h: 74, r: 26 },
];

const CARD = { x: 180, y: 700, w: 720, h: 780 };

/** 45-53s: the takeaway - HTML is the skeleton of a website. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 6, 30);
  const card = spring({ frame: frame - 26, fps, config: { damping: 14, stiffness: 150 } });
  const boneBadge = spring({ frame: frame - 78, fps, config: { damping: 10, stiffness: 200 } });
  const shine = interpolate(frame, [0, 160], [-30, 130], clamp);
  const glow = 0.45 + 0.55 * Math.sin(t * 3.4);
  const scanY = ((t * 190) % (CARD.h + 160)) - 80;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={20} seed={9} />

      {/* warm halo behind the card */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 1080,
          width: 1500,
          height: 1400,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.42) 0%, rgba(37,99,235,0.2) 45%, transparent 72%)",
          zIndex: 2,
        }}
      />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 70,
          right: 70,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <div
          style={{
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1.4,
            backgroundImage:
              "linear-gradient(105deg, #22D3EE 0%, #60A5FA 30%, #A855F7 60%, #FFD700 100%)",
            backgroundSize: "220% 100%",
            backgroundPosition: `${shine}% 0`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 26px rgba(168,85,247,0.7)) drop-shadow(0 14px 38px rgba(0,0,0,0.6))",
          }}
        >
          <span style={{ direction: "ltr", unicodeBidi: "isolate" }}>HTML</span>
          <span> = الهيكل العظمي</span>
          <br />
          <span>لموقع 🦴</span>
        </div>
      </div>

      {/* x-ray card */}
      <div
        style={{
          position: "absolute",
          left: CARD.x,
          top: CARD.y,
          width: CARD.w,
          height: CARD.h,
          borderRadius: 44,
          background:
            "linear-gradient(160deg, rgba(8,14,42,0.96) 0%, rgba(20,12,54,0.96) 100%)",
          border: "3px solid rgba(125,211,252,0.4)",
          boxShadow:
            "0 40px 90px rgba(0,0,0,0.6), 0 0 70px rgba(59,130,246,0.3), inset 0 0 70px rgba(59,130,246,0.14)",
          overflow: "hidden",
          opacity: Math.min(1, card),
          transform: `scale(${0.86 + 0.14 * card}) translateY(${(1 - card) * 50}px)`,
          zIndex: 10,
          direction: "ltr",
        }}
      >
        {/* bones */}
        {BONES.map((b, i) => {
          const p = spring({
            frame: frame - (40 + i * 9),
            fps,
            config: { damping: 13, stiffness: 160 },
          });
          if (p <= 0.001) return null;
          const pulse = 0.75 + 0.25 * Math.sin(t * 3 + i * 0.7);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: b.x,
                top: b.y,
                width: b.w,
                height: b.h,
                borderRadius: b.r,
                background: `rgba(255,255,255,${0.94 * pulse})`,
                boxShadow: `0 0 ${20 + glow * 30}px rgba(255,255,255,${0.7 * pulse}), inset 0 0 22px rgba(180,215,255,0.55)`,
                opacity: Math.min(1, p),
                transform: `scale(${0.7 + 0.3 * p})`,
              }}
            />
          );
        })}

        {/* scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: CARD.w,
            top: scanY,
            height: 5,
            background:
              "linear-gradient(90deg, transparent, rgba(34,211,238,0.95), transparent)",
            boxShadow: "0 0 34px rgba(34,211,238,0.9)",
            opacity: 0.9,
          }}
        />
      </div>

      {/* bone badge */}
      <div
        style={{
          position: "absolute",
          left: CARD.x + CARD.w - 130,
          top: CARD.y - 60,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
          border: "6px solid #FFFFFF",
          boxShadow: `0 0 ${40 + glow * 46}px rgba(255,215,0,0.8), 0 22px 50px rgba(0,0,0,0.55)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 86,
          opacity: Math.min(1, boneBadge * 1.4),
          transform: `scale(${0.3 + 0.7 * boneBadge}) rotate(${(1 - boneBadge) * -30 + Math.sin(t * 2.2) * 6}deg)`,
          zIndex: 20,
        }}
      >
        🦴
      </div>

      {/* bottom sparkle row */}
      <div
        style={{
          position: "absolute",
          top: 1580,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          gap: 26,
          zIndex: 12,
          opacity: Math.min(1, Math.max(0, (frame - 86) / 24)),
        }}
      >
        {["🧠", "🧍", "👁️"].map((g, i) => (
          <div
            key={g}
            style={{
              width: 116,
              height: 116,
              borderRadius: "50%",
              background: "rgba(6,10,30,0.9)",
              border: "3px solid rgba(255,255,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              transform: `translateY(${Math.sin(t * 2 + i * 1.1) * 10}px)`,
              boxShadow: "0 0 34px rgba(59,130,246,0.35)",
            }}
          >
            {g}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
