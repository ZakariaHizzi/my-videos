import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop } from "../../vscode/theme";
import { CopyPanel } from "../../vscode/lang/parts";
import {
  ChromeLogo,
  EdgeLogo,
  FirefoxLogo,
  SafariLogo,
  Twinkles,
} from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const TILE = 360;
const GAP = 44;
const X0 = (1080 - (TILE * 2 + GAP)) / 2;
const Y0 = 600;

const LOGOS = [
  { name: "Chrome", Logo: ChromeLogo, x: X0, y: Y0, delay: 54, c: "#EA4335" },
  { name: "Firefox", Logo: FirefoxLogo, x: X0 + TILE + GAP, y: Y0, delay: 84, c: "#FF8A1E" },
  { name: "Edge", Logo: EdgeLogo, x: X0, y: Y0 + TILE + GAP, delay: 112, c: "#1C9EF0" },
  { name: "Safari", Logo: SafariLogo, x: X0 + TILE + GAP, y: Y0 + TILE + GAP, delay: 130, c: "#1E90F0" },
];

/** 6.4-11.6s: the famous browsers pop in one by one, as the voice names them. */
export const BrowsersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 22);
  const sub = fadeUp(frame, 44, 64);

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={18} seed={2} />

      {/* title */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 50,
          right: 50,
          zIndex: 20,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "28px 46px", borderColor: "rgba(255,215,0,0.45)" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            <span>المتصفح </span>
            <span
              style={{
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.cyan,
                textShadow: "0 0 30px rgba(34,211,238,0.75)",
              }}
            >
              (Browser)
            </span>
            <span> 🌐</span>
          </div>
        </CopyPanel>
      </div>

      {/* logo tiles */}
      {LOGOS.map(({ name, Logo, x, y, delay, c }, i) => {
        const s = pop(frame, fps, delay);
        if (s <= 0.001) return null;
        const burst = interpolate(frame, [delay, delay + 26], [0, 1], clamp);
        const bob = Math.sin(t * 1.7 + i * 1.4) * 12;
        const glow = 0.45 + 0.55 * Math.sin(t * 3 + i);
        return (
          <div key={name} style={{ position: "absolute", left: x, top: y, zIndex: 8 }}>
            {/* pop burst */}
            {burst > 0 && burst < 1 ? (
              <div
                style={{
                  position: "absolute",
                  left: TILE / 2 - TILE * 0.5,
                  top: TILE / 2 - TILE * 0.5,
                  width: TILE,
                  height: TILE,
                  borderRadius: "50%",
                  border: `8px solid ${c}`,
                  transform: `scale(${0.4 + burst * 1.5})`,
                  opacity: 0.85 * (1 - burst),
                }}
              />
            ) : null}
            <div
              style={{
                width: TILE,
                height: TILE,
                borderRadius: 56,
                background: "rgba(6,10,30,0.86)",
                border: `3px solid ${burst > 0.35 ? c : "rgba(255,255,255,0.14)"}`,
                boxShadow: `0 0 ${26 + glow * 34}px ${c}55, 0 30px 70px rgba(0,0,0,0.55)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: Math.min(1, s),
                transform: `scale(${0.55 + 0.45 * s}) translateY(${bob}px) rotate(${
                  Math.sin(t * 1.2 + i) * 2
                }deg)`,
              }}
            >
              <Logo size={228} />
            </div>
          </div>
        );
      })}

      {/* examples line */}
      <div
        style={{
          position: "absolute",
          top: 1480,
          left: 60,
          right: 60,
          zIndex: 20,
          opacity: sub.opacity,
          transform: sub.translate,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "rgba(255,255,255,0.95)",
            lineHeight: 1.5,
            textShadow: "0 8px 30px rgba(0,0,0,0.55)",
          }}
        >
          <span>مثل: </span>
          <span
            style={{
              direction: "ltr",
              unicodeBidi: "isolate",
              color: COLORS.gold,
              textShadow: "0 0 26px rgba(255,215,0,0.55)",
            }}
          >
            Chrome, Firefox, Edge, Safari
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
