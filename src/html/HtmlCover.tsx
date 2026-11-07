import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { BrowserMock, VscodeWindow } from "../vscode/mocks";
import { CodeLine } from "../vscode/ui";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";

const KW = "#569CD6";
const TAG = "#7DD3FC";
const ATTR = "#9CDCFE";
const STR = "#CE9178";
const PURPLE = "#C586C0";
const HTML = "#E44D26";

const EDITOR: { t: string; c: string }[][] = [
  [{ t: "<!DOCTYPE html>", c: PURPLE }],
  [
    { t: "<html ", c: KW },
    { t: "lang", c: ATTR },
    { t: "=", c: "#D4D4D4" },
    { t: '"ar"', c: STR },
    { t: ">", c: KW },
  ],
  [{ t: "  <head>", c: TAG }],
  [
    { t: "    <title>", c: TAG },
    { t: "موقعي الأول", c: STR },
    { t: "</title>", c: TAG },
  ],
  [{ t: "  </head>", c: TAG }],
  [{ t: "  <body>", c: TAG }],
  [
    { t: "    <h1>", c: TAG },
    { t: "مرحباً بالعالم", c: STR },
    { t: "</h1>", c: TAG },
  ],
  [{ t: "  </body>", c: TAG }],
  [{ t: "</html>", c: TAG }],
];

const CHIPS = [
  { t: "<h1>", c: "#7DD3FC", rot: -6 },
  { t: "<p>", c: "#F7DF1E", rot: 5 },
  { t: "<img>", c: HTML, rot: -4 },
  { t: "<a href>", c: "#264DE4", rot: 7 },
];

const BADGES = [
  { t: "شرح بالعربي", c: COLORS.cyan },
  { t: "خطوة بخطوة", c: COLORS.purple },
  { t: "للمبتدئين 🌱", c: COLORS.green },
];

const HtmlShield: React.FC<{ size?: number }> = ({ size = 118 }) => (
  <svg
    width={size}
    height={size * (128 / 110)}
    viewBox="0 0 110 128"
    style={{ display: "block" }}
  >
    <defs>
      <linearGradient id="htmlGrad" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stopColor="#FF9A4D" />
        <stop offset="45%" stopColor="#F16529" />
        <stop offset="100%" stopColor={HTML} />
      </linearGradient>
    </defs>
    <path
      d="M8 6 H102 L95 100 L55 122 L15 100 Z"
      fill="url(#htmlGrad)"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <text
      x={55}
      y={76}
      textAnchor="middle"
      fontFamily={MONO}
      fontSize={30}
      fontWeight={700}
      fill="#FFFFFF"
    >
      {"</>"}
    </text>
  </svg>
);

const SiteBody: React.FC = () => (
  <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: `linear-gradient(135deg,#F16529,${HTML})`,
        }}
      />
      <div style={{ width: 96, height: 13, borderRadius: 7, background: "#94A3B8" }} />
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        {[52, 44, 60].map((w) => (
          <div key={w} style={{ width: w, height: 11, borderRadius: 6, background: "#CBD5E1" }} />
        ))}
      </div>
    </div>

    <div
      style={{
        borderRadius: 18,
        padding: "22px 20px",
        background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 55%,#7C3AED 100%)",
        boxShadow: "inset 0 0 50px rgba(228,77,38,0.15)",
      }}
    >
      <div style={{ width: "74%", height: 22, borderRadius: 10, background: "#FFFFFF" }} />
      <div
        style={{ width: "50%", height: 22, borderRadius: 10, background: "#FFFFFF", marginTop: 9 }}
      />
      <div
        style={{
          width: "86%",
          height: 11,
          borderRadius: 6,
          background: "rgba(255,255,255,0.55)",
          marginTop: 14,
        }}
      />
      <div style={{ width: "64%", height: 11, borderRadius: 6, background: "rgba(255,255,255,0.55)", marginTop: 7 }} />
      <div
        style={{ width: 130, height: 42, borderRadius: 21, background: "#FFD700", marginTop: 16 }}
      />
    </div>
  </div>
);

export const HtmlCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={18} seed={5} />
    <AbsoluteFill
      style={{
        direction: "rtl",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "64px 64px 40px",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div
          style={{
            filter: `drop-shadow(0 0 34px ${HTML}cc) drop-shadow(0 0 80px ${HTML}66)`,
          }}
        >
          <HtmlShield size={118} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 56,
            color: COLORS.white,
            direction: "rtl",
            textShadow: "0 6px 40px rgba(0,0,0,0.6)",
            letterSpacing: -1,
          }}
        >
          <span style={{ fontFamily: FONT, fontWeight: 900 }}>أساسيات</span>
          <span style={{ direction: "ltr", unicodeBidi: "isolate", color: HTML }}>HTML</span>
          <span>🧱</span>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.28,
            color: COLORS.gold,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.45)",
          }}
        >
          هيكل أي موقع من الصفر 🦴
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div style={{ width: 800, transform: "rotate(-1.5deg)" }}>
          <VscodeWindow width={800} tab="index.html" language="HTML" showStatus={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 4 }}>
              {EDITOR.map((line, i) => (
                <CodeLine key={i} size={22} parts={line} />
              ))}
            </div>
          </VscodeWindow>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            direction: "ltr",
            fontFamily: MONO,
            fontSize: 34,
            fontWeight: 900,
            color: "#14182E",
            padding: "10px 34px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            boxShadow: "0 0 60px rgba(255,215,0,0.55), 0 14px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span>{"</>"}</span>
          <svg width={40} height={40} viewBox="0 0 24 24">
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
          <span style={{ fontFamily: FONT }}>✨</span>
        </div>

        <div style={{ width: 800, transform: "rotate(1.2deg)" }}>
          <BrowserMock
            width={800}
            url="localhost:5500"
            bodyStyle={{ minHeight: 160, padding: 16 }}
          >
            <SiteBody />
          </BrowserMock>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          paddingBottom: 6,
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
            padding: "16px 60px",
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
