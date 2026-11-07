import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { BrowserMock, VscodeWindow } from "../vscode/mocks";
import { CodeLine } from "../vscode/ui";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";

const TAG = "#7DD3FC";
const STR = "#CE9178";
const GOLD = COLORS.gold;
const CYAN = COLORS.cyan;
const PURP = COLORS.purple;

const EDITOR: { t: string; c: string }[][] = [
  [
    { t: "    <h1>", c: TAG },
    { t: "مرحباً بكم!", c: STR },
    { t: "</h1>", c: TAG },
  ],
  [
    { t: "    <p>", c: TAG },
    { t: "فقرة ترحيبية", c: STR },
    { t: "</p>", c: TAG },
  ],
  [{ t: "    <br>", c: TAG }],
  [
    { t: "    <strong>", c: TAG },
    { t: "تغميق", c: STR },
    { t: "</strong>", c: TAG },
  ],
  [
    { t: "    <em>", c: TAG },
    { t: "ميل", c: STR },
    { t: "</em>", c: TAG },
  ],
];

const HEAD_CHIPS = [
  { t: "h1", c: GOLD, s: 40 },
  { t: "h2", c: "#FBBF24", s: 34 },
  { t: "h3", c: "#F59E0B", s: 29 },
  { t: "h6", c: CYAN, s: 22 },
];

const TOOL_CHIPS = [
  { t: "<p>", c: "#F7DF1E", rot: -5 },
  { t: "<br>", c: CYAN, rot: 6 },
  { t: "<strong>", c: PURP, rot: -4 },
  { t: "<em>", c: "#F472B6", rot: 5 },
];

const BADGES = [
  { t: "شرح بالعربي", c: CYAN },
  { t: "للمبتدئين 🌱", c: COLORS.green },
  { t: "٧ أدوات 🧰", c: GOLD },
];

/** Rendered page preview used in the cover's browser. */
const PagePreview: React.FC = () => (
  <div style={{ direction: "rtl", textAlign: "right", fontFamily: FONT }}>
    <div style={{ fontSize: 40, fontWeight: 900, color: "#0F172A", lineHeight: 1.25 }}>
      مرحباً بكم!
    </div>
    <div
      style={{
        height: 6,
        width: 120,
        borderRadius: 3,
        marginTop: 6,
        marginBottom: 14,
        background: `linear-gradient(90deg, ${CYAN}, ${PURP})`,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <div style={{ height: 13, width: "88%", borderRadius: 7, background: "#94A3B8" }} />
      <div style={{ height: 13, width: "64%", borderRadius: 7, background: "#CBD5E1" }} />
      <div style={{ height: 13, width: "42%", borderRadius: 7, background: "#CBD5E1" }} />
    </div>
  </div>
);

/** Staircase of h1→h6 showing decreasing size. */
const HeadingStair: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      direction: "ltr",
      fontFamily: FONT,
      fontWeight: 900,
    }}
  >
    {HEAD_CHIPS.map((h) => (
      <div
        key={h.t}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: h.s * 1.5,
            height: h.s * 1.9,
            borderRadius: 8,
            background: `linear-gradient(180deg, ${h.c}, ${h.c}88)`,
            boxShadow: `0 0 20px ${h.c}66`,
          }}
        />
        <div style={{ fontSize: 22, color: h.c, fontFamily: MONO }}>{`<${h.t}>`}</div>
      </div>
    ))}
  </div>
);

export const HtmlTextCover: React.FC = () => (
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
            fontSize: 66,
            fontWeight: 900,
            lineHeight: 1.24,
            color: COLORS.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          إزاي تكتب في موقعك؟
          <span> ✍️</span>
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1.2,
            color: GOLD,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)",
          }}
        >
          ٧ أدوات سحرية!
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {TOOL_CHIPS.map((c) => (
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

      {/* middle: editor + browser + heading stair */}
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
                <CodeLine key={i} size={23} parts={line} />
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
            background: `linear-gradient(180deg, #FFE44D, ${GOLD})`,
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
          <span style={{ fontFamily: FONT }}>🎯</span>
        </div>

        <div style={{ width: 820, transform: "rotate(1.2deg)" }}>
          <BrowserMock width={820} url="localhost:5500" bodyStyle={{ minHeight: 170, padding: 18 }}>
            <PagePreview />
          </BrowserMock>
        </div>

        <div style={{ marginTop: 4 }}>
          <HeadingStair />
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
