import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { CopyPanel, popAt, TokenChip } from "../parts";

/* The tag broken into labelled parts — mirrors the ASCII diagram. */
const PARTS: {
  label: string;
  ar: string;
  color: string;
  delay: number;
  space?: boolean;
}[] = [
  { label: "<", ar: "فتح", color: "#569CD6", delay: 96 },
  { label: "img", ar: "اسم الوسم", color: "#4EC9B0", delay: 110 },
  { label: "\u00A0", ar: "المسافة", color: "#FFD700", delay: 124, space: true },
  { label: 'src="photo.jpg"', ar: "خاصية ١", color: "#9CDCFE", delay: 142 },
  { label: 'alt="وصف"', ar: "خاصية ٢", color: "#9CDCFE", delay: 160 },
  { label: ">", ar: "إغلاق", color: "#569CD6", delay: 178 },
];

/** 6-14s: the golden rule — where attributes live inside a tag. */
export const RuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = popAt(frame, fps, 6, 15, 130);
  const big = popAt(frame, fps, 76, 13, 150);
  const codeChip = popAt(frame, fps, 196, 12, 160);
  const rule = popAt(frame, fps, 214, 11, 170);
  const arrowIn = popAt(frame, fps, 155, 11, 150);
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", textAlign: "center", overflow: "hidden" }}>
      <Twinkles count={14} seed={11} />

      {/* title */}
      <div style={{ position: "absolute", top: 172, left: 50, right: 50, opacity: Math.min(1, title * 1.3) }}>
        <CopyPanel style={{ padding: "22px 44px" }}>
          <div style={{ fontSize: 74, fontWeight: 900, color: "#fff" }}>القاعدة الذهبية: ✨</div>
        </CopyPanel>
      </div>

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 356,
          left: 40,
          right: 40,
          fontSize: 84,
          fontWeight: 900,
          lineHeight: 1.35,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 8px 26px rgba(0,0,0,0.55))",
          opacity: Math.min(1, big * 1.4),
          transform: `translateY(${(1 - big) * 34}px)`,
        }}
      >
        الخصائص جوه الوسم 📍
      </div>

      {/* the labelled tag diagram */}
      <div
        style={{
          position: "absolute",
          top: 556,
          left: 30,
          right: 30,
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          direction: "ltr",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        {PARTS.map((p, i) => {
          const s = popAt(frame, fps, p.delay, 12, 165);
          if (s <= 0.001) return null;
          const isSpace = !!p.space;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: Math.min(1, s * 1.4) }}>
              <div style={{ transform: `scale(${0.55 + 0.45 * s})` }}>
                {isSpace ? (
                  <TokenChip
                    label="␣"
                    color={p.color}
                    fontSize={34}
                    glow
                    highlight={`rgba(255,215,0,${0.18 + pulse * 0.2})`}
                    style={{ padding: "12px 20px" }}
                  />
                ) : (
                  <TokenChip label={p.label} color={p.color} fontSize={34} />
                )}
              </div>
              {/* connector + Arabic role */}
              <div style={{ width: 4, height: 26, borderRadius: 4, background: `${p.color}99` }} />
              <div
                style={{
                  fontSize: isSpace ? 34 : 32,
                  fontWeight: 800,
                  color: isSpace ? "#FFD700" : "rgba(255,255,255,0.9)",
                  whiteSpace: "nowrap",
                }}
              >
                {p.ar}
              </div>
              {/* arrow pointing INTO the space, showing where attributes go */}
              {isSpace ? (
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: Math.min(1, arrowIn * 1.3),
                    transform: `translateY(${(1 - arrowIn) * -24}px)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      color: "#FFD700",
                      whiteSpace: "nowrap",
                      textShadow: `0 0 ${12 + pulse * 16}px rgba(255,215,0,0.9)`,
                    }}
                  >
                    ⬅ الخصائص هنا
                  </div>
                  <svg width="46" height="58" viewBox="0 0 46 58" style={{ transform: "rotate(180deg)", marginTop: 2 }}>
                    <path
                      d="M23 54 L23 10 M23 6 L9 22 M23 6 L37 22"
                      stroke="#FFD700"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* the abstract pattern */}
      <div
        style={{
          position: "absolute",
          top: 1188,
          left: 0,
          width: 1080,
          opacity: Math.min(1, codeChip * 1.4),
          transform: `scale(${0.7 + 0.3 * codeChip})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "22px 40px",
            borderRadius: 20,
            background: "rgba(6,10,30,0.95)",
            border: "3px solid #4EC9B0",
            boxShadow: "0 0 34px rgba(78,201,176,0.5)",
            fontFamily: MONO,
            fontSize: 56,
            fontWeight: 700,
            color: "#4EC9B0",
            direction: "ltr",
          }}
        >
          &lt;اسم_الوسم خصائص&gt;
        </div>
      </div>

      {/* the rule strip */}
      <div
        style={{
          position: "absolute",
          top: 1400,
          left: 60,
          right: 60,
          opacity: Math.min(1, rule * 1.4),
          transform: `translateY(${(1 - rule) * 40}px)`,
        }}
      >
        <div
          style={{
            padding: "30px 34px",
            borderRadius: 26,
            background: "rgba(120,20,20,0.35)",
            border: "4px solid #FF5A5A",
            boxShadow: "0 0 40px rgba(255,90,90,0.45)",
            fontSize: 56,
            fontWeight: 900,
            color: "#FFE1E1",
            lineHeight: 1.5,
          }}
        >
          ⚠️ الخصائص تُكتب بين اسم الوسم والقوس!
        </div>
      </div>
    </AbsoluteFill>
  );
};
