import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO, fadeUp } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { C_TD, C_TH, C_TR, C_TABLE, RenderTable, popAt, type CellSpec } from "../parts";

/* The finished student table shown in a browser. */
const HEAD = ["الاسم", "العمر", "المدينة"];
const DATA = [
  ["أحمد", "25", "القاهرة"],
  ["سارة", "22", "الإسكندرية"],
];

const tableRows: CellSpec[][] = [
  HEAD.map((text, c) => ({ text, kind: "th" as const, appear: 30 + c * 5 })),
  ...DATA.map((row, r) =>
    row.map((text, c) => ({
      text,
      kind: "td" as const,
      appear: 56 + r * 14 + c * 5,
    })),
  ),
];

/* Legend rows explaining each tag. */
const LEGEND: { icon: string; tag: string; label: string; color: string }[] = [
  { icon: "📊", tag: "<table>", label: "الجدول", color: C_TABLE },
  { icon: "➖", tag: "<tr>", label: "صفوف", color: C_TR },
  { icon: "📦", tag: "<td>", label: "خلايا", color: C_TD },
  { icon: "🏷️", tag: "<th>", label: "عناوين", color: C_TH },
];

/* Scene starts at 43.3s. Each legend row pops as its tag is spoken in
   "table للجدول · tr للصفوف · td للخلايا · th للعناوين" (43.5-50.1s). */
const LEGEND_APPEAR = [20, 55, 90, 125];

const LegendRow: React.FC<{
  icon: string;
  tag: string;
  label: string;
  color: string;
  appear: number;
}> = ({ icon, tag, label, color, appear }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 165);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "14px 30px",
        borderRadius: 20,
        background: "rgba(6,10,30,0.9)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 26px ${color}55`,
        opacity: Math.min(1, s),
        transform: `translateX(${(1 - s) * 90}px)`,
        width: 640,
        justifyContent: "flex-start",
      }}
    >
      <span style={{ fontSize: 46 }}>{icon}</span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 40,
          fontWeight: 700,
          color,
          direction: "ltr",
        }}
      >
        {tag}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 900,
          color: "#FFFFFF",
          marginRight: "auto",
        }}
      >
        ({label})
      </span>
    </div>
  );
};

/** 48-55s: the complete table — structure diagram + a real rendered example. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = fadeUp(frame, 2, 24);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={55} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 40,
          right: 40,
          fontSize: 82,
          fontWeight: 900,
          lineHeight: 1.3,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.55))",
          opacity: Math.min(1, head.opacity * 1.4),
          transform: head.translate,
          zIndex: 20,
        }}
      >
        الجدول كامل ✨
      </div>

      {/* rendered example in a browser */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 130,
          width: 820,
          zIndex: 12,
          direction: "rtl",
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: "#0B1130",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 26px 66px rgba(0,0,0,0.55)",
            padding: 26,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 24,
              color: "rgba(255,255,255,0.45)",
              textAlign: "left",
              direction: "ltr",
              marginBottom: 14,
            }}
          >
            🔒 localhost:5500
          </div>
          <RenderTable rows={tableRows} width={768} fontSize={42} />
        </div>
      </div>

      {/* the legend list */}
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          zIndex: 20,
        }}
      >
        {LEGEND.map((l, i) => (
          <LegendRow key={l.tag} {...l} appear={LEGEND_APPEAR[i]} />
        ))}
      </div>

      {/* nested rule reminder at the very bottom */}
      <div
        style={{
          position: "absolute",
          top: 1780,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 36,
          fontWeight: 800,
          color: "rgba(255,255,255,0.7)",
          opacity: popAt(frame, fps, 140, 12, 150),
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: MONO, color: C_TABLE }}>table</span>
        <span> ← </span>
        <span style={{ fontFamily: MONO, color: C_TR }}>tr</span>
        <span> ← </span>
        <span style={{ fontFamily: MONO, color: C_TH }}>th</span>
        <span>/</span>
        <span style={{ fontFamily: MONO, color: C_TD }}>td</span>
      </div>
    </AbsoluteFill>
  );
};
