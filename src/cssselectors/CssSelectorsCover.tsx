import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";

const EDITOR: { t: string; c: string }[][] = [
  [{ t: "<h1 ", c: "#808080" }, { t: 'class="red"', c: "#9CDCFE" }, { t: ">", c: "#808080" }],
  [{ t: "  ده عنوان أحمر", c: "#D4D4D4" }],
  [{ t: "</h1>", c: "#808080" }],
  [{ t: "<h1 ", c: "#808080" }, { t: 'id="special"', c: "#9CDCFE" }, { t: ">", c: "#808080" }],
  [{ t: "  ده عنوان ذهبي", c: "#D4D4D4" }],
  [{ t: "</h1>", c: "#808080" }],
  [{ t: ".red { color: #e74c3c; }", c: "#FFD700" }],
  [{ t: "#special { color: #f39c12; }", c: "#FFD700" }],
];

const CHIPS = [
  { t: ".class", c: "#34D399", rot: -5 },
  { t: "#id", c: "#FFD700", rot: 6 },
];

const BADGES = [
  { t: "class = مجموعة", c: COLORS.cyan },
  { t: "id = فريد", c: COLORS.gold },
  { t: "للمبتدئين 🌱", c: COLORS.green },
];

export const CssSelectorsCover: React.FC = () => (
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
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.24, color: COLORS.white, textShadow: "0 8px 40px rgba(0,0,0,0.6)" }}>
          المحددات في CSS
          <span> 🎯</span>
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.2, color: COLORS.gold, textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)" }}>
          class & id ✨
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {CHIPS.map((c) => (
            <div key={c.t} style={{ padding: "10px 22px", borderRadius: 14, background: "rgba(6,10,30,0.9)", border: `3px solid ${c.c}`, color: "#E6EDF3", fontFamily: MONO, fontSize: 30, fontWeight: 700, direction: "ltr", boxShadow: `0 0 28px ${c.c}66`, transform: `rotate(${c.rot}deg)` }}>
              {c.t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>
        <div style={{ width: 820, transform: "rotate(-1.4deg)" }}>
          <VscodeWindow width={820} tab="style.css" language="CSS" showStatus={false}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 4 }}>
              {EDITOR.map((line, i) => (
                <div key={i} style={{ fontFamily: MONO, fontSize: 24, lineHeight: 1.75, whiteSpace: "pre", textAlign: "left", direction: "ltr" }}>
                  {line.map((p, j) => (
                    <span key={j} style={{ color: p.c }}>{p.t}</span>
                  ))}
                </div>
              ))}
            </div>
          </VscodeWindow>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingBottom: 4 }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {BADGES.map((b) => (
            <div key={b.t} style={{ padding: "10px 24px", borderRadius: 100, background: "rgba(255,255,255,0.09)", border: `3px solid ${b.c}`, color: COLORS.white, fontSize: 30, fontWeight: 800, fontFamily: MONO, direction: "ltr", boxShadow: `0 0 34px ${b.c}66` }}>
              {b.t}
            </div>
          ))}
        </div>
        <div style={{ padding: "15px 58px", borderRadius: 100, background: "linear-gradient(90deg, #00FF88, #22FF88)", color: "#052E16", fontSize: 42, fontWeight: 900, boxShadow: "0 0 70px rgba(255,136,0.55), 0 14px 40px rgba(0,0,0,0.45)" }}>
          class & id 🎯
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);