import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";

const EDITOR: { t: string; c: string }[][] = [
  [{ t: ".title ", c: "#FFD166" }, { t: "{", c: "#D4D4D4" }],
  [{ t: "  color", c: "#7DD3FC" }, { t: ": ", c: "#D4D4D4" }, { t: "#e74c3c", c: "#FF8A65" }, { t: ";", c: "#D4D4D4" }],
  [{ t: "}", c: "#D4D4D4" }],
  [{ t: ".card ", c: "#FFD166" }, { t: "{", c: "#D4D4D4" }],
  [{ t: "  background-color", c: "#7DD3FC" }, { t: ": ", c: "#D4D4D4" }, { t: "#3498db", c: "#FF8A65" }, { t: ";", c: "#D4D4D4" }],
  [{ t: "  background-size", c: "#7DD3FC" }, { t: ": ", c: "#D4D4D4" }, { t: "cover", c: "#FF8A65" }, { t: ";", c: "#D4D4D4" }],
  [{ t: "  opacity", c: "#7DD3FC" }, { t: ": ", c: "#D4D4D4" }, { t: "0.7", c: "#FF8A65" }, { t: ";", c: "#D4D4D4" }],
  [{ t: "}", c: "#D4D4D4" }],
];

const CHIPS = [
  { t: "color", c: "#E74C3C", rot: -5 },
  { t: "background-color", c: "#3498DB", rot: 4 },
  { t: "background-image", c: "#22D3EE", rot: -3 },
  { t: "opacity", c: "#34D399", rot: 5 },
];

const BADGES = [
  { t: "كود HEX 🏆", c: COLORS.gold },
  { t: "خلفيات ملوّنة 🎨", c: COLORS.cyan },
  { t: "شفافية 👻", c: COLORS.green },
];

export const CssColorsCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={20} seed={9} />
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.24,
            color: COLORS.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          الألوان والخلفيات في CSS
          <span> 🎨</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.2,
            color: COLORS.gold,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)",
          }}
        >
          4 أدوات سحرية! ✨
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
                fontSize: 28,
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

      <div style={{ width: 860, transform: "rotate(-1.4deg)" }}>
        <VscodeWindow width={860} tab="style.css" language="CSS" showStatus={false}>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: 4 }}>
            {EDITOR.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: MONO,
                  fontSize: 26,
                  lineHeight: 1.7,
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingBottom: 4 }}>
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
            background: "linear-gradient(90deg, #FFD700, #FF6B35)",
            color: "#14182E",
            fontSize: 42,
            fontWeight: 900,
            boxShadow: "0 0 70px rgba(255,136,0,0.55), 0 14px 40px rgba(0,0,0,0.45)",
          }}
        >
          تابعني! 👇
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
