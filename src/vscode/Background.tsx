import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, rand } from "./theme";

/** Dark blue/purple stage with a grid, glow orbs and rising digital particles. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const orbs = [
    { x: 180, y: 340, s: 620, c: "#2563EB", o: 0.5 },
    { x: 880, y: 780, s: 700, c: "#7C3AED", o: 0.45 },
    { x: 300, y: 1450, s: 760, c: "#4338CA", o: 0.4 },
    { x: 860, y: 1740, s: 520, c: "#A855F7", o: 0.35 },
  ];

  const particles = Array.from({ length: 46 }, (_, i) => {
    const speed = 0.35 + rand(i * 3.1) * 0.75;
    const y = 1980 - ((t * 130 * speed + rand(i) * 2100) % 2100);
    const size = 5 + rand(i * 7.7) * 11;
    const colors = ["#60A5FA", "#A855F7", "#FFD700", "#22D3EE"];
    return {
      x: rand(i * 5.3) * 1080,
      y,
      size,
      color: colors[i % colors.length],
      opacity: 0.25 + rand(i * 2.2) * 0.55,
      blur: rand(i * 9.4) > 0.6 ? 3 : 0,
    };
  });

  const symbols = [
    { s: "</>", x: 80, y: 250, d: 0 },
    { s: "{}", x: 880, y: 330, d: 1.2 },
    { s: "#", x: 110, y: 1620, d: 2.1 },
    { s: ";", x: 900, y: 1520, d: 0.7 },
    { s: "λ", x: 120, y: 1050, d: 1.8 },
    { s: "/>", x: 870, y: 1120, d: 2.6 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(175deg, ${COLORS.bgDeep} 0%, ${COLORS.bg} 34%, ${COLORS.bgPurple} 68%, #120B33 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(ellipse 95% 80% at 50% 45%, black 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 80% at 50% 45%, black 25%, transparent 78%)",
        }}
      />
      {orbs.map((o, i) => {
        const pulse = 1 + 0.07 * Math.sin(t * 1.5 + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o.x - o.s / 2,
              top: o.y - o.s / 2,
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${o.c} 0%, transparent 68%)`,
              opacity: o.o,
              scale: `${pulse}`,
              filter: "blur(12px)",
            }}
          />
        );
      })}
      {symbols.map((p, i) => {
        const fy = Math.sin(t * 1.2 + p.d) * 24;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y + fy,
              fontSize: 54,
              fontWeight: 900,
              color: "rgba(255,255,255,0.16)",
              fontFamily: "monospace",
              rotate: `${Math.sin(t + p.d) * 9}deg`,
            }}
          >
            {p.s}
          </div>
        );
      })}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2.2}px ${p.color}`,
            filter: p.blur ? "blur(3px)" : undefined,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, #22D3EE, #A855F7, #FFD700)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Thin gradient playback bar pinned to the top edge. */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 44,
        right: 44,
        height: 10,
        borderRadius: 10,
        background: "rgba(255,255,255,0.16)",
        overflow: "hidden",
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: `${p * 100}%`,
          height: "100%",
          borderRadius: 10,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
        }}
      />
    </div>
  );
};
