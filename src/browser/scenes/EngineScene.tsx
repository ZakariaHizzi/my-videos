import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, fadeUp, pop, rand } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { CopyPanel, FileDoc } from "../../vscode/lang/parts";
import { Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const GEAR = { cx: 450, cy: 880, size: 320 };
const SITE = { x: 706, y: 736, w: 300 };
const FILES = [
  { label: ".html", color: "#E44D26", delay: 0 },
  { label: ".css", color: "#264DE4", delay: 22 },
  { label: ".js", color: "#F7DF1E", delay: 44, labelColor: "#1B1B1B" },
];
const CYCLE = 66;
const TRAVEL = 34;

const Gear: React.FC<{ size: number; spin: number }> = ({ size, spin }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <defs>
      <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="55%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>
    <g transform={`rotate(${spin} 100 100)`}>
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={90}
          y={0}
          width={20}
          height={34}
          rx={7}
          fill="url(#gearGrad)"
          transform={`rotate(${i * 36} 100 100)`}
        />
      ))}
      <circle cx={100} cy={100} r={74} fill="url(#gearGrad)" />
      <circle cx={100} cy={100} r={74} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
      <circle cx={100} cy={100} r={36} fill="#0A1130" stroke="rgba(255,255,255,0.4)" strokeWidth={5} />
      {[0, 90, 180, 270].map((a) => (
        <circle
          key={a}
          cx={100 + 54 * Math.cos((a * Math.PI) / 180)}
          cy={100 + 54 * Math.sin((a * Math.PI) / 180)}
          r={7}
          fill="rgba(255,255,255,0.55)"
        />
      ))}
    </g>
  </svg>
);

const MiniSite: React.FC = () => (
  <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 10 }}>
    <div
      style={{
        borderRadius: 12,
        padding: "16px 14px",
        background: "linear-gradient(130deg,#1E3A8A,#7C3AED)",
      }}
    >
      <div style={{ width: "78%", height: 16, borderRadius: 7, background: "#fff" }} />
      <div style={{ width: "60%", height: 16, borderRadius: 7, background: "#fff", marginTop: 8 }} />
      <div
        style={{ width: "90%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.55)", marginTop: 12 }}
      />
      <div style={{ width: 84, height: 26, borderRadius: 13, background: "#FFD700", marginTop: 14 }} />
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {["#22D3EE", "#A855F7", "#FFD700"].map((c) => (
        <div
          key={c}
          style={{
            flex: 1,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #E2E8F0",
            padding: 8,
            boxShadow: "0 6px 14px rgba(15,23,42,0.10)",
          }}
        >
          <div style={{ width: 26, height: 26, borderRadius: 9, background: c }} />
          <div style={{ width: "84%", height: 8, borderRadius: 4, background: "#E2E8F0", marginTop: 8 }} />
          <div style={{ width: "60%", height: 7, borderRadius: 4, background: "#EEF2F7", marginTop: 5 }} />
        </div>
      ))}
    </div>
  </div>
);

/** 18-26s: code files travel through the rendering engine and leave as a website. */
export const EngineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 22);
  const gearIn = pop(frame, fps, 8);
  const siteIn = spring({ frame: frame - 92, fps, config: { damping: 13, stiffness: 110 } });
  const bottom = fadeUp(frame, 110, 132);
  const glow = 0.45 + 0.55 * Math.sin(t * 4);
  const shimmer = interpolate(frame, [0, 240], [-40, 140], clamp);
  const spin = t * 96;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={4} />

      {/* title */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "26px 44px", borderColor: "rgba(34,211,238,0.5)" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 1.3,
              direction: "ltr",
              color: COLORS.cyan,
              textShadow: `0 0 ${24 + glow * 26}px rgba(34,211,238,0.75)`,
            }}
          >
            Rendering Engine 🔄
          </div>
        </CopyPanel>
      </div>

      {/* conveyor glow line */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: GEAR.cy - 6,
          width: SITE.x + SITE.w / 2 - 20,
          height: 12,
          borderRadius: 12,
          background:
            "linear-gradient(90deg, rgba(232,77,38,0.55), rgba(168,85,247,0.6), rgba(255,215,0,0.55))",
          opacity: 0.4 * gearIn,
          zIndex: 3,
        }}
      />

      {/* travelling particles */}
      {Array.from({ length: 26 }, (_, i) => {
        const speed = 0.6 + rand(i * 2.7) * 0.9;
        const prog = ((t * speed * 0.42 + rand(i * 5.1)) % 1);
        const x = interpolate(prog, [0, 1], [30, SITE.x + SITE.w / 2]);
        const y = GEAR.cy + (rand(i * 3.9) - 0.5) * 150 * (prog < 0.5 ? 1 : 0.55);
        const size = 6 + rand(i * 8.4) * 12;
        const c = ["#E44D26", "#264DE4", "#F7DF1E", "#A855F7", "#22D3EE"][i % 5];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity: 0.35 + 0.55 * (1 - Math.abs(prog - 0.5) * 2),
              boxShadow: `0 0 ${size * 2.4}px ${c}`,
              zIndex: 5,
            }}
          />
        );
      })}

      {/* code files entering the gear */}
      {FILES.map((f, i) => {
        const local = frame - f.delay;
        if (local < 0) return null;
        const cycle = Math.floor(local / CYCLE);
        const p = (local % CYCLE) / TRAVEL;
        if (p > 1) return null;
        const eased = Easing.inOut(Easing.quad)(Math.min(1, p));
        const x = interpolate(eased, [0, 1], [10, 300]);
        const scale = interpolate(eased, [0, 1], [1, 0.42]);
        const opacity = interpolate(eased, [0, 0.72, 1], [1, 1, 0]);
        const yBob = Math.sin(t * 2.4 + i * 1.6 + cycle) * 10;
        return (
          <div
            key={f.label}
            style={{
              position: "absolute",
              left: x,
              top: GEAR.cy - 98 + yBob,
              opacity,
              transform: `scale(${scale}) rotate(${-8 + eased * 16}deg)`,
              zIndex: 8,
              filter: `drop-shadow(0 0 ${
                14 + glow * 20
              }px ${f.color})`,
            }}
          >
            <FileDoc
              label={f.label}
              color={f.color}
              labelColor={"labelColor" in f ? (f.labelColor as string) : "#FFFFFF"}
              width={150}
            />
          </div>
        );
      })}

      {/* gear */}
      <div
        style={{
          position: "absolute",
          left: GEAR.cx - GEAR.size / 2,
          top: GEAR.cy - GEAR.size / 2,
          width: GEAR.size,
          height: GEAR.size,
          opacity: Math.min(1, gearIn),
          transform: `scale(${0.6 + 0.4 * gearIn})`,
          filter: `drop-shadow(0 0 ${30 + glow * 40}px rgba(124,58,237,0.95)) drop-shadow(0 22px 44px rgba(0,0,0,0.6))`,
          zIndex: 10,
        }}
      >
        <Gear size={GEAR.size} spin={spin} />
      </div>

      {/* engine label plate */}
      <div
        style={{
          position: "absolute",
          left: GEAR.cx - 190,
          top: GEAR.cy + GEAR.size / 2 - 24,
          width: 380,
          zIndex: 12,
          opacity: Math.min(1, gearIn),
          transform: `scale(${0.7 + 0.3 * gearIn})`,
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 20,
            background: "rgba(6,10,30,0.95)",
            border: "2px solid rgba(168,85,247,0.65)",
            boxShadow: "0 0 34px rgba(168,85,247,0.5), 0 18px 40px rgba(0,0,0,0.55)",
            fontFamily: "'Consolas','Courier New',monospace",
            fontSize: 40,
            fontWeight: 700,
            color: "#FFFFFF",
            direction: "ltr",
            whiteSpace: "nowrap",
          }}
        >
          Rendering Engine
        </div>
      </div>

      {/* output website */}
      <div
        style={{
          position: "absolute",
          left: SITE.x,
          top: SITE.y,
          width: SITE.w,
          opacity: Math.min(1, siteIn),
          transform: `scale(${0.6 + 0.4 * siteIn}) translateX(${(1 - siteIn) * -60}px)`,
          filter: `drop-shadow(0 0 ${22 + glow * 26}px rgba(255,215,0,0.5))`,
          zIndex: 11,
        }}
      >
        <BrowserMock width={SITE.w} url="localhost:5500">
          <MiniSite />
        </BrowserMock>
      </div>

      {/* sparkles around the output */}
      {siteIn > 0.2
        ? Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2 + t * 0.9;
            const r = 175 + Math.sin(t * 2.6 + i) * 24;
            const x = SITE.x + SITE.w / 2 + Math.cos(a) * r;
            const y = SITE.y + 150 + Math.sin(a) * r * 0.75;
            const size = 8 + rand(i * 4.2) * 12;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  background: i % 2 === 0 ? COLORS.gold : COLORS.cyan,
                  opacity: (0.3 + 0.7 * Math.abs(Math.sin(t * 3 + i))) * Math.min(1, siteIn),
                  boxShadow: `0 0 ${size * 2.4}px ${i % 2 === 0 ? COLORS.gold : COLORS.cyan}`,
                  zIndex: 13,
                }}
              />
            );
          })
        : null}

      {/* bottom line */}
      <div
        style={{
          position: "absolute",
          top: 1330,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: bottom.opacity,
          transform: bottom.translate,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.35,
            backgroundImage:
              "linear-gradient(105deg, #E44D26 0%, #22D3EE 30%, #A855F7 62%, #FFD700 100%)",
            backgroundSize: "220% 100%",
            backgroundPosition: `${shimmer}% 0`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter:
              "drop-shadow(0 0 22px rgba(168,85,247,0.65)) drop-shadow(0 12px 32px rgba(0,0,0,0.55))",
          }}
        >
          أكواد ← موقع مرئي
        </div>
      </div>
    </AbsoluteFill>
  );
};
