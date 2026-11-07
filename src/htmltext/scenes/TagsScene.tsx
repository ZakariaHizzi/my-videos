import React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { TagChip, clamp } from "../parts";

const Card: React.FC<{
  y: number;
  color: string;
  appear: number;
  chip: string;
  caption: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ y, color, appear, chip, caption, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear, fps, config: { damping: 12, stiffness: 165 } });
  if (s <= 0.001) return null;
  const local = frame - appear;
  const flash = interpolate(local, [0, 16], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: y,
        width: 960,
        borderRadius: 30,
        background: "rgba(6,10,30,0.92)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 ${26 + flash * 46}px ${color}${flash > 0.1 ? "AA" : "55"}, 0 24px 60px rgba(0,0,0,0.5)`,
        padding: "26px 34px",
        direction: "rtl",
        textAlign: "right",
        opacity: Math.min(1, s),
        transform: `scale(${0.86 + 0.14 * s}) translateX(${(1 - s) * 80}px)`,
        zIndex: 10,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          marginBottom: 18,
        }}
      >
        <TagChip label={chip} color={color} fontSize={38} />
        <div style={{ fontSize: 48, fontWeight: 900, color: "#FFFFFF" }}>{caption}</div>
      </div>
      <div
        style={{
          borderRadius: 20,
          background: "#F8FAFC",
          minHeight: 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "18px 24px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 25-35s: three quick tags — br, strong, em — each with a live effect. */
export const TagsScene: React.FC = () => {
  const frame = useCurrentFrame();

  /* <br>: the second line drops down out of the first */
  const br = spring({ frame: frame - 26, fps: 30, config: { damping: 12, stiffness: 150 } });
  const brGap = interpolate(br, [0, 1], [0, 26]);

  /* <strong>: weight + scale pulse */
  const st = spring({ frame: frame - 88, fps: 30, config: { damping: 10, stiffness: 200 } });
  const stWeight = Math.round(interpolate(st, [0, 1], [400, 900]));
  const stPulse = 1 + Math.sin(Math.max(0, frame - 88) / 30 * Math.PI * 2.4) * 0.06 * (st > 0.2 ? 1 : 0);

  /* <em>: skew sweep */
  const em = spring({ frame: frame - 132, fps: 30, config: { damping: 12, stiffness: 160 } });
  const emSkew = interpolate(em, [0, 1], [0, -14]);
  const emSweep = interpolate(frame, [132, 166], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={12} box={{ x: 20, y: 60, w: 1040, h: 300 }} />

      {/* br */}
      <Card
        y={170}
        color={COLORS.cyan}
        appear={10}
        chip="<br>"
        caption=" = سطر جديد ↩️"
      >
        <div style={{ fontSize: 46, fontWeight: 700, color: "#0F172A", lineHeight: 1.35 }}>
          <div>السطر الأول</div>
          <div
            style={{
              marginTop: brGap,
              opacity: br,
              transform: `translateY(${(1 - br) * -24}px)`,
              color: "#1D4ED8",
            }}
          >
            السطر الثاني
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: 52,
            opacity: br,
            transform: `rotate(${interpolate(br, [0, 1], [90, 0])}deg)`,
            right: 60,
            top: 90,
          }}
        >
          ↩️
        </div>
      </Card>

      {/* strong */}
      <Card
        y={650}
        color={COLORS.gold}
        appear={76}
        chip="<strong>"
        caption=" = تغميق 💪"
      >
        <div
          style={{
            fontSize: 54,
            color: "#0F172A",
            fontWeight: stWeight,
            transform: `scale(${stPulse})`,
            textShadow: st > 0.5 ? "0 0 22px rgba(255,215,0,0.55)" : "none",
          }}
        >
          نص مهم جداً!
        </div>
      </Card>

      {/* em */}
      <Card
        y={1130}
        color={COLORS.purple}
        appear={120}
        chip="<em>"
        caption=" = ميل ✨"
      >
        <div style={{ position: "relative", overflow: "hidden", padding: "8px 20px" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: "#0F172A",
              transform: `skewX(${emSkew}deg)`,
              fontStyle: "italic",
            }}
          >
            نص مليء بالحيوية
          </div>
          {emSweep > 0 && emSweep < 1 ? (
            <div
              style={{
                position: "absolute",
                top: -20,
                bottom: -20,
                left: `${emSweep * 160 - 30}%`,
                width: 110,
                transform: "skewX(-18deg)",
                background:
                  "linear-gradient(100deg, transparent, rgba(168,85,247,0.5), transparent)",
              }}
            />
          ) : null}
        </div>
      </Card>

      {/* tiny footer hint */}
      <div
        style={{
          position: "absolute",
          top: 1640,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 40,
          fontWeight: 700,
          color: "rgba(255,255,255,0.75)",
          opacity: interpolate(frame, [180, 205], [0, 1], clamp),
          textShadow: "0 6px 24px rgba(0,0,0,0.5)",
        }}
      >
        كلها بتنكتب جوه النص عادي ✨
        <span style={{ fontFamily: MONO, color: COLORS.cyan }}> {"</>"}</span>
      </div>
    </AbsoluteFill>
  );
};
