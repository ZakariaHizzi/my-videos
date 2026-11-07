import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { popAt } from "../parts";

type Tile = { icon: string; tag: string; color: string; attrs: string[]; delay: number };

/* Delays follow the narration: img @50.5s, video @52s, audio @54.1s,
   attribute pills @56.1s ("وكل واحد له خصائصه الخاصة"). */
const TILES: Tile[] = [
  { icon: "🖼️", tag: "<img>", color: "#22D3EE", attrs: ["src", "alt"], delay: 72 },
  {
    icon: "🎥",
    tag: "<video>",
    color: "#A855F7",
    attrs: ["src", "controls", "autoplay", "loop", "muted"],
    delay: 116,
  },
  {
    icon: "🎵",
    tag: "<audio>",
    color: "#FFD700",
    attrs: ["src", "controls", "autoplay", "loop"],
    delay: 180 },
];

const ATTR_DELAY = 240;

const TileBox: React.FC<{ tile: Tile }> = ({ tile }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const s = popAt(frame, fps, tile.delay, 12, 160);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 268,
        opacity: Math.min(1, s * 1.3),
        transform: `translateY(${(1 - s) * 40}px)`,
      }}
    >
      {/* the icon tile */}
      <div
        style={{
          width: 208,
          height: 208,
          borderRadius: 54,
          background: `linear-gradient(140deg, ${tile.color}33, rgba(255,255,255,0.06))`,
          border: `5px solid ${tile.color}`,
          boxShadow: `0 0 ${46 + 18 * Math.abs(Math.sin(t * 3))}px ${tile.color}, inset 0 0 40px ${tile.color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 104,
          transform: `scale(${0.7 + 0.3 * s})`,
          flexShrink: 0,
        }}
      >
        {tile.icon}
      </div>
      {/* tag name */}
      <div
        style={{
          padding: "8px 24px",
          borderRadius: 14,
          background: "rgba(6,10,30,0.94)",
          border: `3px solid ${tile.color}`,
          boxShadow: `0 0 26px ${tile.color}55`,
          color: tile.color,
          fontFamily: MONO,
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        {tile.tag}
      </div>
      {/* attribute pills — stacked so neighbors never collide */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {tile.attrs.map((a, i) => {
          const on = popAt(frame, fps, ATTR_DELAY + i * 5, 12, 170);
          if (on <= 0.001) return null;
          return (
            <div
              key={a}
              style={{
                opacity: Math.min(1, on * 1.4),
                transform: `scale(${0.5 + 0.5 * on})`,
                padding: "8px 20px",
                borderRadius: 100,
                background: "rgba(6,10,30,0.9)",
                border: `2px solid ${tile.color}`,
                boxShadow: `0 0 18px ${tile.color}55`,
                color: tile.color,
                fontFamily: MONO,
                fontSize: 26,
                fontWeight: 700,
                direction: "ltr",
                whiteSpace: "nowrap",
              }}
            >
              {a}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** 50-55s: quick recap — three tags and their attributes. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = popAt(frame, fps, 4, 15, 130);
  const emojis = popAt(frame, fps, 20, 13, 150);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={18} seed={55} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 236,
          left: 40,
          right: 40,
          fontSize: 88,
          fontWeight: 900,
          lineHeight: 1.3,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.55))",
          opacity: Math.min(1, head * 1.4),
          transform: `translateY(${(1 - head) * 34}px)`,
        }}
      >
        3 وسوم + خصائصهم: ✨
      </div>

      {/* the three glowing tags */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 30,
        }}
      >
        {TILES.map((tile) => (
          <TileBox key={tile.icon} tile={tile} />
        ))}
      </div>

      {/* the emoji recap line */}
      <div
        style={{
          position: "absolute",
          top: 1400,
          left: 0,
          width: 1080,
          fontSize: 84,
          letterSpacing: 12,
          opacity: Math.min(1, emojis * 1.4),
          transform: `scale(${0.7 + 0.3 * emojis})`,
          filter: "drop-shadow(0 6px 22px rgba(0,0,0,0.5))",
        }}
      >
        🖼️ 🎥 🎵
      </div>
    </AbsoluteFill>
  );
};
