import React from "react";
import { interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop, rand } from "../theme";
import { Badge, SceneShell } from "../ui";

// Spec headline, popped on the rhythm of the voice.mp3 hype line:
// "VS Code هو البداية الحقيقية" 25.38-27.60s, "لأي مبرمج مواقع" 27.60-29.16s
// (scene starts at 25.38s).
const WORDS = [
  { text: "البداية", delay: 10 },
  { text: "الحقيقية", delay: 30 },
  { text: "للمبرمجين", delay: 48 },
  { text: "🚀", delay: 68 },
];

/** 25.4-29.2s (voice.mp3): energetic build-up moment. */
export const HypeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const camZoom = interpolate(frame, [0, 130], [0.94, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const warm = 0.55 + 0.45 * Math.sin(t * 2.6);
  const sparks = Array.from({ length: 26 }, (_, i) => ({
    x: rand(i * 4.4) * 1000 - 40,
    y: 1500 - ((t * (160 + rand(i) * 180) + rand(i * 2) * 1600) % 1700),
    size: 6 + rand(i * 6.1) * 12,
    opacity: 0.3 + rand(i * 3.3) * 0.6,
  }));

  return (
    <SceneShell>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 46% at 50% 52%, rgba(255,107,53,0.34) 0%, rgba(255,215,0,0.12) 42%, transparent 72%)",
          opacity: warm,
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
            background: i % 3 === 0 ? COLORS.gold : COLORS.orange,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2.4}px ${i % 3 === 0 ? COLORS.gold : COLORS.orange}`,
          }}
        />
      ))}
      <div
        style={{
          scale: `${camZoom}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={fadeUp(frame, 0, 16)}>
          <Badge text="🔥 خطوتك الأولى" color={COLORS.orange} />
        </div>
        <div style={{ height: 40 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap", justifyContent: "center" }}>
            {WORDS.map((w) => {
              const s = pop(frame, fps, w.delay);
              return (
                <div
                  key={w.text}
                  style={{
                    scale: `${s}`,
                    opacity: Math.min(1, s),
                    fontSize: w.text === "🚀" ? 130 : 108,
                    fontWeight: 900,
                    color: "#fff",
                    textShadow:
                      "0 8px 40px rgba(255,107,53,0.65), 0 0 60px rgba(255,215,0,0.35)",
                    lineHeight: 1.25,
                  }}
                >
                  {w.text}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ height: 46 }} />
        <div
          style={{
            ...fadeUp(frame, 66, 86),
            fontSize: 54,
            fontWeight: 800,
            color: COLORS.gold,
            textShadow: "0 0 30px rgba(255,215,0,0.45)",
          }}
        >
          لأي مبرمج مواقع! 💪
        </div>
      </div>
    </SceneShell>
  );
};
