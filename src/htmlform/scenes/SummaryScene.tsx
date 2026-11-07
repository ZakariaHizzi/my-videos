import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import {
  C_BUTTON,
  C_FORM,
  C_INPUT,
  C_PLACEHOLDER,
  C_REQUIRED,
  RenderButton,
  RenderInput,
  TagChip,
  fadeUp,
  popAt,
} from "../parts";

/* The full login form diagram, each row annotated with its "magic" bits. */
const ROWS: {
  appear: number;
  code: string;
  field: React.ReactNode;
  badges: { icon: string; label: string; color: string }[];
}[] = [
  {
    appear: 30,
    code: 'input type="text"',
    field: <RenderInput placeholder="اسم المستخدم" width={560} fontSize={34} />,
    badges: [{ icon: "💬", label: "placeholder", color: C_PLACEHOLDER }],
  },
  {
    appear: 62,
    code: 'input type="email"',
    field: <RenderInput placeholder="example@mail.com" type="email" width={560} fontSize={34} />,
    badges: [
      { icon: "💬", label: "placeholder", color: C_PLACEHOLDER },
      { icon: "⚠️", label: "required", color: C_REQUIRED },
    ],
  },
  {
    appear: 94,
    code: 'input type="password"',
    field: <RenderInput placeholder="كلمة السر" type="password" width={560} fontSize={34} />,
    badges: [{ icon: "💬", label: "placeholder", color: C_PLACEHOLDER }],
  },
];

const Badge: React.FC<{ icon: string; label: string; color: string }> = ({
  icon,
  label,
  color,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 16px",
      borderRadius: 100,
      background: "rgba(6,10,30,0.85)",
      border: `2px solid ${color}`,
      boxShadow: `0 0 18px ${color}55`,
      fontSize: 26,
      fontWeight: 800,
      color: "#FFFFFF",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ fontSize: 26 }}>{icon}</span>
    <span style={{ fontFamily: MONO, color, direction: "ltr" }}>{label}</span>
  </span>
);

/* Legend strip at the bottom: form / input+attrs / button. */
const LEGEND: { icon: string; text: string; color: string; appear: number }[] = [
  { icon: "📦", text: "form", color: C_FORM, appear: 150 },
  { icon: "✏️", text: "input + 💬 + ⚠️", color: C_INPUT, appear: 178 },
  { icon: "🔘", text: "button", color: C_BUTTON, appear: 206 },
];

/** 50-55s: the complete login form — one diagram tying every piece together. */
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = fadeUp(frame, 2, 24);
  const btnRow = popAt(frame, fps, 126, 12, 165);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={55} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 40,
          right: 40,
          fontSize: 74,
          fontWeight: 900,
          lineHeight: 1.3,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.55))",
          opacity: Math.min(1, head.opacity * 1.4),
          transform: head.translate,
          zIndex: 20,
        }}
      >
        النموذج كامل ✨
      </div>

      {/* the form diagram, wrapped in the <form> container */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 70,
          width: 940,
          zIndex: 12,
        }}
      >
        <div
          style={{
            position: "relative",
            border: `4px dashed ${C_FORM}`,
            borderRadius: 26,
            background: `${C_FORM}12`,
            boxShadow: `0 0 30px ${C_FORM}55, inset 0 0 34px ${C_FORM}18`,
            padding: "54px 40px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            boxSizing: "border-box",
          }}
        >
          {/* the <form> tag chip on the container corner */}
          <div style={{ position: "absolute", top: -26, right: 24 }}>
            <TagChip label="<form>" color={C_FORM} fontSize={34} />
          </div>

          {ROWS.map((r) => {
            const s = popAt(frame, fps, r.appear, 12, 175);
            return (
              <div
                key={r.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "14px 20px",
                  borderRadius: 16,
                  background: "rgba(6,10,30,0.72)",
                  border: `2px solid ${C_INPUT}55`,
                  opacity: Math.min(1, s),
                  transform: `translateY(${(1 - s) * -14}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 28,
                      fontWeight: 700,
                      color: C_INPUT,
                      direction: "ltr",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.code}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {r.badges.map((b) => (
                    <Badge key={b.label} {...b} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* the rendered fields sit under each code row for a moment of realism */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 14,
              marginTop: 4,
            }}
          >
            {ROWS.map((r) => {
              const s = popAt(frame, fps, r.appear + 8, 12, 175);
              return (
                <div key={r.code} style={{ opacity: Math.min(1, s * 1.2) }}>
                  {r.field}
                </div>
              );
            })}

            {/* submit button row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 8,
                opacity: Math.min(1, btnRow * 1.4),
                transform: `scale(${0.8 + 0.2 * btnRow})`,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 700,
                  color: C_BUTTON,
                  direction: "ltr",
                  whiteSpace: "nowrap",
                }}
              >
                button type="submit"
              </span>
              <RenderButton label="تسجيل" width={360} fontSize={32} />
            </div>
          </div>
        </div>
      </div>

      {/* legend strip */}
      <div
        style={{
          position: "absolute",
          top: 1560,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          zIndex: 20,
          flexWrap: "wrap",
        }}
      >
        {LEGEND.map((l) => {
          const s = popAt(frame, fps, l.appear, 12, 165);
          if (s <= 0.001) return null;
          return (
            <div
              key={l.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 100,
                background: "rgba(6,10,30,0.92)",
                border: `3px solid ${l.color}`,
                boxShadow: `0 0 26px ${l.color}55`,
                opacity: Math.min(1, s),
                transform: `scale(${0.7 + 0.3 * s})`,
              }}
            >
              <span style={{ fontSize: 38 }}>{l.icon}</span>
              <span
                style={{
                  fontFamily: l.text.includes("+") ? FONT : MONO,
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  direction: l.text.includes("+") ? "rtl" : "ltr",
                  whiteSpace: "nowrap",
                }}
              >
                {l.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
