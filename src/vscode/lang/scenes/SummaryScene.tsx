import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, pop, rand } from "../../theme";
import { VscodeLogo } from "../../mocks";
import { FileDoc } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const RING = { cx: 540, cy: 1180, r: 350 };
const LOGO = 280;

const ORBIT = [
  { label: ".js", color: "#F7DF1E", labelColor: "#1B1B1B", delay: 36 },
  { label: ".py", color: "#3572A5", labelColor: "#FFFFFF", delay: 54 },
  { label: ".html", color: "#E44D26", labelColor: "#FFFFFF", delay: 72 },
  { label: ".css", color: "#264DE4", labelColor: "#FFFFFF", delay: 90 },
];

const DOC_W = 150;

/** 35-42.8s: the takeaway line plus an orbit of file types around VS Code. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const shimmer = interpolate(frame, [90, 200], [-40, 140], clamp);
  const glow = 0.5 + 0.5 * Math.sin(t * 3.1);
  const orbit = t * 10;
  const logo = pop(frame, fps, 20);
  const warm = 0.5 + 0.3 * Math.sin(t * 1.7);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* warm key light */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 760,
          width: 1500,
          height: 1300,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(255,176,82,0.4) 0%, rgba(251,146,60,0.18) 38%, transparent 70%)",
          opacity: warm,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: RING.cy,
          width: 1400,
          height: 1200,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(59,130,246,0.22) 45%, transparent 72%)",
        }}
      />

      {/* sparkle field */}
      {Array.from({ length: 22 }, (_, i) => {
        const x = rand(i * 4.7) * 1040;
        const y = 120 + rand(i * 8.3) * 1650;
        const size = 8 + rand(i * 2.9) * 16;
        const tw = 0.25 + 0.75 * Math.abs(Math.sin(t * 2.6 + i * 0.9));
        const c = [COLORS.gold, COLORS.cyan, "#FFFFFF"][i % 3];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y + Math.sin(t * 1.2 + i) * 22,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity: tw * 0.75,
              boxShadow: `0 0 ${size * 2.4}px ${c}`,
              zIndex: 4,
            }}
          />
        );
      })}

      {/* dashed orbit track */}
      <svg
        width={RING.r * 2 + 40}
        height={RING.r * 2 + 40}
        viewBox={`0 0 ${RING.r * 2 + 40} ${RING.r * 2 + 40}`}
        style={{
          position: "absolute",
          left: RING.cx - RING.r - 20,
          top: RING.cy - RING.r - 20,
          zIndex: 5,
        }}
      >
        <circle
          cx={RING.r + 20}
          cy={RING.r + 20}
          r={RING.r}
          fill="none"
          stroke="rgba(125,211,252,0.4)"
          strokeWidth={4}
          strokeDasharray="22 30"
          strokeLinecap="round"
          style={{
            transformOrigin: `${RING.r + 20}px ${RING.r + 20}px`,
            transform: `rotate(${t * 9}deg)`,
          }}
        />
      </svg>

      {/* VS Code logo at the centre of the ring */}
      <div
        style={{
          position: "absolute",
          left: RING.cx,
          top: RING.cy,
          width: LOGO,
          height: LOGO,
          translate: "-50% -50%",
          opacity: Math.min(1, logo),
          transform: `scale(${0.5 + 0.5 * logo}) rotate(${
            Math.sin(t * 1.2) * 3
          }deg)`,
          filter: `drop-shadow(0 0 ${24 + glow * 34}px rgba(34,211,238,0.8)) drop-shadow(0 26px 54px rgba(0,0,0,0.6))`,
          zIndex: 8,
        }}
      >
        <VscodeLogo size={LOGO} />
      </div>

      {/* orbiting file types */}
      {ORBIT.map((o, i) => {
        const a = (i * 360) / ORBIT.length + orbit;
        const rad = (a * Math.PI) / 180;
        const x = RING.cx + Math.cos(rad) * RING.r;
        const y = RING.cy + Math.sin(rad) * RING.r;
        const s = pop(frame, fps, o.delay);
        const depth = 0.86 + 0.14 * (0.5 + 0.5 * Math.sin(rad));
        return (
          <div
            key={o.label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: DOC_W,
              height: DOC_W * 1.3,
              translate: "-50% -50%",
              opacity: Math.min(1, s),
              transform: `scale(${s * depth}) rotate(${
                Math.sin(t * 1.4 + i) * 6
              }deg)`,
              zIndex: 9,
            }}
          >
            <FileDoc
              label={o.label}
              color={o.color}
              labelColor={o.labelColor}
              width={DOC_W}
            />
          </div>
        );
      })}

      {/* takeaway line */}
      <div
        style={{
          position: "absolute",
          top: 158,
          left: 50,
          right: 50,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          direction: "rtl",
        }}
      >
        <GradientLine
          text="امتداد الملف = لغة البرمجة"
          size={66}
          progress={pop(frame, fps, 28)}
          glow={glow}
          shimmer={shimmer}
        />
        <GradientLine
          text="ألوان + اقتراحات + أخطاء أقل"
          size={72}
          progress={pop(frame, fps, 100)}
          glow={glow}
          shimmer={shimmer}
        />
      </div>
    </AbsoluteFill>
  );
};

const GradientLine: React.FC<{
  text: string;
  size: number;
  progress: number;
  glow: number;
  shimmer: number;
}> = ({ text, size, progress, glow, shimmer }) => (
  <div
    style={{
      opacity: Math.min(1, progress),
      transform: `translateY(${(1 - progress) * 52}px) scale(${
        0.72 + 0.28 * progress
      })`,
    }}
  >
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        backgroundImage:
          "linear-gradient(105deg, #22D3EE 0%, #60A5FA 26%, #A855F7 56%, #FFD700 100%)",
        backgroundSize: "220% 100%",
        backgroundPosition: `${shimmer}% 0`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: `drop-shadow(0 0 ${
          18 + glow * 32
        }px rgba(168,85,247,0.7)) drop-shadow(0 12px 34px rgba(0,0,0,0.55))`,
      }}
    >
      {text}
    </div>
  </div>
);
