import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop } from "../theme";
import { SceneShell } from "../ui";
import { VscodeLogo } from "../mocks";

// Chip cascade synced to the voice.mp3 line "بيدعم كل لغات البرمجة اللي
// تحتاجها" 14.98-17.40s (scene starts at 13.98s).
const LANGS = [
  { name: "HTML", color: "#E44D26", delay: 20 },
  { name: "CSS", color: "#264DE4", delay: 32 },
  { name: "JavaScript", color: "#F7DF1E", dark: true, delay: 44 },
  { name: "Python", color: "#3776AB", delay: 56 },
  { name: "PHP", color: "#777BB4", delay: 68 },
  { name: "Java", color: "#E76F00", delay: 80 },
  { name: "C++", color: "#00599C", delay: 92 },
];

const RING = 380;
const CHART_SIZE = 860;

/** 14-17.6s (voice.mp3): every language orbits the VS Code logo. */
export const LanguagesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const drift = t * 9;
  const head = fadeUp(frame, 0, 18);
  const logo = pop(frame, fps, 8);

  return (
    <SceneShell>
      <div style={head}>
        <div
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.35,
          }}
        >
          يدعم{" "}
          <span
            style={{
              color: COLORS.gold,
              textShadow: "0 0 30px rgba(255,215,0,0.55)",
            }}
          >
            كل
          </span>{" "}
          لغات البرمجة! 🌍
        </div>
      </div>
      <div style={{ height: 40 }} />
      <div
        style={{
          width: CHART_SIZE,
          height: CHART_SIZE,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* orbit guide */}
        <div
          style={{
            position: "absolute",
            width: RING * 2,
            height: RING * 2,
            borderRadius: "50%",
            border: "2px dashed rgba(255,255,255,0.18)",
            scale: `${0.9 + 0.1 * Math.sin(t * 1.4)}`,
          }}
        />
        {/* center logo */}
        <div
          style={{
            scale: `${logo}`,
            position: "absolute",
            filter: `drop-shadow(0 0 ${40 * logo}px rgba(34,160,240,0.9))`,
            background:
              "radial-gradient(circle, rgba(34,160,240,0.28) 0%, transparent 70%)",
            borderRadius: "50%",
            padding: 40,
          }}
        >
          <VscodeLogo size={230} />
        </div>
        {/* orbiting chips */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            rotate: `${drift}deg`,
          }}
        >
          {LANGS.map((lang, i) => {
            const s = pop(frame, fps, lang.delay);
            const angle = (i * 360) / LANGS.length;
            const glow = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.4);
            return (
              <div
                key={lang.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 0,
                  height: 0,
                  transform: `rotate(${angle}deg) translateY(${-RING}px)`,
                }}
              >
                <div style={{ rotate: `${-angle - drift}deg` }}>
                  <div
                    style={{
                      translate: "-50% -50%",
                      display: "inline-block",
                      direction: "ltr",
                      scale: `${s}`,
                      opacity: Math.min(1, s),
                      padding: "20px 30px",
                      borderRadius: 22,
                      background: lang.dark
                        ? lang.color
                        : `linear-gradient(140deg, ${lang.color}, ${lang.color}B3)`,
                      color: lang.dark ? "#111" : "#fff",
                      fontSize: 38,
                      fontWeight: 900,
                      boxShadow: `0 0 ${28 + glow * 34}px ${lang.color}, 0 16px 40px rgba(0,0,0,0.45)`,
                      border: "2px solid rgba(255,255,255,0.35)",
                      whiteSpace: "nowrap",
                      fontFamily: "'Segoe UI', Arial, sans-serif",
                    }}
                  >
                    {lang.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ height: 26 }} />
      <div
        style={{
          ...fadeUp(frame, 96, 114),
          fontSize: 46,
          fontWeight: 700,
          color: COLORS.cyan,
        }}
      >
        محرر واحد.. كل اللغات!
      </div>
    </SceneShell>
  );
};
