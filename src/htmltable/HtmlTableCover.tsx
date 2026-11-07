import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";
import { C_TD, C_TH, C_TR, C_TABLE, RenderTable, type CellSpec } from "./parts";

const TAG = "#569CD6";
const STR = "#CE9178";

/* syntax-coloured snippet of the finished table */
const EDITOR: { t: string; c: string }[][] = [
  [
    { t: "  ", c: "#D4D4D4" },
    { t: "<tr>", c: TAG },
  ],
  [
    { t: "    ", c: "#D4D4D4" },
    { t: "<th>", c: TAG },
    { t: "الاسم", c: STR },
    { t: "</th>", c: TAG },
  ],
  [
    { t: "    ", c: "#D4D4D4" },
    { t: "<th>", c: TAG },
    { t: "العمر", c: STR },
    { t: "</th>", c: TAG },
  ],
  [
    { t: "  ", c: "#D4D4D4" },
    { t: "</tr>", c: TAG },
  ],
  [
    { t: "  ", c: "#D4D4D4" },
    { t: "<tr>", c: TAG },
  ],
  [
    { t: "    ", c: "#D4D4D4" },
    { t: "<td>", c: TAG },
    { t: "أحمد", c: STR },
    { t: "</td>", c: TAG },
  ],
];

const TAG_CHIPS = [
  { t: "<table>", c: C_TABLE, rot: -5 },
  { t: "<tr>", c: C_TR, rot: 6 },
  { t: "<td>", c: C_TD, rot: -4 },
  { t: "<th>", c: C_TH, rot: 5 },
];

const BADGES = [
  { t: "شرح بالعربي", c: COLORS.cyan },
  { t: "للمبتدئين 🌱", c: COLORS.green },
  { t: "٤ وسوم 🧩", c: COLORS.gold },
];

const coverRows: CellSpec[][] = [
  [
    { text: "الاسم", kind: "th", appear: 0 },
    { text: "المدينة", kind: "th", appear: 0 },
  ],
  [
    { text: "أحمد", kind: "td", appear: 0 },
    { text: "القاهرة", kind: "td", appear: 0 },
  ],
];

export const HtmlTableCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={20} seed={7} />
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
      {/* headline block */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.24,
            color: COLORS.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          إزاي تعمل جدول في موقعك؟
          <span> 🤔</span>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.2,
            color: COLORS.gold,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)",
          }}
        >
          4 وسوم بس!
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 6,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {TAG_CHIPS.map((c) => (
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

      {/* middle: editor + rendered table */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <div style={{ width: 820, transform: "rotate(-1.4deg)" }}>
          <VscodeWindow width={820} tab="index.html" language="HTML" showStatus={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 4 }}>
              {EDITOR.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: MONO,
                    fontSize: 23,
                    lineHeight: 1.75,
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
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            boxShadow: "0 0 56px rgba(255,215,0,0.55), 0 14px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span>{"</>"}</span>
          <svg width={38} height={38} viewBox="0 0 24 24">
            <path d="M12 4v13" stroke="#14182E" strokeWidth={3} strokeLinecap="round" fill="none" />
            <path
              d="M5.5 12L12 18.5L18.5 12"
              stroke="#14182E"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span style={{ fontFamily: FONT }}>📊</span>
        </div>

        <div style={{ width: 720, transform: "rotate(1.2deg)" }}>
          <RenderTable rows={coverRows} width={720} fontSize={40} instant />
        </div>
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
                fontSize: 32,
                fontWeight: 800,
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
          شاهد الفيديو 👇
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
