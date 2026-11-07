import React from "react";
import type { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, fadeUp } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { CopyPanel } from "../../vscode/lang/parts";
import { C_TD, C_TH, C_TR, C_TABLE, TagChip, clamp, popAt } from "../parts";

/* ------------------------------------------------------------------ */
/* Nested "Russian-doll" boxes: table > tr > td/th                      */
/* ------------------------------------------------------------------ */

const Box: React.FC<{
  appear: number;
  color: string;
  label: string;
  pad: number;
  children: ReactNode;
  glow: number;
  vertical?: boolean;
}> = ({ appear, color, label, pad, children, glow, vertical = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 14, 130);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "relative",
        border: `4px solid ${color}`,
        borderRadius: 22,
        padding: pad,
        background: `${color}14`,
        boxShadow: `0 0 ${22 + glow * 26}px ${color}66, inset 0 0 30px ${color}22`,
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: vertical ? 18 : 14,
        opacity: Math.min(1, s),
        transform: `scale(${0.82 + 0.18 * s})`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -26,
          right: 22,
        }}
      >
        <TagChip label={label} color={color} fontSize={34} />
      </div>
      {children}
    </div>
  );
};

/** A small data cell chip that pops in. */
const CellBox: React.FC<{ appear: number; label: string; color: string }> = ({
  appear,
  label,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 185);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        border: `3px solid ${color}`,
        borderRadius: 14,
        background: `${color}2A`,
        boxShadow: `0 0 18px ${color}55`,
        color: color,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 34,
        padding: "14px 22px",
        minWidth: 150,
        textAlign: "center",
        opacity: Math.min(1, s),
        transform: `scale(${0.6 + 0.4 * s})`,
        direction: "ltr",
      }}
    >
      {label}
    </div>
  );
};

/** 6-14s: the golden rule — table contains tr, tr contains td/th (جوه جوه). */
export const RuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.45 + 0.55 * Math.sin(t * 3.1);

  const cap1 = fadeUp(frame, 4, 26);
  // "table ← tr ← td" summary appears near the end as the narrator wraps up
  const codeLine = popAt(frame, fps, 292, 12, 150);
  // "جوه جوه" is spoken ~10.3s (internal frame ~100) — sync the punch to it
  const punch = popAt(frame, fps, 100, 10, 175);
  const punchPulse = 1 + 0.06 * Math.sin(t * 6);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={9} colors={["#FFD700", "#22D3EE", "#A855F7"]} />

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.55)" }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#FFFFFF" }}>
            القاعدة الذهبية: <span>✨</span>
          </div>
        </CopyPanel>
      </div>

      {/* the nested diagram */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 90,
          width: 900,
          zIndex: 12,
          direction: "ltr",
        }}
      >
        <Box appear={68} color={C_TABLE} label="<table>" pad={40} glow={glow}>
          {/* row 1: header */}
          <Box appear={192} color={C_TR} label="<tr>" pad={30} glow={glow} vertical={false}>
            <CellBox appear={248} label="<th>" color={C_TH} />
            <CellBox appear={256} label="<th>" color={C_TH} />
            <CellBox appear={264} label="<th>" color={C_TH} />
          </Box>
          {/* row 2: data */}
          <Box appear={202} color={C_TR} label="<tr>" pad={30} glow={glow} vertical={false}>
            <CellBox appear={256} label="<td>" color={C_TD} />
            <CellBox appear={264} label="<td>" color={C_TD} />
            <CellBox appear={272} label="<td>" color={C_TD} />
          </Box>
        </Box>
      </div>

      {/* the code chain */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          zIndex: 26,
          opacity: Math.min(1, codeLine * 1.4),
          transform: `scale(${0.7 + 0.3 * codeLine})`,
          direction: "ltr",
        }}
      >
        <TagChip label="<table>" color={C_TABLE} fontSize={44} />
        <div style={{ fontSize: 48, color: "#CBD5E1", fontFamily: FONT }}>←</div>
        <TagChip label="<tr>" color={C_TR} fontSize={44} />
        <div style={{ fontSize: 48, color: "#CBD5E1", fontFamily: FONT }}>←</div>
        <TagChip label="<td>" color={C_TD} fontSize={44} />
      </div>

      {/* the punchline */}
      <div
        style={{
          position: "absolute",
          top: 1560,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, punch * 1.5),
          transform: `scale(${(0.6 + 0.4 * punch) * punchPulse})`,
        }}
      >
        <div
          style={{
            padding: "26px 66px",
            borderRadius: 28,
            background: "linear-gradient(180deg,#312E81,#1E3A8A)",
            border: "4px solid rgba(255,215,0,0.75)",
            boxShadow: `0 0 ${40 + glow * 40}px rgba(255,215,0,0.5), 0 20px 50px rgba(0,0,0,0.5)`,
            fontSize: 66,
            fontWeight: 900,
            color: "#FFFFFF",
          }}
        >
          جوه جوه! <span>📦</span>
        </div>
      </div>

      {/* subtle depth hint arrow */}
      <div
        style={{
          position: "absolute",
          top: 1180,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 60,
          color: "#A855F7",
          textShadow: `0 0 24px #A855F7`,
          opacity: interpolate(frame, [40, 62], [0, 1], clamp),
          zIndex: 14,
        }}
      >
        ⬇ كل واحد جوه التاني
      </div>
    </AbsoluteFill>
  );
};
