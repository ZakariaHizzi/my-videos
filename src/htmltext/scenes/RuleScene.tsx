import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO, fadeUp } from "../../vscode/theme";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { TagChip, clamp } from "../parts";

const MiniPage: React.FC<{
  title: string;
  ok: boolean;
  count: number;
  appear: number;
}> = ({ title, ok, count, appear }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear, fps, config: { damping: 12, stiffness: 165 } });
  const color = ok ? "#22C55E" : "#F87171";
  return (
    <div
      style={{
        width: 440,
        borderRadius: 26,
        background: "rgba(6,10,30,0.94)",
        border: `3px solid ${color}`,
        boxShadow: `0 0 30px ${color}44, 0 20px 50px rgba(0,0,0,0.5)`,
        padding: "22px 24px",
        opacity: Math.min(1, s),
        transform: `scale(${0.85 + 0.15 * s})`,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 900,
          color,
          marginBottom: 18,
          textShadow: `0 0 18px ${color}88`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          borderRadius: 16,
          background: "#F8FAFC",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {Array.from({ length: count }, (_, i) => {
          const row = spring({
            frame: frame - appear - 8 - i * 8,
            fps,
            config: { damping: 12, stiffness: 190 },
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: Math.min(1, row),
                transform: `translateX(${(1 - row) * 40}px)`,
                direction: "ltr",
              }}
            >
              <TagChip label="<h1>" color="#7DD3FC" fontSize={26} style={{ padding: "6px 12px" }} />
              <div
                style={{
                  flex: 1,
                  height: 18,
                  borderRadius: 9,
                  background: "#CBD5E1",
                  direction: "rtl",
                }}
              />
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color,
                  width: 44,
                  textAlign: "center",
                }}
              >
                {ok ? "✓" : "✕"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** 38.6-48.3s: the golden rule — one <h1> per page. */
export const RuleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const cap1 = fadeUp(frame, 30, 52);
  const warn = spring({ frame: frame - 56, fps, config: { damping: 10, stiffness: 180 } });
  const warnPulse = 1 + 0.08 * Math.sin(t * 6);
  const cap2 = spring({ frame: frame - 118, fps, config: { damping: 11, stiffness: 175 } });

  // shake the red rule right after it lands
  const shakeT = interpolate(frame, [140, 180], [0, 1], clamp);
  const shake =
    shakeT > 0 && shakeT < 1 ? Math.sin(shakeT * Math.PI * 6) * 16 * (1 - shakeT) : 0;
  const redPulse = 0.5 + 0.5 * Math.sin(t * 5);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={21} colors={["#F87171", "#FFD700"]} />

      {/* red alert vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `10px solid rgba(248,113,113,${0.25 + redPulse * 0.3})`,
          borderRadius: 20,
          boxShadow: `inset 0 0 ${120 + redPulse * 80}px rgba(248,113,113,0.28)`,
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      {/* caption 1 */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(248,113,113,0.65)" }}>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#FFFFFF" }}>
            ⚠️ قاعدة ذهبية:
          </div>
        </CopyPanel>
      </div>

      {/* big warning icon */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 150,
          lineHeight: 1,
          zIndex: 20,
          opacity: Math.min(1, warn * 1.4),
          transform: `scale(${(0.4 + 0.6 * warn) * warnPulse})`,
          filter: `drop-shadow(0 0 ${24 + redPulse * 30}px rgba(255,200,0,0.75))`,
        }}
      >
        ⚠️
      </div>

      {/* wrong vs right */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          zIndex: 15,
          direction: "ltr",
        }}
      >
        <MiniPage title="✕ غلط" ok={false} count={3} appear={72} />
        <MiniPage title="✓ صح" ok count={1} appear={94} />
      </div>

      {/* red rule */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, cap2 * 1.5),
          transform: `translateX(${shake}px) scale(${0.6 + 0.4 * cap2})`,
        }}
      >
        <div
          style={{
            padding: "28px 56px",
            borderRadius: 28,
            background: "linear-gradient(180deg, #7F1D1D, #991B1B)",
            border: `4px solid rgba(248,113,113,${0.7 + redPulse * 0.3})`,
            boxShadow: `0 0 ${44 + redPulse * 44}px rgba(248,113,113,0.6), 0 22px 54px rgba(0,0,0,0.55)`,
          }}
        >
          <div style={{ fontSize: 66, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: "#FCA5A5",
                textShadow: "0 0 22px rgba(248,113,113,0.9)",
              }}
            >
              {"<h1>"}
            </span>
            <span> مرة واحدة فقط!</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
