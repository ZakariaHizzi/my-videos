import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";
import { C_DIV } from "./parts";

const TAG = "#569CD6";
const ATTR = "#9CDCFE";
const STR = "#CE9178";
const PLAIN = "#D4D4D4";

const EDITOR: { t: string; c: string }[][] = [
  [
    { t: "<div", c: TAG },
    { t: " ", c: PLAIN },
    { t: "class", c: ATTR },
    { t: "=", c: PLAIN },
    { t: '"card"', c: STR },
    { t: ">", c: TAG },
  ],
  [
    { t: "  <h2", c: TAG },
    { t: ">", c: TAG },
    { t: "Title", c: PLAIN },
    { t: "</h2>", c: TAG },
  ],
  [
    { t: "  <img ", c: TAG },
    { t: "src", c: ATTR },
    { t: "=", c: PLAIN },
    { t: '"photo.jpg"', c: STR },
    { t: ">", c: TAG },
  ],
  [{ t: "</div>", c: TAG }],
];

const CHIPS = [
  { t: "<div>", c: C_DIV, rot: -5 },
  { t: "header/main", c: "#3B82F6", rot: 6 },
  { t: ".card", c: "#FFD700", rot: -4 },
];

const BADGES = [
  { t: "حاوية عامة 📦", c: C_DIV },
  { t: "block element ➖", c: COLORS.cyan },
  { t: "Card 🎴", c: COLORS.gold },
];

/** The signature visual: a transparent dashed container holding page items. */
const DivBox: React.FC = () => (
  <div style={{ position: "relative", width: 860, height: 500, transform: "rotate(-1.2deg)" }}>
    <svg
      width={860}
      height={500}
      viewBox="0 0 860 500"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <rect
        x="4"
        y="4"
        width="852"
        height="492"
        rx="30"
        fill="rgba(255,107,53,0.10)"
        stroke={C_DIV}
        strokeWidth="7"
        strokeDasharray="30 20"
      />
    </svg>
    <div
      style={{
        position: "absolute",
        top: -28,
        right: 44,
        padding: "9px 28px",
        borderRadius: 12,
        background: "rgba(6,10,30,0.96)",
        border: `3px solid ${C_DIV}`,
        boxShadow: `0 0 26px ${C_DIV}88`,
        color: C_DIV,
        fontFamily: MONO,
        fontSize: 36,
        fontWeight: 700,
        direction: "ltr",
      }}
    >
      {"<div>"}
    </div>

    <div
      style={{
        position: "absolute",
        top: 82,
        right: 56,
        width: 470,
        height: 74,
        borderRadius: 14,
        background: `linear-gradient(90deg, ${C_DIV}, #FFB27A)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 212,
        right: 56,
        width: 680,
        height: 30,
        borderRadius: 12,
        background: "rgba(255,255,255,0.55)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 268,
        right: 56,
        width: 550,
        height: 30,
        borderRadius: 12,
        background: "rgba(255,255,255,0.4)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 338,
        right: 56,
        width: 340,
        height: 132,
        borderRadius: 14,
        background: "linear-gradient(135deg, #3B82F6, #22D3EE 55%, #A855F7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 58,
      }}
    >
      🖼️
    </div>
  </div>
);

export const HtmlDivCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={20} seed={5} />
    <AbsoluteFill
      style={{
        direction: "rtl",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px 60px 46px",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      {/* headline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.24,
            color: COLORS.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          إزاي تنظّم أي صفحة بـ
          <span> 📦</span>
        </div>
        <div
          style={{
            fontFamily: MONO,
            direction: "ltr",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.1,
            color: COLORS.gold,
            textShadow:
              "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)",
          }}
        >
          {"<div>"}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {CHIPS.map((c) => (
            <div
              key={c.t}
              style={{
                padding: "10px 22px",
                borderRadius: 14,
                background: "rgba(6,10,30,0.9)",
                border: `3px solid ${c.c}`,
                color: "#E6EDF3",
                fontFamily: MONO,
                fontSize: 30,
                fontWeight: 700,
                direction: "ltr",
                boxShadow: `0 0 28px ${c.c}66`,
                transform: `rotate(${c.rot}deg)`,
              }}
            >
              {c.t}
            </div>
          ))}
        </div>
      </div>

      {/* middle: code + the dashed container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          width: "100%",
        }}
      >
        <div style={{ width: 820, transform: "rotate(-1.4deg)" }}>
          <VscodeWindow width={820} tab="index.html" language="HTML" showStatus={false} activityBar={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 4 }}>
              {EDITOR.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: MONO,
                    fontSize: 30,
                    lineHeight: 1.8,
                    whiteSpace: "pre",
                    textAlign: "left",
                    direction: "ltr",
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
          </VscodeWindow>
        </div>

        {/* gold divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: MONO,
            fontSize: 34,
            fontWeight: 900,
            color: "#14182E",
            padding: "8px 34px",
            borderRadius: 100,
            background: "linear-gradient(180deg, #FFE44D, #FFD700)",
            boxShadow: "0 0 56px rgba(255,215,0,0.55), 0 14px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span>{"</>"}</span>
          <span style={{ fontFamily: FONT }}>📦</span>
        </div>

        <DivBox />
      </div>

      {/* footer badges */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          paddingBottom: 4,
        }}
      >
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {BADGES.map((b) => (
            <div
              key={b.t}
              style={{
                padding: "10px 24px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.09)",
                border: `3px solid ${b.c}`,
                color: COLORS.white,
                fontSize: 30,
                fontWeight: 800,
                fontFamily: MONO,
                boxShadow: `0 0 34px ${b.c}66`,
              }}
            >
              {b.t}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "15px 58px",
            borderRadius: 100,
            background: "linear-gradient(90deg, #00FF88, #22FF88)",
            color: "#052E16",
            fontSize: 42,
            fontWeight: 900,
            boxShadow: "0 0 70px rgba(0,255,136,0.55), 0 14px 40px rgba(0,0,0,0.45)",
          }}
        >
          نظّم موقعك بـ div 📦
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
