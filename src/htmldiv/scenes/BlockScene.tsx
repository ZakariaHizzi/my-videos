import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, popAt } from "../../css/parts";
import { Caption, C_BLUE, C_DIV, C_GOLD, K, SceneShell } from "../parts";

/** A full-width block box with a big <div> label. */
const BlockBox: React.FC<{
  color: string;
  dark: string;
  appear: number;
  top: number;
  frame: number;
  fps: number;
}> = ({ color, dark, appear, top, frame, fps }) => {
  const s = popAt(frame, fps, appear, 13, 155);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top,
        width: 780,
        height: 300,
        borderRadius: 22,
        background: `linear-gradient(180deg, ${color}, ${dark})`,
        boxShadow: `0 24px 60px rgba(0,0,0,0.45), 0 0 46px ${color}66`,
        opacity: Math.min(1, s),
        transform: `translateY(${(1 - s) * -34}px) scale(${0.94 + 0.06 * s})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "3px solid rgba(255,255,255,0.35)",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 76,
          fontWeight: 700,
          color: "#FFFFFF",
          direction: "ltr",
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {"<div>"}
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          fontFamily: "monospace",
          fontSize: 28,
          fontWeight: 700,
          color: "rgba(255,255,255,0.85)",
          direction: "ltr",
          background: "rgba(2,6,23,0.35)",
          padding: "6px 16px",
          borderRadius: 10,
        }}
      >
        block
      </div>
    </div>
  );
};

export const BlockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const page = popAt(frame, fps, 8, 14, 145);
  const full = interpolate(frame, [56, 86], [0, 1], clamp);
  const down = interpolate(frame, [126, 158], [0, 1], clamp);
  const pill = popAt(frame, fps, 180, 12, 175);

  return (
    <SceneShell seed={3}>
      <Caption appear={2} color={C_BLUE} fontSize={56} dir="ltr" style={{ top: 118 }}>
        <K color="#FFFFFF">div</K> = block element ➖
      </Caption>
      <Caption appear={30} color={C_DIV} fontSize={52} style={{ top: 274 }}>
        بياخد السطر كله
      </Caption>

      {/* the page */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 420,
          width: 900,
          height: 1100,
          borderRadius: 30,
          background: "linear-gradient(180deg,#F8FAFC,#E9EEF6)",
          border: "4px solid rgba(255,255,255,0.75)",
          boxShadow: "0 34px 90px rgba(0,0,0,0.6)",
          overflow: "hidden",
          opacity: Math.min(1, page),
          transform: `scale(${0.93 + 0.07 * page})`,
          transformOrigin: "50% 30%",
        }}
      >
        {/* browser bar */}
        <div
          style={{
            height: 64,
            background: "#E2E8F0",
            borderBottom: "1px solid #CBD5E1",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 22px",
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 8,
              padding: "8px 18px",
              borderRadius: 100,
              background: "#fff",
              color: "#334155",
              fontSize: 22,
              textAlign: "left",
              direction: "ltr",
            }}
          >
            🔒 page.html
          </div>
        </div>

        <BlockBox color="#3B82F6" dark="#1D4ED8" appear={20} top={134} frame={frame} fps={fps} />

        {/* full-width arrow */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 470,
            width: 780,
            opacity: full,
            transform: `scaleX(${0.2 + 0.8 * full})`,
            transformOrigin: "50% 50%",
          }}
        >
          <svg width={780} height={44} viewBox="0 0 780 44">
            <path
              d="M6 22 L774 22 M6 22 L40 8 M6 22 L40 36 M774 22 L740 8 M774 22 L740 36"
              stroke="#0F172A"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 522,
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 40,
            fontWeight: 700,
            color: "#0F172A",
            direction: "ltr",
            opacity: full,
          }}
        >
          full width
        </div>

        {/* new-line arrow */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 590,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: down,
            transform: `translateY(${(1 - down) * -20}px)`,
          }}
        >
          <svg width={70} height={84} viewBox="0 0 70 84">
            <path
              d="M35 4 L35 70 M35 70 L14 48 M35 70 L56 48"
              stroke="#FF6B35"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 40,
              fontWeight: 700,
              color: "#C2410C",
              direction: "ltr",
            }}
          >
            new line
          </div>
        </div>

        <BlockBox color="#FF6B35" dark="#EA580C" appear={104} top={740} frame={frame} fps={fps} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1600,
          display: "flex",
          justifyContent: "center",
          opacity: Math.min(1, pill),
          transform: `scale(${0.7 + 0.3 * pill})`,
        }}
      >
        <div
          style={{
            padding: "22px 54px",
            borderRadius: 24,
            background: "rgba(5,10,30,0.92)",
            border: `3px solid ${C_GOLD}`,
            boxShadow: `0 0 38px ${C_GOLD}55`,
            fontFamily: "monospace",
            fontSize: 54,
            fontWeight: 700,
            color: C_GOLD,
            direction: "ltr",
          }}
        >
          width: 100%;
        </div>
      </div>
    </SceneShell>
  );
};
