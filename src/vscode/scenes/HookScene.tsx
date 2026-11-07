import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop } from "../theme";
import { Badge, IconTile, SceneShell } from "../ui";

// Delays synced to the voice.mp3 hook: "إزاي تبني موقع؟" 0.00-1.26s,
// "فين تكتب الأكواد؟" 1.44-2.56s, "وإزاي الأكواد دي بتتحول لموقع؟" 2.68-4.72s.
const QUESTIONS = [
  { text: "إزاي تبني موقع؟", emoji: "🌐", delay: 2, color: COLORS.cyan },
  { text: "فين تكتب الأكواد؟", emoji: "💻", delay: 43, color: COLORS.purple },
  { text: "إزاي تتحول لموقع؟", emoji: "⚡", delay: 80, color: COLORS.gold },
];

/** 0-5s (voice.mp3): three questions every beginner asks. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = fadeUp(frame, 0, 16);

  return (
    <SceneShell>
      <div style={{ ...intro }}>
        <Badge text="💡 أسئلة كل مبتدئ" color={COLORS.gold} />
      </div>

      <div style={{ height: 64 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 34, width: "100%", alignItems: "center" }}>
        {QUESTIONS.map((q, i) => {
          const s = pop(frame, fps, q.delay);
          const o = fadeUp(frame, q.delay, q.delay + 14, 0);
          const hint = i === 2 ? fadeUp(frame, q.delay + 26, q.delay + 44, 0) : null;
          return (
            <div
              key={q.text}
              style={{
                opacity: o.opacity,
                scale: `${s}`,
                translate: `${(1 - s) * 260}px 0px`,
                width: 900,
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "30px 40px",
                borderRadius: 30,
                background: "rgba(10,17,48,0.72)",
                border: `3px solid ${q.color}`,
                boxShadow: `0 22px 60px rgba(0,0,0,0.45), 0 0 44px ${q.color}44`,
                textAlign: "right",
              }}
            >
              <IconTile glyph={q.emoji} color={q.color} size={126} />
              <div
                style={{
                  flex: 1,
                  fontSize: 62,
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {q.text}
              </div>
              {i === 2 && hint ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    opacity: hint.opacity,
                    translate: hint.translate,
                    fontSize: 40,
                    direction: "ltr",
                    fontWeight: 900,
                    color: q.color,
                  }}
                >
                  <span>{"</>"}</span>
                  <span style={{ fontSize: 44 }}>➜</span>
                  <span>🌐</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
