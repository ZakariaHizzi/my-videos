import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop, rand } from "../theme";
import { SceneShell } from "../ui";

/** 29.2-32.5s (voice.mp3): call to action. */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Synced to the voice.mp3 CTA: "لو كنت مهتم بمفاهيم البرمجة" 29.16-31.24s,
  // "تابعني" 31.24-32.03s (scene starts at 29.16s).
  const line1 = fadeUp(frame, 3, 22);
  const line2 = pop(frame, fps, 62);
  const glow = 0.55 + 0.45 * Math.sin(t * 3.2);
  const arrow = pop(frame, fps, 72);
  const btn = pop(frame, fps, 78);
  const arrowBob = Math.sin(t * 5.5) * 16;

  const rays = Array.from({ length: 30 }, (_, i) => ({
    angle: (i * 360) / 30 + t * 10,
    len: 260 + rand(i * 3.7) * 260,
    opacity: 0.1 + rand(i * 5.2) * 0.25,
    width: 3 + rand(i * 8.8) * 6,
  }));

  return (
    <SceneShell>
      {/* golden burst behind the CTA */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "58%",
          width: 0,
          height: 0,
          opacity: 0.8,
        }}
      >
        {rays.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: r.len,
              height: r.width,
              borderRadius: 10,
              background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
              opacity: r.opacity,
              transformOrigin: "0% 50%",
              transform: `rotate(${r.angle}deg)`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          ...line1,
          fontSize: 68,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.45,
          maxWidth: 900,
        }}
      >
        إن كنت مهتم بمفاهيم البرمجة
      </div>
      <div style={{ height: 26 }} />
      <div
        style={{
          scale: `${line2}`,
          opacity: Math.min(1, line2),
          fontSize: 128,
          fontWeight: 900,
          color: COLORS.gold,
          lineHeight: 1.25,
          textShadow: `0 0 ${24 + glow * 40}px rgba(255,215,0,${0.55 + glow * 0.45}), 0 10px 40px rgba(0,0,0,0.4)`,
        }}
      >
        تابعني! 👇
      </div>
      <div style={{ height: 54 }} />

      {/* arrow pointing at the button */}
      <div
        style={{
          scale: `${arrow}`,
          opacity: Math.min(1, arrow),
          fontSize: 72,
          translate: `0px ${arrowBob}px`,
          filter: `drop-shadow(0 0 18px rgba(255,215,0,${0.4 + glow * 0.5}))`,
        }}
      >
        ⬇️
      </div>
      <div style={{ height: 12 }} />
      <div
        style={{
          scale: `${btn * (1 + 0.045 * Math.sin(t * 4.4))}`,
          opacity: Math.min(1, btn),
          width: 820,
          borderRadius: 100,
          background: "linear-gradient(90deg,#2563EB,#7C3AED,#FFD700)",
          padding: 6,
          boxShadow: `0 0 60px rgba(255,215,0,0.45), 0 22px 60px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          style={{
            borderRadius: 100,
            background: "linear-gradient(90deg,#1D4ED8,#6D28D9)",
            padding: "30px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <span style={{ fontSize: 62 }}>🔔</span>
          <span style={{ fontSize: 64, fontWeight: 900, color: "#fff" }}>
            اضغط متابعة
          </span>
        </div>
      </div>
      <div style={{ height: 30 }} />
      <div
        style={{
          ...fadeUp(frame, 86, 98),
          fontSize: 42,
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        مفاهيم برمجة • شرح عربي • من الصفر
      </div>
    </SceneShell>
  );
};
