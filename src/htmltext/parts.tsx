import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { MONO } from "../vscode/theme";

export const LINE_H = 56;

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const Caret: React.FC<{ h?: number }> = ({ h = 34 }) => {
  const frame = useCurrentFrame();
  const on = frame % 30 < 18;
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: h,
        marginLeft: 3,
        verticalAlign: "-7px",
        background: on ? "#569CD6" : "transparent",
      }}
    />
  );
};

export const Line: React.FC<{
  children: ReactNode;
  indent?: number;
  lineHeight?: number;
  fontSize?: number;
  style?: CSSProperties;
}> = ({ children, indent = 0, lineHeight = LINE_H, fontSize = 30, style }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize,
      lineHeight: `${lineHeight}px`,
      height: lineHeight,
      whiteSpace: "pre",
      direction: "ltr",
      textAlign: "left",
      marginLeft: indent * 30,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Rounded mono chip used to display a tag name. */
export const TagChip: React.FC<{
  label: string;
  color: string;
  fontSize?: number;
  style?: CSSProperties;
}> = ({ label, color, fontSize = 36, style }) => (
  <div
    style={{
      display: "inline-block",
      padding: `${Math.round(fontSize * 0.28)}px ${Math.round(fontSize * 0.6)}px`,
      borderRadius: 14,
      background: "rgba(6,10,30,0.94)",
      border: `3px solid ${color}`,
      boxShadow: `0 0 26px ${color}55`,
      color,
      fontFamily: MONO,
      fontSize,
      fontWeight: 700,
      direction: "ltr",
      lineHeight: 1.15,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {label}
  </div>
);

/** Typing helper: distributes `n` typed characters over a list of lines. */
export const typedLines = (lines: string[], n: number) => {
  let left = n;
  return lines.map((l) => {
    const take = Math.max(0, Math.min(l.length, left));
    left -= take;
    return l.slice(0, take);
  });
};

export const totalChars = (lines: string[]) =>
  lines.reduce((s, l) => s + l.length, 0);

export type Seg = { isTag: boolean; value: string };

/** Splits a typed line into tag/text segments colored like an editor. */
export const typedSegments = (line: string, n: number): Seg[] => {
  const parts = line.split(/(<[^>]+>)/g).filter(Boolean);
  let left = n;
  return parts.map((p) => {
    const take = Math.max(0, Math.min(p.length, left));
    left -= take;
    return { isTag: p.startsWith("<"), value: p.slice(0, take) };
  });
};
