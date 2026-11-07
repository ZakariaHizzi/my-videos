import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";

const Panel: React.FC<{
  glyph: string;
  tag: string;
  caption: string;
  color: string;
  glow: number;
  top: number;
  appear: number;
  bob: number;
}> = ({ glyph, tag, caption, color, glow, top, appear, bob }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear, fps, config: { damping: 13, stiffness: 140 } });
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top,
        width: 900,
        boxSizing: "border-box",
        padding: "44px 40px",
        borderRadius: 44,
        background: "rgba(6,10,30,0.92)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 ${34 + glow * 34}px ${color}66, 0 30px 70px rgba(0,0,0,0.5)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 26,
        opacity: Math.min(1, s),
        transform: `scale(${0.86 + 0.14 * s}) translateY(${(1 - s) * 40 + Math.sin(bob) * 8}px)`,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        <div
          style={{
            width: 164,
            height: 164,
            borderRadius: "50%",
            background: `radial-gradient(circle at 34% 28%, ${color}44, rgba(6,10,30,0.95))`,
            border: `4px solid ${color}`,
            boxShadow: `0 0 ${30 + glow * 30}px ${color}aa`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 92,
            flexShrink: 0,
          }}
        >
          {glyph}
        </div>
        <div
          style={{
            padding: "18px 46px",
            borderRadius: 22,
            background: "rgba(6,10,30,0.98)",
            border: `3px solid ${color}`,
            color: color,
            fontFamily: MONO,
            fontSize: 62,
            fontWeight: 700,
            direction: "ltr",
            textShadow: `0 0 24px ${color}`,
            boxShadow: `0 0 30px ${color}55`,
          }}
        >
          {tag}
        </div>
      </div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#FFFFFF",
          lineHeight: 1.35,
          textShadow: "0 8px 30px rgba(0,0,0,0.55)",
        }}
      >
        {caption}
      </div>
    </div>
  );
};

const FLOATERS = [
  { t: "<title>", c: "#7DD3FC", x: 70, y: 1600, rot: -8 },
  { t: "<meta>", c: "#C586C0", x: 760, y: 1560, rot: 7 },
  { t: "<style>", c: "#CE9178", x: 140, y: 1760, rot: 6 },
  { t: "<script>", c: "#F7DF1E", x: 730, y: 1740, rot: -6 },
];

/** 18-35s: the page splits into <head> (brain) and <body> (human body). */
export const StructureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const divider = spring({ frame: frame - 100, fps, config: { damping: 15, stiffness: 130 } });
  const code = spring({ frame: frame - 252, fps, config: { damping: 14, stiffness: 130 } });
  const glow = 0.45 + 0.55 * Math.sin(t * 3.1);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={18} seed={7} />

      {/* head panel */}
      <Panel
        glyph="🧠"
        tag="<head>"
        caption={"<head> = مخ الصفحة 🧠"}
        color={COLORS.cyan}
        glow={glow}
        top={230}
        appear={26}
        bob={t * 1.6}
      />

      {/* divider */}
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 150,
          width: 780,
          height: 8,
          borderRadius: 8,
          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.gold})`,
          transform: `scaleX(${divider})`,
          boxShadow: "0 0 34px rgba(168,85,247,0.7)",
          zIndex: 6,
          opacity: Math.min(1, divider * 1.4),
        }}
      />

      {/* body panel */}
      <Panel
        glyph="🧍"
        tag="<body>"
        caption={"<body> = جسم الصفحة 🧍"}
        color={COLORS.purple}
        glow={glow}
        top={790}
        appear={130}
        bob={t * 1.6 + Math.PI}
      />

      {/* skeleton code */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 1320,
          width: 860,
          boxSizing: "border-box",
          padding: "34px 40px",
          borderRadius: 34,
          background: "rgba(6,10,30,0.94)",
          border: "2px solid rgba(125,211,252,0.35)",
          boxShadow: "0 26px 66px rgba(0,0,0,0.5), 0 0 46px rgba(59,130,246,0.25)",
          opacity: Math.min(1, code),
          transform: `translateY(${(1 - code) * 46}px) scale(${0.9 + 0.1 * code})`,
          zIndex: 8,
          direction: "ltr",
        }}
      >
        {[
          [{ t: "<html>", c: "#7DD3FC" }],
          [
            { t: "  ", c: "#D4D4D4" },
            { t: "<head>", c: "#569CD6" },
            { t: " … ", c: "#D4D4D4" },
            { t: "</head>", c: "#569CD6" },
          ],
          [
            { t: "  ", c: "#D4D4D4" },
            { t: "<body>", c: "#C586C0" },
            { t: " … ", c: "#D4D4D4" },
            { t: "</body>", c: "#C586C0" },
          ],
          [{ t: "</html>", c: "#7DD3FC" }],
        ].map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: MONO,
              fontSize: 36,
              lineHeight: "62px",
              height: 62,
              whiteSpace: "pre",
              textAlign: "left",
              opacity: Math.min(1, Math.max(0, (code - i * 0.12) * 2.2)),
            }}
          >
            {line.map((p, j) => (
              <span key={j} style={{ color: p.c }}>
                {p.t}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* floating tags */}
      {FLOATERS.map((f, i) => {
        const s = spring({
          frame: frame - (60 + i * 22),
          fps,
          config: { damping: 13, stiffness: 150 },
        });
        if (s <= 0.001) return null;
        return (
          <div
            key={f.t}
            style={{
              position: "absolute",
              left: f.x,
              top: f.y + Math.sin(t * 1.5 + i * 1.4) * 12,
              opacity: Math.min(1, s) * 0.95,
              transform: `scale(${0.6 + 0.4 * s}) rotate(${f.rot}deg)`,
              padding: "10px 20px",
              borderRadius: 13,
              background: "rgba(6,10,30,0.94)",
              border: `2px solid ${f.c}`,
              boxShadow: `0 0 22px ${f.c}55`,
              fontFamily: MONO,
              fontSize: 30,
              fontWeight: 700,
              color: f.c,
              whiteSpace: "nowrap",
              direction: "ltr",
              zIndex: 12,
            }}
          >
            {f.t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
