import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  BrowserFrame,
  C_CYAN,
  C_GOLD,
  C_GREEN,
  C_ORANGE,
  CodeBlock,
  EditorFrame,
  SparkleBurst,
  T_PLAIN,
  T_PROP,
  T_SEL,
  T_VAL,
  Twinkles,
  clamp,
  popAt,
} from "../parts";
import type { Line } from "../parts";

const CODE: Line[] = [
  { parts: [{ t: "h1 ", c: T_SEL }, { t: "{", c: T_PLAIN }] },
  {
    parts: [
      { t: "  " },
      { t: "color", c: T_PROP },
      { t: ": ", c: T_PLAIN },
      { t: "#e74c3c", c: T_VAL },
      { t: ";", c: T_PLAIN },
    ],
    active: true,
  },
  { parts: [{ t: "}", c: T_PLAIN }] },
];

const Key: React.FC<{
  label: string;
  pressed: number;
  glow: number;
}> = ({ label, pressed, glow }) => (
  <div
    style={{
      minWidth: label === "S" ? 78 : 132,
      height: 78,
      padding: "0 20px",
      borderRadius: 16,
      background: "linear-gradient(180deg,#F8FAFC,#CBD5E1)",
      border: "2px solid #94A3B8",
      borderBottomWidth: 7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#0F172A",
      fontFamily: MONO,
      fontSize: 34,
      fontWeight: 800,
      boxShadow: `0 10px 22px rgba(0,0,0,0.4), 0 0 ${18 + glow * 34}px ${C_CYAN}${Math.round(
        40 + glow * 70,
      )
        .toString(16)
        .padStart(2, "0")}`,
      transform: `translateY(${pressed * 6}px) scale(${1 - pressed * 0.05})`,
    }}
  >
    {label}
  </div>
);

export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const words = [
    { t: "حفظ", c: C_GREEN, at: 4 },
    { t: "تحديث", c: C_CYAN, at: 16 },
    { t: "سحر", c: C_GOLD, at: 28 },
  ];

  const save = 64;
  const pressed = interpolate(frame, [save - 6, save, save + 7], [0, 1, 0], clamp);
  const saved = frame >= save;
  const zoom = interpolate(frame, [save, save + 22], [0, 1], clamp);
  const flash = interpolate(frame, [save, save + 4, save + 24], [0, 0.9, 0], clamp);
  const redIn = interpolate(frame, [save + 2, save + 20], [0, 1], clamp);
  const caption = popAt(frame, fps, 34, 12, 160);
  const editor = popAt(frame, fps, 4, 14, 140);
  const browser = popAt(frame, fps, 10, 14, 140);
  const glow = 0.5 + 0.5 * Math.sin(t * 6);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={16} seed={31} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${1 + 0.07 * zoom})`,
          transformOrigin: "64% 58%",
        }}
      >
        {/* editor */}
        <div
          style={{
            position: "absolute",
            left: -28,
            top: 230,
            width: 764,
            zIndex: 12,
            opacity: Math.min(1, editor),
            transform: `translateY(${(1 - editor) * -40}px) rotate(-1.6deg)`,
          }}
        >
          <EditorFrame
            width={764}
            tab="style.css"
            language="CSS"
            statusLine="Ln 2, Col 17"
            saved={saved}
          >
            <CodeBlock lines={CODE} fontSize={34} lineHeight={58} caret />
          </EditorFrame>
        </div>

        {/* browser */}
        <div
          style={{
            position: "absolute",
            left: 274,
            top: 752,
            width: 780,
            zIndex: 10,
            opacity: Math.min(1, browser),
            transform: `translateY(${(1 - browser) * 50}px) rotate(1deg)`,
          }}
        >
          <BrowserFrame
            width={780}
            url="localhost:5500"
            style={{
              boxShadow: saved
                ? `0 30px 80px rgba(0,0,0,0.58), 0 0 ${40 + glow * 40}px ${C_GREEN}55`
                : undefined,
            }}
            bodyStyle={{
              height: 390,
              padding: "34px 42px",
              position: "relative",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                position: "relative",
                fontFamily: FONT,
                fontSize: 78,
                fontWeight: 900,
                lineHeight: 1.2,
                height: 96,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  color: "#111827",
                  opacity: 1 - redIn,
                }}
              >
                مرحباً
              </span>
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  color: "#E74C3C",
                  opacity: redIn,
                  textShadow: `0 0 34px rgba(231,76,60,${0.35 + glow * 0.25})`,
                }}
              >
                مرحباً
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              <div style={{ width: 520, height: 13, borderRadius: 7, background: "#E5E7EB" }} />
              <div style={{ width: 430, height: 13, borderRadius: 7, background: "#E5E7EB" }} />
              <div style={{ width: 340, height: 13, borderRadius: 7, background: "#E5E7EB" }} />
            </div>
            <div
              style={{
                marginTop: 22,
                display: "inline-flex",
                width: "fit-content",
                padding: "11px 30px",
                borderRadius: 12,
                background: `linear-gradient(90deg,${C_ORANGE},#FF9A62)`,
                color: "#FFFFFF",
                fontFamily: FONT,
                fontSize: 24,
                fontWeight: 900,
                boxShadow: `0 8px 22px ${C_ORANGE}44`,
              }}
            >
              زر جميل 🎨
            </div>
            <div
              style={{
                position: "absolute",
                left: 30,
                bottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: MONO,
                fontSize: 17,
                color: saved ? "#047857" : "#94A3B8",
                direction: "ltr",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: saved ? C_GREEN : "#94A3B8",
                  boxShadow: saved ? `0 0 12px ${C_GREEN}` : undefined,
                }}
              />
              {saved ? "updated live" : "waiting for save"}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFFFFF",
                opacity: flash,
                pointerEvents: "none",
              }}
            />
          </BrowserFrame>
        </div>

        {/* keycap */}
        <div
          style={{
            position: "absolute",
            left: 408,
            top: 596,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px 22px",
            borderRadius: 24,
            background: "rgba(5,10,30,0.9)",
            border: `2px solid ${C_CYAN}66`,
            boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 ${20 + glow * 25}px ${C_CYAN}44`,
            opacity: Math.min(1, editor),
          }}
        >
          <Key label="Ctrl" pressed={pressed} glow={glow} />
          <div style={{ fontFamily: FONT, fontSize: 34, color: "#94A3B8", fontWeight: 900 }}>+</div>
          <Key label="S" pressed={pressed} glow={glow} />
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: 30,
              border: `3px solid ${C_GOLD}`,
              opacity: pressed > 0.05 ? pressed * 0.9 : 0,
              transform: `scale(${1 + pressed * 0.12})`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* arrow from keys to browser */}
        <div
          style={{
            position: "absolute",
            left: 590,
            top: 650,
            zIndex: 18,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            opacity: 0.55 + glow * 0.45,
            transform: `translate(${Math.sin(t * 5) * 5}px,${Math.sin(t * 5 + 1) * 4}px) rotate(44deg)`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                fontSize: 32,
                color: saved ? C_GREEN : C_CYAN,
                textShadow: `0 0 14px ${saved ? C_GREEN : C_CYAN}`,
              }}
            >
              ➜
            </div>
          ))}
        </div>
      </div>

      <SparkleBurst
        start={save + 2}
        x={730}
        y={900}
        count={18}
        radius={260}
        duration={30}
      />

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 36,
          opacity: Math.min(1, caption),
          transform: `translateY(${(1 - caption) * 24}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "22px 42px",
            borderRadius: 28,
            background: "rgba(5,10,30,0.92)",
            border: `3px solid ${C_GOLD}88`,
            boxShadow: `0 0 44px ${C_GOLD}33, 0 18px 44px rgba(0,0,0,0.5)`,
            direction: "rtl",
            whiteSpace: "nowrap",
          }}
        >
          {words.map((w, i) => (
            <React.Fragment key={w.t}>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 50,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  textShadow: `0 0 22px ${w.c}88`,
                  opacity: Math.min(1, popAt(frame, fps, w.at, 12, 160)),
                  display: "inline-block",
                }}
              >
                {w.t}
              </span>
              {i < words.length - 1 ? (
                <span style={{ fontSize: 42, color: w.c, fontWeight: 900 }}>←</span>
              ) : null}
            </React.Fragment>
          ))}
          <span
            style={{
              fontSize: 52,
              filter: `drop-shadow(0 0 16px ${C_GOLD})`,
              transform: `scale(${1 + 0.12 * Math.max(0, Math.sin(t * 7))})`,
            }}
          >
            ✨
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1450,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, popAt(frame, fps, 90, 12, 160)),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 26px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.8)",
            border: `2px solid ${C_GREEN}55`,
            color: "#D1FAE5",
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          <span style={{ color: C_GREEN }}>●</span>
          التغيير لحظي… من غير ريفريش!
        </div>
      </div>
    </AbsoluteFill>
  );
};
