import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT, MONO } from "./theme";

export const SceneShell: React.FC<{
  children: ReactNode;
  style?: CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      padding: "130px 80px 110px",
      direction: "rtl",
      fontFamily: FONT,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Badge: React.FC<{
  text: string;
  color?: string;
  style?: CSSProperties;
}> = ({ text, color = COLORS.cyan, style }) => (
  <div
    style={{
      display: "inline-block",
      padding: "14px 36px",
      borderRadius: 100,
      background: "rgba(255,255,255,0.1)",
      border: `2px solid ${color}`,
      color: "#fff",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 40,
      letterSpacing: 0.4,
      boxShadow: `0 0 30px ${color}55`,
      direction: "rtl",
      ...style,
    }}
  >
    {text}
  </div>
);

/** Icon tile used by the feature list. */
export const IconTile: React.FC<{
  glyph: string;
  color: string;
  size?: number;
}> = ({ glyph, color, size = 132 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 34,
      background: `linear-gradient(140deg, ${color}33, rgba(255,255,255,0.06))`,
      border: `3px solid ${color}`,
      boxShadow: `0 0 34px ${color}66, inset 0 0 26px ${color}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.5,
      flexShrink: 0,
    }}
  >
    {glyph}
  </div>
);

export const CodeLine: React.FC<{
  parts: { t: string; c: string }[];
  size?: number;
}> = ({ parts, size = 30 }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: size,
      lineHeight: 1.75,
      whiteSpace: "pre",
      textAlign: "left",
      direction: "ltr",
    }}
  >
    {parts.map((p, i) => (
      <span key={i} style={{ color: p.c }}>
        {p.t}
      </span>
    ))}
  </div>
);
