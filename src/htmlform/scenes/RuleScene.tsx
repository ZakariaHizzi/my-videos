import React from "react";
import type { ReactNode } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import {
  C_BUTTON,
  C_FORM,
  C_INPUT,
  CopyPanel,
  RenderButton,
  RenderInput,
  TagChip,
  fadeUp,
  popAt,
} from "../parts";

/** The glowing `<form>` container box that everything nests inside. */
const FormBox: React.FC<{
  appear: number;
  glow: number;
  children: ReactNode;
}> = ({ appear, glow, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 14, 130);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        position: "relative",
        border: `4px dashed ${C_FORM}`,
        borderRadius: 26,
        padding: "56px 44px 44px",
        background: `${C_FORM}12`,
        boxShadow: `0 0 ${26 + glow * 30}px ${C_FORM}66, inset 0 0 34px ${C_FORM}22`,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 24,
        opacity: Math.min(1, s),
        transform: `scale(${0.84 + 0.16 * s})`,
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "absolute", top: -28, right: 24 }}>
        <TagChip label="<form>" color={C_FORM} fontSize={38} />
      </div>
      {children}
    </div>
  );
};

/** A small field chip that pops in, showing it lives inside the form. */
const InnerField: React.FC<{
  appear: number;
  color: string;
  children: ReactNode;
}> = ({ appear, color, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 185);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        opacity: Math.min(1, s),
        transform: `translateX(${(1 - s) * 70}px)`,
        borderRight: `6px solid ${color}`,
        paddingRight: 20,
      }}
    >
      {children}
    </div>
  );
};

/** 6-14s: the golden rule — the form is the container that holds it all. */
export const RuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const glow = 0.45 + 0.55 * Math.sin(t * 3.1);

  const cap1 = fadeUp(frame, 4, 26);
  // the punchline lands with the narrator's "كل حاجة جوه <form>"
  const punch = popAt(frame, fps, 224, 10, 175);
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
      <Twinkles count={14} seed={9} colors={["#FFD700", "#22D3EE", "#A855F7"]} />

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
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.55)" }}>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#FFFFFF" }}>
            القاعدة الذهبية: <span>✨</span>
          </div>
        </CopyPanel>
      </div>

      {/* the container diagram */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 110,
          width: 860,
          zIndex: 12,
        }}
      >
        <FormBox appear={60} glow={glow}>
          <InnerField appear={130} color={C_INPUT}>
            <RenderInput placeholder="اسم المستخدم" width={772} fontSize={38} />
          </InnerField>
          <InnerField appear={152} color={C_INPUT}>
            <RenderInput placeholder="example@mail.com" type="email" width={772} fontSize={38} />
          </InnerField>
          <InnerField appear={174} color={C_INPUT}>
            <RenderInput placeholder="كلمة السر" type="password" width={772} fontSize={38} />
          </InnerField>
          <InnerField appear={196} color={C_BUTTON}>
            <RenderButton label="تسجيل" width={772} fontSize={38} />
          </InnerField>
        </FormBox>
      </div>

      {/* "contains everything" hint */}
      <div
        style={{
          position: "absolute",
          top: 1370,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 46,
          fontWeight: 800,
          color: "#A855F7",
          textShadow: "0 0 24px #A855F7",
          opacity: popAt(frame, fps, 120, 12, 150),
          zIndex: 14,
        }}
      >
        ⬇ كل الخانات والأزرار جواه
      </div>

      {/* the punchline */}
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
          كل حاجة جوه{" "}
          <span style={{ fontFamily: "monospace", color: C_FORM }}>&lt;form&gt;</span>{" "}
          <span>📦</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
