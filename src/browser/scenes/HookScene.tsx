import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MONO, fadeUp, pop, rand } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { ClickRipple } from "../../vscode/lang/parts";
import { Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const SITE = { x: 100, y: 430, w: 880 };
const BTN = { cx: 540, cy: 1440, r: 96 };
// voice: "مجرد أكواد!" lands at 2.46s => frame 74
const PRESS = 66;
const BLAST = 74;

const CHIPS = [
  { t: '<div class="hero">', c: "#7DD3FC", x: 54, y: 372, rot: -11, d: 0 },
  { t: "<h1>أهلاً بك</h1>", c: "#F7DF1E", x: 596, y: 344, rot: 9, d: 3 },
  { t: "body { margin: 0; }", c: "#C586C0", x: 66, y: 556, rot: 6, d: 6 },
  { t: "color: #7C3AED;", c: "#CE9178", x: 636, y: 528, rot: -8, d: 2 },
  { t: "</section>", c: "#7DD3FC", x: 62, y: 754, rot: -6, d: 9 },
  { t: "function render() {", c: "#DCDCAA", x: 700, y: 726, rot: 12, d: 5 },
  { t: "const site = {};", c: "#9CDCFE", x: 56, y: 962, rot: 8, d: 12 },
  { t: "=> 页面 = كود", c: "#F7DF1E", x: 640, y: 944, rot: -10, d: 8 },
  { t: "<img src=hero.jpg />", c: "#E44D26", x: 386, y: 1132, rot: 5, d: 14 },
  { t: "</html>", c: "#E44D26", x: 744, y: 1168, rot: -7, d: 11 },
  { t: ".nav a { gap: 12px; }", c: "#264DE4", x: 560, y: 1556, rot: 7, d: 16 },
  { t: "fetch('/api')", c: "#00FF88", x: 764, y: 1436, rot: -12, d: 13 },
  { t: "@media (max-width)", c: "#C586C0", x: 846, y: 1294, rot: 10, d: 18 },
  { t: "font-weight: 900;", c: "#CE9178", x: 604, y: 1748, rot: -6, d: 15 },
];

/** A placeholder "designed" landing page used before the deconstruction. */
const SiteBody: React.FC = () => (
  <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 22 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 13,
          background: "linear-gradient(135deg,#A855F7,#22D3EE)",
        }}
      />
      <div style={{ width: 116, height: 16, borderRadius: 8, background: "#94A3B8" }} />
      <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
        {[62, 54, 70].map((w) => (
          <div key={w} style={{ width: w, height: 14, borderRadius: 7, background: "#CBD5E1" }} />
        ))}
      </div>
    </div>

    <div
      style={{
        borderRadius: 22,
        padding: "34px 28px",
        background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 55%,#7C3AED 100%)",
        boxShadow: "inset 0 0 60px rgba(34,211,238,0.18)",
      }}
    >
      <div style={{ width: "80%", height: 30, borderRadius: 12, background: "#FFFFFF" }} />
      <div style={{ width: "58%", height: 30, borderRadius: 12, background: "#FFFFFF", marginTop: 14 }} />
      <div style={{ width: "90%", height: 14, borderRadius: 7, background: "rgba(255,255,255,0.55)", marginTop: 24 }} />
      <div style={{ width: "74%", height: 14, borderRadius: 7, background: "rgba(255,255,255,0.55)", marginTop: 10 }} />
      <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
        <div style={{ width: 158, height: 54, borderRadius: 27, background: "#FFD700" }} />
        <div
          style={{
            width: 158,
            height: 54,
            borderRadius: 27,
            background: "rgba(255,255,255,0.22)",
            border: "3px solid rgba(255,255,255,0.7)",
          }}
        />
      </div>
    </div>

    <div style={{ display: "flex", gap: 18 }}>
      {["#22D3EE", "#A855F7", "#FFD700"].map((c) => (
        <div
          key={c}
          style={{
            flex: 1,
            borderRadius: 18,
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: 18,
            boxShadow: "0 10px 24px rgba(15,23,42,0.10)",
          }}
        >
          <div style={{ width: 54, height: 54, borderRadius: 17, background: c }} />
          <div style={{ width: "88%", height: 14, borderRadius: 7, background: "#E2E8F0", marginTop: 18 }} />
          <div style={{ width: "62%", height: 12, borderRadius: 6, background: "#EEF2F7", marginTop: 10 }} />
        </div>
      ))}
    </div>
  </div>
);

/** 0-6.4s: a beautiful site + a magic button, then the site shatters into code. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 76, 94);
  const titlePop = spring({ frame: frame - 76, fps, config: { damping: 9, stiffness: 210 } });
  const titleScale = interpolate(titlePop, [0, 1], [2.7, 1]);
  const shakeAmt = frame >= 76 && frame < 110 ? (1 - (frame - 76) / 34) : 0;
  const shakeX = Math.sin(frame * 2.3) * 13 * shakeAmt;
  const shockGlow = 1 + 0.5 * Math.sin(t * 9);

  const siteIn = pop(frame, fps, 4);
  const btnIn = pop(frame, fps, 48);
  const pressScale = interpolate(frame, [PRESS, PRESS + 5, PRESS + 16], [1, 0.86, 1], clamp);
  const flash = interpolate(frame, [BLAST, BLAST + 9, BLAST + 22], [0.9, 0.35, 0], clamp);
  const siteGone = interpolate(frame, [BLAST, BLAST + 14], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const ring = interpolate(frame, [BLAST, BLAST + 34], [0, 1], clamp);

  const btnPulse = 1 + 0.06 * Math.sin(t * 6.5);
  const btnGlow = 34 + 30 * Math.sin(t * 5);

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={1} />

      {/* website */}
      <div
        style={{
          position: "absolute",
          left: SITE.x,
          top: SITE.y,
          width: SITE.w,
          opacity: Math.min(1, siteIn) * (1 - siteGone),
          transform: `scale(${(0.9 + 0.1 * siteIn) * (1 - 0.22 * siteGone)}) translateY(${
            -siteGone * 40
          }px)`,
          filter: `blur(${siteGone * 16}px) saturate(${1 - siteGone * 0.7})`,
          zIndex: 6,
        }}
      >
        <BrowserMock width={SITE.w} url="my-site.com">
          <SiteBody />
        </BrowserMock>
      </div>

      {/* blast shockwave */}
      {ring > 0 && ring < 1 ? (
        <div
          style={{
            position: "absolute",
            left: BTN.cx - BTN.r,
            top: BTN.cy - BTN.r,
            width: BTN.r * 2,
            height: BTN.r * 2,
            borderRadius: "50%",
            border: "10px solid rgba(255,255,255,0.95)",
            transform: `scale(${1 + ring * 7})`,
            opacity: 0.9 * (1 - ring),
            boxShadow: "0 0 60px rgba(168,85,247,0.9)",
            zIndex: 14,
          }}
        />
      ) : null}

      {/* flying code chips */}
      {CHIPS.map((c, i) => {
        const p = interpolate(frame, [BLAST + c.d, BLAST + c.d + 26], [0, 1], {
          ...clamp,
          easing: Easing.out(Easing.cubic),
        });
        if (p <= 0) return null;
        const sx = SITE.x + 180 + rand(i * 3.3) * 520;
        const sy = SITE.y + 240 + rand(i * 7.1) * 320;
        const x = interpolate(p, [0, 1], [sx, c.x]);
        const y = interpolate(p, [0, 1], [sy, c.y]) + Math.sin(t * 2 + i) * 9;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity: p,
              transform: `translateY(${(1 - p) * 26}px) scale(${0.55 + 0.45 * p}) rotate(${
                c.rot + Math.sin(t * 1.3 + i) * 3
              }deg)`,
              padding: "14px 24px",
              borderRadius: 16,
              background: "rgba(6,10,30,0.94)",
              border: `2px solid ${c.c}`,
              boxShadow: `0 0 26px ${c.c}66, 0 16px 34px rgba(0,0,0,0.55)`,
              fontFamily: MONO,
              fontSize: 34,
              fontWeight: 700,
              color: c.c,
              whiteSpace: "nowrap",
              direction: "ltr",
              zIndex: 12,
            }}
          >
            {c.t}
          </div>
        );
      })}

      {/* magic button */}
      <div
        style={{
          position: "absolute",
          left: BTN.cx - BTN.r,
          top: BTN.cy - BTN.r,
          width: BTN.r * 2,
          height: BTN.r * 2,
          opacity: Math.min(1, btnIn),
          transform: `scale(${btnIn * pressScale * btnPulse})`,
          zIndex: 16,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -34,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,215,0,0.55) 0%, rgba(168,85,247,0.32) 45%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "conic-gradient(from 210deg, #22D3EE, #A855F7, #FFD700, #22D3EE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${btnGlow}px rgba(255,215,0,0.85), 0 20px 44px rgba(0,0,0,0.55)`,
          }}
        >
          <div
            style={{
              width: BTN.r * 2 - 20,
              height: BTN.r * 2 - 20,
              borderRadius: "50%",
              background: "radial-gradient(circle at 34% 28%, #1B2B6B, #0A1130)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 84,
            }}
          >
            ✨
          </div>
        </div>
      </div>
      <ClickRipple frame={frame} at={PRESS} x={BTN.cx - 24} y={BTN.cy - 24} color="#FFD700" />

      {/* shock title */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 60,
          right: 60,
          zIndex: 30,
          opacity: title.opacity,
          transform: `translate(${shakeX}px, ${title.translate}) scale(${titleScale})`,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.3,
              color: "rgba(255,60,90,0.85)",
              transform: `translateX(${6 + shakeX * 0.5}px)`,
              filter: "blur(1px)",
            }}
          >
            الموقع = أكواد؟! 🤯
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.3,
              color: "#FFFFFF",
              textShadow: `0 0 ${34 * shockGlow}px rgba(255,255,255,0.85), 0 0 70px rgba(168,85,247,0.8), 0 14px 40px rgba(0,0,0,0.65)`,
            }}
          >
            الموقع = أكواد؟! 🤯
          </div>
        </div>
      </div>

      {/* impact flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#FFFFFF",
          opacity: flash,
          pointerEvents: "none",
          zIndex: 40,
        }}
      />
    </AbsoluteFill>
  );
};
