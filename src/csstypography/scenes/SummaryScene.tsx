import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { C_CYAN, C_GOLD, C_GREEN, C_ORANGE, C_PURPLE, NotePill, SparkleBurst, clamp, popAt } from "../../css/parts";
import { SceneShell } from "../parts";

const ITEMS = [
  { e: "📏", t: "font-size", ar: "حجم الخط", c: C_GOLD, at: 4 },
  { e: "🔤", t: "font-family", ar: "نوع الخط", c: C_CYAN, at: 16 },
  { e: "💪", t: "font-weight", ar: "سمك الخط", c: C_ORANGE, at: 28 },
  { e: "🎯", t: "text-align", ar: "المحاذاة", c: C_GREEN, at: 40 },
  { e: "📐", t: "line-height", ar: "ارتفاع السطر", c: C_PURPLE, at: 52 },
];

const POS = [
  { x: 50, y: 500 },
  { x: 385, y: 500 },
  { x: 720, y: 500 },
  { x: 217, y: 862 },
  { x: 552, y: 862 },
];

/** 50-55s: summary of the five magic tools. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = popAt(frame, fps, 2);
  const line2 = popAt(frame, fps, 12);

  return (
    <SceneShell seed={7}>
      {/* summary lines */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, line1),
          transform: `translateY(${(1 - line1) * 30}px)`,
          zIndex: 30,
        }}
      >
        <NotePill color={C_GOLD} fontSize={46} style={{ direction: "ltr" }}>
          📏 size + 🔤 family + 💪 weight
        </NotePill>
      </div>
      <div
        style={{
          position: "absolute",
          top: 316,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, line2),
          transform: `translateY(${(1 - line2) * 30}px)`,
          zIndex: 30,
        }}
      >
        <NotePill color={C_CYAN} fontSize={46} style={{ direction: "ltr" }}>
          + 🎯 align + 📐 line-height
        </NotePill>
      </div>

      {/* five glowing tool cards */}
      {ITEMS.map((it, i) => {
        const s = popAt(frame, fps, it.at, 12, 165);
        const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 5 + i);
        const pos = POS[i];
        return (
          <div
            key={it.t}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: 310,
              height: 340,
              borderRadius: 30,
              background: "rgba(5,10,30,0.94)",
              border: `4px solid ${it.c}`,
              boxShadow: `0 0 ${30 + pulse * 40}px ${it.c}77, 0 24px 60px rgba(0,0,0,0.55)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              opacity: Math.min(1, s) * interpolate(frame, [0, 6], [0, 1], clamp),
              transform: `scale(${0.6 + 0.4 * s})`,
            }}
          >
            <div
              style={{
                fontSize: 92,
                filter: `drop-shadow(0 0 ${14 + pulse * 18}px ${it.c})`,
                transform: `scale(${1 + pulse * 0.06})`,
              }}
            >
              {it.e}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: it.t.length > 11 ? 30 : 34,
                fontWeight: 900,
                color: it.c,
                direction: "ltr",
                textShadow: `0 0 22px ${it.c}88`,
              }}
            >
              {it.t}
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 27,
                fontWeight: 700,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              {it.ar}
            </div>
          </div>
        );
      })}

      <SparkleBurst start={52} x={540} y={900} count={22} radius={420} duration={32} />
    </SceneShell>
  );
};
