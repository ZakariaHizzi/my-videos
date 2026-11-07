import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, fadeUp, pop } from "../../theme";
import { VscodeLogo } from "../../mocks";
import { CopyPanel, FileDoc } from "../parts";

const MARKS = [
  { x: 20, y: 640, size: 300, color: COLORS.gold, delay: 26, rot: -14, seed: 1 },
  { x: 800, y: 760, size: 260, color: COLORS.purple, delay: 44, rot: 12, seed: 2 },
];

const DOCS = [
  { x: 80, label: ".html", color: "#E44D26", delay: 46, seed: 3 },
  { x: 452, label: ".py", color: "#3776AB", delay: 62, seed: 4 },
  { x: 825, label: ".css", color: "#264DE4", delay: 78, seed: 5 },
];

const DOC_W = 175;
const DOC_Y = 1545;
const LOGO = { size: 320, cx: 540, cy: 1090 };

/** 0-5.8s: the hook — the VS Code logo, floating file types, the title question. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 22);
  const logo = pop(frame, fps, 14);
  const ring = fadeUp(frame, 24, 60);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* key light behind the logo */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: LOGO.cy,
          width: 1200,
          height: 1200,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.42) 0%, rgba(37,99,235,0.24) 42%, transparent 70%)",
        }}
      />

      {/* title */}
      <div
        style={{
          position: "absolute",
          top: 176,
          left: 70,
          right: 70,
          opacity: title.opacity,
          transform: title.translate,
          zIndex: 20,
        }}
      >
        <CopyPanel style={{ padding: "30px 40px", borderColor: "rgba(255,215,0,0.4)" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.35,
              color: "#fff",
              textShadow: "0 10px 40px rgba(0,0,0,0.55)",
            }}
          >
            <span>إزاي </span>
            <span
              style={{
                color: COLORS.cyan,
                direction: "ltr",
                unicodeBidi: "isolate",
                textShadow: "0 0 34px rgba(34,211,238,0.7)",
              }}
            >
              VS Code
            </span>
            <span> يعرف اللغة؟ 🤔</span>
          </div>
        </CopyPanel>
      </div>

      {/* orbiting ring behind the logo */}
      <div
        style={{
          position: "absolute",
          left: LOGO.cx - 380,
          top: LOGO.cy - 380,
          width: 760,
          height: 760,
          opacity: ring.opacity * 0.9,
          transform: ring.translate,
          zIndex: 4,
        }}
      >
        <svg width={760} height={760} viewBox="0 0 760 760">
          <g
            style={{
              transformOrigin: "380px 380px",
              transform: `rotate(${t * 16}deg)`,
            }}
          >
            <circle
              cx={380}
              cy={380}
              r={372}
              fill="none"
              stroke="rgba(125,211,252,0.5)"
              strokeWidth={5}
              strokeDasharray="26 34"
              strokeLinecap="round"
            />
            <circle
              cx={380}
              cy={8}
              r={13}
              fill={COLORS.cyan}
              style={{ filter: "drop-shadow(0 0 16px #22D3EE)" }}
            />
          </g>
          <circle
            cx={380}
            cy={380}
            r={300}
            fill="none"
            stroke="rgba(168,85,247,0.34)"
            strokeWidth={3}
            strokeDasharray="4 22"
            strokeLinecap="round"
            style={{ transformOrigin: "380px 380px", transform: `rotate(${-t * 11}deg)` }}
          />
        </svg>
      </div>

      {/* VS Code logo */}
      <div
        style={{
          position: "absolute",
          left: LOGO.cx,
          top: LOGO.cy,
          width: LOGO.size,
          height: LOGO.size,
          translate: "-50% -50%",
          opacity: Math.min(1, logo),
          transform: `scale(${0.6 + 0.4 * logo}) rotate(${
            -6 + 6 * logo + Math.sin(t * 1.4) * 2.5
          }deg)`,
          filter: `drop-shadow(0 0 ${26 + 22 * Math.sin(t * 2.6)}px rgba(34,211,238,0.75)) drop-shadow(0 30px 60px rgba(0,0,0,0.6))`,
          zIndex: 6,
        }}
      >
        <VscodeLogo size={LOGO.size} />
      </div>

      {/* animated question marks */}
      {MARKS.map((m, i) => {
        const s = pop(frame, fps, m.delay);
        const bob = Math.sin(t * 2.1 + m.seed * 1.9) * 26;
        const glow = 0.5 + 0.5 * Math.sin(t * 3.4 + m.seed);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: m.x,
              top: m.y + bob,
              width: m.size,
              height: m.size,
              opacity: Math.min(1, s),
              transform: `scale(${s}) rotate(${m.rot + Math.sin(t * 1.7 + i) * 7}deg)`,
              fontSize: m.size,
              lineHeight: 1,
              fontWeight: 900,
              color: m.color,
              textShadow: `0 0 ${40 + glow * 60}px ${m.color}, 0 16px 50px rgba(0,0,0,0.5)`,
              zIndex: 5,
            }}
          >
            ?
          </div>
        );
      })}

      {/* floating file types */}
      {DOCS.map((d) => {
        const s = pop(frame, fps, d.delay);
        const bob = Math.sin(t * 1.6 + d.seed) * 22;
        return (
          <div
            key={d.label}
            style={{
              position: "absolute",
              left: d.x,
              top: DOC_Y + bob,
              opacity: Math.min(1, s) * 0.95,
              transform: `scale(${s}) rotate(${
                Math.sin(t * 1.1 + d.seed) * 5
              }deg)`,
              zIndex: 7,
            }}
          >
            <FileDoc label={d.label} color={d.color} width={DOC_W} />
          </div>
        );
      })}

      {/* sparkles */}
      {Array.from({ length: 14 }, (_, i) => {
        const px = 60 + ((i * 137) % 960);
        const py = 520 + ((i * 211) % 1060);
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 2.4 + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: 10 + (i % 3) * 6,
              height: 10 + (i % 3) * 6,
              borderRadius: "50%",
              background: i % 2 === 0 ? COLORS.cyan : COLORS.gold,
              opacity: tw * 0.8,
              boxShadow: `0 0 22px ${i % 2 === 0 ? COLORS.cyan : COLORS.gold}`,
              zIndex: 3,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
