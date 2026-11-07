import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const paint = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

const CHIPS = [
  { t: "<h1>", c: "#7DD3FC", x: 46, y: 1560, rot: -9 },
  { t: "<p>", c: "#F7DF1E", x: 780, y: 1520, rot: 8 },
  { t: "<img>", c: "#E44D26", x: 120, y: 1740, rot: 6 },
  { t: "<a href>", c: "#264DE4", x: 740, y: 1720, rot: -7 },
];

/** Wireframe page that paints itself into a colorful site. */
const PaintedSite: React.FC<{ frame: number }> = ({ frame }) => {
  const nav = paint(frame, 40, 64);
  const hero = paint(frame, 64, 98);
  const cards = [paint(frame, 98, 122), paint(frame, 110, 134), paint(frame, 122, 146)];
  const sweep = paint(frame, 148, 178);

  return (
    <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 18 }}>
      {/* nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", width: 40, height: 40 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 13,
              background: "#CBD5E1",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 13,
              opacity: nav,
              background: "linear-gradient(135deg,#A855F7,#22D3EE)",
              boxShadow: `0 0 20px rgba(168,85,247,${0.5 * nav})`,
            }}
          />
        </div>
        <div style={{ width: 116, height: 16, borderRadius: 8, background: "#94A3B8" }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          {[62, 54, 70].map((w) => (
            <div
              key={w}
              style={{ width: w, height: 14, borderRadius: 7, background: "#CBD5E1" }}
            />
          ))}
        </div>
      </div>

      {/* hero */}
      <div
        style={{
          position: "relative",
          borderRadius: 22,
          padding: "32px 28px",
          background: "#E2E8F0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: hero,
            background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 55%,#7C3AED 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "80%",
            height: 30,
            borderRadius: 12,
            background: hero > 0.5 ? "#FFFFFF" : "#94A3B8",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "56%",
            height: 30,
            borderRadius: 12,
            marginTop: 14,
            background: hero > 0.5 ? "#FFFFFF" : "#94A3B8",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "90%",
            height: 14,
            borderRadius: 7,
            marginTop: 22,
            background: hero > 0.5 ? "rgba(255,255,255,0.6)" : "#A8B3C7",
          }}
        />
        <div style={{ position: "relative", display: "flex", gap: 16, marginTop: 26 }}>
          <div
            style={{
              width: 156,
              height: 52,
              borderRadius: 26,
              background: hero > 0.5 ? "#FFD700" : "#94A3B8",
            }}
          />
          <div
            style={{
              width: 156,
              height: 52,
              borderRadius: 26,
              border: `3px solid ${hero > 0.5 ? "rgba(255,255,255,0.75)" : "#94A3B8"}`,
              background: hero > 0.5 ? "rgba(255,255,255,0.2)" : "transparent",
            }}
          />
        </div>

        {/* magic sweep */}
        {sweep > 0 && sweep < 1 ? (
          <div
            style={{
              position: "absolute",
              top: -60,
              bottom: -60,
              left: `${sweep * 150 - 30}%`,
              width: 170,
              transform: "skewX(-18deg)",
              background:
                "linear-gradient(100deg, transparent, rgba(255,255,255,0.8), transparent)",
            }}
          />
        ) : null}
      </div>

      {/* cards */}
      <div style={{ display: "flex", gap: 16 }}>
        {["#22D3EE", "#A855F7", "#FFD700"].map((c, i) => (
          <div
            key={c}
            style={{
              position: "relative",
              flex: 1,
              borderRadius: 18,
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              padding: 16,
              boxShadow: "0 10px 24px rgba(15,23,42,0.10)",
            }}
          >
            <div style={{ position: "relative", width: 52, height: 52 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  background: "#E2E8F0",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 16,
                  opacity: cards[i],
                  background: c,
                  boxShadow: `0 0 22px ${c}`,
                }}
              />
            </div>
            <div
              style={{
                width: "86%",
                height: 14,
                borderRadius: 7,
                background: "#E2E8F0",
                marginTop: 16,
              }}
            />
            <div
              style={{
                width: "60%",
                height: 12,
                borderRadius: 6,
                background: "#EEF2F7",
                marginTop: 10,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/** 0-6s: wireframes turn into real sites, then HTML is revealed as the secret. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 6, 28);
  const win = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 130 } });
  const badge = spring({ frame: frame - 100, fps, config: { damping: 11, stiffness: 180 } });
  const badgeGlow = 0.5 + 0.5 * Math.sin(t * 5.2);
  const done = frame >= 146;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={4} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "28px 40px", borderColor: "rgba(125,211,252,0.5)" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 1.35,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            إزاي بتتبنى المواقع؟ <span>🌐</span>
          </div>
        </CopyPanel>
      </div>

      {/* site window */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 500,
          width: 860,
          zIndex: 10,
          opacity: Math.min(1, win),
          transform: `scale(${0.9 + 0.1 * win})`,
          transformOrigin: "50% 30%",
        }}
      >
        <BrowserMock
          width={860}
          url="my-site.com"
          bodyStyle={{ padding: 24, background: "#F8FAFC" }}
        >
          <PaintedSite frame={frame} />
        </BrowserMock>
        {done ? (
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: 32,
              border: `4px solid ${COLORS.green}`,
              opacity: interpolate(frame, [146, 176], [1, 0], clamp),
              boxShadow: `0 0 50px ${COLORS.green}`,
              pointerEvents: "none",
            }}
          />
        ) : null}
      </div>

      {/* secret badge */}
      <div
        style={{
          position: "absolute",
          top: 1320,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, badge * 1.5),
          transform: `scale(${0.55 + 0.45 * badge})`,
        }}
      >
        <div
          style={{
            padding: "22px 70px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 66,
            fontWeight: 900,
            boxShadow: `0 0 ${40 + badgeGlow * 50}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          <span>السر: </span>
          <span
            style={{
              fontFamily: MONO,
              direction: "ltr",
              unicodeBidi: "isolate",
            }}
          >
            HTML
          </span>
        </div>
      </div>

      {/* floating code chips */}
      {CHIPS.map((c, i) => {
        const chipIn = spring({
          frame: frame - (34 + i * 8),
          fps,
          config: { damping: 13, stiffness: 150 },
        });
        if (chipIn <= 0.001) return null;
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y + Math.sin(t * 1.7 + i * 1.3) * 10,
              opacity: Math.min(1, chipIn),
              transform: `scale(${0.6 + 0.4 * chipIn}) rotate(${c.rot}deg)`,
              padding: "12px 22px",
              borderRadius: 14,
              background: "rgba(6,10,30,0.94)",
              border: `2px solid ${c.c}`,
              boxShadow: `0 0 24px ${c.c}66, 0 14px 30px rgba(0,0,0,0.5)`,
              fontFamily: MONO,
              fontSize: 32,
              fontWeight: 700,
              color: c.c,
              whiteSpace: "nowrap",
              direction: "ltr",
              zIndex: 12,
            }}
          >
            {c.t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
