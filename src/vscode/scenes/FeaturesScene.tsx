import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop } from "../theme";
import { Badge, IconTile, SceneShell } from "../ui";

// Delays synced to the voice.mp3 features line: "مجاني مية بالمية" 9.84-11.30s,
// "خفيف وسريع" 11.44-12.58s, "وقوي جدًا" 12.58-13.60s (scene starts at 9.84s).
const FEATURES = [
  { glyph: "✓", text: "مجاني 100%", color: "#00FF00", delay: 4 },
  { glyph: "⚡", text: "خفيف وسريع", color: COLORS.gold, delay: 48 },
  { glyph: "💪", text: "قوي ومرن", color: COLORS.orange, delay: 82 },
];

/** 9.8-14s (voice.mp3): free, lightweight, powerful. */
export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = fadeUp(frame, 0, 18);

  return (
    <SceneShell>
      <div style={head}>
        <Badge text="✨ مميزات هتحبها" color={COLORS.green} />
      </div>
      <div style={{ height: 46 }} />
      <div
        style={{
          ...fadeUp(frame, 8, 28),
          fontSize: 88,
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.3,
        }}
      >
        ليه الكل بيختاره؟
      </div>
      <div style={{ height: 60 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "center" }}>
        {FEATURES.map((f) => {
          const s = pop(frame, fps, f.delay);
          const o = fadeUp(frame, f.delay, f.delay + 14, 0);
          return (
            <div
              key={f.text}
              style={{
                opacity: o.opacity,
                scale: `${s}`,
                translate: `${(1 - s) * -300}px 0px`,
                width: 860,
                display: "flex",
                alignItems: "center",
                gap: 34,
                padding: "26px 44px",
                borderRadius: 30,
                background: "rgba(10,17,48,0.72)",
                border: `3px solid ${f.color}`,
                boxShadow: `0 22px 60px rgba(0,0,0,0.45), 0 0 46px ${f.color}3D`,
                direction: "rtl",
              }}
            >
              <IconTile glyph={f.glyph} color={f.color} size={132} />
              <div
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: 74,
                  fontWeight: 900,
                  color: f.color,
                  textShadow: `0 0 26px ${f.color}66`,
                  lineHeight: 1.2,
                }}
              >
                {f.text}
              </div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
