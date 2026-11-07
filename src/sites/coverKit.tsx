import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "../vscode/theme";

/** Page card with a colored page-name label bar. */
export const PageCard: React.FC<{
  label: string;
  dot?: string;
  barBg?: string;
  labelColor?: string;
  bodyBg?: string;
  border?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, dot = "#FFD700", barBg = "#12315E", labelColor = "#FFE9A3", bodyBg = "#FFFFFF", border, children, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      background: bodyBg,
      borderRadius: 16,
      overflow: "hidden",
      border: border ?? "1px solid rgba(15,23,42,0.10)",
      boxShadow: "0 24px 60px rgba(10,31,68,0.18)",
      ...style,
    }}
  >
    <div
      style={{
        height: 42,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 18px",
        background: barBg,
        direction: "ltr",
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: dot }} />
      <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: 2.4, color: labelColor }}>
        {label}
      </span>
    </div>
    <div style={{ flex: 1, minHeight: 0, overflow: "hidden", direction: "ltr" }}>{children}</div>
  </div>
);

/**
 * Cover body grid: left column (big card + medium card), right column (two wide cards).
 * Fixed geometry matches the 1600x1200 cover: header 112 + body + bottom bar 88.
 */
export const CoverGrid: React.FC<{
  background: string;
  left: [React.ReactNode, React.ReactNode];
  right: [React.ReactNode, React.ReactNode];
}> = ({ background, left, right }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      gap: 24,
      padding: "30px 32px 32px",
      minHeight: 0,
      background,
      direction: "ltr",
    }}
  >
    <div style={{ flex: "1 1 700px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
      <div style={{ flex: "1 1 520px", minHeight: 0, display: "flex" }}>{left[0]}</div>
      <div style={{ flex: "1 1 390px", minHeight: 0, display: "flex" }}>{left[1]}</div>
    </div>
    <div style={{ flex: "1 1 812px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
      <div style={{ flex: "1 1 455px", minHeight: 0, display: "flex" }}>{right[0]}</div>
      <div style={{ flex: "1 1 455px", minHeight: 0, display: "flex" }}>{right[1]}</div>
    </div>
  </div>
);

/** Bottom accent bar used by every cover. */
export const BottomBar: React.FC<{
  background: string;
  borderTop: string;
  dot: string;
  label: string;
  labelColor: string;
  text: string;
  textColor: string;
  pillBg: string;
  pillColor: string;
  pillText: string;
}> = ({ background, borderTop, dot, label, labelColor, text, textColor, pillBg, pillColor, pillText }) => (
  <div
    style={{
      height: 88,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 64px",
      background,
      borderTop,
      direction: "ltr",
    }}
  >
    <span style={{ width: 13, height: 13, borderRadius: "50%", background: dot, boxShadow: `0 0 18px ${dot}` }} />
    <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: 2.6, color: labelColor }}>{label}</span>
    <span style={{ fontSize: 24, fontWeight: 700, color: textColor }}>{text}</span>
    <span
      style={{
        marginLeft: "auto",
        fontSize: 21,
        fontWeight: 800,
        color: pillColor,
        background: pillBg,
        padding: "12px 30px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}
    >
      {pillText}
    </span>
  </div>
);

/**
 * Horizontal strip of real stills pulled from the walkthrough video. Sits
 * between the page grid and the bottom bar, so it eats into the grid's flex
 * space rather than changing the 1600x1200 geometry.
 *
 * Still files live in public/stills/<site>-<n>.jpg (see
 * scripts/extract-cover-frames.mjs). Each still is a 9:16 portrait slice of
 * the page, so the cells keep that aspect ratio — they read as reel frames
 * rather than cropped landscape thumbnails.
 */
export const FrameStrip: React.FC<{
  background: string;
  borderTop: string;
  dot: string;
  label: string;
  labelColor: string;
  sublabel: string;
  sublabelColor: string;
  border: string;
  shadow: string;
  images: string[];
}> = ({ background, borderTop, dot, label, labelColor, sublabel, sublabelColor, border, shadow, images }) => (
  <div
    style={{
      height: 200,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 20,
      padding: "0 32px",
      background,
      borderTop,
      direction: "ltr",
    }}
  >
    <div style={{ width: 206, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: dot, boxShadow: `0 0 14px ${dot}` }} />
        <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: 2.2, color: labelColor }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, color: sublabelColor, marginTop: 9 }}>
        {sublabel}
      </div>
    </div>

    <div
      style={{
        flex: 1,
        minWidth: 0,
        height: 160,
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            position: "relative",
            height: "100%",
            aspectRatio: "9 / 16",
            flex: "0 0 auto",
            borderRadius: 12,
            overflow: "hidden",
            border,
            boxShadow: shadow,
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 9,
              left: 9,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.55)",
              color: "#FFFFFF",
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 2,
              boxSizing: "border-box",
            }}
          >
            ▶
          </span>
          <span
            style={{
              position: "absolute",
              right: 9,
              bottom: 8,
              fontFamily: MONO,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.4,
              color: "#FFFFFF",
              background: "rgba(0,0,0,0.55)",
              padding: "3px 7px",
              borderRadius: 5,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  </div>
);
