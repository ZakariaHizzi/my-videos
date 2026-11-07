import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { rand } from "../vscode/theme";

/* ------------------------------------------------------------------ */
/* Browser logos                                                       */
/* ------------------------------------------------------------------ */

const pt = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180;
  return [100 + r * Math.cos(rad), 100 + r * Math.sin(rad)] as const;
};

const slice = (a1: number, a2: number, r = 88) => {
  const [x1, y1] = pt(a1, r);
  const [x2, y2] = pt(a2, r);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M100 100 L${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
};

export const ChromeLogo: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <path d={slice(181.5, 298.5)} fill="#EA4335" />
    <path d={slice(301.5, 418.5)} fill="#FBBC05" />
    <path d={slice(61.5, 178.5)} fill="#34A853" />
    <circle cx={100} cy={100} r={42} fill="#FFFFFF" />
    <circle cx={100} cy={100} r={33} fill="#4285F4" />
  </svg>
);

export const FirefoxLogo: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <defs>
      <radialGradient id="ffGlobe" cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#8E5BFF" />
        <stop offset="55%" stopColor="#3E7BFA" />
        <stop offset="100%" stopColor="#1B3FA8" />
      </radialGradient>
      <linearGradient id="ffFox" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#FFD24A" />
        <stop offset="45%" stopColor="#FF8A1E" />
        <stop offset="100%" stopColor="#F4400A" />
      </linearGradient>
    </defs>
    <circle cx={100} cy={100} r={66} fill="url(#ffGlobe)" />
    <path
      d={`M${pt(214, 95)[0]} ${pt(214, 95)[1]}
          A95 95 0 0 1 ${pt(36, 95)[0]} ${pt(36, 95)[1]}
          L${pt(36, 54)[0]} ${pt(36, 54)[1]}
          A74 74 0 0 0 ${pt(214, 84)[0]} ${pt(214, 84)[1]} Z`}
      fill="url(#ffFox)"
    />
    <path
      d={`M${pt(214, 84)[0]} ${pt(214, 84)[1]} A74 74 0 0 1 ${pt(36, 54)[0]} ${pt(36, 54)[1]}`}
      fill="none"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth={4}
    />
  </svg>
);

export const EdgeLogo: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <defs>
      <linearGradient id="edgeGrad" x1="0%" y1="20%" x2="100%" y2="90%">
        <stop offset="0%" stopColor="#0B4E9E" />
        <stop offset="45%" stopColor="#1C9EF0" />
        <stop offset="100%" stopColor="#2FE0B0" />
      </linearGradient>
    </defs>
    <path
      d="M172 66 C154 36 116 24 82 40 C44 58 26 96 36 132 C46 168 80 194 122 192
         C158 190 184 170 194 142 C182 160 162 170 142 168 C104 164 80 138 80 106
         C80 78 98 56 124 48 C142 42 160 48 172 66 Z"
      fill="url(#edgeGrad)"
    />
    <path
      d="M172 66 C154 36 116 24 82 40 C60 50 44 66 36 86 C60 62 96 52 128 62 C150 69 165 84 172 102 C176 88 176 76 172 66 Z"
      fill="rgba(255,255,255,0.22)"
    />
  </svg>
);

export const SafariLogo: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <defs>
      <linearGradient id="safGrad" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="55%" stopColor="#1E90F0" />
        <stop offset="100%" stopColor="#0B63C5" />
      </linearGradient>
    </defs>
    <circle cx={100} cy={100} r={88} fill="url(#safGrad)" />
    <circle cx={100} cy={100} r={80} fill="none" stroke="#FFFFFF" strokeWidth={5} opacity={0.9} />
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i * 360) / 24;
      const [x1, y1] = pt(a, 66);
      const [x2, y2] = pt(a, 76);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#FFFFFF"
          strokeWidth={i % 6 === 0 ? 5 : 2.5}
          opacity={0.75}
        />
      );
    })}
    <g transform="rotate(45 100 100)">
      <path d="M100 26 L113 100 L87 100 Z" fill="#FF4B4B" />
      <path d="M100 174 L113 100 L87 100 Z" fill="#FFFFFF" />
    </g>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Translator icons                                                    */
/* ------------------------------------------------------------------ */

export const BuildingIcon: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <defs>
      <linearGradient id="bldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF7A45" />
        <stop offset="100%" stopColor="#D93A18" />
      </linearGradient>
    </defs>
    <rect x={34} y={62} width={132} height={124} rx={12} fill="url(#bldGrad)" />
    <rect x={54} y={30} width={70} height={40} rx={9} fill="#FF9A6B" />
    <rect x={128} y={46} width={38} height={24} rx={7} fill="#FF9A6B" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <rect
          key={`${r}-${c}`}
          x={52 + c * 42}
          y={84 + r * 34}
          width={30}
          height={22}
          rx={5}
          fill="#FFF3E6"
          opacity={0.92}
        />
      )),
    )}
    <rect x={84} y={150} width={34} height={36} rx={6} fill="#1E293B" />
  </svg>
);

export const PaletteIcon: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <path
      d="M100 18 C48 18 18 54 18 100 C18 146 54 180 96 180 C114 180 122 170 120 157
         C118 144 127 136 139 136 L156 136 C176 136 184 120 184 100 C184 54 152 18 100 18 Z"
      fill="#F1F5FF"
      stroke="#264DE4"
      strokeWidth={9}
    />
    <circle cx={64} cy={70} r={15} fill="#E44D26" />
    <circle cx={110} cy={52} r={15} fill="#FBBC05" />
    <circle cx={150} cy={84} r={15} fill="#34A853" />
    <circle cx={66} cy={124} r={15} fill="#264DE4" />
  </svg>
);

export const BoltIcon: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
    <path
      d="M122 10 L40 112 L92 112 L74 192 L162 84 L108 84 Z"
      fill="#F7DF1E"
      stroke="#1B1B1B"
      strokeWidth={9}
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Small effects                                                       */
/* ------------------------------------------------------------------ */

/** Deterministic twinkling dot field. */
export const Twinkles: React.FC<{
  count?: number;
  seed?: number;
  colors?: string[];
  box?: { x: number; y: number; w: number; h: number };
}> = ({ count = 22, seed = 0, colors = ["#FFD700", "#22D3EE", "#A855F7"], box }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const b = box ?? { x: 40, y: 120, w: 1000, h: 1700 };
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const k = i + seed * 31;
        const size = 8 + rand(k * 2.9) * 16;
        const tw = 0.22 + 0.78 * Math.abs(Math.sin(t * 2.5 + i * 0.8));
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x + rand(k * 4.7) * b.w,
              top: b.y + rand(k * 8.3) * b.h + Math.sin(t * 1.2 + i) * 20,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity: tw * 0.8,
              boxShadow: `0 0 ${size * 2.6}px ${c}`,
            }}
          />
        );
      })}
    </>
  );
};
