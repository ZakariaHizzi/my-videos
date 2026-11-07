import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { FONT, MONO } from "../vscode/theme";
import { Twinkles } from "../css/parts";

/* ------------------------------------------------------------------ */
/* Scene shell                                                         */
/* ------------------------------------------------------------------ */

export const SceneShell: React.FC<{ children: ReactNode; seed?: number }> = ({
  children,
  seed = 1,
}) => (
  <AbsoluteFill
    style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}
  >
    <Twinkles count={18} seed={seed} />
    {children}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Mini websites for the hook scene                                    */
/* ------------------------------------------------------------------ */

/** Boring Times New Roman website — the "before". */
export const BoringSite: React.FC = () => (
  <div
    style={{
      minHeight: 560,
      padding: "32px 40px",
      background: "#FFFFFF",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000000",
      direction: "ltr",
      textAlign: "left",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.12 }}>
      Welcome to my site
    </div>
    <div style={{ fontSize: 30, marginTop: 14, lineHeight: 1.2 }}>
      This is my website. The text looks old and boring and nobody likes
      reading it for very long.
    </div>
    <div
      style={{
        fontSize: 28,
        color: "#0000EE",
        textDecoration: "underline",
        marginTop: 14,
      }}
    >
      Click here
    </div>
    <div style={{ height: 3, background: "#999999", margin: "20px 0" }} />
    <div style={{ fontSize: 30, lineHeight: 1.2 }}>• Home</div>
    <div style={{ fontSize: 30, lineHeight: 1.2 }}>• About me</div>
    <div style={{ fontSize: 30, lineHeight: 1.2 }}>• Contact</div>
    <div
      style={{
        marginTop: 18,
        width: 230,
        height: 58,
        border: "3px solid #777777",
        background: "#EFEFEF",
        fontSize: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      Submit
    </div>
  </div>
);

/** Modern Arabic website with the Cairo font — the "after". */
export const ElegantSite: React.FC<{ frame?: number }> = ({ frame = 0 }) => {
  const cards = [
    { g: "✍️", t: "خط" },
    { g: "📐", t: "مسافة" },
    { g: "🎯", t: "محاذاة" },
  ];
  return (
    <div
      style={{
        minHeight: 560,
        background:
          "linear-gradient(160deg,#0F1B45 0%,#1E3A8A 55%,#4C1D95 100%)",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
        direction: "rtl",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          top: -120,
          left: -70,
          background:
            "radial-gradient(circle, rgba(255,215,0,0.55), transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* nav */}
      <div
        style={{
          position: "relative",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          background: "rgba(5,10,30,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 900, color: "#FFD700" }}>
          نور
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 24,
            fontWeight: 700,
            color: "#DBEAFE",
          }}
        >
          <span style={{ color: "#FFD700" }}>الرئيسية</span>
          <span>الأقسام</span>
          <span>تواصل</span>
        </div>
      </div>
      {/* hero */}
      <div style={{ position: "relative", padding: "26px 34px 0" }}>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.3,
            textShadow: "0 4px 18px rgba(0,0,0,0.45)",
          }}
        >
          أهلاً بيك في موقعنا ✨
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#C7D2FE",
            marginTop: 8,
            lineHeight: 1.6,
          }}
        >
          خط Cairo بيخلّي المحتوى شيك ومريح للعين
        </div>
        <div
          style={{
            display: "inline-flex",
            marginTop: 16,
            padding: "12px 32px",
            borderRadius: 100,
            background: "linear-gradient(90deg,#FF6B35,#A855F7)",
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 900,
            boxShadow: "0 8px 24px rgba(168,85,247,0.5)",
          }}
        >
          ابدأ الآن
        </div>
      </div>
      {/* cards */}
      <div style={{ display: "flex", gap: 14, padding: "22px 34px 0" }}>
        {cards.map((c) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              borderRadius: 18,
              padding: "16px 14px",
              background: "rgba(255,255,255,0.12)",
              border: "2px solid rgba(255,215,0,0.45)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 6px 22px rgba(255,215,0,0.15)",
            }}
          >
            <div style={{ fontSize: 32 }}>{c.g}</div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {c.t}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: -60,
          bottom: -80,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.5), transparent 70%)",
          filter: "blur(6px)",
          transform: `rotate(${Math.sin(frame / 26) * 6}deg)`,
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Weight slider (100 → 900, thin → thick)                             */
/* ------------------------------------------------------------------ */

const WSTEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export const WeightSlider: React.FC<{ value: number; width: number }> = ({
  value,
  width,
}) => {
  const p = Math.max(0, Math.min(1, (value - 100) / 800));
  const x = 46 + p * (width - 92);
  const near = Math.round(value / 100) * 100;
  return (
    <div style={{ position: "relative", width, height: 210 }}>
      {/* live value bubble */}
      <div
        style={{
          position: "absolute",
          left: x - 95,
          top: -68,
          width: 190,
          boxSizing: "border-box",
          textAlign: "center",
          padding: "10px 0",
          borderRadius: 16,
          background: "rgba(5,10,30,0.95)",
          border: "3px solid #FF6B35",
          color: "#FFFFFF",
          fontFamily: MONO,
          fontSize: 36,
          fontWeight: 900,
          direction: "ltr",
          boxShadow: "0 0 26px rgba(255,107,53,0.5)",
        }}
      >
        {Math.round(value)}
      </div>
      {/* track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 42,
          width,
          height: 48,
          borderRadius: 30,
          background: "#0F172A",
          border: "3px solid rgba(255,255,255,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${p * 100}%`,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.45) 0%, #FF6B35 100%)",
          }}
        />
      </div>
      {/* knob */}
      <div
        style={{
          position: "absolute",
          left: x - 32,
          top: 30,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "7px solid #FF6B35",
          boxShadow: `0 0 ${18 + p * 34}px rgba(255,107,53,0.85), 0 8px 18px rgba(0,0,0,0.5)`,
        }}
      />
      {/* thin → thick samples */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 130,
          width,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {WSTEPS.map((s) => {
          const active = Math.abs(s - near) < 1;
          return (
            <div key={s} style={{ textAlign: "center", opacity: active ? 1 : 0.5 }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 42,
                  lineHeight: 1,
                  fontWeight: s,
                  color: active ? "#FFD700" : "rgba(255,255,255,0.9)",
                }}
              >
                أ
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 20,
                  color: "rgba(255,255,255,0.55)",
                  direction: "ltr",
                  marginTop: 6,
                }}
              >
                {s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Text alignment icons                                                */
/* ------------------------------------------------------------------ */

export type AlignType = "left" | "center" | "right" | "justify";

export const AlignIcon: React.FC<{
  type: AlignType;
  color?: string;
  active?: boolean;
}> = ({ type, color = "#FFD700", active = false }) => {
  const bars = type === "justify" ? [1, 1, 1, 0.55] : [1, 0.6, 0.85, 0.5];
  return (
    <svg width={124} height={96} viewBox="0 0 124 96">
      {bars.map((w, i) => {
        const bw = 110 * w;
        let bx = 7;
        if (type === "center") bx = (124 - bw) / 2;
        if (type === "right") bx = 117 - bw;
        return (
          <rect
            key={i}
            x={bx}
            y={8 + i * 22}
            width={bw}
            height={13}
            rx={6.5}
            fill={active ? color : "rgba(255,255,255,0.78)"}
          />
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Ruler for line-height                                               */
/* ------------------------------------------------------------------ */

export const Ruler: React.FC<{ height: number; label?: string }> = ({
  height,
  label,
}) => (
  <div
    style={{
      width: 66,
      height,
      borderRadius: 16,
      background: "linear-gradient(180deg,#FFF8DC 0%,#FFD700 100%)",
      border: "3px solid #B8860B",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    }}
  >
    {Array.from({ length: 14 }, (_, i) => {
      const y = 10 + (i * (height - 20)) / 13;
      const long = i % 5 === 0;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            right: 0,
            top: y,
            width: long ? 30 : 18,
            height: 3,
            background: "#7A5B00",
            opacity: 0.8,
          }}
        />
      );
    })}
    {label ? (
      <div
        style={{
          position: "absolute",
          left: 6,
          top: height / 2 - 24,
          fontFamily: MONO,
          fontSize: 26,
          fontWeight: 900,
          color: "#5A4100",
          direction: "ltr",
          background: "rgba(255,255,255,0.7)",
          borderRadius: 8,
          padding: "3px 7px",
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);

/* ------------------------------------------------------------------ */
/* Google Fonts badge                                                  */
/* ------------------------------------------------------------------ */

export const GoogleFontsBadge: React.FC<{ style?: CSSProperties }> = ({
  style,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, ...style }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 34px",
        borderRadius: 100,
        background: "#FFFFFF",
        boxShadow:
          "0 16px 44px rgba(0,0,0,0.45), 0 0 40px rgba(66,133,244,0.35)",
      }}
    >
      <svg width={54} height={54} viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 34,
          fontWeight: 700,
          color: "#1F2937",
          direction: "ltr",
        }}
      >
        fonts.google.com
      </div>
    </div>
    <div
      style={{
        padding: "14px 28px",
        borderRadius: 16,
        background:
          "linear-gradient(180deg,#FFE866,#FFD700 60%,#F0A800)",
        color: "#14182E",
        fontFamily: FONT,
        fontSize: 34,
        fontWeight: 900,
        border: "3px solid #FFF3B0",
        transform: "rotate(-8deg)",
        boxShadow: "0 0 40px rgba(255,215,0,0.65)",
        direction: "ltr",
      }}
    >
      FREE
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Unit chip (px / em / rem)                                           */
/* ------------------------------------------------------------------ */

export const UnitChip: React.FC<{
  unit: string;
  desc: string;
  color: string;
}> = ({ unit, desc, color }) => (
  <div
    style={{
      width: 272,
      boxSizing: "border-box",
      padding: "20px 12px",
      borderRadius: 22,
      background: "rgba(5,10,30,0.94)",
      border: `3px solid ${color}`,
      boxShadow: `0 0 30px ${color}55, 0 16px 36px rgba(0,0,0,0.5)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 52,
        fontWeight: 900,
        color,
        direction: "ltr",
      }}
    >
      {unit}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontSize: 25,
        fontWeight: 700,
        color: "rgba(255,255,255,0.85)",
        whiteSpace: "nowrap",
      }}
    >
      {desc}
    </div>
  </div>
);
