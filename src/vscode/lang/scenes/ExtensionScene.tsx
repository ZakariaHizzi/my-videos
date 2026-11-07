import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp, pop } from "../../theme";
import { ClickRipple, CopyPanel, MouseCursor } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Window geometry, in frame coordinates. */
const WIN = { x: 70, y: 545, w: 940, h: 860 };
const INPUT = { x: 76, y: 300, w: 350, h: 56 };
const TEXT_X = 92;
const CHAR = 26.4;
const EXT_START = TEXT_X + 3 * CHAR;
const EXT_W = 3 * CHAR;
/** Centre of the ".js" run inside the window. */
const P = {
  x: WIN.x + EXT_START + EXT_W / 2,
  y: WIN.y + INPUT.y + INPUT.h / 2,
};
/** Where the camera parks that point. */
const T = { x: 540, y: 940 };

const FULL_NAME = "app.js";

const FILES = [
  { name: "index.html", color: "#E44D26" },
  { name: "styles.css", color: "#264DE4" },
  { name: "README.md", color: "#8B949E" },
];

const EDITOR: { t: string; c: string }[][] = [
  [{ t: "<div", c: "#7DD3FC" }, { t: " class", c: "#9CDCFE" }, { t: "=", c: "#D4D4D4" }, { t: '"card"', c: "#CE9178" }, { t: ">", c: "#7DD3FC" }],
  [{ t: "  <h1>", c: "#7DD3FC" }, { t: "Hello", c: "#D4D4D4" }, { t: "</h1>", c: "#7DD3FC" }],
  [{ t: "  <p>", c: "#7DD3FC" }, { t: "Nice site", c: "#D4D4D4" }, { t: "</p>", c: "#7DD3FC" }],
  [{ t: "</div>", c: "#7DD3FC" }],
  [{ t: "", c: "#D4D4D4" }],
  [{ t: "<script", c: "#7DD3FC" }, { t: " src", c: "#9CDCFE" }, { t: "=", c: "#D4D4D4" }, { t: '"app.js"', c: "#CE9178" }, { t: "></script>", c: "#7DD3FC" }],
];

const cursorAt = (f: number) => ({
  x: interpolate(f, [16, 62, 96, 164], [900, 454, 174, 326], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  }),
  y: interpolate(f, [16, 62, 96, 164], [300, 623, 890, 884], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  }),
});

/** 5.6-13.8s: creating a file named app.js, then pushing in on the ".js" suffix. */
export const ExtensionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = pop(frame, fps, 0);
  const headline = fadeUp(frame, 6, 24);
  const badge = pop(frame, fps, 166);
  const rowIn = fadeUp(frame, 98, 112);

  const typed = Math.round(
    interpolate(frame, [116, 160], [0, FULL_NAME.length], clamp),
  );
  const name = FULL_NAME.slice(0, typed);
  const stem = name.slice(0, Math.min(typed, 3));
  const ext = name.slice(3);
  const extHi = interpolate(frame, [162, 180], [0, 1], clamp);

  const zoomBase = interpolate(frame, [184, 240], [1, 3.1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const zoomDrift = interpolate(frame, [240, 259], [0, 0.22], {
    ...clamp,
    easing: Easing.inOut(Easing.sin),
  });
  const zoom = zoomBase + zoomDrift;
  /** Camera translate ramps with the zoom (0 at zoom=1) and parks P on T at z_max. */
  const k = Math.min(1, Math.max(0, (zoom - 1) / 2.1));
  const tx = (T.x - P.x) * k;
  const ty = (T.y - P.y) * k;
  const vignette = interpolate(frame, [196, 246], [0, 1], clamp);

  const caretOn = frame % 32 < 20;
  const c = cursorAt(frame);

  const blinkClick = (at: number) => {
    const p = cursorAt(at);
    return { frame, at, x: p.x, y: p.y };
  };

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 90% 60% at 50% 42%, rgba(30,58,138,0.55) 0%, transparent 70%)",
      }}
    >
      {/* ---------- camera push-in layer ---------- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: `${P.x}px ${P.y}px`,
          transform: `translate(${tx}px, ${ty}px) scale(${zoom})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: WIN.x,
            top: WIN.y,
            width: WIN.w,
            height: WIN.h,
            borderRadius: 24,
            overflow: "hidden",
            background: "#14182E",
            border: "2px solid rgba(96,165,250,0.5)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.65), 0 0 80px rgba(59,130,246,0.4)",
            direction: "ltr",
            opacity: Math.min(1, win),
            scale: `${0.9 + 0.1 * win}`,
          }}
        >
          {/* title bar */}
          <div
            style={{
              position: "absolute",
              inset: "0 0 auto 0",
              height: 58,
              background: "linear-gradient(90deg,#1B2140,#232A52)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 22px",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
            <div
              style={{
                marginLeft: 12,
                padding: "7px 20px",
                borderRadius: 9,
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                fontFamily: MONO,
                fontSize: 22,
              }}
            >
              my-portfolio
            </div>
            <div
              style={{
                marginLeft: "auto",
                color: "rgba(255,255,255,0.45)",
                fontFamily: MONO,
                fontSize: 21,
              }}
            >
              Visual Studio Code
            </div>
          </div>

          {/* activity bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 58,
              bottom: 38,
              width: 68,
              background: "#10142A",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 22,
              gap: 24,
              fontSize: 27,
              color: "rgba(255,255,255,0.42)",
            }}
          >
            <span style={{ color: "#7DD3FC" }}>◫</span>
            <span>⌕</span>
            <span>⑂</span>
            <span>⌾</span>
            <span>▷</span>
          </div>

          {/* explorer */}
          <div
            style={{
              position: "absolute",
              left: 68,
              top: 58,
              bottom: 38,
              width: 360,
              background: "#171B33",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                padding: "20px 0 0 18px",
                fontSize: 20,
                letterSpacing: 2,
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Segoe UI', Arial, sans-serif",
              }}
            >
              EXPLORER
            </div>
            <div
              style={{
                position: "absolute",
                left: 292,
                top: 14,
                width: 52,
                height: 34,
                borderRadius: 9,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                color: "#fff",
                fontFamily: MONO,
              }}
            >
              +
            </div>
            <div
              style={{
                padding: "18px 0 8px 16px",
                fontSize: 25,
                fontWeight: 800,
                color: "#9CDCFE",
                fontFamily: MONO,
              }}
            >
              ▾ my-portfolio
            </div>
            {FILES.map((f) => (
              <div
                key={f.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  height: 48,
                  paddingLeft: 34,
                  color: "#D4D4D4",
                  fontFamily: MONO,
                  fontSize: 25,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: f.color,
                    flexShrink: 0,
                    boxShadow: `0 0 12px ${f.color}`,
                  }}
                />
                {f.name}
              </div>
            ))}

            {/* the file being created */}
            <div
              style={{
                position: "absolute",
                left: INPUT.x - 68,
                top: INPUT.y - 58,
                width: INPUT.w,
                height: INPUT.h,
                opacity: rowIn.opacity,
                transform: rowIn.translate,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.07)",
                  border: "2px solid #569CD6",
                  boxShadow: "0 0 22px rgba(86,156,214,0.55)",
                }}
              />
              {extHi > 0 ? (
                <div
                  style={{
                    position: "absolute",
                    left: EXT_START - INPUT.x - 8,
                    top: 7,
                    width: EXT_W + 16,
                    height: 40,
                    borderRadius: 6,
                    background: `rgba(255,215,0,${0.24 * extHi})`,
                    border: `2px solid rgba(255,215,0,${0.75 * extHi})`,
                  }}
                />
              ) : null}
              <div
                style={{
                  position: "absolute",
                  left: TEXT_X - INPUT.x,
                  top: 0,
                  height: INPUT.h,
                  display: "flex",
                  alignItems: "center",
                  fontFamily: MONO,
                  fontSize: 44,
                  fontWeight: 700,
                  whiteSpace: "pre",
                }}
              >
                <span style={{ color: "#E2E8F0" }}>{stem}</span>
                <span
                  style={{
                    color: extHi > 0.45 ? COLORS.gold : "#E2E8F0",
                    textShadow:
                      extHi > 0
                        ? `0 0 ${extHi * 30}px rgba(255,215,0,${extHi})`
                        : undefined,
                  }}
                >
                  {ext}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 50,
                    marginLeft: 3,
                    background: caretOn ? "#569CD6" : "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* editor */}
          <div
            style={{
              position: "absolute",
              left: 428,
              right: 0,
              top: 58,
              bottom: 38,
              background: "#14182E",
              textAlign: "left",
            }}
          >
            <div
              style={{
                height: 44,
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingLeft: 16,
                background: "#10142A",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                style={{
                  padding: "8px 20px",
                  background: "#14182E",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderBottom: "none",
                  borderRadius: "8px 8px 0 0",
                  color: "#E2E8F0",
                  fontFamily: MONO,
                  fontSize: 21,
                }}
              >
                index.html
              </span>
              <span
                style={{
                  padding: "8px 20px",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: MONO,
                  fontSize: 21,
                }}
              >
                styles.css
              </span>
            </div>
            <div style={{ paddingTop: 18 }}>
              {EDITOR.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    height: 44,
                    alignItems: "center",
                    fontFamily: MONO,
                    fontSize: 27,
                    whiteSpace: "pre",
                  }}
                >
                  <span
                    style={{
                      width: 56,
                      textAlign: "right",
                      paddingRight: 18,
                      color: "#5C6478",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {line.map((p, j) => (
                    <span key={j} style={{ color: p.c }}>
                      {p.t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* status bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 38,
              background: "linear-gradient(90deg,#0B63C5,#2563EB)",
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "0 20px",
              color: "#fff",
              fontFamily: MONO,
              fontSize: 20,
            }}
          >
            <span>◀ main</span>
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span style={{ marginLeft: "auto" }}>
              {"{}"} {extHi > 0.5 ? "JavaScript" : "HTML"}
            </span>
          </div>
        </div>

        <MouseCursor x={c.x} y={c.y} />
        <ClickRipple {...blinkClick(64)} color="#7DD3FC" />
        <ClickRipple {...blinkClick(100)} color="#7DD3FC" />
      </div>

      {/* ---------- focus vignette ---------- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: vignette,
          background: `radial-gradient(circle 640px at ${T.x}px ${T.y}px, rgba(4,7,22,0) 0%, rgba(4,7,22,0.55) 55%, rgba(4,7,22,0.88) 82%)`,
        }}
      />

      {/* ---------- top scrim (hides the magnified chrome behind the copy) ---------- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 300,
          opacity: vignette,
          background:
            "linear-gradient(180deg, rgba(4,7,22,0.97) 0%, rgba(4,7,22,0.88) 55%, rgba(4,7,22,0) 100%)",
        }}
      />

      {/* ---------- copy ---------- */}
      <div
        style={{
          position: "absolute",
          top: 132,
          left: 70,
          right: 70,
          opacity: headline.opacity,
          transform: headline.translate,
          zIndex: 20,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(168,85,247,0.45)" }}>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#fff", lineHeight: 1.35 }}>
            السر كله في امتداد الملف 📁
          </div>
        </CopyPanel>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1560,
          left: 0,
          right: 0,
          zIndex: 20,
          opacity: Math.min(1, badge),
        }}
      >
        <div
          style={{
            display: "inline-block",
            transform: `scale(${badge}) rotate(${-2 + 2 * (1 - badge)}deg)`,
            direction: "ltr",
            fontFamily: MONO,
            fontSize: 82,
            fontWeight: 900,
            color: "#14182E",
            padding: "24px 54px",
            borderRadius: 26,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            boxShadow:
              "0 0 70px rgba(255,215,0,0.65), 0 22px 60px rgba(0,0,0,0.55)",
          }}
        >
          .js = JavaScript
        </div>
      </div>
    </AbsoluteFill>
  );
};
