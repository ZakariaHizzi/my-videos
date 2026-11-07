import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { VscodeLogo, VscodeWindow } from "./mocks";
import { CodeLine } from "./ui";
import { COLORS, FONT, MONO } from "./theme";

/** Static 1080x1920 cover image for the VS Code short. */
export const VSCodeCover: React.FC = () => (
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
      {/* top: logo + title */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: 10 }}>
        <div
          style={{
            filter: "drop-shadow(0 0 50px rgba(34,160,240,0.85)) drop-shadow(0 0 120px rgba(34,160,240,0.45))",
          }}
        >
          <VscodeLogo size={190} />
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 78,
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
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.gold,
            lineHeight: 1.3,
            textShadow:
              "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.45)",
          }}
        >
          ابدأ تبني مواقعك من الصفر!
        </div>
      </div>

      {/* middle: editor window with colorful code */}
      <div style={{ width: 820, transform: "rotate(-2deg)" }}>
        <VscodeWindow width={820} tab="index.html">
          <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 6 }}>
            <CodeLine size={30} parts={[{ t: "<!DOCTYPE html>", c: "#569CD6" }]} />
            <CodeLine
              size={30}
              parts={[
                { t: "<html ", c: "#569CD6" },
                { t: "lang", c: "#9CDCFE" },
                { t: "=", c: "#D4D4D4" },
                { t: '"ar"', c: "#CE9178" },
                { t: ">", c: "#569CD6" },
              ]}
            />
            <CodeLine
              size={30}
              parts={[
                { t: "  <h1>", c: "#569CD6" },
                { t: "أول موقع لي 🎉", c: "#CE9178" },
                { t: "</h1>", c: "#569CD6" },
              ]}
            />
            <CodeLine
              size={30}
              parts={[
                { t: "  <script>", c: "#569CD6" },
                { t: "alert", c: "#DCDCAA" },
                { t: "(", c: "#D4D4D4" },
                { t: '"مرحباً بالعالم!"', c: "#CE9178" },
                { t: ");", c: "#D4D4D4" },
              ]}
            />
            <CodeLine size={30} parts={[{ t: "</script></html>", c: "#569CD6" }]} />
          </div>
        </VscodeWindow>
      </div>

      {/* bottom: badges + CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, paddingBottom: 20 }}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { t: "مجاني 100%", c: COLORS.green },
            { t: "خفيف وسريع ⚡", c: COLORS.cyan },
            { t: "Live Server 🌐", c: COLORS.gold },
            { t: "كل اللغات 💻", c: COLORS.purple },
          ].map((b) => (
            <div
              key={b.t}
              style={{
                padding: "16px 32px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.09)",
                border: `3px solid ${b.c}`,
                color: COLORS.white,
                fontSize: 38,
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
  </AbsoluteFill>
);
