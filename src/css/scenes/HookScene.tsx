import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  BrowserFrame,
  C_CYAN,
  C_GOLD,
  C_ORANGE,
  C_PURPLE,
  SparkleBurst,
  Twinkles,
  clamp,
  fadeUp,
  popAt,
} from "../parts";

const PlainSite: React.FC = () => (
  <div
    style={{
      minHeight: 470,
      padding: "34px 40px",
      background: "#FFFFFF",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000000",
      direction: "ltr",
      textAlign: "left",
      boxSizing: "border-box",
    }}
  >
    <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15 }}>
      Welcome to my site
    </div>
    <div style={{ fontSize: 25, marginTop: 12, lineHeight: 1.45 }}>
      This is my first website. I am learning HTML.
    </div>
    <div
      style={{
        fontSize: 24,
        color: "#0000EE",
        textDecoration: "underline",
        marginTop: 14,
      }}
    >
      Click here
    </div>
    <div style={{ height: 3, background: "#999", margin: "18px 0" }} />
    <div style={{ fontSize: 23, lineHeight: 1.6 }}>• Home</div>
    <div style={{ fontSize: 23, lineHeight: 1.6 }}>• About me</div>
    <div style={{ fontSize: 23, lineHeight: 1.6 }}>• Contact</div>
    <div
      style={{
        marginTop: 18,
        width: 180,
        height: 42,
        border: "2px solid #777",
        background: "#EFEFEF",
        fontSize: 21,
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

const StyledSite: React.FC<{ frame: number }> = ({ frame }) => {
  const cards = [
    { g: "⚡", c: C_ORANGE, t: "سرعة" },
    { g: "🎨", c: C_PURPLE, t: "تصميم" },
    { g: "✨", c: C_CYAN, t: "إبداع" },
  ];
  return (
    <div
      style={{
        minHeight: 470,
        background:
          "linear-gradient(160deg,#101A44 0%,#1E3A8A 48%,#4C1D95 100%)",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(255,107,53,0.65),transparent 68%)",
          top: -90,
          right: -50,
          filter: "blur(12px)",
        }}
      />
      <div
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 22px",
          background: "rgba(5,10,30,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 900,
            color: C_GOLD,
            direction: "ltr",
          }}
        >
          NOVA
        </div>
        <div style={{ display: "flex", gap: 18, direction: "rtl" }}>
          {["الرئيسية", "خدماتنا", "تواصل"].map((x, i) => (
            <div
              key={x}
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 800,
                color: i === 0 ? C_GOLD : "#DBEAFE",
                borderBottom:
                  i === 0 ? `2px solid ${C_GOLD}` : "2px solid transparent",
                paddingBottom: 3,
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "18px 26px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div style={{ direction: "rtl", flex: 1 }}>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 34,
              fontWeight: 900,
              color: "#FFFFFF",
              textShadow: "0 4px 18px rgba(0,0,0,0.4)",
              lineHeight: 1.25,
            }}
          >
            مرحباً بك 👋
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 600,
              color: "#C7D2FE",
              marginTop: 5,
            }}
          >
            موقعك صار له روح وشكل!
          </div>
          <div
            style={{
              display: "inline-flex",
              marginTop: 11,
              padding: "7px 20px",
              borderRadius: 100,
              background: `linear-gradient(90deg,${C_ORANGE},${C_PURPLE})`,
              color: "#fff",
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 900,
              boxShadow: `0 6px 20px ${C_PURPLE}66`,
            }}
          >
            ابدأ الآن
          </div>
        </div>
        <div
          style={{
            width: 142,
            height: 142,
            borderRadius: 30,
            background: `linear-gradient(145deg,${C_ORANGE},${C_PURPLE})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 60,
            boxShadow: `0 12px 34px ${C_ORANGE}55`,
            transform: `rotate(${Math.sin(frame / 20) * 3}deg)`,
          }}
        >
          {"</>"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 9, padding: "8px 22px 18px" }}>
        {cards.map((c) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              borderRadius: 14,
              padding: "9px 8px",
              background: "rgba(255,255,255,0.11)",
              border: `1px solid ${c.c}77`,
              display: "flex",
              alignItems: "center",
              gap: 7,
              boxShadow: `0 4px 18px ${c.c}22`,
            }}
          >
            <div style={{ fontSize: 22 }}>{c.g}</div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 14,
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
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 2, 18);
  const screen = popAt(frame, fps, 8, 14, 145);

  const snap = interpolate(frame, [126, 131, 142], [0, 1, 0], clamp);
  const wandY = interpolate(frame, [110, 126], [980, 740], clamp);
  const wandRot = interpolate(frame, [110, 126], [0, -35], clamp) + Math.sin(t * 4) * 6;
  const wandOpacity = interpolate(frame, [100, 112, 140, 155], [0, 1, 1, 0], clamp);
  const magic = interpolate(frame, [126, 140], [0, 1], clamp);
  const flash = interpolate(frame, [126, 130, 140], [0, 0.95, 0], clamp);
  const badge = popAt(frame, fps, 150, 10, 170);
  const glow = 0.5 + 0.5 * Math.sin(t * 5);

  return (
    <AbsoluteFill
      style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}
    >
      <Twinkles count={18} seed={2} />

      <div
        style={{
          position: "absolute",
          top: 142,
          left: 50,
          right: 50,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: title.opacity,
          transform: title.transform,
        }}
      >
        <div
          style={{
            padding: "24px 42px",
            borderRadius: 30,
            background: "rgba(5,10,30,0.9)",
            border: `3px solid ${C_CYAN}88`,
            boxShadow: `0 18px 50px rgba(0,0,0,0.55), 0 0 44px ${C_CYAN}33`,
            fontFamily: FONT,
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
            textShadow: "0 6px 22px rgba(0,0,0,0.45)",
          }}
        >
          الموقع لسه أبيض وأسود؟ 🥱
        </div>
      </div>

      {/* screen */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 360,
          width: 860,
          zIndex: 12,
          opacity: Math.min(1, screen),
          transform: `scale(${0.9 + 0.1 * screen})`,
          transformOrigin: "50% 15%",
        }}
      >
        <BrowserFrame
          width={620}
          url={magic > 0.5 ? "nova-site.com" : "my-first-site.html"}
          style={{
            boxShadow:
              magic > 0.5
                ? `0 30px 80px rgba(0,0,0,0.58), 0 0 70px ${C_PURPLE}66`
                : "0 30px 80px rgba(0,0,0,0.58)",
          }}
        >
          <div style={{ position: "relative", minHeight: 386 }}>
            <PlainSite />
            {magic > 0 ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: magic,
                  transform: `scale(${0.84 + 0.16 * magic})`,
                  overflow: "hidden",
                }}
              >
                <StyledSite frame={frame} />
              </div>
            ) : null}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFFFFF",
                opacity: flash,
                pointerEvents: "none",
              }}
            />
          </div>
        </BrowserFrame>

        {/* screen glow after magic */}
        {magic > 0.2 ? (
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: 30,
              border: `4px solid ${C_GOLD}`,
              opacity: 0.35 + glow * 0.3,
              boxShadow: `0 0 ${30 + glow * 30}px ${C_GOLD}77`,
              pointerEvents: "none",
            }}
          />
        ) : null}
      </div>


      <SparkleBurst
        start={126}
        x={880}
        y={760}
        count={12}
        radius={120}
        duration={20}
      />
      <SparkleBurst
        start={132}
        x={540}
        y={600}
        count={22}
        radius={360}
        duration={34}
      />

      {/* magic wand */}
      <div
        style={{
          position: "absolute",
          left: 860,
          top: wandY,
          zIndex: 34,
          opacity: wandOpacity,
          fontSize: 118,
          transform: `rotate(${wandRot}deg) scale(${1 - snap * 0.18})`,
          filter: `drop-shadow(0 0 22px ${C_GOLD})`,
          pointerEvents: "none",
        }}
      >
        🪄
      </div>

      {/* magic solution badge */}
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 930,
          width: 620,
          display: "flex",
          justifyContent: "center",
          zIndex: 28,
          opacity: Math.min(1, badge * 1.5),
          transform: `scale(${0.5 + 0.5 * badge})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 34px",
            borderRadius: 24,
            background: `linear-gradient(180deg,#FFE866 0%,${C_GOLD} 55%,#F0A800 100%)`,
            color: "#14182E",
            fontFamily: FONT,
            fontSize: 54,
            fontWeight: 900,
            whiteSpace: "nowrap",
            boxShadow: `0 0 ${34 + glow * 44}px rgba(255,215,0,0.65), 0 18px 44px rgba(0,0,0,0.5)`,
            border: "3px solid #FFF3B0",
          }}
        >
          <span>الحل السحري:</span>
          <span style={{ fontFamily: MONO, direction: "ltr", fontSize: 56 }}>
            CSS!
          </span>
          <span style={{ fontSize: 50 }}>🎨</span>
        </div>
      </div>

      {/* floating code chips */}
      {[
        { t: "style", c: C_ORANGE, x: 64, y: 1180, rot: -8 },
        { t: "{ }", c: C_PURPLE, x: 830, y: 1180, rot: 7 },
        { t: "#hex", c: C_CYAN, x: 70, y: 1340, rot: 5 },
      ].map((c, i) => {
        const s = popAt(frame, fps, 150 + i * 6, 12, 150);
        if (s <= 0.001) return null;
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y + Math.sin(t * 1.6 + i) * 9,
              zIndex: 22,
              opacity: Math.min(1, s) * 0.95,
              transform: `scale(${0.6 + 0.4 * s}) rotate(${c.rot}deg)`,
            }}
          >
            <div
              style={{
                padding: "10px 20px",
                borderRadius: 14,
                background: "rgba(5,10,30,0.9)",
                border: `2px solid ${c.c}`,
                color: c.c,
                fontFamily: MONO,
                fontSize: 28,
                fontWeight: 700,
                boxShadow: `0 0 24px ${c.c}55`,
                direction: "ltr",
              }}
            >
              {c.t}
            </div>
          </div>
        );
      })}

      {/* little green sparkle near presenter hand */}
      <div
        style={{
          position: "absolute",
          left: 930,
          top: 1150,
          zIndex: 32,
          opacity: snap,
          fontSize: 58,
          filter: `drop-shadow(0 0 18px ${C_GOLD})`,
          transform: `scale(${0.4 + 0.8 * snap}) rotate(${frame * 4}deg)`,
        }}
      >
        ✨
      </div>
    </AbsoluteFill>
  );
};
