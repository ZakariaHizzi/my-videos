import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { BoltIcon, BuildingIcon, PaletteIcon, Twinkles } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const SITE = { x: 100, y: 980, w: 880 };

const ICONS = [
  { key: "html", Icon: BuildingIcon, c: "#E44D26", fx: 252, fy: 640, delay: 40 },
  { key: "css", Icon: PaletteIcon, c: "#264DE4", fx: 540, fy: 540, delay: 70 },
  { key: "js", Icon: BoltIcon, c: "#F7DF1E", fx: 828, fy: 640, delay: 100 },
];

const MiniSite: React.FC = () => (
  <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 18 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          background: "linear-gradient(135deg,#A855F7,#22D3EE)",
        }}
      />
      <div style={{ width: 100, height: 14, borderRadius: 7, background: "#94A3B8" }} />
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        {[54, 46, 62].map((w) => (
          <div key={w} style={{ width: w, height: 12, borderRadius: 6, background: "#CBD5E1" }} />
        ))}
      </div>
    </div>
    <div
      style={{
        borderRadius: 18,
        padding: "26px 24px",
        background: "linear-gradient(130deg,#1E3A8A,#7C3AED)",
      }}
    >
      <div style={{ width: "72%", height: 24, borderRadius: 10, background: "#fff" }} />
      <div style={{ width: "86%", height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)", marginTop: 18 }} />
      <div style={{ width: "64%", height: 12, borderRadius: 6, background: "rgba(255,255,255,0.55)", marginTop: 9 }} />
      <div style={{ width: 130, height: 44, borderRadius: 22, background: "#FFD700", marginTop: 22 }} />
    </div>
    <div style={{ display: "flex", gap: 14 }}>
      {["#22D3EE", "#A855F7"].map((c) => (
        <div
          key={c}
          style={{
            flex: 1,
            borderRadius: 14,
            background: "#fff",
            border: "1px solid #E2E8F0",
            padding: 14,
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 14, background: c }} />
          <div style={{ width: "80%", height: 12, borderRadius: 6, background: "#E2E8F0", marginTop: 14 }} />
        </div>
      ))}
    </div>
  </div>
);

const Tile: React.FC<{
  children: ReactNode;
  c: string;
  style?: CSSProperties;
}> = ({ children, c, style }) => (
  <div
    style={{
      width: 252,
      height: 252,
      borderRadius: 52,
      background: "rgba(6,10,30,0.92)",
      border: `3px solid ${c}`,
      boxShadow: `0 0 40px ${c}66, 0 26px 54px rgba(0,0,0,0.55)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

/** 11.6-18s: the browser acts as a magic translator - HTML, CSS and JS icons rise out. */
export const TranslatorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 22);
  const site = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 130 } });

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={18} seed={3} />

      {/* title */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "28px 44px", borderColor: "rgba(168,85,247,0.5)" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            <span>المتصفح = المترجم السحري 🪄</span>
          </div>
        </CopyPanel>
      </div>

      {/* glow behind the browser */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: SITE.y + 240,
          width: 1300,
          height: 1000,
          translate: "-50% -50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.42) 0%, rgba(37,99,235,0.2) 45%, transparent 72%)",
          zIndex: 2,
        }}
      />

      {/* browser window */}
      <div
        style={{
          position: "absolute",
          left: SITE.x,
          top: SITE.y,
          width: SITE.w,
          zIndex: 6,
          opacity: Math.min(1, site),
          transform: `scale(${0.9 + 0.1 * site})`,
        }}
      >
        <BrowserMock width={SITE.w} url="localhost:5500">
          <MiniSite />
        </BrowserMock>
      </div>

      {/* rising translator icons */}
      {ICONS.map(({ key, Icon, c, fx, fy, delay }, i) => {
        const p = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 120 } });
        if (p <= 0.001) return null;
        const burst = interpolate(frame, [delay, delay + 24], [0, 1], clamp);
        const x = interpolate(p, [0, 1], [540, fx]);
        const y = interpolate(p, [0, 1], [SITE.y + 150, fy]);
        const bob = Math.sin(t * 1.9 + i * 1.7) * 14;
        const glow = 0.4 + 0.6 * Math.sin(t * 3.4 + i * 1.2);
        return (
          <div key={key} style={{ position: "absolute", left: 0, top: 0, zIndex: 12 }}>
            {burst > 0 && burst < 1 ? (
              <div
                style={{
                  position: "absolute",
                  left: x - 150,
                  top: y - 150 + bob,
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  border: `7px solid ${c}`,
                  transform: `scale(${0.3 + burst * 1.4})`,
                  opacity: 0.8 * (1 - burst),
                }}
              />
            ) : null}
            <div
              style={{
                position: "absolute",
                left: x - 126,
                top: y - 126 + bob,
                opacity: Math.min(1, p),
                transform: `scale(${0.5 + 0.5 * p}) rotate(${Math.sin(t * 1.4 + i) * 4}deg)`,
              }}
            >
              <Tile c={c} style={{ borderColor: burst > 0.3 ? c : "rgba(255,255,255,0.2)" }}>
                <div style={{ filter: `drop-shadow(0 0 ${12 + glow * 22}px ${c}AA)` }}>
                  <Icon size={168} />
                </div>
              </Tile>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
