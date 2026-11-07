import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "../../vscode/theme";
import {
  C_CYAN,
  C_GOLD,
  C_ORANGE,
  C_PURPLE,
  SparkleBurst,
  Twinkles,
  clamp,
  fadeUp,
  popAt,
} from "../parts";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line = fadeUp(frame, 0, 14);
  const gold = popAt(frame, fps, 12, 10, 170);
  const host = popAt(frame, fps, 16, 13, 120);
  const btn = popAt(frame, fps, 48, 10, 180);
  const arrow = popAt(frame, fps, 58, 9, 200);

  const goldGlow = 0.5 + 0.5 * Math.sin(t * 4.6);
  const btnGlow = 0.5 + 0.5 * Math.sin(t * 5.4 + 1);
  const ring = interpolate(frame, [62, 98], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles
        count={28}
        seed={51}
        colors={[C_GOLD, C_CYAN, C_PURPLE, C_ORANGE]}
      />

      <div
        style={{
          position: "absolute",
          left: 90,
          top: 580,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.16) 0%, rgba(168,85,247,0.14) 45%, transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      {/* line 1 */}
      <div
        style={{
          position: "absolute",
          top: 148,
          left: 48,
          right: 48,
          zIndex: 30,
          opacity: line.opacity,
          transform: line.transform,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 36px",
            borderRadius: 26,
            background: "rgba(5,10,30,0.82)",
            border: `2px solid ${C_CYAN}55`,
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.45,
            textShadow: "0 8px 30px rgba(0,0,0,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          إن كنت مهتم بمفاهيم البرمجة
        </div>
      </div>

      {/* gold follow line */}
      <div
        style={{
          position: "absolute",
          top: 286,
          left: 0,
          width: 1080,
          zIndex: 32,
          opacity: Math.min(1, gold * 1.4),
          transform: `scale(${0.55 + 0.45 * gold})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 128,
            fontWeight: 900,
            background:
              "linear-gradient(180deg,#FFF7C2 0%,#FFD700 52%,#E8A800 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${18 + goldGlow * 36}px rgba(255,215,0,${
              0.55 + goldGlow * 0.4
            })) drop-shadow(0 14px 30px rgba(0,0,0,0.55))`,
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          تابعني! 👇
        </div>
      </div>

      <SparkleBurst
        start={14}
        x={540}
        y={390}
        count={14}
        radius={250}
        duration={34}
      />

      {/* CSS emblem */}
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 620,
          width: 420,
          height: 420,
          zIndex: 20,
          opacity: Math.min(1, host * 1.2),
          transform: `translateY(${Math.sin(t * 1.4) * 10}px) scale(${0.9 + 0.1 * host})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, #FF6B35, #FFD700, #A855F7, #22D3EE, #FF6B35)",
            filter: "blur(2px)",
            opacity: 0.55,
            animation: "spin 12s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle,#1E3A8A 0%,#0A1130 75%)",
            border: "4px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: `0 0 ${40 + goldGlow * 40}px rgba(255,215,0,0.35)`,
          }}
        >
          <svg width={150} height={150} viewBox="0 0 100 100">
            <path
              d="M14 4h72l-7 78-29 14-29-14z"
              fill="#1B3FA8"
              stroke="#7DD3FC"
              strokeWidth="3"
            />
            <path d="M50 13v78l23-11 6-67z" fill="#0F2A70" />
            <text
              x="50"
              y="67"
              textAnchor="middle"
              fontSize="46"
              fontWeight="900"
              fill="#7DD3FC"
            >
              3
            </text>
          </svg>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: 4,
              color: "#FFFFFF",
              marginTop: 4,
            }}
          >
            CSS
          </div>
        </div>
        {/* orbiting code chips */}
        {[
          { t: "{ }", c: C_PURPLE, a: 0 },
          { t: "#hex", c: C_CYAN, a: 120 },
          { t: "link", c: C_ORANGE, a: 240 },
        ].map((c) => {
          const ang = ((t * 0.8 + c.a / 360) * 2 * Math.PI) % (2 * Math.PI);
          const r = 230;
          return (
            <div
              key={c.t}
              style={{
                position: "absolute",
                left: 210 + Math.cos(ang) * r - 40,
                top: 210 + Math.sin(ang) * r - 22,
                padding: "8px 18px",
                borderRadius: 14,
                background: "rgba(5,10,30,0.9)",
                border: `2px solid ${c.c}`,
                color: c.c,
                fontFamily: "Consolas, monospace",
                fontSize: 24,
                fontWeight: 700,
                boxShadow: `0 0 20px ${c.c}55`,
                direction: "ltr",
              }}
            >
              {c.t}
            </div>
          );
        })}
      </div>

      {/* follow button */}
      <div
        style={{
          position: "absolute",
          top: 1480,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 40,
          opacity: Math.min(1, btn * 1.4),
          transform: `scale(${0.55 + 0.45 * btn})`,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "28px 78px",
            borderRadius: 100,
            background: `linear-gradient(95deg,${C_ORANGE} 0%,#FF8A5B 35%,${C_GOLD} 100%)`,
            color: "#14182E",
            fontFamily: FONT,
            fontSize: 58,
            fontWeight: 900,
            boxShadow: `0 0 ${38 + btnGlow * 48}px rgba(255,215,0,${
              0.55 + btnGlow * 0.35
            }), 0 22px 50px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
            border: "3px solid #FFF3B0",
          }}
        >
          <span
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "#14182E",
              color: C_GOLD,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              lineHeight: 1,
            }}
          >
            +
          </span>
          متابعة
          <span
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: 100,
              border: `5px solid rgba(255,255,255,${0.85 * (1 - ring)})`,
              transform: `scale(${1 + ring * 0.35})`,
              opacity: ring > 0 && ring < 1 ? 1 : 0,
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: -22,
              borderRadius: 100,
              border: `3px solid rgba(255,215,0,${0.35 * (1 - ring)})`,
              transform: `scale(${1 + ring * 0.55})`,
              opacity: ring > 0 && ring < 1 ? 1 : 0,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* bouncing arrow above the button */}
      <div
        style={{
          position: "absolute",
          top: 1380,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 38,
          opacity: Math.min(1, arrow),
          transform: `translateY(${Math.sin(t * 6) * 12}px) scale(${0.6 + 0.4 * arrow})`,
          filter: `drop-shadow(0 0 18px ${C_GOLD})`,
          fontSize: 64,
        }}
      >
        👇
      </div>
    </AbsoluteFill>
  );
};
