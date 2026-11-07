import React from "react";
import type { CSSProperties } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { MONO } from "../vscode/theme";
import { clamp } from "./parts";

/* ------------------------------------------------------------------ */
/* Presenter — friendly flat male character                            */
/* ------------------------------------------------------------------ */

const SKIN = "#E3AC7E";
const SKIN_SH = "#CB8F62";
const HAIR = "#241C17";

export type Pose = "point" | "three" | "lean";

const Arm: React.FC<{ d: string }> = ({ d }) => (
  <path d={d} stroke="#3B82F6" strokeWidth="62" strokeLinecap="round" fill="none" />
);

const PointHand: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x="8" y="-8" width="24" height="26" rx="12" fill={SKIN_SH} />
    <circle cx="0" cy="16" r="31" fill={SKIN} />
    <rect x="-12" y="-60" width="25" height="74" rx="12.5" fill={SKIN} />
  </g>
);

const DownHand: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="8" y="-20" width="24" height="26" rx="12" fill={SKIN_SH} />
    <circle cx="0" cy="-16" r="31" fill={SKIN} />
    <rect x="-12" y="-12" width="25" height="76" rx="12.5" fill={SKIN} />
  </g>
);

const ThreeHand: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="-60" y="8" width="26" height="50" rx="13" fill={SKIN_SH} transform="rotate(-22 -47 33)" />
    <rect x="-40" y="-4" width="80" height="92" rx="32" fill={SKIN} />
    <rect x="-36" y="-68" width="22" height="72" rx="11" fill={SKIN} />
    <rect x="-11" y="-80" width="22" height="84" rx="11" fill={SKIN} />
    <rect x="14" y="-70" width="22" height="74" rx="11" fill={SKIN} />
  </g>
);

export const Presenter: React.FC<{
  pose: Pose;
  width?: number;
  style?: CSSProperties;
}> = ({ pose, width = 440, style }) => {
  const gid = `hood-${pose}`;
  const arm =
    pose === "point"
      ? "M150 512 C106 456 92 384 100 320"
      : pose === "three"
        ? "M332 496 C384 436 396 352 380 292"
        : "M150 524 C120 574 122 614 132 648";
  return (
    <svg
      width={width}
      viewBox="0 0 480 680"
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* neck (behind body) */}
      <rect x="206" y="316" width="68" height="130" rx="30" fill={SKIN_SH} />

      {/* body / hoodie */}
      <path
        d="M54 680 L54 558 C54 482 116 430 192 412 L288 412 C364 430 426 482 426 558 L426 680 Z"
        fill={`url(#${gid})`}
      />
      <ellipse cx="240" cy="414" rx="118" ry="46" fill="#2A5CB0" />
      <ellipse cx="240" cy="400" rx="98" ry="34" fill={`url(#${gid})`} />
      <path d="M214 430 L206 512" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <path d="M266 430 L276 508" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
      <circle cx="206" cy="518" r="9" fill="#E5E7EB" />
      <circle cx="276" cy="514" r="9" fill="#E5E7EB" />
      <rect
        x="150"
        y="566"
        width="180"
        height="72"
        rx="26"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="6"
      />

      {/* arm + hand */}
      <Arm d={arm} />
      {pose === "point" ? <PointHand x={100} y={306} rot={-10} /> : null}
      {pose === "three" ? <ThreeHand x={378} y={274} /> : null}
      {pose === "lean" ? <DownHand x={132} y={648} /> : null}

      {/* ears */}
      <ellipse cx="128" cy="250" rx="19" ry="27" fill={SKIN_SH} />
      <ellipse cx="352" cy="250" rx="19" ry="27" fill={SKIN_SH} />
      {/* head */}
      <ellipse cx="240" cy="238" rx="112" ry="124" fill={SKIN} />
      {/* short trimmed beard along the jaw */}
      <path
        d="M132 252 C132 326 176 380 240 380 C304 380 348 326 348 252 C348 302 318 346 240 346 C162 346 132 302 132 252 Z"
        fill="#2A211A"
        opacity="0.4"
      />
      <rect x="214" y="286" width="52" height="12" rx="6" fill="#2A211A" opacity="0.5" />
      {/* hair */}
      <path
        d="M126 246 C126 138 172 88 240 88 C308 88 354 138 354 246 C354 246 340 196 300 180 C258 164 198 170 166 196 C140 216 126 246 126 246 Z"
        fill={HAIR}
      />
      {/* brows */}
      <rect x="176" y="212" width="46" height="11" rx="5.5" fill={HAIR} transform="rotate(-4 199 217)" />
      <rect x="258" y="208" width="46" height="11" rx="5.5" fill={HAIR} transform="rotate(5 281 213)" />
      {/* eyes */}
      <ellipse cx="199" cy="250" rx="21" ry="17" fill="#FFFFFF" />
      <ellipse cx="281" cy="250" rx="21" ry="17" fill="#FFFFFF" />
      <circle cx="202" cy="252" r="9" fill="#2A2118" />
      <circle cx="284" cy="252" r="9" fill="#2A2118" />
      <circle cx="206" cy="248" r="3.4" fill="#FFFFFF" />
      <circle cx="288" cy="248" r="3.4" fill="#FFFFFF" />
      {/* nose */}
      <path d="M240 258 q11 28 -7 36" stroke={SKIN_SH} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* smile */}
      <path d="M204 306 Q240 344 276 306 Q240 320 204 306 Z" fill="#5C2E1E" />
      <path d="M209 308 Q240 320 271 308 L271 313 Q240 325 209 313 Z" fill="#FFFFFF" />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* PhotoArt — a stylised "beautiful photo" for the img preview         */
/* ------------------------------------------------------------------ */

export const PhotoArt: React.FC<{ style?: CSSProperties }> = ({ style }) => (
  <svg viewBox="0 0 600 380" style={{ display: "block", width: "100%", ...style }}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7C3AED" />
        <stop offset="0.45" stopColor="#FF6B9A" />
        <stop offset="1" stopColor="#FFB36B" />
      </linearGradient>
      <radialGradient id="sun">
        <stop offset="0" stopColor="#FFF3C4" />
        <stop offset="0.6" stopColor="#FFD166" />
        <stop offset="1" stopColor="#FF9E5E" />
      </radialGradient>
      <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5B3A94" />
        <stop offset="1" stopColor="#241B4D" />
      </linearGradient>
    </defs>
    <rect width="600" height="380" fill="url(#sky)" />
    <circle cx="300" cy="214" r="78" fill="url(#sun)" />
    <circle cx="300" cy="214" r="104" fill="#FFD166" opacity="0.28" />
    {/* far mountains */}
    <path d="M0 250 L120 168 L210 250 Z" fill="#6D3AA8" opacity="0.75" />
    <path d="M150 250 L280 140 L410 250 Z" fill="#5A2F92" opacity="0.85" />
    <path d="M340 250 L470 158 L600 250 Z" fill="#6D3AA8" opacity="0.75" />
    {/* near ridge */}
    <path d="M0 250 L90 200 L200 250 L320 196 L440 250 L540 210 L600 250 L600 258 L0 258 Z" fill="#3A2168" />
    {/* water */}
    <rect y="258" width="600" height="122" fill="url(#water)" />
    <ellipse cx="300" cy="266" rx="86" ry="14" fill="#FFD166" opacity="0.5" />
    {[286, 300, 316, 332, 348].map((y, i) => (
      <rect key={i} x={300 - (30 + i * 12)} y={y} width={60 + i * 24} height="5" rx="2.5" fill="#FFE7A8" opacity={0.4 - i * 0.06} />
    ))}
    {/* birds */}
    <path d="M96 96 q14 -12 28 0 q14 -12 28 0" stroke="#2A1B4D" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M456 74 q11 -9 22 0 q11 -9 22 0" stroke="#2A1B4D" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Waveform — animated equaliser bars                                  */
/* ------------------------------------------------------------------ */

export const Waveform: React.FC<{
  bars?: number;
  width?: number;
  height?: number;
  color?: string;
  seed?: number;
}> = ({ bars = 28, width = 480, height = 120, color = "#22D3EE", seed = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const gap = 6;
  const bw = (width - gap * (bars - 1)) / bars;
  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      {Array.from({ length: bars }, (_, i) => {
        const h =
          height *
          (0.22 +
            0.5 *
              Math.abs(
                Math.sin(t * (2.4 + (i % 5) * 0.5) + i * 0.7 + seed) *
                  Math.cos(t * 1.3 + i * 0.3),
              ) +
            0.14 * Math.abs(Math.sin(t * 4 + i)));
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={(height - h) / 2}
            width={bw}
            height={h}
            rx={bw / 2}
            fill={color}
            opacity={0.65 + 0.35 * Math.abs(Math.sin(t * 3 + i * 0.5))}
          />
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* VideoPlayerArt — a playing, looping, muted video with controls      */
/* ------------------------------------------------------------------ */

export const VideoPlayerArt: React.FC<{
  width: number;
  badges?: { icon: string; color: string }[];
}> = ({ width, badges = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const h = width * 9 / 16;
  const barH = 74;
  // progress loops every ~4s to suggest autoplay + loop
  const prog = ((t % 4) / 4);
  const fmt = (s: number) => `0:0${Math.floor(s)}`;

  return (
    <div
      style={{
        position: "relative",
        width,
        height: h,
        borderRadius: 22,
        background: "#070B18",
        border: "3px solid rgba(125,211,252,0.5)",
        boxShadow: "0 26px 70px rgba(0,0,0,0.6), 0 0 60px rgba(59,130,246,0.3)",
        overflow: "hidden",
        direction: "ltr",
      }}
    >
      {/* "video content": drifting light blobs */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg,#0B1020,#1B1140)" }} />
      {[
        { c: "#22D3EE", r: width * 0.5, sx: 0.25, sy: 0.5, sp: 0.7 },
        { c: "#A855F7", r: width * 0.45, sx: 0.7, sy: 0.4, sp: 1.1 },
        { c: "#FFD700", r: width * 0.32, sx: 0.5, sy: 0.65, sp: 0.9 },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: width * b.sx + Math.sin(t * b.sp + i * 2) * width * 0.14 - b.r / 2,
            top: h * b.sy + Math.cos(t * b.sp * 0.8 + i) * h * 0.16 - b.r / 2,
            width: b.r,
            height: b.r,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.c} 0%, transparent 68%)`,
            opacity: 0.55,
            filter: "blur(6px)",
          }}
        />
      ))}
      {/* soft scan sheen */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: barH,
          left: `${(t * 60) % 160 - 30}%`,
          width: 180,
          transform: "skewX(-16deg)",
          background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent)",
        }}
      />
      {/* faint play glyph to signal playback */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: h * 0.2,
          color: "rgba(255,255,255,0.16)",
        }}
      >
        ▶
      </div>

      {/* corner badges */}
      {badges.map((b, i) => {
        const pos = [
          { top: 16, left: 16 },
          { top: 16, right: 16 },
          { bottom: barH + 16, left: 16 },
          { bottom: barH + 16, right: 16 },
        ][i % 4];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              fontSize: width * 0.075,
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.7))",
            }}
          >
            <span
              style={{
                padding: "6px 14px",
                borderRadius: 100,
                background: "rgba(6,10,30,0.82)",
                border: `2px solid ${b.color}`,
                boxShadow: `0 0 20px ${b.color}88`,
              }}
            >
              {b.icon}
            </span>
          </div>
        );
      })}

      {/* control bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: barH,
          background: "linear-gradient(180deg, rgba(4,7,16,0.2), rgba(4,7,16,0.92))",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 22px",
        }}
      >
        <span style={{ color: "#fff", fontSize: 30 }}>⏸</span>
        <span style={{ color: "#fff", fontSize: 24, opacity: 0.8 }}>⏮</span>
        <span style={{ color: "#fff", fontSize: 24, opacity: 0.8 }}>⏭</span>
        <div style={{ flex: 1, height: 10, borderRadius: 10, background: "rgba(255,255,255,0.25)", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${prog * 100}%`,
              borderRadius: 10,
              background: "linear-gradient(90deg,#22D3EE,#A855F7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${prog * 100}%`,
              top: -7,
              width: 24,
              height: 24,
              marginLeft: -12,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 14px rgba(255,255,255,0.9)",
            }}
          />
        </div>
        <span style={{ color: "#fff", fontFamily: MONO, fontSize: 22, opacity: 0.9 }}>
          {fmt(prog * 4)}/0:04
        </span>
        <span style={{ color: "#fff", fontSize: 26, opacity: 0.85 }}>🔊</span>
        <span style={{ color: "#fff", fontSize: 24, opacity: 0.85 }}>⛶</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* AudioPlayerArt — play/pause + waveform + progress                  */
/* ------------------------------------------------------------------ */

export const AudioPlayerArt: React.FC<{ width: number }> = ({ width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const h = 168;
  const prog = interpolate(frame, [0, 240], [0, 1], clamp) * 0.7 + 0.02;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: 24,
        background: "linear-gradient(120deg, rgba(12,16,38,0.96), rgba(30,20,70,0.96))",
        border: "3px solid rgba(168,85,247,0.55)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 54px rgba(168,85,247,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "0 30px",
        direction: "ltr",
        position: "relative",
      }}
    >
      {/* play / pause */}
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(140deg,#22D3EE,#A855F7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 42,
          boxShadow: `0 0 ${26 + 14 * Math.abs(Math.sin(t * 3))}px rgba(34,211,238,0.8)`,
        }}
      >
        ⏸
      </div>
      {/* waveform */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Waveform bars={26} width={width - 92 - 30 * 2 - 24 - 150} height={92} color="#A855F7" seed={2} />
        {/* progress line */}
        <div style={{ marginTop: 12, height: 8, borderRadius: 8, background: "rgba(255,255,255,0.18)", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${prog * 100}%`,
              borderRadius: 8,
              background: "linear-gradient(90deg,#22D3EE,#A855F7,#FFD700)",
            }}
          />
        </div>
      </div>
      <span style={{ color: "#fff", fontFamily: MONO, fontSize: 30, opacity: 0.9, width: 120, textAlign: "right" }}>
        2:14
      </span>
    </div>
  );
};
