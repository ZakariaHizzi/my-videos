import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT } from "../vscode/theme";
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
/* Color helpers                                                       */
/* ------------------------------------------------------------------ */

export const hslToHex = (h: number, s: number, l: number): string => {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) =>
    lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
};

/* ------------------------------------------------------------------ */
/* Presenter (cartoon host)                                            */
/* ------------------------------------------------------------------ */

export const Presenter: React.FC<{
  tilt?: number;
  brow?: number;
  smile?: number;
  point?: number;
  style?: CSSProperties;
}> = ({ tilt = 0, brow = 0, smile = 0, point = 0, style }) => {
  const frame = useCurrentFrame();
  const blink = frame % 88 < 5 ? 0.12 : 1;
  const eye = (cx: number) =>
    `translate(${cx} 300) scale(1 ${blink}) translate(${-cx} -300)`;

  return (
    <svg
      viewBox="0 0 440 700"
      style={{ width: "100%", height: "auto", display: "block", overflow: "visible", ...style }}
    >
      <defs>
        <linearGradient id="pc-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="pc-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8B48C" />
          <stop offset="1" stopColor="#D29366" />
        </linearGradient>
        <clipPath id="pc-face">
          <ellipse cx="220" cy="305" rx="98" ry="108" />
        </clipPath>
      </defs>

      {/* torso */}
      <path
        d="M25 700 C25 585 95 515 180 495 L260 495 C345 515 415 585 415 700 Z"
        fill="url(#pc-shirt)"
      />
      <path d="M180 495 L220 560 L260 495 Z" fill="#60A5FA" />
      {/* neck */}
      <rect x="194" y="415" width="52" height="95" rx="20" fill="#C08558" />

      <g transform={`rotate(${tilt} 220 430)`}>
        {/* hair back */}
        <ellipse cx="220" cy="292" rx="112" ry="122" fill="#241611" />
        {/* ears */}
        <ellipse cx="116" cy="312" rx="17" ry="26" fill="#E0A97E" />
        <ellipse cx="324" cy="312" rx="17" ry="26" fill="#E0A97E" />
        {/* face */}
        <ellipse cx="220" cy="305" rx="98" ry="108" fill="url(#pc-skin)" />
        {/* beard + mustache (clipped to face) */}
        <g clipPath="url(#pc-face)">
          <ellipse cx="220" cy="430" rx="110" ry="80" fill="#2A1A12" />
          <ellipse cx="220" cy="362" rx="46" ry="14" fill="#2A1A12" />
        </g>
        {/* mouth */}
        <path
          d="M186 374 Q220 400 254 374"
          fill="none"
          stroke="#FFF6F2"
          strokeWidth="9"
          strokeLinecap="round"
          opacity={1 - smile * 0.35}
        />
        {smile > 0.02 ? (
          <g opacity={smile}>
            <path d="M186 372 Q220 414 254 372 Z" fill="#7A2E2E" />
            <path
              d="M190 373 Q220 383 250 373"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>
        ) : null}
        {/* nose */}
        <path
          d="M222 316 C216 334 214 344 226 350"
          fill="none"
          stroke="#C08558"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* eyes */}
        <g transform={eye(186)}>
          <ellipse cx="186" cy="300" rx="21" ry="16" fill="#FFFFFF" />
          <circle cx="188" cy="301" r="9.5" fill="#2A1A12" />
          <circle cx="191" cy="297" r="3.4" fill="#FFFFFF" />
        </g>
        <g transform={eye(254)}>
          <ellipse cx="254" cy="300" rx="21" ry="16" fill="#FFFFFF" />
          <circle cx="256" cy="301" r="9.5" fill="#2A1A12" />
          <circle cx="259" cy="297" r="3.4" fill="#FFFFFF" />
        </g>
        {/* brows */}
        <g transform={`translate(0 ${-brow * 12})`}>
          <path
            d="M162 268 Q186 256 210 266"
            fill="none"
            stroke="#241611"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M230 266 Q254 258 278 270"
          fill="none"
          stroke="#241611"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* hair fringe */}
        <path
          d="M120 310 C114 218 158 166 220 166 C284 166 326 218 320 310 C312 254 296 230 266 220 C238 211 198 213 170 228 C144 242 126 272 120 310 Z"
          fill="#241611"
        />
      </g>

      {/* pointing arm */}
      {point > 0.01 ? (
        <g opacity={point}>
          <path
            d="M340 540 C392 566 412 618 404 676"
            fill="none"
            stroke="url(#pc-shirt)"
            strokeWidth="70"
            strokeLinecap="round"
          />
          <circle cx="404" cy="678" r="30" fill="#E0A97E" />
          <rect x="392" y="676" width="24" height="66" rx="12" fill="#E0A97E" />
        </g>
      ) : null}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Color wheel picker                                                  */
/* ------------------------------------------------------------------ */

const MouseCursor: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      left: x,
      top: y,
      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.65))",
      pointerEvents: "none",
    }}
  >
    <path
      d="M4 2 L4 19 L8.5 15 L11.5 21.5 L14.5 20 L11.5 13.5 L17.5 13 Z"
      fill="#FFFFFF"
      stroke="#0F172A"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const ColorWheel: React.FC<{
  size: number;
  angle: number;
  showCursor?: boolean;
  style?: CSSProperties;
}> = ({ size, angle, showCursor = true, style }) => {
  const r = size / 2;
  const rad = (angle * Math.PI) / 180;
  const kx = r + Math.cos(rad) * (r * 0.76);
  const ky = r + Math.sin(rad) * (r * 0.76);
  const color = hslToHex(((angle % 360) + 360) % 360, 100, 50);
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "conic-gradient(from 90deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
          boxShadow: `0 0 60px ${color}66, 0 20px 50px rgba(0,0,0,0.55)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: size * 0.15,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FFFFFF 0%, #FFFFFF 40%, rgba(255,255,255,0.85) 64%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: kx - 26,
          top: ky - 26,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: color,
          border: "6px solid #FFFFFF",
          boxShadow: `0 0 26px ${color}, 0 6px 16px rgba(0,0,0,0.5)`,
        }}
      />
      {showCursor ? <MouseCursor x={kx + 24} y={ky + 22} /> : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Opacity slider                                                      */
/* ------------------------------------------------------------------ */

export const OpacitySlider: React.FC<{
  value: number;
  width: number;
  showValue?: boolean;
  style?: CSSProperties;
}> = ({ value, width, showValue = true, style }) => {
  const x = value * (width - 56) + 28;
  return (
    <div style={{ position: "relative", width, height: 120, ...style }}>
      {showValue ? (
        <div
          style={{
            position: "absolute",
            left: x - 90,
            top: -66,
            width: 180,
            textAlign: "center",
            padding: "8px 0",
            borderRadius: 14,
            background: "rgba(5,10,30,0.95)",
            border: "3px solid #22D3EE",
            color: "#FFFFFF",
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 900,
            direction: "ltr",
            boxShadow: "0 0 26px rgba(34,211,238,0.45)",
          }}
        >
          opacity: {value.toFixed(2)}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 34,
          width,
          height: 52,
          borderRadius: 30,
          background: "#0F172A",
          border: "3px solid rgba(255,255,255,0.28)",
          overflow: "hidden",
          boxShadow: "0 12px 34px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "repeating-conic-gradient(#CBD5E1 0% 25%, #FFFFFF 0% 50%) 0 0 / 52px 52px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,1) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: x - 30,
          top: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "7px solid #22D3EE",
          boxShadow: `0 0 ${20 + value * 26}px rgba(34,211,238,0.8), 0 8px 18px rgba(0,0,0,0.5)`,
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero "photo" used for background-image                              */
/* ------------------------------------------------------------------ */

export const HeroArt: React.FC<{ style?: CSSProperties }> = ({ style }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    style={{ width: "100%", height: "100%", display: "block", ...style }}
  >
    <defs>
      <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#312E81" />
        <stop offset="38%" stopColor="#7C3AED" />
        <stop offset="66%" stopColor="#EC4899" />
        <stop offset="86%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
      <linearGradient id="hero-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#0B1026" />
      </linearGradient>
      <radialGradient id="hero-sun">
        <stop offset="0%" stopColor="#FFFDE7" />
        <stop offset="55%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1600" height="700" fill="url(#hero-sky)" />
    <circle cx="820" cy="640" r="230" fill="url(#hero-sun)" />
    <circle cx="820" cy="640" r="96" fill="#FFF7C2" />
    {/* clouds */}
    <g fill="#FDBA74" opacity="0.55">
      <ellipse cx="330" cy="250" rx="150" ry="42" />
      <ellipse cx="430" cy="220" rx="100" ry="34" />
      <ellipse cx="1260" cy="330" rx="170" ry="46" />
      <ellipse cx="1150" cy="300" rx="96" ry="30" />
    </g>
    {/* far mountains */}
    <path d="M0 700 L240 470 L420 640 L640 430 L860 700 Z" fill="#4C1D95" opacity="0.85" />
    <path d="M760 700 L980 460 L1160 630 L1380 440 L1600 700 Z" fill="#5B21B6" opacity="0.8" />
    {/* near mountains */}
    <path d="M0 700 L180 560 L360 690 L520 540 L740 700 Z" fill="#312E81" />
    <path d="M880 700 L1080 545 L1260 690 L1440 560 L1600 700 Z" fill="#2A2560" />
    {/* water */}
    <rect y="700" width="1600" height="200" fill="url(#hero-water)" />
    <g fill="#FDE047" opacity="0.5">
      <rect x="740" y="720" width="160" height="14" rx="7" />
      <rect x="770" y="756" width="100" height="12" rx="6" />
      <rect x="745" y="792" width="150" height="11" rx="6" />
      <rect x="785" y="828" width="70" height="9" rx="5" />
    </g>
    {/* birds */}
    <g stroke="#1F2937" strokeWidth="7" fill="none" strokeLinecap="round">
      <path d="M480 350 q22 -20 44 0 q22 -20 44 0" />
      <path d="M600 300 q16 -14 32 0 q16 -14 32 0" />
    </g>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Mini websites for the hook scene                                    */
/* ------------------------------------------------------------------ */

export const PlainSite: React.FC = () => (
  <div
    style={{
      minHeight: 640,
      padding: "34px 40px",
      background: "#FFFFFF",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000000",
      direction: "ltr",
      textAlign: "left",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.15 }}>
      Welcome to my site
    </div>
    <div style={{ fontSize: 30, marginTop: 16, lineHeight: 1.5 }}>
      This is my first website. I am learning HTML.
    </div>
    <div
      style={{
        fontSize: 28,
        color: "#0000EE",
        textDecoration: "underline",
        marginTop: 16,
      }}
    >
      Click here
    </div>
    <div style={{ height: 3, background: "#999999", margin: "24px 0" }} />
    <div style={{ fontSize: 30, lineHeight: 1.9 }}>• Home</div>
    <div style={{ fontSize: 30, lineHeight: 1.9 }}>• About me</div>
    <div style={{ fontSize: 30, lineHeight: 1.9 }}>• Contact</div>
    <div
      style={{
        marginTop: 24,
        width: 240,
        height: 60,
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

export const ColorSite: React.FC<{ frame?: number }> = ({ frame = 0 }) => {
  const cards = [
    { g: "⚡", c: "#FF6B35", t: "سرعة" },
    { g: "🎨", c: "#A855F7", t: "تصميم" },
    { g: "✨", c: "#22D3EE", t: "إبداع" },
  ];
  return (
    <div
      style={{
        minHeight: 640,
        background: "linear-gradient(160deg,#101A44 0%,#1E3A8A 48%,#4C1D95 100%)",
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
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(255,107,53,0.6),transparent 68%)",
          top: -110,
          left: -60,
          filter: "blur(14px)",
        }}
      />
      <div
        style={{
          height: 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          background: "rgba(5,10,30,0.4)",
          borderBottom: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 900, color: "#FFD700" }}>NOVA</div>
        <div style={{ display: "flex", gap: 26, fontSize: 24, fontWeight: 800, color: "#DBEAFE" }}>
          <span style={{ color: "#FFD700" }}>الرئيسية</span>
          <span>خدماتنا</span>
          <span>تواصل</span>
        </div>
      </div>
      <div style={{ padding: "26px 34px 0", display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#FFFFFF",
              textShadow: "0 4px 18px rgba(0,0,0,0.4)",
              lineHeight: 1.25,
            }}
          >
            مرحباً بك 👋
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#C7D2FE", marginTop: 8 }}>
            موقعك صار له روح وشكل!
          </div>
          <div
            style={{
              display: "inline-flex",
              marginTop: 18,
              padding: "12px 34px",
              borderRadius: 100,
              background: "linear-gradient(90deg,#FF6B35,#A855F7)",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 900,
              boxShadow: "0 8px 24px rgba(168,85,247,0.5)",
            }}
          >
            ابدأ الآن
          </div>
        </div>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 32,
            background: "linear-gradient(145deg,#FF6B35,#A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 62,
            boxShadow: "0 14px 38px rgba(255,107,53,0.5)",
            transform: `rotate(${Math.sin(frame / 20) * 3}deg)`,
          }}
        >
          {"</>"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, padding: "24px 30px 0" }}>
        {cards.map((c) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              borderRadius: 18,
              padding: "18px 14px",
              background: "rgba(255,255,255,0.12)",
              border: `2px solid ${c.c}77`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: `0 6px 22px ${c.c}33`,
            }}
          >
            <div style={{ fontSize: 34 }}>{c.g}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", whiteSpace: "nowrap" }}>
              {c.t}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
