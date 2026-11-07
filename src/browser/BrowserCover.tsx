import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { BrowserMock, VscodeWindow } from "../vscode/mocks";
import { CodeLine } from "../vscode/ui";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { ChromeLogo, EdgeLogo, FirefoxLogo, SafariLogo, Twinkles } from "./parts";

const EDITOR: { t: string; c: string }[][] = [
  [{ t: "<!DOCTYPE html>", c: "#569CD6" }],
  [
    { t: "<html ", c: "#569CD6" },
    { t: "lang", c: "#9CDCFE" },
    { t: "=", c: "#D4D4D4" },
    { t: '"ar"', c: "#CE9178" },
    { t: ">", c: "#569CD6" },
  ],
  [
    { t: "  <h1>", c: "#569CD6" },
    { t: "مرحباً بالعالم", c: "#CE9178" },
    { t: "</h1>", c: "#569CD6" },
  ],
  [
    { t: "  <button>", c: "#569CD6" },
    { t: "اضغط هنا", c: "#CE9178" },
    { t: "</button>", c: "#569CD6" },
  ],
  [{ t: "</html>", c: "#569CD6" }],
];

const BADGES = [
  { t: "شرح بالعربي", c: COLORS.cyan },
  { t: "خطوة بخطوة", c: COLORS.purple },
  { t: "أدوات المطور 🛠️", c: COLORS.gold },
  { t: "تطبيق مباشر ⚡", c: COLORS.green },
];

const LOGOS = [
  { name: "Chrome", Logo: ChromeLogo, c: "#EA4335" },
  { name: "Firefox", Logo: FirefoxLogo, c: "#FF8A1E" },
  { name: "Edge", Logo: EdgeLogo, c: "#1C9EF0" },
  { name: "Safari", Logo: SafariLogo, c: "#5AC8FA" },
];

/** The rendered landing page shown inside the browser window. */
const SiteBody: React.FC = () => (
  <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: "linear-gradient(135deg,#A855F7,#22D3EE)",
        }}
      />
      <div style={{ width: 108, height: 15, borderRadius: 8, background: "#94A3B8" }} />
      <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
        {[58, 50, 66].map((w) => (
          <div key={w} style={{ width: w, height: 13, borderRadius: 7, background: "#CBD5E1" }} />
        ))}
      </div>
    </div>

    <div
      style={{
        borderRadius: 20,
        padding: "24px 22px",
        background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 55%,#7C3AED 100%)",
        boxShadow: "inset 0 0 60px rgba(34,211,238,0.18)",
      }}
    >
      <div style={{ width: "78%", height: 24, borderRadius: 11, background: "#FFFFFF" }} />
      <div style={{ width: "54%", height: 24, borderRadius: 11, background: "#FFFFFF", marginTop: 10 }} />
      <div style={{ width: "88%", height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)", marginTop: 16 }} />
      <div style={{ width: "70%", height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)", marginTop: 8 }} />
      <div style={{ display: "flex", gap: 14, marginTop: 18 }}>
        <div style={{ width: 140, height: 46, borderRadius: 23, background: "#FFD700" }} />
        <div
          style={{
            width: 140,
            height: 46,
            borderRadius: 23,
            background: "rgba(255,255,255,0.22)",
            border: "3px solid rgba(255,255,255,0.7)",
          }}
        />
      </div>
    </div>

    <div style={{ display: "flex", gap: 14 }}>
      {["#22D3EE", "#A855F7", "#FFD700"].map((c) => (
        <div
          key={c}
          style={{
            flex: 1,
            borderRadius: 16,
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: 14,
            boxShadow: "0 10px 24px rgba(15,23,42,0.10)",
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 14, background: c }} />
          <div style={{ width: "86%", height: 12, borderRadius: 6, background: "#E2E8F0", marginTop: 14 }} />
          <div style={{ width: "60%", height: 10, borderRadius: 5, background: "#EEF2F7", marginTop: 8 }} />
        </div>
      ))}
    </div>
  </div>
);

/** Static 1080x1920 cover image for the "BrowserRender" short. */
export const BrowserCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={18} seed={3} />
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
      {/* top: browser logos + title */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", gap: 30 }}>
          {LOGOS.map(({ name, Logo, c }) => (
            <div
              key={name}
              style={{
                filter: `drop-shadow(0 0 34px ${c}cc) drop-shadow(0 0 80px ${c}66)`,
              }}
            >
              <Logo size={106} />
            </div>
          ))}
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
          <span style={{ fontFamily: FONT, fontWeight: 900 }}>المتصفح</span>
          <span style={{ direction: "ltr", unicodeBidi: "isolate", color: COLORS.cyan }}>(Browser)</span>
          <span>🌐</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.28,
            color: COLORS.gold,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.45)",
          }}
        >
          إزاي بيتحول الكود لموقع؟ 🤯
        </div>
      </div>

      {/* middle: code editor -> arrow -> rendered site */}
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
                <CodeLine key={i} size={26} parts={line} />
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
            bodyStyle={{ minHeight: 220, padding: 20 }}
          >
            <SiteBody />
          </BrowserMock>
        </div>
      </div>

      {/* bottom: badges + CTA */}
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
                padding: "12px 26px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.09)",
                border: `3px solid ${b.c}`,
                color: COLORS.white,
                fontSize: 34,
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
            padding: "18px 70px",
            borderRadius: 100,
            background: "linear-gradient(90deg, #00FF88, #22FF88)",
            color: "#052E16",
            fontSize: 46,
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
