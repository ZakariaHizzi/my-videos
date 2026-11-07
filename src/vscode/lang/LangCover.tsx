import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../Background";
import { VscodeLogo, VscodeWindow } from "../mocks";
import { CodeLine } from "../ui";
import { COLORS, FONT, MONO } from "../theme";
import { FileDoc } from "./parts";

/** Static 1080x1920 cover image for the VS Code "language detection" short. */

const DOCS = [
  { label: ".js", color: "#F7DF1E", labelColor: "#1B1B1B", x: 24, y: 690, rot: -12 },
  { label: ".py", color: "#3572A5", labelColor: "#FFFFFF", x: 900, y: 640, rot: 11 },
  { label: ".html", color: "#E44D26", labelColor: "#FFFFFF", x: 18, y: 1260, rot: 9 },
  { label: ".css", color: "#264DE4", labelColor: "#FFFFFF", x: 896, y: 1240, rot: -8 },
];

const DOC_W = 148;

const EDITOR: { t: string; c: string }[][] = [
  [
    { t: "const", c: "#C586C0" },
    { t: " el ", c: "#9CDCFE" },
    { t: "= ", c: "#D4D4D4" },
    { t: "document", c: "#DCDCAA" },
    { t: ".", c: "#D4D4D4" },
    { t: "querySelector", c: "#DCDCAA" },
    { t: "(", c: "#D4D4D4" },
    { t: '".card"', c: "#CE9178" },
    { t: ");", c: "#D4D4D4" },
  ],
  [
    { t: "el", c: "#9CDCFE" },
    { t: ".", c: "#D4D4D4" },
    { t: "textContent", c: "#9CDCFE" },
    { t: " = ", c: "#D4D4D4" },
    { t: '"مرحباً بالعالم!"', c: "#CE9178" },
    { t: ";", c: "#D4D4D4" },
  ],
  [{ t: "", c: "#D4D4D4" }],
  [
    { t: "function", c: "#C586C0" },
    { t: " greet", c: "#DCDCAA" },
    { t: "(", c: "#D4D4D4" },
    { t: "name", c: "#9CDCFE" },
    { t: ") {", c: "#D4D4D4" },
  ],
  [
    { t: "  return ", c: "#C586C0" },
    { t: "`Hello ${", c: "#CE9178" },
    { t: "name", c: "#9CDCFE" },
    { t: "}`", c: "#CE9178" },
    { t: ";", c: "#D4D4D4" },
  ],
  [{ t: "}", c: "#D4D4D4" }],
];

const BADGES = [
  { t: "امتداد الملف = اللغة", c: COLORS.gold },
  { t: "ألوان صحيحة 🎨", c: COLORS.cyan },
  { t: "اقتراحات أذكى ✨", c: COLORS.purple },
  { t: "أخطاء أقل 🐞", c: COLORS.green },
];

export const LangCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <AbsoluteFill
      style={{
        direction: "rtl",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 80px 70px",
        justifyContent: "space-between",
      }}
    >
      {/* top: logo + titles */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: 8 }}>
        <div
          style={{
            filter: "drop-shadow(0 0 50px rgba(34,160,240,0.85)) drop-shadow(0 0 120px rgba(168,85,247,0.45))",
          }}
        >
          <VscodeLogo size={180} />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 72,
            color: COLORS.white,
            direction: "ltr",
            textShadow: "0 6px 40px rgba(0,0,0,0.6)",
            letterSpacing: -2,
          }}
        >
          Visual Studio <span style={{ color: COLORS.cyan }}>Code</span>
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            color: COLORS.gold,
            lineHeight: 1.32,
            textAlign: "center",
            textShadow:
              "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.45)",
          }}
        >
          إزاي يعرف اللغة؟ 🤔
        </div>
      </div>

      {/* middle: editor window + the extension-to-language badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div style={{ width: 840, transform: "rotate(-1.5deg)", zIndex: 2 }}>
          <VscodeWindow width={840} tab="app.js" language="JavaScript">
            <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 4 }}>
              {EDITOR.map((line, i) => (
                <CodeLine key={i} size={28} parts={line} />
              ))}
            </div>
          </VscodeWindow>
        </div>
        <div
          style={{
            direction: "ltr",
            fontFamily: MONO,
            fontSize: 64,
            fontWeight: 900,
            color: "#14182E",
            padding: "20px 46px",
            borderRadius: 24,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            boxShadow:
              "0 0 70px rgba(255,215,0,0.6), 0 18px 50px rgba(0,0,0,0.55)",
            zIndex: 2,
          }}
        >
          .js = JavaScript
        </div>
      </div>

      {/* bottom: badges + CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34, paddingBottom: 16 }}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          {BADGES.map((b) => (
            <div
              key={b.t}
              style={{
                padding: "16px 30px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.09)",
                border: `3px solid ${b.c}`,
                color: COLORS.white,
                fontSize: 36,
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
            padding: "24px 80px",
            borderRadius: 100,
            background: "linear-gradient(90deg, #00FF88, #22FF88)",
            color: "#052E16",
            fontSize: 50,
            fontWeight: 900,
            boxShadow: "0 0 70px rgba(0,255,136,0.55), 0 14px 40px rgba(0,0,0,0.45)",
          }}
        >
          شاهد الفيديو 👇
        </div>
      </div>
    </AbsoluteFill>

    {/* floating file types behind the window */}
    {DOCS.map((d) => (
      <div
        key={d.label}
        style={{
          position: "absolute",
          left: d.x,
          top: d.y,
          transform: `rotate(${d.rot}deg)`,
          zIndex: 1,
        }}
      >
        <FileDoc
          label={d.label}
          color={d.color}
          labelColor={d.labelColor}
          width={DOC_W}
        />
      </div>
    ))}
  </AbsoluteFill>
);
