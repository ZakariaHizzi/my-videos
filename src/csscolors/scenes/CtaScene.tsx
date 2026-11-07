import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { C_GOLD, NotePill, SparkleBurst, clamp, popAt } from "../../css/parts";
import { SceneShell } from "../parts";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.5 + 0.5 * Math.sin(t * 5);

  const line1 = popAt(frame, fps, 4);
  const line2 = popAt(frame, fps, 16, 11, 175);
  const pres = popAt(frame, fps, 8, 14, 130);
  const btn = popAt(frame, fps, 44);
  const arrow = popAt(frame, fps, 56);

  /* presenter leans closer to the camera */
  const lean = interpolate(frame, [10, 70], [1, 1.1], {
    ...clamp,
    easing: (x: number) => 1 - Math.pow(1 - x, 3),
  });

  return (
    <SceneShell seed={8}>
      {/* line 1 */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, line1),
          transform: `translateY(${(1 - line1) * 30}px)`,
          zIndex: 30,
        }}
      >
        <NotePill color="#FFFFFF" fontSize={52}>
          إن كنت مهتم ببرمجة المواقع
        </NotePill>
      </div>

      {/* line 2: golden glow */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, line2),
          transform: `scale(${0.55 + 0.45 * line2})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 104,
            fontWeight: 900,
            color: "#FFD700",
            whiteSpace: "nowrap",
            textShadow: `0 0 ${26 + glow * 34}px rgba(255,215,0,0.85), 0 0 90px rgba(255,160,0,0.5), 0 10px 30px rgba(0,0,0,0.6)`,
          }}
        >
          تابعني! 👇
        </div>
      </div>

      {/* presenter leaning in and pointing down */}
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 460,
          width: 640,
          zIndex: 12,
          opacity: Math.min(1, pres),
          transform: `translateY(${(1 - pres) * 60}px) scale(${lean})`,
          transformOrigin: "50% 28%",
        }}
      ></div>

      {/* bouncing arrow above the button */}
      <div
        style={{
          position: "absolute",
          top: 1555,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          fontSize: 74,
          opacity: Math.min(1, arrow),
          transform: `translateY(${Math.sin(t * 6) * 16}px) scale(${0.6 + 0.4 * arrow})`,
          filter: `drop-shadow(0 0 20px ${C_GOLD})`,
          zIndex: 30,
        }}
      >
        ⬇️
      </div>

      {/* glowing follow button */}
      <div
        style={{
          position: "absolute",
          top: 1680,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, btn),
          transform: `scale(${0.55 + 0.45 * btn})`,
          zIndex: 30,
        }}
      >
        <div
          style={{
            padding: "24px 70px",
            borderRadius: 100,
            background: "linear-gradient(180deg,#FFE866,#FFD700 55%,#F0A800)",
            color: "#14182E",
            fontFamily: FONT,
            fontSize: 56,
            fontWeight: 900,
            border: "4px solid #FFF3B0",
            boxShadow: `0 0 ${40 + glow * 50}px rgba(255,215,0,0.75), 0 18px 44px rgba(0,0,0,0.5)`,
            display: "flex",
            alignItems: "center",
            gap: 20,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontSize: 52,
              transform: `scale(${1 + glow * 0.12})`,
              display: "inline-block",
            }}
          >
            ➕
          </span>
          تابعني
        </div>
      </div>

      <SparkleBurst
        start={18}
        x={540}
        y={520}
        count={24}
        radius={420}
        duration={34}
      />
    </SceneShell>
  );
};
