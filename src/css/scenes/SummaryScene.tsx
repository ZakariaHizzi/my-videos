import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import {
  C_GOLD,
  C_GREEN,
  C_ORANGE,
  C_PURPLE,
  K,
  Twinkles,
  fadeUp,
  popAt,
} from "../parts";

const Card: React.FC<{
  side: "left" | "right";
  appear: number;
  icon: string;
  code: React.ReactNode;
  caption: React.ReactNode;
  sub: string;
  color: string;
  captionAt: number;
}> = ({ side, appear, icon, code, caption, sub, color, captionAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cap = popAt(frame, fps, captionAt, 11, 175);
  return (
    <div
      style={{
        position: "absolute",
        top: 500,
        [side]: 42,
        width: 452,
        height: 620,
        borderRadius: 34,
        background: "rgba(5,10,30,0.92)",
        border: `4px solid ${color}`,
        boxShadow: `0 28px 70px rgba(0,0,0,0.55), 0 0 ${30 + 20 * appear}px ${color}55`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        opacity: Math.min(1, appear * 1.5),
        transform: `translateY(${(1 - appear) * 60}px) scale(${0.9 + 0.1 * appear})`,
        zIndex: 20,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 108,
          height: 108,
          borderRadius: "50%",
          background: `radial-gradient(circle,${color}33,rgba(5,10,30,0.8) 70%)`,
          border: `3px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 58,
          boxShadow: `0 0 30px ${color}55`,
          transform: `rotate(${Math.sin(frame / 24 + (side === "left" ? 0 : 2)) * 5}deg)`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "Consolas, monospace",
          fontSize: side === "left" ? 45 : 54,
          fontWeight: 900,
          color,
          direction: "ltr",
          textShadow: `0 0 26px ${color}66`,
          whiteSpace: "nowrap",
        }}
      >
        {code}
      </div>
      <div
        style={{
          width: 300,
          height: 2,
          background: `linear-gradient(90deg,transparent,${color}88,transparent)`,
        }}
      />
      <div
        style={{
          padding: "8px 22px",
          borderRadius: 100,
          background: `${color}1A`,
          border: `2px solid ${color}55`,
          fontFamily: FONT,
          fontSize: 24,
          fontWeight: 800,
          color: "#CBD5E1",
          whiteSpace: "nowrap",
        }}
      >
        {sub}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 900,
          color: "#FFFFFF",
          textShadow: `0 0 24px ${color}77`,
          opacity: Math.min(1, cap * 1.4),
          transform: `scale(${0.75 + 0.25 * cap})`,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = fadeUp(frame, 0, 12);
  const vs = popAt(frame, fps, 42, 8, 210);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={16} seed={41} />

      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 30,
          opacity: head.opacity,
          transform: head.transform,
        }}
      >
        <div
          style={{
            padding: "12px 38px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.88)",
            border: `3px solid ${C_PURPLE}88`,
            boxShadow: `0 0 34px ${C_PURPLE}33`,
            fontSize: 46,
            fontWeight: 900,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          الخلاصة ⚡
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 700,
            color: "#CBD5E1",
            opacity: 0.9,
          }}
        >
          إمتى تستخدم كل طريقة؟
        </div>
      </div>

      <Card
        side="left"
        appear={popAt(frame, fps, 4, 11, 170)}
        icon="✏️"
        code={'style="..."'}
        sub="جوه العنصر"
        caption={
          <>
            <span>✏️</span>
            <K color={C_ORANGE} size={44}>
              style
            </K>
            <span>=</span>
            <span>سريع</span>
          </>
        }
        color={C_ORANGE}
        captionAt={34}
      />

      <Card
        side="right"
        appear={popAt(frame, fps, 16, 11, 170)}
        icon="✅"
        code="<link>"
        sub="ملف خارجي"
        caption={
          <>
            <span>✅</span>
            <K color={C_GREEN} size={44}>
              link
            </K>
            <span>=</span>
            <span>احترافي</span>
          </>
        }
        color={C_GREEN}
        captionAt={46}
      />

      {/* VS divider */}
      <div
        style={{
          position: "absolute",
          top: 750,
          left: 495,
          width: 92,
          height: 92,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(145deg,${C_GOLD},${C_PURPLE})`,
          color: "#10142A",
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 900,
          boxShadow: `0 0 ${28 + 20 * vs}px ${C_GOLD}88, 0 12px 26px rgba(0,0,0,0.5)`,
          border: "4px solid #FFF3B0",
          opacity: Math.min(1, vs * 1.4),
          transform: `scale(${0.4 + 0.6 * vs}) rotate(${Math.sin(frame / 12) * 4}deg)`,
          zIndex: 40,
        }}
      >
        VS
      </div>

      <div
        style={{
          position: "absolute",
          top: 1240,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, popAt(frame, fps, 56, 12, 160)),
          transform: `translateY(${(1 - popAt(frame, fps, 56, 12, 160)) * 20}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 30px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.85)",
            border: `2px solid ${C_GOLD}66`,
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 800,
            color: "#F8FAFC",
          }}
        >
          <span>سريع للتجربة</span>
          <span style={{ color: C_GOLD }}>·</span>
          <span>احترافي للمشروع الكامل</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
