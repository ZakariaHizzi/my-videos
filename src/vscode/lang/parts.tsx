import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { Easing, interpolate } from "remotion";
import { FONT, MONO } from "../theme";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Arrow pointer used by the screen-recording scenes. */
export const MouseCursor: React.FC<{
  x: number;
  y: number;
  size?: number;
}> = ({ x, y, size = 58 }) => (
  <svg
    width={size}
    height={size * 1.12}
    viewBox="0 0 24 26"
    style={{
      position: "absolute",
      left: x,
      top: y,
      overflow: "visible",
      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.7))",
      zIndex: 40,
    }}
  >
    <path
      d="M2 1.5 L2 21.5 L7.4 16.8 L10.9 24.8 L14.6 23.2 L11.2 15.4 L18.4 15 Z"
      fill="#FFFFFF"
      stroke="#0B1020"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

/** Expanding ring that fires when the pointer "clicks". */
export const ClickRipple: React.FC<{
  frame: number;
  at: number;
  x: number;
  y: number;
  color?: string;
}> = ({ frame, at, x, y, color = "#FFFFFF" }) => {
  const p = interpolate(frame, [at, at + 24], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  if (p <= 0 || p >= 1) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x - 14,
        top: y - 14,
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: `6px solid ${color}`,
        transform: `scale(${1 + p * 6})`,
        opacity: 0.95 * (1 - p),
        zIndex: 39,
      }}
    />
  );
};

/** Document glyph with a folded corner, labelled with its extension. */
export const FileDoc: React.FC<{
  label: string;
  color: string;
  labelColor?: string;
  width?: number;
  style?: CSSProperties;
}> = ({ label, color, labelColor = "#FFFFFF", width = 190, style }) => {
  const h = width * 1.3;
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 120 156"
      style={{
        display: "block",
        overflow: "visible",
        direction: "ltr",
        filter: `drop-shadow(0 12px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 26px ${color})`,
        ...style,
      }}
    >
      <path
        d="M6 12 a10 10 0 0 1 10-10 h56 l42 42 v100 a10 10 0 0 1-10 10 H16 a10 10 0 0 1-10-10 Z"
        fill={color}
      />
      <path d="M72 2 l42 42 h-32 a10 10 0 0 1-10-10 Z" fill="rgba(255,255,255,0.4)" />
      <rect x="6" y="70" width="108" height="2" fill="rgba(255,255,255,0.35)" />
      <text
        x="60"
        y="124"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={label.length > 4 ? 26 : 34}
        fontWeight="700"
        fill={labelColor}
      >
        {label}
      </text>
    </svg>
  );
};

/** Rounded translucent panel used to seat on-screen Arabic copy. */
export const CopyPanel: React.FC<{
  children: ReactNode;
  style?: CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      display: "inline-block",
      padding: "26px 44px",
      borderRadius: 30,
      background: "rgba(6,10,30,0.93)",
      border: "2px solid rgba(125,211,252,0.35)",
      boxShadow: "0 20px 54px rgba(0,0,0,0.5), 0 0 44px rgba(59,130,246,0.25)",
      backdropFilter: "blur(6px)",
      fontFamily: FONT,
      ...style,
    }}
  >
    {children}
  </div>
);
