import React from "react";
import type { CSSProperties } from "react";
import { FONT } from "../vscode/theme";
import { mix } from "./parts";

/* ------------------------------------------------------------------ */
/* The hook: a messy site that morphs into an organised one            */
/* ------------------------------------------------------------------ */

const MESSY: { x: number; y: number; w: number; h: number; c: string; r: number; bad?: boolean }[] = [
  { x: 40, y: 30, w: 300, h: 46, c: "#94A3B8", r: -5 },
  { x: 470, y: 20, w: 240, h: 36, c: "#CBD5E1", r: 7, bad: true },
  { x: 90, y: 120, w: 520, h: 24, c: "#E2E8F0", r: -3 },
  { x: 40, y: 180, w: 330, h: 160, c: "#F1F5F9", r: 6 },
  { x: 430, y: 150, w: 340, h: 120, c: "#E2E8F0", r: -8, bad: true },
  { x: 120, y: 380, w: 480, h: 22, c: "#E2E8F0", r: 4 },
  { x: 60, y: 430, w: 200, h: 64, c: "#FCA5A5", r: -7, bad: true },
  { x: 560, y: 330, w: 260, h: 170, c: "#F1F5F9", r: 9 },
];

/** Scattered, overlapping, broken blocks — the "before". */
export const MessySite: React.FC = () => (
  <div
    style={{
      height: 560,
      background: "#FFFFFF",
      position: "relative",
      overflow: "hidden",
      direction: "ltr",
    }}
  >
    {MESSY.map((b, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: b.x,
          top: b.y,
          width: b.w,
          height: b.h,
          background: b.c,
          borderRadius: 6,
          transform: `rotate(${b.r}deg)`,
          border: b.bad ? "3px solid #EF4444" : "1px solid #E5E7EB",
        }}
      />
    ))}
    {MESSY.filter((b) => b.bad).map((b, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: b.x + b.w - 26,
          top: b.y - 20,
          fontSize: 36,
          transform: `rotate(${b.r}deg)`,
        }}
      >
        ❌
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 372,
        top: 244,
        fontSize: 66,
        transform: "rotate(-12deg)",
      }}
    >
      😕
    </div>
  </div>
);

/** Neat header / cards / footer — the "after". */
export const CleanSite: React.FC = () => (
  <div
    style={{
      height: 560,
      background: "linear-gradient(165deg,#0B1224 0%,#132A66 60%,#1E3A8A 100%)",
      direction: "rtl",
      fontFamily: FONT,
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        height: 76,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 34px",
        background: "linear-gradient(90deg,#1D4ED8,#3B82F6)",
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF" }}>موقعي</div>
      <div style={{ display: "flex", gap: 22, fontSize: 22, fontWeight: 800, color: "#DBEAFE" }}>
        <span style={{ color: "#FFD700" }}>الرئيسية</span>
        <span>الأقسام</span>
        <span>تواصل</span>
      </div>
    </div>
    <div style={{ display: "flex", gap: 18, padding: "26px 34px 0" }}>
      {["linear-gradient(135deg,#FF6B35,#FFD700)", "linear-gradient(135deg,#22D3EE,#3B82F6)", "linear-gradient(135deg,#A855F7,#FF6B35)"].map(
        (g, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.10)",
              border: "2px solid rgba(255,255,255,0.18)",
            }}
          >
            <div style={{ height: 96, background: g }} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.78)", width: "85%" }} />
              <div
                style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.35)", width: "65%", marginTop: 10 }}
              />
            </div>
          </div>
        ),
      )}
    </div>
    <div style={{ padding: "22px 34px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.30)", width: "92%" }} />
      <div style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.22)", width: "78%" }} />
    </div>
    <div
      style={{
        display: "inline-flex",
        margin: "24px 34px 0",
        padding: "13px 34px",
        borderRadius: 100,
        background: "linear-gradient(90deg,#FF6B35,#FF3D0F)",
        color: "#FFFFFF",
        fontSize: 26,
        fontWeight: 900,
        boxShadow: "0 10px 26px rgba(255,107,53,0.45)",
      }}
    >
      ابدأ الآن
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 66,
        background: "linear-gradient(90deg,#7C3AED,#A855F7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 800,
      }}
    >
      footer
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* The card — the star of the "practical uses" + CSS scenes            */
/* ------------------------------------------------------------------ */

export const DemoCard: React.FC<{
  lifted?: number;
  white?: number;
  pad?: number;
  width?: number;
  style?: CSSProperties;
}> = ({ lifted = 1, white = 1, pad = 30, width = 560, style }) => {
  const fg = mix("#FFFFFF", "#0F172A", white);
  const sub = mix("#94A3B8", "#64748B", white);
  return (
    <div
      style={{
        width,
        boxSizing: "border-box",
        padding: pad,
        borderRadius: 26,
        background: `rgba(255,255,255,${white})`,
        border:
          white > 0.5
            ? "3px solid #E2E8F0"
            : "3px dashed rgba(255,255,255,0.45)",
        boxShadow:
          lifted > 0.01
            ? `0 ${24 + lifted * 34}px ${54 + lifted * 46}px rgba(2,6,23,${
                0.3 + lifted * 0.22
              }), 0 0 ${34 + lifted * 46}px rgba(255,107,53,${0.16 + lifted * 0.4})`
            : "0 20px 48px rgba(2,6,23,0.35)",
        transform: `translateY(${-26 * lifted}px) scale(${1 + 0.03 * lifted})`,
        transformOrigin: "50% 60%",
        direction: "rtl",
        fontFamily: FONT,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          height: 190,
          borderRadius: 18,
          background: "linear-gradient(135deg,#FF6B35 0%,#FFD700 55%,#A855F7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 74,
        }}
      >
        🏖️
      </div>
      <div style={{ fontSize: 42, fontWeight: 900, color: fg, marginTop: 22, lineHeight: 1.3 }}>
        كورس HTML للمبتدئين 🚀
      </div>
      <div style={{ fontSize: 27, fontWeight: 600, color: sub, marginTop: 12, lineHeight: 1.6 }}>
        وصف مختصر يوضّح محتوى البطاقة
      </div>
      <div style={{ display: "flex", marginTop: 24, gap: 18, alignItems: "center" }}>
        <div
          style={{
            padding: "14px 38px",
            borderRadius: 100,
            background: "linear-gradient(90deg,#FF6B35,#FF3D0F)",
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 900,
            boxShadow: "0 10px 26px rgba(255,107,53,0.45)",
          }}
        >
          اشترِ الآن
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: sub }}>4.9 ★</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* header / main / footer wireframe (second half of "practical uses")  */
/* ------------------------------------------------------------------ */

const Section: React.FC<{
  label: string;
  arabic: string;
  color: string;
  height: number;
  active: number;
  children?: React.ReactNode;
}> = ({ label, arabic, color, height, active, children }) => (
  <div
    style={{
      height,
      borderRadius: 20,
      background: `linear-gradient(180deg, ${color}33, ${color}14)`,
      border: `${3 + active * 3}px solid ${color}`,
      boxShadow: active > 0.01 ? `0 0 ${28 + active * 34}px ${color}88` : "none",
      position: "relative",
      overflow: "hidden",
      padding: 26,
      boxSizing: "border-box",
      transform: `scale(${1 + active * 0.015})`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 18,
        right: 22,
        fontFamily: "monospace",
        fontSize: 34,
        fontWeight: 700,
        color,
        direction: "ltr",
        opacity: 0.35 + active * 0.65,
      }}
    >
      {`<div class="${label}">`}
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 18,
        left: 24,
        fontFamily: FONT,
        fontSize: 30,
        fontWeight: 900,
        color: "#FFFFFF",
        opacity: 0.55 + active * 0.45,
      }}
    >
      {arabic}
    </div>
    {children}
  </div>
);

/** Colored page sections, each one a div. */
export const PageStructure: React.FC<{ step: number }> = ({ step }) => {
  const a1 = Math.max(0, Math.min(1, step));
  const a2 = Math.max(0, Math.min(1, step - 1));
  const a3 = Math.max(0, Math.min(1, step - 2));
  return (
    <div
      style={{
        width: 900,
        boxSizing: "border-box",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        background: "#0B1224",
        border: "3px solid rgba(255,255,255,0.18)",
        borderRadius: 28,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      <Section label="header" arabic="الترويسة" color="#3B82F6" height={250} active={a1}>
        <div
          style={{
            position: "absolute",
            top: 74,
            right: 26,
            left: 26,
            height: 74,
            borderRadius: 14,
            background: "linear-gradient(90deg,#3B82F6,#22D3EE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
            boxSizing: "border-box",
            color: "#0B1224",
            fontFamily: FONT,
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          <span>موقعي</span>
          <span style={{ fontFamily: "monospace", fontSize: 24, direction: "ltr" }}>nav</span>
        </div>
      </Section>
      <Section label="main" arabic="المحتوى" color="#FF6B35" height={620} active={a2}>
        <div style={{ position: "absolute", top: 76, right: 26, left: 26, display: "flex", gap: 20 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 300,
                borderRadius: 18,
                background: "rgba(255,255,255,0.10)",
                border: "2px solid rgba(255,255,255,0.22)",
                overflow: "hidden",
                opacity: 0.35 + a2 * 0.65,
                transform: `translateY(${(1 - a2) * 26}px)`,
              }}
            >
              <div
                style={{
                  height: 150,
                  background: [
                    "linear-gradient(135deg,#FF6B35,#FFD700)",
                    "linear-gradient(135deg,#22D3EE,#3B82F6)",
                    "linear-gradient(135deg,#A855F7,#FF6B35)",
                  ][i],
                }}
              />
              <div style={{ padding: 18 }}>
                <div style={{ height: 18, borderRadius: 9, background: "rgba(255,255,255,0.8)", width: "86%" }} />
                <div
                  style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.35)", width: "64%", marginTop: 12 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section label="footer" arabic="التذييل" color="#A855F7" height={230} active={a3}>
        <div
          style={{
            position: "absolute",
            top: 74,
            right: 26,
            left: 26,
            height: 74,
            borderRadius: 14,
            background: "rgba(168,85,247,0.45)",
            border: "2px dashed rgba(255,255,255,0.5)",
          }}
        />
      </Section>
    </div>
  );
};
