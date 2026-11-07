import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import {
  C_LINK,
  C_UL,
  C_LI,
  CopyPanel,
  RenderNavMenu,
  TagChip,
  fadeUp,
  popAt,
} from "../parts";

/** 6-14s: the golden rule — links + lists = navigation menu. */
export const RuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.45 + 0.55 * Math.sin(t * 3.1);

  const cap1 = fadeUp(frame, 4, 26);
  const ulBox = popAt(frame, fps, 50, 14, 130);
  const liBox = popAt(frame, fps, 90, 12, 160);
  const aBox = popAt(frame, fps, 130, 12, 160);
  const navIn = popAt(frame, fps, 180, 14, 150);
  const punch = popAt(frame, fps, 210, 10, 175);
  const punchPulse = 1 + 0.06 * Math.sin(t * 6);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={9} colors={["#A855F7", "#3B82F6", "#F472B6"]} />

      {/* caption */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(168,85,247,0.55)" }}>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#FFFFFF" }}>
            القاعدة الذهبية: <span>✨</span>
          </div>
        </CopyPanel>
      </div>

      {/* nested diagram */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 110,
          width: 860,
          zIndex: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        {/* ul box */}
        <div
          style={{
            width: "100%",
            border: `4px dashed ${C_UL}`,
            borderRadius: 26,
            padding: "26px 30px",
            background: `${C_UL}18`,
            boxShadow: `0 0 ${26 + glow * 30}px ${C_UL}66`,
            opacity: Math.min(1, ulBox),
            transform: `scale(${0.86 + 0.14 * ulBox})`,
            boxSizing: "border-box",
          }}
        >
          <div style={{ position: "absolute", top: -22, right: 24 }}>
            <TagChip label="<ul>" color={C_UL} fontSize={38} />
          </div>
          {/* li box */}
          <div
            style={{
              border: `3px solid ${C_LI}`,
              borderRadius: 18,
              padding: "20px 24px",
              background: `${C_LI}14`,
              boxShadow: `0 0 24px ${C_LI}55`,
              opacity: Math.min(1, liBox),
              transform: `translateX(${(1 - liBox) * 60}px)`,
              boxSizing: "border-box",
            }}
          >
            <div style={{ position: "absolute", top: -16, right: 16 }}>
              <TagChip label="<li>" color={C_LI} fontSize={30} />
            </div>
            {/* a box */}
            <div
              style={{
                border: `3px solid ${C_LINK}`,
                borderRadius: 14,
                padding: "14px 20px",
                background: `${C_LINK}18`,
                boxShadow: `0 0 24px ${C_LINK}55`,
                opacity: Math.min(1, aBox),
                transform: `scale(${0.8 + 0.2 * aBox})`,
                fontFamily: "monospace",
                fontSize: 34,
                fontWeight: 700,
                color: C_LINK,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              <TagChip label="<a>" color={C_LINK} fontSize={28} />{" "}
              <span style={{ color: "#FFFFFF", marginLeft: 12 }}>رابط</span>
            </div>
          </div>
        </div>
      </div>

      {/* resulting nav menu */}
      <div
        style={{
          position: "absolute",
          top: 980,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 14,
          opacity: Math.min(1, navIn),
          transform: `translateY(${(1 - navIn) * 30}px)`,
        }}
      >
        <RenderNavMenu items={[{ label: "الرئيسية", active: true }, { label: "من نحن" }, { label: "اتصل بنا" }]} width={860} fontSize={30} />
      </div>

      {/* "contains everything" hint */}
      <div
        style={{
          position: "absolute",
          top: 1180,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 44,
          fontWeight: 800,
          color: C_LINK,
          textShadow: `0 0 24px ${C_LINK}`,
          opacity: popAt(frame, fps, 120, 12, 150),
          zIndex: 14,
        }}
      >
        ul → li → a  (جوه جوه!)
      </div>

      {/* punchline */}
      <div
        style={{
          position: "absolute",
          top: 1520,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, punch * 1.5),
          transform: `scale(${(0.6 + 0.4 * punch) * punchPulse})`,
        }}
      >
        <div
          style={{
            padding: "26px 56px",
            borderRadius: 28,
            background: "linear-gradient(180deg,#312E81,#1E3A8A)",
            border: "4px solid rgba(255,215,0,0.75)",
            boxShadow: `0 0 ${40 + glow * 40}px rgba(255,215,0,0.5), 0 20px 50px rgba(0,0,0,0.5)`,
            fontSize: 58,
            fontWeight: 900,
            color: "#FFFFFF",
            direction: "rtl",
          }}
        >
          روابط + قوائم = قائمة تنقل <span>🧭</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
