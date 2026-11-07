import React from "react";
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { popAt } from "../parts";

/* Four vibrant colors, one per input type. */
const C_EMAIL = "#22D3EE";
const C_NUMBER = "#A855F7";
const C_CHECK = "#34D399";
const C_RADIO = "#F472B6";

/** One row: the code chip on the left (LTR) + its rendered control on the right. */
const TypeRow: React.FC<{
  appear: number;
  code: string;
  color: string;
  arabic: string;
  icon: string;
  children: ReactNode;
}> = ({ appear, code, color, arabic, icon, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 12, 170);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        padding: "18px 26px",
        borderRadius: 20,
        background: "rgba(6,10,30,0.9)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 26px ${color}55`,
        opacity: Math.min(1, s),
        transform: `translateX(${(1 - s) * 90}px)`,
      }}
    >
      {/* code + arabic label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 36 }}>{icon}</span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 30,
            fontWeight: 700,
            color,
            direction: "ltr",
            whiteSpace: "nowrap",
          }}
        >
          {code}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 900,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          = {arabic}
        </span>
      </div>
      {/* rendered control, seated on a white card so it reads like a real form */}
      <div
        style={{
          flexShrink: 0,
          padding: "12px 18px",
          borderRadius: 14,
          background: "#FFFFFF",
          border: "2px solid #CBD5E1",
          boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ---- small rendered controls ---- */

const FakeField: React.FC<{ text: string; w?: number }> = ({ text, w = 210 }) => (
  <div
    style={{
      width: w,
      boxSizing: "border-box",
      padding: "12px 16px",
      borderRadius: 10,
      background: "#FFFFFF",
      border: "2px solid #CBD5E1",
      fontFamily: FONT,
      fontSize: 28,
      fontWeight: 600,
      color: "#0F172A",
      textAlign: "center",
      direction: "ltr",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

const CheckItem: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        background: checked ? C_CHECK : "#FFFFFF",
        border: `3px solid ${checked ? C_CHECK : "#94A3B8"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 900,
      }}
    >
      {checked ? "✓" : ""}
    </div>
    <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: "#0F172A" }}>
      {label}
    </span>
  </div>
);

const RadioItem: React.FC<{ label: string; selected: boolean }> = ({ label, selected }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: `3px solid ${selected ? C_RADIO : "#94A3B8"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected ? (
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: C_RADIO }} />
      ) : null}
    </div>
    <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: "#0F172A" }}>
      {label}
    </span>
  </div>
);

/** 34-42s: the four most useful `type` values, each with a live control. */
export const TypeValuesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = popAt(frame, fps, 2, 12, 150);

  // the spinner arrows on the number field tick up
  const spin = Math.floor(Math.max(0, frame - 96) / 14) % 3;
  const numVal = ["25", "26", "27"][spin];

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={41} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 0,
          width: 1080,
          zIndex: 20,
          opacity: Math.min(1, title * 1.4),
          transform: `scale(${0.7 + 0.3 * title})`,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.55))",
          }}
        >
          أنواع تانية للـ type 🧩
        </div>
      </div>

      {/* the four rows */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 60,
          width: 960,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          zIndex: 14,
        }}
      >
        <TypeRow appear={30} code='type="email"' color={C_EMAIL} arabic="بريد" icon="📧">
          <FakeField text="sara@mail.com" w={230} />
        </TypeRow>

        <TypeRow appear={66} code='type="number"' color={C_NUMBER} arabic="أرقام" icon="🔢">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 30,
                fontWeight: 700,
                color: "#0F172A",
                direction: "ltr",
              }}
            >
              {numVal}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #CBD5E1",
                borderRadius: 6,
                overflow: "hidden",
                lineHeight: 1,
              }}
            >
              <div style={{ padding: "5px 9px", fontSize: 16, color: "#475569", background: "#F1F5F9" }}>▲</div>
              <div
                style={{
                  padding: "5px 9px",
                  fontSize: 16,
                  color: "#475569",
                  borderTop: "1px solid #CBD5E1",
                  background: "#F1F5F9",
                }}
              >
                ▼
              </div>
            </div>
          </div>
        </TypeRow>

        <TypeRow appear={102} code='type="checkbox"' color={C_CHECK} arabic="متعدد" icon="☑️">
          <div style={{ display: "flex", gap: 20 }}>
            <CheckItem label="أخبار" checked />
            <CheckItem label="عروض" checked={false} />
          </div>
        </TypeRow>

        <TypeRow appear={138} code='type="radio"' color={C_RADIO} arabic="واحد" icon="🔘">
          <div style={{ display: "flex", gap: 20 }}>
            <RadioItem label="ذكر" selected />
            <RadioItem label="أنثى" selected={false} />
          </div>
        </TypeRow>
      </div>

      {/* footer reminder */}
      <div
        style={{
          position: "absolute",
          top: 1720,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 38,
          fontWeight: 800,
          color: "rgba(255,255,255,0.75)",
          opacity: popAt(frame, fps, 172, 12, 150),
          zIndex: 20,
        }}
      >
        الـ <span style={{ fontFamily: MONO, color: "#A855F7" }}>radio</span> يختار واحد بس،{" "}
        <span style={{ fontFamily: MONO, color: "#34D399" }}>checkbox</span> يختار أكتر من واحد
      </div>
    </AbsoluteFill>
  );
};
