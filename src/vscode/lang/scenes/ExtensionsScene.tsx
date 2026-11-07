import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, MONO, fadeUp, pop } from "../../theme";
import { FileDoc } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const ITEMS = [
  {
    emoji: "🌐",
    ext: ".html",
    name: "HTML",
    color: "#E44D26",
    text: "#FF7A4D",
    icon: "#E44D26",
    iconLabel: "#FFFFFF",
    x: 80,
    y: 30,
    z: -30,
    ry: -16,
    delay: 52,
    seed: 0,
  },
  {
    emoji: "🎨",
    ext: ".css",
    name: "CSS",
    color: "#3B82F6",
    text: "#7EB1FF",
    icon: "#264DE4",
    iconLabel: "#FFFFFF",
    x: 570,
    y: 0,
    z: 60,
    ry: 16,
    delay: 104,
    seed: 1,
  },
  {
    emoji: "🐍",
    ext: ".py",
    name: "Python",
    color: "#FFD43B",
    text: "#FFD43B",
    icon: "#3776AB",
    iconLabel: "#FFD43B",
    x: 140,
    y: 450,
    z: 80,
    ry: 12,
    delay: 158,
    seed: 2,
  },
  {
    emoji: "⚡",
    ext: ".js",
    name: "JavaScript",
    color: COLORS.gold,
    text: "#F7DF1E",
    icon: "#F7DF1E",
    iconLabel: "#14182E",
    x: 620,
    y: 430,
    z: -60,
    ry: -14,
    delay: 210,
    seed: 3,
  },
];

const ROW_TOP = 1060;
const ROW_H = 150;
const ROW_GAP = 30;

/** 13.8-23.1s: four extensions floating in 3D, each paired with its language. */
export const ExtensionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const swayY = Math.sin(t * 0.5) * 7;
  const swayX = Math.sin(t * 0.38 + 1) * 4;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* ---------- 3D stage ---------- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 150,
          width: 1080,
          height: 850,
          perspective: 1500,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateX(${swayX}deg) rotateY(${swayY}deg)`,
          }}
        >
          {ITEMS.map((it) => {
            const s = pop(frame, fps, 6 + it.seed * 12);
            const hi = interpolate(frame, [it.delay, it.delay + 20], [0, 1], clamp);
            const glow = 0.55 + 0.45 * Math.sin(t * 3 + it.seed * 1.6);
            const bob = Math.sin(t * 1.35 + it.seed * 1.7) * 18;
            return (
              <div
                key={it.ext}
                style={{
                  position: "absolute",
                  left: it.x,
                  top: it.y,
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${it.z}px) rotateY(${
                    it.ry + Math.sin(t * 0.9 + it.seed) * 9
                  }deg) rotateX(${Math.sin(t * 0.75 + it.seed * 2) * 7}deg) translateY(${
                    bob - (1 - s) * 120
                  }px) scale(${s * (1 + hi * 0.12)})`,
                  opacity: Math.min(1, s),
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 430,
                    height: 480,
                    translate: "-50% -50%",
                    background: `radial-gradient(ellipse at center, ${it.icon}AA 0%, ${it.icon}44 40%, transparent 72%)`,
                    opacity: (0.35 + glow * 0.25) * (1 + hi * 0.5),
                  }}
                />
                <div style={{ position: "relative", filter: `brightness(${1 + hi * 0.35})` }}>
                  <FileDoc
                    label={it.ext}
                    color={it.icon}
                    labelColor={it.iconLabel}
                    width={210}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- sequential copy ---------- */}
      {ITEMS.map((it, i) => {
        const s = pop(frame, fps, it.delay);
        const slide = (1 - s) * 90;
        const hi = interpolate(frame, [it.delay, it.delay + 20], [0, 1], clamp);
        return (
          <div
            key={it.ext}
            style={{
              position: "absolute",
              top: ROW_TOP + i * (ROW_H + ROW_GAP),
              left: 80,
              right: 80,
              height: ROW_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
              direction: "ltr",
              borderRadius: 30,
              background: "rgba(8,13,38,0.82)",
              border: `3px solid ${it.color}`,
              boxShadow: `0 0 ${26 + hi * 46}px ${it.color}66, 0 18px 44px rgba(0,0,0,0.5)`,
              opacity: Math.min(1, s),
              transform: `translateX(${slide}px) scale(${0.92 + 0.08 * s})`,
              zIndex: 12,
            }}
          >
            <span style={{ fontSize: 62, lineHeight: 1 }}>{it.emoji}</span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 58,
                fontWeight: 900,
                color: it.text,
                textShadow: `0 0 26px ${it.color}`,
              }}
            >
              {it.ext}
            </span>
            <span style={{ fontSize: 56, fontWeight: 900, color: "#fff" }}>
              = {it.name}
            </span>
          </div>
        );
      })}

      {/* stage floor reflection */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 985,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, rgba(125,211,252,0.6), rgba(168,85,247,0.6), transparent)",
          opacity: fadeUp(frame, 0, 20).opacity,
        }}
      />
    </AbsoluteFill>
  );
};
