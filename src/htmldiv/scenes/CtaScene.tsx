import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SparkleBurst, clamp, popAt } from "../../css/parts";
import { Caption, C_GOLD, Chip, SceneShell } from "../parts";

const fast = (frame: number, fps: number, delay: number) => popAt(frame, fps, delay, 16, 300);

/** 58-60s: call to action — follow for more. */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.5 + 0.5 * Math.sin(t * 7);

  const big = fast(frame, fps, 6);
  const arrow = fast(frame, fps, 22);
  const btn = fast(frame, fps, 16);
  const ring = interpolate(frame, [0, 60], [0.9, 1.12], clamp);

  return (
    <SceneShell seed={8}>
      {/* soft golden halo behind everything */}
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 960,
          width: 900 * ring,
          height: 900 * ring,
          marginLeft: -450 * ring,
          marginTop: -450 * ring,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.22) 0%, rgba(255,215,0,0.08) 45%, transparent 70%)",
          zIndex: 1,
        }}
      />

      <Caption appear={2} color="#FFFFFF" fontSize={52} style={{ top: 470 }}>
        إن كنت مهتم ببرمجة المواقع
      </Caption>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 640,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, big),
          transform: `scale(${0.55 + 0.45 * big})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: "inherit",
            fontSize: 118,
            fontWeight: 900,
            color: "#FFD700",
            whiteSpace: "nowrap",
            textShadow: `0 0 ${26 + glow * 34}px rgba(255,215,0,0.9), 0 0 90px rgba(255,160,0,0.5), 0 10px 30px rgba(0,0,0,0.6)`,
          }}
        >
          تابعني! 👇
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1180,
          display: "flex",
          justifyContent: "center",
          fontSize: 84,
          opacity: Math.min(1, arrow),
          transform: `translateY(${Math.sin(t * 9) * 18}px) scale(${0.6 + 0.4 * arrow})`,
          filter: `drop-shadow(0 0 22px ${C_GOLD})`,
          zIndex: 30,
        }}
      >
        ⬇️
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1420,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, btn),
          transform: `scale(${0.55 + 0.45 * btn})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: "30px 84px",
            borderRadius: 100,
            background: "linear-gradient(180deg,#FFE866,#FFD700 55%,#F0A800)",
            color: "#14182E",
            fontSize: 64,
            fontWeight: 900,
            border: "4px solid #FFF3B0",
            boxShadow: `0 0 ${44 + glow * 54}px rgba(255,215,0,0.8), 0 18px 44px rgba(0,0,0,0.5)`,
            display: "flex",
            alignItems: "center",
            gap: 22,
            whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              fontSize: 58,
              transform: `scale(${1 + glow * 0.14})`,
              display: "inline-block",
            }}
          >
            ➕
          </span>
          تابعني
        </div>
      </div>

      <Chip label=" HTML" x={95} y={760} color="#22D3EE" appear={10} rotate={-8} />
      <Chip label="CSS 🎨" x={720} y={900} color={C_GOLD} appear={14} rotate={7} />
      <Chip label="&lt;div&gt;" x={130} y={1680} color="#A855F7" appear={26} rotate={5} />
      <Chip label="📦" x={800} y={1650} color="#34D399" appear={30} rotate={-6} />

      <SparkleBurst start={8} x={540} y={960} count={26} radius={470} duration={34} />
      <SparkleBurst start={34} x={540} y={1470} count={16} radius={330} duration={24} />
    </SceneShell>
  );
};
