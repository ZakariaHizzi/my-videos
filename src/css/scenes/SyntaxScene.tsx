import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  BrowserFrame,
  C_CYAN,
  C_GOLD,
  C_PURPLE,
  C_RED,
  K,
  NotePill,
  SparkleBurst,
  T_PLAIN,
  T_PROP,
  T_SEL,
  T_VAL,
  Twinkles,
  clamp,
  fadeUp,
  popAt,
} from "../parts";

const FS = 58;
const CW = FS * 0.55;
const TEXT = "h1 { color: #e74c3c; }";

type Tok = { t: string; x: number; c: string; punct?: boolean };

const TOKENS: Tok[] = [
  { t: "h1", x: 0, c: T_SEL },
  { t: " ", x: 2, c: T_PLAIN },
  { t: "{", x: 3, c: T_PLAIN, punct: true },
  { t: " ", x: 4, c: T_PLAIN },
  { t: "color", x: 5, c: T_PROP },
  { t: ":", x: 10, c: T_PLAIN },
  { t: " ", x: 11, c: T_PLAIN },
  { t: "#e74c3c", x: 12, c: T_VAL },
  { t: ";", x: 20, c: T_PLAIN, punct: true },
  { t: " ", x: 21, c: T_PLAIN },
  { t: "}", x: 22, c: T_PLAIN, punct: true },
];

const BADGES = [
  { n: "1", label: "المحدد", c: T_SEL, center: 1 * CW, token: "h1" },
  { n: "2", label: "الخاصية", c: T_PROP, center: 7.5 * CW, token: "color" },
  { n: "3", label: "القيمة", c: T_VAL, center: 16 * CW, token: "#e74c3c" },
];

export const SyntaxScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const head = fadeUp(frame, 0, 14);
  const card = popAt(frame, fps, 8, 14, 140);
  const typed = Math.round(interpolate(frame, [22, 96], [0, TEXT.length], clamp));
  const badge1 = popAt(frame, fps, 106, 10, 190);
  const badge2 = popAt(frame, fps, 120, 10, 190);
  const badge3 = popAt(frame, fps, 134, 10, 190);
  const badges = [badge1, badge2, badge3];
  const preview = popAt(frame, fps, 150, 12, 160);
  const bottom = popAt(frame, fps, 168, 10, 175);

  const pulse = (at: number) => 1 + 0.34 * Math.max(0, 1 - Math.abs(frame - at) / 9);
  const glowAmt = (at: number) => Math.max(0, 1 - Math.abs(frame - at) / 14);

  const heartBeat = 1 + 0.12 * Math.max(0, Math.sin(t * 8));

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={14} seed={27} />

      <div style={{ opacity: head.opacity, transform: head.transform }}>
        <div
          style={{
            position: "absolute",
            top: 128,
            left: 40,
            right: 40,
            display: "flex",
            justifyContent: "center",
            zIndex: 38,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "20px 40px",
              borderRadius: 30,
              background: "rgba(5,10,30,0.9)",
              border: `3px solid ${C_PURPLE}99`,
              boxShadow: `0 18px 50px rgba(0,0,0,0.55), 0 0 44px ${C_PURPLE}33`,
              direction: "rtl",
              fontFamily: FONT,
              fontSize: 60,
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: T_SEL }}>محدد</span>
            <span style={{ color: "#FFFFFF" }}>{"{"}</span>
            <span style={{ color: T_PROP }}>خاصية</span>
            <span style={{ color: "#FFFFFF" }}>:</span>
            <span style={{ color: T_VAL }}>قيمة</span>
            <span style={{ color: "#FFFFFF" }}>;</span>
            <span style={{ color: "#FFFFFF" }}>{"}"}</span>
          </div>
        </div>
      </div>

      {/* code card */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 392,
          width: 920,
          height: 470,
          borderRadius: 26,
          background: "#0B1020",
          border: `2px solid ${C_PURPLE}66`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${C_PURPLE}33`,
          opacity: Math.min(1, card),
          transform: `scale(${0.94 + 0.06 * card})`,
          transformOrigin: "50% 20%",
          overflow: "hidden",
          zIndex: 16,
        }}
      >
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 22px",
            background: "linear-gradient(90deg,#1B2140,#252C56)",
            borderBottom: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#28C840" }} />
          <div
            style={{
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              borderRadius: 8,
              background: "#0B1020",
              borderTop: `2px solid ${C_CYAN}`,
              color: "#FFFFFF",
              fontFamily: MONO,
              fontSize: 21,
            }}
          >
            <span style={{ color: C_CYAN }}>#</span> style.css
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.4)", fontFamily: MONO, fontSize: 19 }}>
            Visual Studio Code
          </div>
        </div>

        <div style={{ position: "relative", height: 414 }}>
          {/* line number */}
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 44,
              fontFamily: MONO,
              fontSize: 22,
              color: "#4B5563",
            }}
          >
            1
          </div>

          {/* code tokens */}
          <div
            style={{
              position: "absolute",
              left: 93,
              top: 40,
              width: TEXT.length * CW,
              height: 100,
              fontFamily: MONO,
              fontSize: FS,
              lineHeight: "100px",
              direction: "ltr",
              whiteSpace: "pre",
            }}
          >
            {TOKENS.map((tok, i) => {
              const visible = Math.max(0, Math.min(tok.t.length, typed - tok.x));
              if (visible <= 0) return null;
              const isPunct = tok.punct;
              const at = tok.t === "{" ? 108 : tok.t === ";" ? 126 : 142;
              const g = isPunct ? glowAmt(at) : 0;
              return (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: tok.x * CW,
                    top: 0,
                    color: tok.c,
                    transform: `scale(${isPunct ? pulse(at) : 1})`,
                    transformOrigin: "center",
                    textShadow: g > 0 ? `0 0 ${22 * g}px ${C_GOLD}` : "none",
                    filter: g > 0.2 ? `drop-shadow(0 0 14px ${C_GOLD}99)` : undefined,
                  }}
                >
                  {tok.t.slice(0, visible)}
                </span>
              );
            })}
            {typed > 0 && typed < TEXT.length ? (
              <span
                style={{
                  position: "absolute",
                  left: typed * CW,
                  top: 16,
                  width: 4,
                  height: 68,
                  background: frame % 30 < 18 ? C_CYAN : "transparent",
                }}
              />
            ) : null}
          </div>

          {/* punctuation halos */}
          {[
            { x: 3, at: 108 },
            { x: 20, at: 126 },
            { x: 22, at: 142 },
          ].map((p) => {
            const g = glowAmt(p.at);
            if (g <= 0) return null;
            return (
              <div
                key={p.x}
                style={{
                  position: "absolute",
                  left: 93 + p.x * CW - 18,
                  top: 44,
                  width: CW + 36,
                  height: 92,
                  borderRadius: 16,
                  border: `3px solid rgba(255,215,0,${g})`,
                  boxShadow: `0 0 ${26 * g}px rgba(255,215,0,${0.8 * g})`,
                  opacity: g,
                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* connectors + badges */}
          {BADGES.map((b, i) => {
            const s = badges[i];
            if (s <= 0.001) return null;
            return (
              <React.Fragment key={b.n}>
                <div
                  style={{
                    position: "absolute",
                    left: 93 + b.center,
                    top: 152,
                    width: 3,
                    height: 34,
                    background: b.c,
                    opacity: Math.min(1, s) * 0.8,
                    boxShadow: `0 0 12px ${b.c}`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 93 + b.center - 39,
                    top: 184,
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `radial-gradient(circle,${b.c}33,#0B1020 72%)`,
                    border: `3px solid ${b.c}`,
                    color: b.c,
                    fontFamily: MONO,
                    fontSize: 38,
                    fontWeight: 900,
                    boxShadow: `0 0 30px ${b.c}66`,
                    opacity: Math.min(1, s),
                    transform: `scale(${0.4 + 0.6 * s})`,
                  }}
                >
                  {b.n}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 93 + b.center - 80,
                    top: 268,
                    width: 160,
                    textAlign: "center",
                    fontFamily: FONT,
                    fontSize: 34,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    textShadow: `0 0 20px ${b.c}88`,
                    opacity: Math.min(1, s),
                    transform: `translateY(${(1 - s) * 12}px)`,
                  }}
                >
                  {b.label}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <SparkleBurst start={96} x={540} y={560} count={14} radius={220} duration={28} />

      {/* mini browser preview */}
      <div
        style={{
          position: "absolute",
          left: 210,
          top: 940,
          width: 660,
          zIndex: 14,
          opacity: Math.min(1, preview),
          transform: `translateY(${(1 - preview) * 40}px) scale(${0.95 + 0.05 * preview})`,
        }}
      >
        <BrowserFrame
          width={660}
          url="localhost:5500"
          bodyStyle={{
            height: 250,
            padding: "28px 34px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 56,
              fontWeight: 900,
              color: "#E74C3C",
              lineHeight: 1.2,
              textShadow: "0 0 26px rgba(231,76,60,0.3)",
            }}
          >
            مرحباً
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ width: 380, height: 11, borderRadius: 6, background: "#E5E7EB" }} />
            <div style={{ width: 300, height: 11, borderRadius: 6, background: "#E5E7EB" }} />
          </div>
          <div
            style={{
              position: "absolute",
              right: 24,
              top: 20,
              padding: "5px 14px",
              borderRadius: 100,
              background: "rgba(231,76,60,0.1)",
              border: "2px solid rgba(231,76,60,0.55)",
              color: "#B91C1C",
              fontFamily: MONO,
              fontSize: 17,
              fontWeight: 700,
              direction: "ltr",
            }}
          >
            color: #e74c3c
          </div>
        </BrowserFrame>
      </div>

      {/* bottom recap */}
      <div
        style={{
          position: "absolute",
          top: 1262,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, bottom),
          transform: `scale(${0.7 + 0.3 * bottom})`,
        }}
      >
        <NotePill color={C_RED} fontSize={42}>
          <K color={C_RED} size={44}>
            h1 {"{ color: red; }"}
          </K>
          <span style={{ display: "inline-block", transform: `scale(${heartBeat})` }}>❤️</span>
        </NotePill>
      </div>

      {/* floating syntax chips */}
      <div
        style={{
          position: "absolute",
          top: 1420,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          gap: 18,
          zIndex: 26,
          opacity: Math.min(1, popAt(frame, fps, 180, 12, 150)),
        }}
      >
        {[
          { t: "selector", c: T_SEL },
          { t: "property", c: T_PROP },
          { t: "value", c: T_VAL },
        ].map((c) => (
          <div
            key={c.t}
            style={{
              padding: "9px 22px",
              borderRadius: 14,
              background: "rgba(5,10,30,0.88)",
              border: `2px solid ${c.c}88`,
              color: c.c,
              fontFamily: MONO,
              fontSize: 24,
              fontWeight: 700,
              boxShadow: `0 0 20px ${c.c}33`,
              direction: "ltr",
            }}
          >
            {c.t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
