import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EditorFrame, SparkleBurst, clamp, popAt } from "../../css/parts";
import type { Line } from "../../css/parts";
import {
  Caption,
  C_DIV,
  C_GOLD,
  SceneShell,
  T_ATTR,
  T_PLAIN,
  T_PROP,
  T_SEL,
  T_STR,
  T_TAG,
  T_VAL,
  cub,
} from "../parts";
import { DemoCard } from "../art";

const HTML: Line[] = [
  {
    parts: [
      { t: "<", c: T_TAG },
      { t: "div", c: T_TAG },
      { t: " ", c: T_PLAIN },
      { t: "class", c: T_ATTR, hl: true, roundStart: true },
      { t: "=", c: T_PLAIN, hl: true },
      { t: '"card"', c: T_STR, hl: true, roundEnd: true },
      { t: ">", c: T_TAG },
    ],
  },
  {
    parts: [
      { t: "  <", c: T_TAG },
      { t: "h2", c: T_TAG },
      { t: ">", c: T_TAG },
      { t: "Title", c: T_PLAIN },
      { t: "</", c: T_TAG },
      { t: "h2", c: T_TAG },
      { t: ">", c: T_TAG },
    ],
  },
  { parts: [{ t: "</", c: T_TAG }, { t: "div", c: T_TAG }, { t: ">", c: T_TAG }] },
];

const CSS: Line[] = [
  {
    parts: [
      { t: ".card", c: T_SEL, hl: true, roundStart: true, roundEnd: true },
      { t: " {", c: T_PLAIN },
    ],
  },
  {
    parts: [
      { t: "  ", c: T_PLAIN },
      { t: "background", c: T_PROP },
      { t: ": ", c: T_PLAIN },
      { t: "white", c: T_VAL },
      { t: "; ", c: T_PLAIN },
      { t: "padding", c: T_PROP },
      { t: ": ", c: T_PLAIN },
      { t: "20px", c: T_VAL },
      { t: ";", c: T_PLAIN },
    ],
  },
  { parts: [{ t: "}", c: T_PLAIN }] },
];

const total = (l: Line[]) => l.reduce((a, x) => a + x.parts.reduce((b, p) => b + p.t.length, 0), 0);

/* Animated connector: class="card"  →  .card */
const P0 = { x: 358, y: 584 };
const P1 = { x: 358, y: 676 };
const P2 = { x: 190, y: 704 };
const P3 = { x: 190, y: 776 };

const Connector: React.FC<{ frame: number; on: number }> = ({ frame, on }) => {
  if (on <= 0.001) return null;
  const d = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;
  const cyc = ((frame - 70) % 72) / 72;
  const t = cyc < 0 ? 0 : cyc;
  const dx = cub(P0.x, P1.x, P2.x, P3.x, t);
  const dy = cub(P0.y, P1.y, P2.y, P3.y, t);
  return (
    <svg
      width={1080}
      height={1920}
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 24 }}
    >
      <path
        d={d}
        fill="none"
        stroke={C_GOLD}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="18 14"
        strokeDashoffset={-frame * 3}
        opacity={on * 0.95}
        filter="drop-shadow(0 0 10px rgba(255,215,0,0.85))"
      />
      <circle cx={P0.x} cy={P0.y} r={14 * on} fill={C_GOLD} opacity="0.9" />
      <path
        d={`M ${P3.x - 20} ${P3.y - 30} L ${P3.x + 20} ${P3.y - 30} L ${P3.x} ${P3.y + 4} Z`}
        fill={C_GOLD}
        opacity={on}
      />
      {frame > 70 ? (
        <>
          <circle cx={dx} cy={dy} r="15" fill="#FFFFFF" opacity={on} />
          <circle
            cx={dx}
            cy={dy}
            r="26"
            fill="none"
            stroke={C_GOLD}
            strokeWidth="4"
            opacity={on * 0.6}
          />
        </>
      ) : null}
    </svg>
  );
};

const Code: React.FC<{ lines: Line[]; typed?: number; size?: number }> = ({ lines, typed, size = 36 }) => {
  let rest = typed ?? Infinity;
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: size,
        lineHeight: `${Math.round(size * 1.62)}px`,
        direction: "ltr",
        textAlign: "left",
        color: "#D4D4D4",
      }}
    >
      {lines.map((l, i) => {
        const len = l.parts.reduce((a, p) => a + p.t.length, 0);
        let parts = l.parts;
        let caret = false;
        if (rest <= 0) {
          parts = [];
        } else if (rest < len) {
          let n = rest;
          parts = [];
          for (const p of l.parts) {
            if (n <= 0) break;
            parts.push({ ...p, t: p.t.slice(0, n) });
            n -= p.t.length;
          }
          caret = true;
          rest = 0;
        } else {
          rest -= len;
        }
        return (
          <div key={i} style={{ whiteSpace: "pre", display: "flex", minHeight: Math.round(size * 1.62) }}>
            <span style={{ width: 52, color: "#4B5563", textAlign: "right", paddingRight: 18, flexShrink: 0 }}>
              {i + 1}
            </span>
            <span>
              {parts.map((p, j) => (
                <span
                  key={j}
                  style={{
                    color: p.c ?? "#D4D4D4",
                    background: p.hl ? "rgba(255,107,53,0.24)" : undefined,
                    boxShadow: p.hl ? "inset 0 -3px 0 rgba(255,107,53,0.95)" : undefined,
                    borderRadius: p.hl ? "8px" : undefined,
                    padding: p.hl ? "2px 0" : undefined,
                  }}
                >
                  {p.t}
                </span>
              ))}
              {caret ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 4,
                    height: Math.round(size * 1.05),
                    marginLeft: 2,
                    verticalAlign: "-8px",
                    background: "#22D3EE",
                  }}
                />
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/** 38-48s: linking the HTML class to the CSS selector. */
export const CssScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const htmlIn = popAt(frame, fps, 6, 14, 145);
  const htmlTyped = Math.round(interpolate(frame, [14, 74], [0, total(HTML)], clamp));
  const cssIn = popAt(frame, fps, 84, 14, 145);
  const cssTyped = Math.round(interpolate(frame, [92, 152], [0, total(CSS)], clamp));
  const link = interpolate(frame, [78, 104], [0, 1], clamp);
  const stage = popAt(frame, fps, 104, 13, 150);
  const paint = interpolate(frame, [158, 186], [0, 1], clamp);

  return (
    <SceneShell seed={5}>
      <Caption appear={2} color={C_DIV} fontSize={44} dir="ltr" mono style={{ top: 110 }}>
        {"<div class=\"card\">"} 🔗
      </Caption>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 250,
          opacity: Math.min(1, htmlIn),
          transform: `translateY(${(1 - htmlIn) * 40}px)`,
        }}
      >
        <EditorFrame width={960} tab="index.html" language="HTML">
          <Code lines={HTML} typed={htmlTyped} />
        </EditorFrame>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 700,
          opacity: Math.min(1, cssIn),
          transform: `translateY(${(1 - cssIn) * 40}px)`,
        }}
      >
        <EditorFrame width={960} tab="style.css" language="CSS">
          <Code lines={CSS} typed={cssTyped} />
        </EditorFrame>
      </div>

      <Connector frame={frame} on={link} />

      <Caption appear={150} color={C_GOLD} fontSize={42} dir="ltr" mono style={{ top: 1130 }}>
        {".card { background: white; }"} 🎨
      </Caption>

      {/* the styled result */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 1275,
          width: 960,
          height: 540,
          borderRadius: 30,
          background: "linear-gradient(180deg,#0B1224,#152A63)",
          border: "3px solid rgba(255,255,255,0.2)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.min(1, stage),
          transform: `scale(${0.94 + 0.06 * stage})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 30,
            fontFamily: "monospace",
            fontSize: 26,
            fontWeight: 700,
            color: "rgba(255,255,255,0.55)",
            direction: "ltr",
          }}
        >
          preview
        </div>
        <DemoCard lifted={0.14} white={paint} pad={paint * 30} width={540} />
      </div>

      <SparkleBurst start={160} x={540} y={1500} count={22} radius={380} duration={34} />
    </SceneShell>
  );
};
