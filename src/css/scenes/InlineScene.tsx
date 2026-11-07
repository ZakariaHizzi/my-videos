import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  BrowserFrame,
  C_GREEN,
  C_ORANGE,
  C_RED,
  CodeBlock,
  EditorFrame,
  HeadlinePanel,
  K,
  NotePill,
  SparkleBurst,
  T_ATTR,
  T_STR,
  T_TAG,
  Twinkles,
  clamp,
  fadeUp,
  popAt,
  totalLen,
} from "../parts";
import type { Line, Part } from "../parts";

const H1_PARTS: Part[] = [
  { t: "    " },
  { t: "<h1", c: T_TAG },
  { t: " " },
  { t: "style", c: T_ATTR, hl: true, roundStart: true },
  { t: "=" },
  { t: '"color: red;"', c: T_STR, hl: true, roundEnd: true },
  { t: ">" , c: T_TAG },
  { t: "مرحباً", c: "#E6EDF3", style: { fontFamily: FONT, direction: "rtl", unicodeBidi: "isolate" } },
  { t: "</h1>", c: T_TAG },
];

const LINES: Line[] = [
  { parts: [{ t: "<!DOCTYPE html>", c: T_TAG }] },
  { parts: [{ t: "<html>", c: T_TAG }] },
  { parts: [{ t: "  <head>", c: T_TAG }] },
  {
    parts: [
      { t: "    " },
      { t: "<title>", c: T_TAG },
      { t: "موقعي", dim: true },
      { t: "</title>", c: T_TAG },
    ],
    dim: true,
  },
  { parts: [{ t: "  </head>", c: T_TAG }] },
  { parts: [{ t: "  <body>", c: T_TAG }] },
  { parts: H1_PARTS },
  { parts: [{ t: "  </body>", c: T_TAG }] },
  { parts: [{ t: "</html>", c: T_TAG }] },
];

const H1LEN = totalLen([{ parts: H1_PARTS }]);

const MessGrid: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(17, 1fr)",
        gap: 4,
        padding: 30,
        boxSizing: "border-box",
        transform: "rotate(-2deg) scale(1.02)",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 102 }, (_, i) => {
        const appear = interpolate(frame, [142 + i * 0.35, 154 + i * 0.35], [0, 1], clamp);
        const bad = i % 9 === 0;
        return (
          <div
            key={i}
            style={{
              fontFamily: MONO,
              fontSize: 11.5,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              color: bad ? "rgba(255,92,92,0.8)" : "rgba(255,180,140,0.55)",
              background: i % 7 === 0 ? "rgba(255,107,53,0.08)" : "transparent",
              borderRadius: 4,
              paddingLeft: 3,
              opacity: appear,
              overflow: "hidden",
            }}
          >
            {i % 5 === 0 ? "<h1 style=\"color:red\">" : '<h1 style="color: red;">'}
          </div>
        );
      })}
    </div>
  );
};

export const InlineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const head = fadeUp(frame, 0, 14);
  const editor = popAt(frame, fps, 8, 14, 145);
  const typed = Math.round(
    interpolate(frame, [26, 104], [0, H1LEN], { ...clamp }),
  );
  const apply = 112;
  const red = frame >= apply;
  const flash = interpolate(frame, [apply, apply + 4, apply + 22], [0, 0.95, 0], clamp);
  const headingPop = popAt(frame, fps, apply, 10, 190);
  const check = popAt(frame, fps, apply + 8, 11, 180);

  const mess = interpolate(frame, [140, 158], [0, 1], clamp);
  const warn = popAt(frame, fps, 158, 9, 190);
  const warningText = popAt(frame, fps, 172, 11, 170);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={14} seed={15} />

      <div style={{ opacity: head.opacity, transform: head.transform }}>
        <HeadlinePanel color={C_ORANGE} step="1" fontSize={56}>
          الطريقة 1: <K color={C_ORANGE}>style='...'</K> ✏️
        </HeadlinePanel>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 322,
          width: 984,
          zIndex: 12,
          opacity: Math.min(1, editor),
          transform: `scale(${0.93 + 0.07 * editor})`,
          transformOrigin: "50% 5%",
        }}
      >
        <EditorFrame width={984} tab="index.html" language="HTML" statusLine="Ln 7, Col 41">
          <CodeBlock
            lines={[
              ...LINES.slice(0, 6),
              { parts: [], active: true },
              ...LINES.slice(7),
            ]}
            typed={undefined}
            fontSize={31}
            lineHeight={50}
          />
          {/* the active line's typing overlay sits exactly over line 7 */}
          <div
            style={{
              position: "absolute",
              left: 94,
              top: 22 + 50 * 6,
              width: 864,
              height: 50,
            }}
          >
            <CodeBlock
              lines={[{ parts: H1_PARTS, active: true }]}
              typed={typed}
              fontSize={31}
              lineHeight={50}
              lineNumbers={false}
              caret
            />
          </div>
        </EditorFrame>
      </div>

      {/* browser */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 900,
          width: 940,
          zIndex: 12,
          opacity: Math.min(1, editor),
          transform: `scale(${0.95 + 0.05 * editor})`,
          transformOrigin: "50% 0%",
        }}
      >
        <BrowserFrame
          width={940}
          url="localhost:5500/index.html"
          bodyStyle={{
            height: 300,
            padding: "34px 44px",
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              fontFamily: FONT,
              fontSize: 58,
              fontWeight: 900,
              color: red ? "#E11D48" : "#111827",
              lineHeight: 1.2,
              textShadow: red ? "0 0 30px rgba(225,29,72,0.45)" : "none",
              transform: `scale(${red ? 1 + (1 - headingPop) * 0.15 : 1})`,
              transformOrigin: "right center",
            }}
          >
            مرحباً
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ width: 520, height: 12, borderRadius: 6, background: "#E5E7EB" }} />
            <div style={{ width: 400, height: 12, borderRadius: 6, background: "#E5E7EB" }} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#FFFFFF",
              opacity: flash,
              pointerEvents: "none",
            }}
          />
          {red ? (
            <div
              style={{
                position: "absolute",
                right: 28,
                top: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px",
                borderRadius: 100,
                background: "rgba(52,211,153,0.14)",
                border: `2px solid ${C_GREEN}`,
                color: "#047857",
                fontFamily: FONT,
                fontSize: 20,
                fontWeight: 900,
                opacity: Math.min(1, check),
                transform: `scale(${0.6 + 0.4 * check})`,
              }}
            >
              ✓ color: red
            </div>
          ) : null}
        </BrowserFrame>
      </div>

      <SparkleBurst start={apply + 4} x={540} y={1040} count={14} radius={200} duration={26} />

      {/* note under browser */}
      <div
        style={{
          position: "absolute",
          top: 1270,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 24,
          opacity:
            interpolate(frame, [116, 130], [0, 1], clamp) * (1 - Math.min(1, mess)),
          transform: `scale(${0.8 + 0.2 * popAt(frame, fps, 116, 12, 160)})`,
        }}
      >
        <NotePill color={C_ORANGE} fontSize={38} icon="✏️">
          <K color={C_ORANGE} size={38}>
            style
          </K>
          <span> جوه العنصر = تنسيق سريع</span>
        </NotePill>
      </div>

      {/* repeated-code warning overlay */}
      {mess > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 312,
            width: 1012,
            height: 990,
            borderRadius: 30,
            background: "rgba(20,6,18,0.94)",
            border: `3px solid ${C_RED}99`,
            boxShadow: `0 30px 90px rgba(0,0,0,0.65), 0 0 70px ${C_RED}33`,
            opacity: mess,
            transform: `scale(${0.94 + 0.06 * mess})`,
            overflow: "hidden",
            zIndex: 34,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,92,92,0.12) 0%, transparent 62%)",
            }}
          />
          <MessGrid frame={frame} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 48%, rgba(8,4,18,0.05) 0%, rgba(8,4,18,0.82) 62%, rgba(8,4,18,0.96) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 176,
                height: 176,
                borderRadius: "50%",
                background: "radial-gradient(circle,#3B0A1E,#1A0610)",
                border: `5px solid ${C_RED}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 96,
                boxShadow: `0 0 60px ${C_RED}88`,
                opacity: Math.min(1, warn),
                transform: `scale(${0.4 + 0.6 * warn}) rotate(${Math.sin(t * 4) * 4}deg)`,
              }}
            >
              ⚠️
            </div>
            <div
              style={{
                padding: "8px 26px",
                borderRadius: 100,
                background: C_RED,
                color: "#1A0610",
                fontFamily: MONO,
                fontSize: 34,
                fontWeight: 900,
                opacity: Math.min(1, warn),
                transform: `scale(${0.5 + 0.5 * warn})`,
                direction: "ltr",
              }}
            >
              × 100
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          top: 1340,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 40,
          opacity: Math.min(1, warningText),
          transform: `scale(${0.6 + 0.4 * warningText})`,
        }}
      >
        <NotePill color={C_RED} fontSize={50} icon="⚠️">
          مش عملية للموقع كامل!
        </NotePill>
      </div>
    </AbsoluteFill>
  );
};
