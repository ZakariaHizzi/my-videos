import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../vscode/theme";
import { Twinkles, popAt } from "../css/parts";

export { clamp, popAt, K } from "../css/parts";
export { T_TAG, T_ATTR, T_STR, T_PLAIN, T_SEL, T_PROP, T_VAL } from "../css/parts";
export type { Line, Part } from "../css/parts";

/* Palette — dark blue stage, orange accents. */
export const C_DIV = "#FF6B35";
export const C_BLUE = "#3B82F6";
export const C_GOLD = "#FFD700";
export const C_PURPLE = "#A855F7";
export const C_CYAN = "#22D3EE";
export const C_RED = "#FF5C5C";

/** Linear blend between two #rrggbb colours. */
export const mix = (a: string, b: string, t: number): string => {
  const hx = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const A = hx(a);
  const B = hx(b);
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};

/** Cubic bezier scalar — drives the animated HTML → CSS connector. */
export const cub = (p0: number, p1: number, p2: number, p3: number, t: number): number => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};

/** RTL scene shell: twinkling particles + Cairo font. */
export const SceneShell: React.FC<{ children: ReactNode; seed?: number }> = ({
  children,
  seed = 1,
}) => (
  <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
    <Twinkles count={18} seed={seed} />
    {children}
  </AbsoluteFill>
);

/** Centered Arabic caption panel that springs in at `appear`. */
export const Caption: React.FC<{
  children: ReactNode;
  color?: string;
  fontSize?: number;
  appear?: number;
  maxWidth?: number;
  dir?: "rtl" | "ltr";
  mono?: boolean;
  style?: CSSProperties;
}> = ({
  children,
  color = C_CYAN,
  fontSize = 50,
  appear = 0,
  maxWidth = 940,
  dir = "rtl",
  mono = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 175);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: Math.min(1, s),
        transform: `translateY(${(1 - s) * 34}px) scale(${0.86 + 0.14 * s})`,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth,
          boxSizing: "border-box",
          padding: "20px 44px",
          borderRadius: 26,
          background: "rgba(5,10,30,0.92)",
          border: `3px solid ${color}`,
          boxShadow: `0 0 38px ${color}55, 0 16px 40px rgba(0,0,0,0.5)`,
          fontFamily: mono ? MONO : FONT,
          fontSize,
          fontWeight: 900,
          lineHeight: 1.4,
          color: "#FFFFFF",
          textAlign: "center",
          direction: dir,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Small floating widgets                                               */
/* ------------------------------------------------------------------ */

export const Chip: React.FC<{
  label: string;
  x: number;
  y: number;
  color?: string;
  appear?: number;
  rotate?: number;
  fontSize?: number;
}> = ({ label, x, y, color = C_DIV, appear = 0, rotate = 0, fontSize = 34 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 13, 155);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: Math.min(1, s),
        transform: `scale(${0.6 + 0.4 * s}) rotate(${rotate}deg)`,
        padding: `${Math.round(fontSize * 0.3)}px ${Math.round(fontSize * 0.62)}px`,
        borderRadius: 14,
        background: "rgba(6,10,30,0.95)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 26px ${color}66`,
        color,
        fontFamily: "monospace",
        fontSize,
        fontWeight: 700,
        direction: "ltr",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

export const MouseCursor: React.FC<{ x: number; y: number; style?: CSSProperties }> = ({
  x,
  y,
  style,
}) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      left: x,
      top: y,
      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.7))",
      pointerEvents: "none",
      ...style,
    }}
  >
    <path
      d="M4 2 L4 19 L8.5 15 L11.5 21.5 L14.5 20 L11.5 13.5 L17.5 13 Z"
      fill="#FFFFFF"
      stroke="#0F172A"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
