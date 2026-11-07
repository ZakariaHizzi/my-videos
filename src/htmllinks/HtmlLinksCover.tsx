import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";
import { C_LINK, C_HREF, C_TARGET, C_UL, C_LI, RenderNavMenu } from "./parts";

const TAG = "#569CD6";
const ATTR = "#9CDCFE";
const STR = "#CE9178";
const PLAIN = "#D4D4D4";

const EDITOR: { t: string; c: string }[][] = [
  [
    { t: "<ul", c: TAG },
    { t: ">", c: TAG },
  ],
  [
    { t: "  <li", c: TAG },
    { t: ">", c: TAG },
    { t: "<a", c: TAG },
    { t: " ", c: PLAIN },
    { t: "href", c: ATTR },
    { t: "=", c: PLAIN },
    { t: '"home.html"', c: STR },
    { t: ">", c: TAG },
    { t: "الرئيسية", c: STR },
    { t: "</a>", c: TAG },
    { t: "</li>", c: TAG },
  ],
  [
    { t: "  <li", c: TAG },
    { t: ">", c: TAG },
    { t: "<a", c: TAG },
    { t: " ", c: PLAIN },
    { t: "href", c: ATTR },
    { t: "=", c: PLAIN },
    { t: '"about.html"', c: STR },
    { t: " ", c: PLAIN },
    { t: "target", c: ATTR },
    { t: "=", c: PLAIN },
    { t: '"_blank"', c: STR },
    { t: ">", c: TAG },
    { t: "من نحن", c: STR },
    { t: "</a></li>", c: TAG },
  ],
  [{ t: "</ul>", c: TAG }],
];

const TAG_CHIPS = [
  { t: "<a>", c: C_LINK, rot: -5 },
  { t: "<ul>", c: C_UL, rot: 6 },
  { t: "<li>", c: C_LI, rot: -4 },
];

const BADGES = [
  { t: "href", c: C_HREF },
  { t: 'target="_blank"', c: C_TARGET },
  { t: "ul + li", c: C_UL },
];

export const HtmlLinksCover: React.FC = () => (
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.24,
            color: COLORS.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          إزاي تعمل روابط + قوائم
          <span> 🔗</span>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.2,
            color: COLORS.gold,
            textShadow:
              "0 8px 0 rgba(0,0,0,0.35), 0 0 90px rgba(255,215,0,0.5)",
          }}
        >
          قائمة تنقل! 🧭
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

      {/* middle: editor + rendered nav menu */}
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
          <VscodeWindow
            width={820}
            tab="index.html"
            language="HTML"
            showStatus={false}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                paddingTop: 4,
              }}
            >
              {EDITOR.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: MONO,
                    fontSize: 20,
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
            boxShadow:
              "0 0 56px rgba(255,215,0,0.55), 0 14px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span>{"</>"}</span>
          <span style={{ fontFamily: FONT }}>🔗</span>
        </div>

        {/* rendered nav menu */}
        <div style={{ width: 760, transform: "rotate(1.2deg)" }}>
          <RenderNavMenu
            items={[
              { label: "الرئيسية", active: true },
              { label: "من نحن" },
              { label: "خدماتنا" },
              { label: "اتصل بنا" },
            ]}
            width={760}
            fontSize={28}
          />
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
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
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
                direction: "ltr",
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
            boxShadow:
              "0 0 70px rgba(0,255,136,0.55), 0 14px 40px rgba(0,0,0,0.45)",
          }}
        >
          إزاي تعم روابط + قوائم 🧭
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
