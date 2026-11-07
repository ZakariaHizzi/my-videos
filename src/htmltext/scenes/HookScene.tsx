import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { clamp } from "../parts";

const paint = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

const CHIPS = [
  { t: "<h1>", c: "#7DD3FC", x: 40, y: 1580, rot: -8 },
  { t: "<h6>", c: "#7DD3FC", x: 830, y: 1560, rot: 9 },
  { t: "<p>", c: "#F7DF1E", x: 70, y: 1760, rot: 6 },
  { t: "<br>", c: "#22D3EE", x: 860, y: 1740, rot: -6 },
  { t: "<strong>", c: "#A855F7", x: 460, y: 1800, rot: 3 },
];

/** The blank page that magically fills with headings and paragraphs. */
const MagicPage: React.FC<{ frame: number }> = ({ frame }) => {
  const h1 = paint(frame, 26, 52);
  const p1 = paint(frame, 52, 78);
  const h2 = paint(frame, 78, 104);
  const p2 = paint(frame, 104, 130);
  const sweep = paint(frame, 130, 160);

  return (
    <div style={{ direction: "rtl", textAlign: "right" }}>
      <div
        style={{
          height: 34,
          opacity: h1,
          transform: `translateY(${(1 - h1) * -14}px)`,
          fontSize: 52,
          fontWeight: 900,
          color: "#0F172A",
          fontFamily: FONT,
        }}
      >
        عنوان الموقع
      </div>
      <div
        style={{
          height: 16,
          width: `${p1 * 92}%`,
          borderRadius: 8,
          background: "#94A3B8",
          marginTop: 20,
        }}
      />
      <div
        style={{
          height: 16,
          width: `${p1 * 70}%`,
          borderRadius: 8,
          background: "#CBD5E1",
          marginTop: 12,
        }}
      />
      <div
        style={{
          height: 26,
          opacity: h2,
          transform: `translateY(${(1 - h2) * -12}px)`,
          fontSize: 38,
          fontWeight: 700,
          color: "#1E293B",
          fontFamily: FONT,
          marginTop: 34,
        }}
      >
        عنوان فرعي
      </div>
      <div
        style={{
          height: 14,
          width: `${p2 * 88}%`,
          borderRadius: 7,
          background: "#94A3B8",
          marginTop: 16,
        }}
      />
      <div
        style={{
          height: 14,
          width: `${p2 * 60}%`,
          borderRadius: 7,
          background: "#CBD5E1",
          marginTop: 10,
        }}
      />
      {sweep > 0 && sweep < 1 ? (
        <div
          style={{
            position: "absolute",
            top: -40,
            bottom: -40,
            left: `${sweep * 150 - 30}%`,
            width: 150,
            transform: "skewX(-18deg)",
            background: "linear-gradient(100deg, transparent, rgba(255,215,0,0.55), transparent)",
          }}
        />
      ) : null}
    </div>
  );
};

/** 0-5s hook: a blank screen magically fills with text, then the promise. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 26);
  const win = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 130 } });
  // voice says "7 أدوات سحرية" at 4.8-6.1s -> frame ~145
  const badge = spring({ frame: frame - 140, fps, config: { damping: 10, stiffness: 175 } });
  const glow = 0.5 + 0.5 * Math.sin(t * 5.4);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={3} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "30px 42px", borderColor: "rgba(125,211,252,0.5)" }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            إزاي تكتب في موقعك؟ <span>✍️</span>
          </div>
        </CopyPanel>
      </div>

      {/* the magically-filling screen */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 560,
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
          bodyStyle={{ padding: 34, minHeight: 520, background: "#F8FAFC" }}
        >
          <MagicPage frame={frame} />
        </BrowserMock>
      </div>

      {/* golden promise badge */}
      <div
        style={{
          position: "absolute",
          top: 1300,
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
            padding: "24px 72px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 68,
            fontWeight: 900,
            boxShadow: `0 0 ${40 + glow * 50}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          7 أدوات سحرية!
        </div>
      </div>

      {/* floating tag chips */}
      {CHIPS.map((c, i) => {
        const chipIn = spring({
          frame: frame - (40 + i * 7),
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
              fontFamily: "'Cascadia Mono','Consolas','Courier New',monospace",
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
