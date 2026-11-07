import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { C_LINK, C_UL, C_LI, CopyPanel, TagChip, fadeUp, popAt } from "../parts";

const CHIPS = [
  { t: "<a href>", c: C_LINK, x: 44, y: 1660, rot: -7 },
  { t: "<ul>", c: C_UL, x: 830, y: 1640, rot: 8 },
  { t: "<li>", c: C_LI, x: 130, y: 1810, rot: 6 },
];

/** A tiny multi-page site mockup with arrows showing navigation between pages. */
const SiteNav: React.FC<{ frame: number }> = ({ frame }) => {
  const pages = ["الرئيسية", "من نحن", "اتصل بنا"];
  const navIn = popAt(frame, 30, 40, 13, 150);
  const arrow = popAt(frame, 30, 90, 12, 160);
  return (
    <div
      style={{
        borderRadius: 26,
        background: "#F8FAFC",
        border: "2px solid rgba(255,255,255,0.65)",
        boxShadow: "0 34px 90px rgba(0,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      {/* browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          background: "#E2E8F0",
          borderBottom: "1px solid #CBD5E1",
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
          🔗 my-site.com
        </div>
      </div>
      {/* nav bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "18px 20px",
          background: "linear-gradient(180deg,#1E3A8A,#14285A)",
          opacity: Math.min(1, navIn),
          transform: `translateY(${(1 - navIn) * -12}px)`,
        }}
      >
        {pages.map((p, i) => (
          <div
            key={p}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              color: i === 0 ? "#FFD700" : "#FFFFFF",
              fontFamily: FONT,
              fontSize: 24,
              fontWeight: 800,
              borderBottom: i === 0 ? "3px solid #FFD700" : "3px solid transparent",
              direction: "rtl",
            }}
          >
            {p}
          </div>
        ))}
      </div>
      {/* body */}
      <div style={{ padding: "30px 40px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ width: "70%", height: 26, borderRadius: 10, background: "#CBD5E1" }} />
        <div style={{ width: "90%", height: 14, borderRadius: 7, background: "#E2E8F0" }} />
        <div style={{ width: "80%", height: 14, borderRadius: 7, background: "#E2E8F0" }} />
      </div>
      {/* animated arrows between pages */}
      {arrow > 0.01 ? (
        <div
          style={{
            position: "absolute",
            top: 210,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 60,
            opacity: Math.min(1, arrow),
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 46, color: C_LINK, transform: `translateX(${Math.sin(frame / 10) * 6}px)` }}>➜</span>
          <span style={{ fontSize: 46, color: C_LINK, transform: `translateX(${Math.sin(frame / 10 + 1) * 6}px)` }}>➜</span>
        </div>
      ) : null}
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 26);
  const win = popAt(frame, fps, 12, 14, 130);
  const badge = popAt(frame, fps, 120, 10, 175);
  const glow = 0.5 + 0.5 * Math.sin(t * 5.4);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={4} />

      {/* headline */}
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
        <CopyPanel style={{ padding: "30px 42px", borderColor: "rgba(34,211,238,0.5)" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            إزاي تعم روابط بين الصفحات؟ <span>🔗</span>
          </div>
        </CopyPanel>
      </div>

      {/* site window */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 560,
          width: 880,
          zIndex: 10,
          opacity: Math.min(1, win),
          transform: `scale(${0.9 + 0.1 * win})`,
          transformOrigin: "50% 30%",
        }}
      >
        <SiteNav frame={frame} />
      </div>

      {/* golden promise badge */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, badge * 1.5),
          transform: `scale(${0.55 + 0.45 * badge})`,
        }}
      >
        <div
          style={{
            padding: "24px 60px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 60,
            fontWeight: 900,
            boxShadow: `0 0 ${40 + glow * 50}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          a + القوائم!
        </div>
      </div>

      {/* floating tag chips */}
      {CHIPS.map((c, i) => {
        const chipIn = popAt(frame, fps, 44 + i * 7, 13, 150);
        if (chipIn <= 0.001) return null;
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y + Math.sin(t * 1.7 + i * 1.3) * 10,
              opacity: Math.min(1, chipIn),
              transform: `scale(${0.6 + 0.4 * chipIn}) rotate(${c.rot}deg)`,
            }}
          >
            <TagChip label={c.t} color={c.c} fontSize={32} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
