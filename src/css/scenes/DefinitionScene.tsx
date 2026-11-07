import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import {
  C_CYAN,
  C_GOLD,
  C_GREEN,
  C_ORANGE,
  C_PURPLE,
  SparkleBurst,
  Twinkles,
  clamp,
  fadeUp,
  popAt,
} from "../parts";

const CARD_COLORS = [C_ORANGE, C_PURPLE, C_CYAN];

const Bar: React.FC<{ w: string; h: number; c: string; r?: number; mt?: number }> = ({
  w,
  h,
  c,
  r = 6,
  mt = 0,
}) => <div style={{ width: w, height: h, borderRadius: r, background: c, marginTop: mt }} />;

const WirePage: React.FC = () => {
  const line = "#64748B";
  const fill = "#1E293B";
  return (
    <div
      style={{
        height: 800,
        borderRadius: 18,
        background: "#0F172A",
        border: "2px dashed #475569",
        padding: 18,
        boxSizing: "border-box",
        direction: "rtl",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 56,
          borderRadius: 10,
          border: `2px dashed ${line}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 14px",
        }}
      >
        <div style={{ width: 54, height: 16, background: fill, borderRadius: 5 }} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 46, height: 10, background: fill, borderRadius: 4 }} />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          height: 250,
          borderRadius: 14,
          border: `2px dashed ${line}`,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 13,
        }}
      >
        <div style={{ width: "62%", height: 34, background: fill, borderRadius: 8 }} />
        <div style={{ width: "78%", height: 14, background: fill, borderRadius: 5 }} />
        <div style={{ width: "66%", height: 14, background: fill, borderRadius: 5 }} />
        <div
          style={{
            marginTop: 10,
            width: 128,
            height: 40,
            borderRadius: 20,
            border: `2px dashed ${line}`,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 190,
              borderRadius: 12,
              border: `2px dashed ${line}`,
              padding: 14,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: `2px dashed ${line}`,
              }}
            />
            <Bar w="78%" h={12} c={fill} mt={16} />
            <Bar w="92%" h={8} c="#334155" mt={9} />
            <Bar w="70%" h={8} c="#334155" mt={7} />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          height: 72,
          borderRadius: 12,
          border: `2px dashed ${line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <div style={{ width: 120, height: 12, background: fill, borderRadius: 4 }} />
        <div style={{ width: 180, height: 10, background: fill, borderRadius: 4 }} />
      </div>
    </div>
  );
};

const StyledPage: React.FC<{ frame: number }> = ({ frame }) => {
  const cards = [
    { g: "⚡", t: "سرعة", d: "أداء عالي" },
    { g: "🎨", t: "جمال", d: "ألوان حية" },
    { g: "📱", t: "مرونة", d: "كل الشاشات" },
  ];
  return (
    <div
      style={{
        height: 800,
        borderRadius: 18,
        background: "#F8FAFC",
        padding: 18,
        boxSizing: "border-box",
        direction: "rtl",
        overflow: "hidden",
        boxShadow: "inset 0 0 40px rgba(15,23,42,0.08)",
      }}
    >
      <div
        style={{
          height: 56,
          borderRadius: 12,
          background: "linear-gradient(90deg,#1E3A8A,#4C1D95)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
          boxShadow: "0 8px 18px rgba(30,58,138,0.28)",
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: C_GOLD }}>NOVA</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 14 }}>
          {["الرئيسية", "خدماتنا", "تواصل"].map((x, i) => (
            <div
              key={x}
              style={{
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 800,
                color: i === 0 ? C_GOLD : "#DBEAFE",
                borderBottom: i === 0 ? `2px solid ${C_GOLD}` : "2px solid transparent",
                paddingBottom: 2,
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          height: 250,
          borderRadius: 16,
          background: "linear-gradient(135deg,#1E3A8A 0%,#6D28D9 58%,#FF6B35 140%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 12px 28px rgba(76,29,149,0.32)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,215,0,0.45),transparent 68%)",
            top: -80,
            left: -50,
          }}
        />
        <div
          style={{
            fontFamily: FONT,
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          مرحباً بالعالم 👋
        </div>
        <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: "#E0E7FF" }}>
          تصميم يخطف العين من أول نظرة
        </div>
        <div
          style={{
            marginTop: 8,
            padding: "9px 28px",
            borderRadius: 100,
            background: `linear-gradient(90deg,${C_ORANGE},#FF9A62)`,
            color: "#FFFFFF",
            fontFamily: FONT,
            fontSize: 17,
            fontWeight: 900,
            boxShadow: `0 8px 20px ${C_ORANGE}55`,
          }}
        >
          ابدأ مجاناً
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        {cards.map((c, i) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              height: 190,
              borderRadius: 14,
              background: "#FFFFFF",
              border: `2px solid ${CARD_COLORS[i]}44`,
              padding: 14,
              boxSizing: "border-box",
              boxShadow: `0 10px 24px ${CARD_COLORS[i]}22`,
              transform: `translateY(${Math.sin(frame / 24 + i * 1.4) * 3}px)`,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: `linear-gradient(145deg,${CARD_COLORS[i]},${CARD_COLORS[i]}99)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                boxShadow: `0 6px 16px ${CARD_COLORS[i]}55`,
              }}
            >
              {c.g}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: FONT,
                fontSize: 20,
                fontWeight: 900,
                color: "#0F172A",
              }}
            >
              {c.t}
            </div>
            <div
              style={{
                marginTop: 3,
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 600,
                color: "#64748B",
              }}
            >
              {c.d}
            </div>
            <div
              style={{
                marginTop: 10,
                height: 7,
                width: "88%",
                borderRadius: 4,
                background: `linear-gradient(90deg,${CARD_COLORS[i]},${CARD_COLORS[i]}22)`,
              }}
            />
            <div
              style={{
                marginTop: 6,
                height: 7,
                width: "62%",
                borderRadius: 4,
                background: "#E2E8F0",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          height: 72,
          borderRadius: 12,
          background: "#0F172A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 900, color: C_GOLD }}>NOVA</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: "#94A3B8" }}>© 2026</div>
      </div>
    </div>
  );
};

export const DefinitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const h1 = fadeUp(frame, 2, 18);
  const h2 = fadeUp(frame, 10, 26);
  const panel = popAt(frame, fps, 14, 14, 135);
  const dress = interpolate(frame, [58, 112], [0, 100], clamp);
  const beamX = 560 + (452 * dress) / 100;
  const bottom = popAt(frame, fps, 128, 12, 160);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={16} seed={9} />

      <div style={{ position: "absolute", top: 126, left: 50, right: 50, zIndex: 30 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: h1.opacity,
            transform: h1.transform,
          }}
        >
          <div
            style={{
              padding: "14px 44px",
              borderRadius: 24,
              background: "rgba(5,10,30,0.9)",
              border: `3px solid ${C_CYAN}88`,
              fontSize: 58,
              fontWeight: 900,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              boxShadow: `0 0 40px ${C_CYAN}33`,
            }}
          >
            <span style={{ fontFamily: "Arial, sans-serif", direction: "ltr", unicodeBidi: "isolate" }}>
              HTML
            </span>{" "}
            = الهيكل 🦴
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            opacity: h2.opacity,
            transform: h2.transform,
          }}
        >
          <div
            style={{
              padding: "14px 44px",
              borderRadius: 24,
              background: "rgba(5,10,30,0.9)",
              border: `3px solid ${C_GOLD}88`,
              fontSize: 58,
              fontWeight: 900,
              whiteSpace: "nowrap",
              backgroundImage:
                "linear-gradient(100deg,#FFE866,#FFD700 45%,#FF6B35 80%,#A855F7)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.45))",
              boxShadow: `0 0 40px ${C_GOLD}22`,
            }}
          >
            <span style={{ fontFamily: "Arial, sans-serif", direction: "ltr", unicodeBidi: "isolate" }}>
              CSS
            </span>{" "}
            = الشكل 🎨
          </div>
        </div>
      </div>

      {/* split panel */}
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 390,
          width: 964,
          height: 900,
          borderRadius: 34,
          background: "rgba(5,10,30,0.55)",
          border: "2px solid rgba(125,211,252,0.25)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          opacity: Math.min(1, panel),
          transform: `scale(${0.93 + 0.07 * panel})`,
          transformOrigin: "50% 30%",
          padding: 20,
          boxSizing: "border-box",
          display: "flex",
          gap: 16,
          overflow: "hidden",
          zIndex: 16,
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <WirePage />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              padding: "5px 14px",
              borderRadius: 8,
              background: "rgba(15,23,42,0.9)",
              border: "2px solid #64748B",
              color: "#CBD5E1",
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              fontWeight: 900,
              direction: "ltr",
            }}
          >
            HTML
          </div>
        </div>

        <div style={{ flex: 1, position: "relative", borderRadius: 18, overflow: "hidden" }}>
          <WirePage />
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${100 - dress}% 0 0)`,
            }}
          >
            <StyledPage frame={frame} />
          </div>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              padding: "5px 14px",
              borderRadius: 8,
              background: "rgba(15,23,42,0.9)",
              border: `2px solid ${C_GOLD}`,
              color: C_GOLD,
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              fontWeight: 900,
              boxShadow: `0 0 18px ${C_GOLD}55`,
              direction: "ltr",
            }}
          >
            CSS
          </div>
        </div>

        {/* magic colour beam */}
        {dress > 0 && dress < 100 ? (
          <div
            style={{
              position: "absolute",
              top: 14,
              bottom: 14,
              left: beamX,
              width: 6,
              borderRadius: 6,
              background: `linear-gradient(180deg,${C_GOLD},${C_ORANGE},${C_PURPLE})`,
              boxShadow: `0 0 26px ${C_GOLD}, 0 0 60px ${C_ORANGE}88`,
              opacity: 0.95,
            }}
          />
        ) : null}
      </div>

      {/* arrows between sides */}
      <div
        style={{
          position: "absolute",
          top: 800,
          left: 500,
          width: 80,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "center",
          zIndex: 22,
          opacity: Math.min(1, popAt(frame, fps, 40, 12, 150)),
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              fontSize: 40,
              color: C_GREEN,
              opacity: 0.55 + 0.45 * Math.abs(Math.sin(t * 3 - i * 0.8)),
              transform: `translateY(${Math.sin(t * 2.6 + i) * 4}px)`,
              textShadow: `0 0 16px ${C_GREEN}`,
            }}
          >
            ➜
          </div>
        ))}
      </div>

      <SparkleBurst start={58} x={560} y={840} count={16} radius={180} duration={30} />

      <div
        style={{
          position: "absolute",
          top: 1350,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, bottom),
          transform: `translateY(${(1 - bottom) * 24}px)`,
        }}
      >
        <div
          style={{
            padding: "14px 38px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.9)",
            border: `3px solid ${C_CYAN}77`,
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 900,
            color: "#FFFFFF",
            boxShadow: `0 0 30px ${C_CYAN}33`,
            whiteSpace: "nowrap",
          }}
        >
          نفس الهيكل… شكل جديد!{" "}
          <span style={{ filter: `drop-shadow(0 0 12px ${C_GOLD})` }}>✨</span>
        </div>
      </div>

      {/* floating chips */}
      <div
        style={{
          position: "absolute",
          top: 1580,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          zIndex: 26,
          opacity: Math.min(1, popAt(frame, fps, 150, 12, 150)),
        }}
      >
        {[
          { t: "<h1>", c: C_CYAN },
          { t: "color", c: C_GOLD },
          { t: "background", c: C_PURPLE },
        ].map((c) => (
          <div
            key={c.t}
            style={{
              padding: "10px 24px",
              borderRadius: 14,
              background: "rgba(5,10,30,0.9)",
              border: `2px solid ${c.c}`,
              color: c.c,
              fontFamily: "Consolas, monospace",
              fontSize: 28,
              fontWeight: 700,
              boxShadow: `0 0 22px ${c.c}44`,
              direction: "ltr",
            }}
          >
            {c.t}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
