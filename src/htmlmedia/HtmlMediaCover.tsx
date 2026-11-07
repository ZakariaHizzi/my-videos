import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../vscode/Background";
import { VscodeWindow } from "../vscode/mocks";
import { CodeLine } from "../vscode/ui";
import { COLORS, FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../browser/parts";
import { C_ATTR, C_PLAIN, C_STR, C_TAG } from "./parts";
import { PhotoArt, Waveform } from "./art";

const GOLD = COLORS.gold;

const CODE: { t: string; c: string }[][] = [
  [
    { t: "<img", c: C_TAG },
    { t: " ", c: C_PLAIN },
    { t: "src", c: C_ATTR },
    { t: "=", c: C_PLAIN },
    { t: '"photo.jpg"', c: C_STR },
    { t: " ", c: C_PLAIN },
    { t: "alt", c: C_ATTR },
    { t: "=", c: C_PLAIN },
    { t: '"وصف الصورة"', c: C_STR },
    { t: ">", c: C_TAG },
  ],
  [
    { t: "<video", c: C_TAG },
    { t: " ", c: C_PLAIN },
    { t: "src", c: C_ATTR },
    { t: "=", c: C_PLAIN },
    { t: '"video.mp4"', c: C_STR },
    { t: " controls autoplay loop muted", c: C_ATTR },
    { t: ">", c: C_TAG },
  ],
  [
    { t: "<audio", c: C_TAG },
    { t: " ", c: C_PLAIN },
    { t: "src", c: C_ATTR },
    { t: "=", c: C_PLAIN },
    { t: '"song.mp3"', c: C_STR },
    { t: " controls", c: C_ATTR },
    { t: ">", c: C_TAG },
    { t: "</audio>", c: C_TAG },
  ],
];

const TILES = [
  { icon: "🖼️", tag: "<img>", c: "#22D3EE", ar: "صورة" },
  { icon: "🎥", tag: "<video>", c: "#A855F7", ar: "فيديو" },
  { icon: "🎵", tag: "<audio>", c: "#FFD700", ar: "صوت" },
];

const BADGES = [
  { t: "HTML", c: "#FF6B35" },
  { t: "شرح بالعربي", c: COLORS.cyan },
  { t: "للمبتدئين 🌱", c: COLORS.green },
];

/** Static 9:16 thumbnail for the html-media short. */
export const HtmlMediaCover: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Twinkles count={22} seed={9} />
    <AbsoluteFill
      style={{
        direction: "rtl",
        fontFamily: FONT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "74px 56px 50px",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      {/* headline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div
          style={{
            padding: "10px 34px",
            borderRadius: 100,
            background: "rgba(255,255,255,0.1)",
            border: `3px solid ${COLORS.cyan}`,
            color: COLORS.white,
            fontSize: 34,
            fontWeight: 800,
            boxShadow: `0 0 34px ${COLORS.cyan}55`,
          }}
        >
          إزاي تضيف وسائط في موقعك؟ 🤔
        </div>
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            lineHeight: 1.16,
            color: COLORS.white,
            textShadow: "0 10px 44px rgba(0,0,0,0.6)",
          }}
        >
          وسائط في HTML
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.2,
            color: GOLD,
            textShadow: "0 8px 0 rgba(0,0,0,0.35), 0 0 74px rgba(255,215,0,0.55)",
          }}
        >
          3 وسوم + خصائصهم! ✨
        </div>
      </div>

      {/* editor */}
      <div style={{ width: 940, transform: "rotate(-1.3deg)" }}>
        <VscodeWindow
          width={940}
          tab="index.html"
          language="HTML"
          showStatus={false}
          activityBar={false}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 4 }}>
            {CODE.map((line, i) => (
              <CodeLine key={i} size={24} parts={line} />
            ))}
          </div>
        </VscodeWindow>
      </div>

      {/* the three tags */}
      <div style={{ display: "flex", gap: 26, direction: "ltr" }}>
        {TILES.map((tile, i) => (
          <div
            key={tile.tag}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              transform: `rotate(${i === 1 ? 1.6 : -1.6}deg)`,
            }}
          >
            <div
              style={{
                width: 168,
                height: 168,
                borderRadius: 46,
                background: `linear-gradient(140deg, ${tile.c}38, rgba(255,255,255,0.06))`,
                border: `5px solid ${tile.c}`,
                boxShadow: `0 0 54px ${tile.c}, inset 0 0 34px ${tile.c}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 86,
              }}
            >
              {tile.icon}
            </div>
            <div
              style={{
                padding: "8px 22px",
                borderRadius: 14,
                background: "rgba(6,10,30,0.94)",
                border: `3px solid ${tile.c}`,
                color: tile.c,
                fontFamily: MONO,
                fontSize: 34,
                fontWeight: 700,
                boxShadow: `0 0 30px ${tile.c}66`,
              }}
            >
              {tile.tag}
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>
              {tile.ar}
            </div>
          </div>
        ))}
      </div>

      {/* live result strip: image + audio waveform */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          transform: "rotate(1.1deg)",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 470,
            borderRadius: 18,
            overflow: "hidden",
            border: "4px solid rgba(255,255,255,0.7)",
            boxShadow: "0 22px 56px rgba(0,0,0,0.5), 0 0 46px rgba(255,215,0,0.25)",
          }}
        >
          <PhotoArt />
        </div>
        <div
          style={{
            width: 350,
            height: 118,
            borderRadius: 20,
            background: "linear-gradient(120deg,#12162E,#241656)",
            border: `3px solid ${COLORS.purple}`,
            boxShadow: `0 0 44px ${COLORS.purple}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Waveform bars={18} width={300} height={74} color="#22D3EE" />
        </div>
      </div>

      {/* footer */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
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
                boxShadow: `0 0 36px ${b.c}66`,
              }}
            >
              {b.t}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "18px 74px",
            borderRadius: 100,
            background: "linear-gradient(90deg, #22D3EE, #6366F1, #A855F7)",
            color: "#fff",
            fontSize: 52,
            fontWeight: 900,
            boxShadow: "0 0 74px rgba(99,102,241,0.6), 0 16px 44px rgba(0,0,0,0.5)",
          }}
        >
          شاهد الفيديو 👇
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
