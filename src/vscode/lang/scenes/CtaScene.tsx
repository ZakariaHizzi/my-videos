import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp, pop, rand } from "../../theme";
import { ClickRipple, MouseCursor } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const BTN = { x: 160, y: 1060, w: 760, h: 184 };
const BTN_CX = BTN.x + BTN.w / 2;
const BTN_CY = BTN.y + BTN.h / 2;
const CLICK = 58;
const SUCCESS = 62;

const PersonPlus: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <circle cx="9" cy="7.5" r="4.2" fill="currentColor" />
    <path
      d="M1.6 20.4c0-4.1 3.3-7 7.4-7s7.4 2.9 7.4 7"
      fill="currentColor"
    />
    <path
      d="M19 8.5v6M16 11.5h6"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  </svg>
);

const Check: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path
      d="M4 12.6 L9.4 18 L20 6.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 42.3-45.3s: closing call to action — a follow button the cursor clicks. */
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const line1 = fadeUp(frame, 2, 18);
  const line2 = pop(frame, fps, 38);
  const btn = pop(frame, fps, 18);
  const pulse = 0.55 + 0.45 * Math.sin(t * 6.2);
  const shine = interpolate(frame, [20, 94], [-40, 140], clamp);

  const switched = frame >= SUCCESS;
  const shake = switched
    ? Math.sin((frame - SUCCESS) * 0.9) * 14 * Math.exp(-(frame - SUCCESS) / 9)
    : 0;

  const press = interpolate(frame, [CLICK, CLICK + 5, CLICK + 12], [1, 0.93, 1], clamp);

  const cursorIn = interpolate(frame, [30, 56], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cx = interpolate(cursorIn, [0, 1], [980, BTN_CX - 26]);
  const cy = interpolate(cursorIn, [0, 1], [1880, BTN_CY - 26]);

  const sparks = Array.from({ length: 20 }, (_, i) => ({
    x: rand(i * 6.1) * 1040,
    y: 1920 - ((t * (150 + rand(i) * 160) + rand(i * 3.7) * 1700) % 1720),
    size: 8 + rand(i * 2.3) * 14,
    c: i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.purple : COLORS.cyan,
    o: 0.18 + rand(i * 5.5) * 0.55,
  }));

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* halo behind the copy */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 760,
          width: 1400,
          height: 1100,
          translate: "-50% -50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(37,99,235,0.2) 45%, transparent 72%)",
        }}
      />

      {sparks.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.c,
            opacity: s.o,
            boxShadow: `0 0 ${s.size * 2.4}px ${s.c}`,
            zIndex: 3,
          }}
        />
      ))}

      {/* copy */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 60,
          right: 60,
          zIndex: 20,
          opacity: line1.opacity,
          transform: line1.translate,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "rgba(255,255,255,0.95)",
            lineHeight: 1.45,
            textShadow: "0 10px 36px rgba(0,0,0,0.6)",
          }}
        >
          إن كنت مهتم بمفاهيم البرمجة
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 690,
          left: 40,
          right: 40,
          zIndex: 20,
          opacity: Math.min(1, line2),
          transform: `scale(${0.6 + 0.4 * line2}) translateY(${(1 - line2) * 40}px)`,
        }}
      >
        <div
          style={{
            fontSize: 138,
            fontWeight: 900,
            lineHeight: 1.2,
            backgroundImage: switched
              ? "linear-gradient(105deg,#86EFAC 0%,#4ADE80 45%,#16A34A 100%)"
              : "linear-gradient(105deg,#22D3EE 0%,#A855F7 48%,#FFD700 100%)",
            backgroundSize: "220% 100%",
            backgroundPosition: `${shine}% 0`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 ${
              20 + pulse * 36
            }px ${switched ? "rgba(74,222,128,0.75)" : "rgba(168,85,247,0.75)"}) drop-shadow(0 14px 40px rgba(0,0,0,0.5))`,
          }}
        >
          تابعني
        </div>
      </div>

      {/* glow burst behind the button */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: BTN_CY + 120,
          width: 1500,
          height: 1100,
          translate: "-50% -50%",
          background: switched
            ? "radial-gradient(ellipse, rgba(74,222,128,0.4) 0%, rgba(34,197,94,0.18) 45%, transparent 72%)"
            : "radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, rgba(168,85,247,0.2) 45%, transparent 72%)",
          opacity: btn * (0.65 + pulse * 0.35),
          zIndex: 8,
        }}
      />

      {/* follow button */}
      <div
        style={{
          position: "absolute",
          left: BTN.x,
          top: BTN.y,
          width: BTN.w,
          height: BTN.h,
          opacity: Math.min(1, btn),
          transform: `scale(${btn * press * (1 + 0.03 * Math.sin(t * 5.2))})`,
          transformOrigin: "50% 50%",
          zIndex: 16,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: BTN.h / 2,
            padding: 9,
            background: switched
              ? "linear-gradient(95deg,#86EFAC,#4ADE80 50%,#16A34A)"
              : "linear-gradient(95deg,#22D3EE,#A855F7 48%,#FFD700)",
            boxShadow: `0 0 ${44 + pulse * 56}px ${
              switched ? "rgba(74,222,128,0.65)" : "rgba(255,215,0,0.6)"
            }, 0 26px 60px rgba(0,0,0,0.6)`,
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              borderRadius: BTN.h / 2,
              background: switched
                ? "linear-gradient(95deg,#052E16,#14532D)"
                : "linear-gradient(95deg,#152C7A,#4C1D95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            <span
              style={{
                color: switched ? "#86EFAC" : COLORS.gold,
                display: "inline-flex",
                transform: `rotate(${shake}deg)`,
                filter: `drop-shadow(0 0 18px ${
                  switched ? "rgba(134,239,172,0.9)" : "rgba(255,215,0,0.85)"
                })`,
              }}
            >
              {switched ? <Check size={76} /> : <PersonPlus size={72} />}
            </span>
            <span
              style={{
                fontSize: 78,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1,
                textShadow: "0 6px 22px rgba(0,0,0,0.45)",
              }}
            >
              {switched ? "تم المتابعة" : "تابعني"}
            </span>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shine}%`,
                width: 150,
                background:
                  "linear-gradient(100deg, transparent, rgba(255,255,255,0.42), transparent)",
                transform: "skewX(-18deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* success burst ring */}
      {frame >= SUCCESS && frame < SUCCESS + 18 ? (
        <div
          style={{
            position: "absolute",
            left: BTN_CX,
            top: BTN_CY,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            borderRadius: "50%",
            border: "8px solid #86EFAC",
            transform: `scale(${1 + (frame - SUCCESS) * 1.6})`,
            opacity: 1 - (frame - SUCCESS) / 18,
            zIndex: 15,
          }}
        />
      ) : null}

      <ClickRipple frame={frame} at={CLICK} x={BTN_CX - 10} y={BTN_CY - 10} color="#FFFFFF" />

      {frame >= 28 ? <MouseCursor x={cx} y={cy} size={64} /> : null}
    </AbsoluteFill>
  );
};
