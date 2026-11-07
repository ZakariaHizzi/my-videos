import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import {
  C_LINK,
  C_HREF,
  C_TARGET,
  C_UL,
  C_LI,
  fadeUp,
  popAt,
} from "../parts";

const Row: React.FC<{
  appear: number;
  icon: string;
  code: string;
  label: string;
  color: string;
}> = ({ appear, icon, code, label, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 165);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        opacity: Math.min(1, s),
        transform: `translateY(${(1 - s) * 24}px)`,
      }}
    >
      <span style={{ fontSize: 52 }}>{icon}</span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 40,
          fontWeight: 700,
          color,
          direction: "ltr",
          whiteSpace: "nowrap",
        }}
      >
        {code}
      </span>
      <span style={{ fontFamily: FONT, fontSize: 34, fontWeight: 800, color: "#FFFFFF" }}>
        {label}
      </span>
    </div>
  );
};

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = fadeUp(frame, 2, 24);
  const plus = popAt(frame, fps, 55, 12, 165);

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
          fontSize: 74,
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
        ملخص سريع
      </div>

      {/* group 1: link parts */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          zIndex: 14,
        }}
      >
        <Row appear={10} icon="🔗" code="<a>" label="رابط" color={C_LINK} />
        <Row appear={28} icon="📍" code="href" label="وجهة" color={C_HREF} />
        <Row appear={46} icon="🆕" code='target="_blank"' label="تاب جديد" color={C_TARGET} />
      </div>

      {/* plus separator */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 16,
          opacity: Math.min(1, plus),
          transform: `scale(${0.6 + 0.4 * plus})`,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 0 30px rgba(255,255,255,0.6)",
          }}
        >
          +
        </div>
      </div>

      {/* group 2: list parts */}
      <div
        style={{
          position: "absolute",
          top: 900,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          gap: 26,
          zIndex: 14,
        }}
      >
        <Row appear={64} icon="🔵" code="<ul>" label="قائمة نقطية" color={C_UL} />
        <Row appear={82} icon="📌" code="<li>" label="عنصر" color={C_LI} />
      </div>

      {/* final combo chip */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 18,
          opacity: Math.min(1, popAt(frame, fps, 95, 12, 160)),
          transform: `scale(${0.7 + 0.3 * popAt(frame, fps, 190, 12, 160)})`,
        }}
      >
        <div
          style={{
            padding: "20px 46px",
            borderRadius: 20,
            background: "rgba(6,10,30,0.92)",
            border: `3px solid ${C_LINK}`,
            fontFamily: "monospace",
            fontSize: 34,
            fontWeight: 700,
            color: "#FFFFFF",
            direction: "ltr",
            boxShadow: `0 0 34px ${C_LINK}55`,
          }}
        >
          <span style={{ color: C_LINK }}>{"<a>"}</span>
          <span style={{ color: "#94A3B8" }}> + </span>
          <span style={{ color: C_HREF }}>href</span>
          <span style={{ color: "#94A3B8" }}> + </span>
          <span style={{ color: C_TARGET }}>target</span>
          <span style={{ color: "#94A3B8" }}> + </span>
          <span style={{ color: C_UL }}>{"<ul>"}</span>
          <span style={{ color: "#94A3B8" }}> + </span>
          <span style={{ color: C_LI }}>{"<li>"}</span>
        </div>
      </div>

      {/* text rows as specified */}
      <div style={{ position: "absolute", top: 1480, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: popAt(frame, fps, 100, 12, 150) }}>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#FFFFFF", direction: "ltr" }}>
          🔗 a + 📍 href + 🆕 target
        </div>
      </div>
      <div style={{ position: "absolute", top: 1560, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: popAt(frame, fps, 108, 12, 150) }}>
        <div style={{ fontSize: 60, fontWeight: 900, color: "#FFFFFF" }}>+</div>
      </div>
      <div style={{ position: "absolute", top: 1640, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: popAt(frame, fps, 116, 12, 150) }}>
        <div style={{ fontSize: 46, fontWeight: 900, color: "#FFFFFF", direction: "ltr" }}>
          🔵 ul + 📌 li
        </div>
      </div>
    </AbsoluteFill>
  );
};
