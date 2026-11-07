import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import {
  C_CYAN,
  C_GOLD,
  C_GREEN,
  C_ORANGE,
  C_PURPLE,
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

const IND = "    ";

const LINK_PARTS: Part[] = [
  { t: IND },
  { t: "<link", c: T_TAG },
  { t: " " },
  { t: "rel", c: T_ATTR, hl: true, roundStart: true },
  { t: "=" },
  { t: '"stylesheet"', c: T_STR, hl: true },
  { t: " " },
  { t: "href", c: T_ATTR, hl: true },
  { t: "=" },
  { t: '"style.css"', c: T_STR, hl: true, roundEnd: true },
  { t: ">", c: T_TAG },
];

const LINES: Line[] = [
  { parts: [{ t: "<!DOCTYPE html>", c: T_TAG }] },
  { parts: [{ t: "<html>", c: T_TAG }] },
  { parts: [{ t: "  <head>", c: T_TAG }] },
  { parts: LINK_PARTS, active: true },
  { parts: [{ t: "  </head>", c: T_TAG }] },
  { parts: [{ t: "  <body>", c: T_TAG }] },
  {
    parts: [
      { t: "    " },
      { t: "<h1>", c: T_TAG },
      { t: "مرحباً", c: "#E6EDF3", style: { fontFamily: FONT, direction: "rtl", unicodeBidi: "isolate" } },
      { t: "</h1>", c: T_TAG },
    ],
  },
  { parts: [{ t: "  </body>", c: T_TAG }] },
  { parts: [{ t: "</html>", c: T_TAG }] },
];

const LINK_LEN = totalLen([{ parts: LINK_PARTS }]);
const TAG_ONLY = IND.length + "<link".length;
const LINE_H = 51;

const FileNode: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  appear: number;
  width?: number;
}> = ({ title, subtitle, icon, color, appear, width = 210 }) => (
  <div
    style={{
      width,
      height: 152,
      borderRadius: 22,
      background: "rgba(5,10,30,0.92)",
      border: `3px solid ${color}aa`,
      boxShadow: `0 14px 38px rgba(0,0,0,0.45), 0 0 34px ${color}33`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      opacity: Math.min(1, appear),
      transform: `scale(${0.65 + 0.35 * appear})`,
    }}
  >
    <div style={{ height: 62, display: "flex", alignItems: "center", fontSize: 48 }}>{icon}</div>
    <div
      style={{
        fontFamily: MONO,
        fontSize: 27,
        fontWeight: 900,
        color,
        direction: "ltr",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </div>
    <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: "#CBD5E1" }}>
      {subtitle}
    </div>
  </div>
);

const Arrow: React.FC<{ color: string; appear: number; delay: number }> = ({
  color,
  appear,
  delay,
}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        opacity: appear,
        transform: `translateX(${(1 - appear) * -10}px)`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            fontSize: 34,
            color,
            opacity: 0.35 + 0.65 * Math.abs(Math.sin(t * 5 - i * 0.9 + delay)),
            textShadow: `0 0 14px ${color}`,
          }}
        >
          ➜
        </div>
      ))}
    </div>
  );
};

export const ExternalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const head = fadeUp(frame, 0, 14);
  const editor = popAt(frame, fps, 10, 14, 140);

  const typed = Math.round(
    interpolate(frame, [30, 58, 78, 142], [0, TAG_ONLY, TAG_ONLY, LINK_LEN], clamp),
  );
  const complete = typed >= LINK_LEN;
  const gap = interpolate(frame, [54, 64, 86, 98], [0, 1, 1, 0], clamp);
  const headBox = interpolate(frame, [142, 160], [0, 1], clamp);
  const note = popAt(frame, fps, 150, 12, 165);
  const legend = popAt(frame, fps, 170, 12, 165);

  const n1 = popAt(frame, fps, 12, 12, 160);
  const n2 = popAt(frame, fps, 20, 12, 160);
  const n3 = popAt(frame, fps, 28, 12, 160);
  const a1 = popAt(frame, fps, 16, 12, 160);
  const a2 = popAt(frame, fps, 32, 12, 160);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
      <Twinkles count={15} seed={21} />

      <div style={{ opacity: head.opacity, transform: head.transform }}>
        <HeadlinePanel color={C_GREEN} step="2" fontSize={56}>
          الطريقة 2: ملف خارجي ✅
        </HeadlinePanel>
      </div>

      {/* diagram */}
      <div
        style={{
          position: "absolute",
          top: 292,
          left: 0,
          width: 1080,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          zIndex: 18,
          direction: "ltr",
        }}
      >
        <FileNode
          title="style.css"
          subtitle="ملف التنسيق"
          icon={
            <svg width={54} height={58} viewBox="0 0 100 110">
              <path d="M12 4h76l-8 84-30 18-30-18z" fill="#1B3FA8" stroke="#7DD3FC" strokeWidth="4" />
              <path d="M50 14v88l24-14 6-74z" fill="#0F2A70" />
              <text x="50" y="72" textAnchor="middle" fontSize="44" fontWeight="900" fill="#7DD3FC">
                #
              </text>
            </svg>
          }
          color={C_CYAN}
          appear={n1}
          width={220}
        />
        <Arrow color={C_GOLD} appear={Math.min(1, a1)} delay={0} />
        <FileNode
          title="<link>"
          subtitle="وسم الربط"
          icon={<span style={{ fontSize: 46, fontFamily: MONO, color: C_GOLD }}>🔗</span>}
          color={C_GOLD}
          appear={n2}
          width={190}
        />
        <Arrow color={C_GOLD} appear={Math.min(1, a2)} delay={1} />
        <FileNode
          title="<head>"
          subtitle="جوه الرأس"
          icon={<span style={{ fontSize: 46 }}>📍</span>}
          color={C_PURPLE}
          appear={n3}
          width={190}
        />
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 566,
          width: 984,
          zIndex: 12,
          opacity: Math.min(1, editor),
          transform: `scale(${0.94 + 0.06 * editor})`,
          transformOrigin: "50% 0%",
        }}
      >
        <EditorFrame
          width={984}
          tab="index.html"
          tabs={["index.html", "style.css"]}
          language="HTML"
          statusLine="Ln 4, Col 47"
        >
          <CodeBlock
            lines={[
              ...LINES.slice(0, 3),
              { parts: [], active: true },
              ...LINES.slice(4),
            ]}
            fontSize={31}
            lineHeight={LINE_H}
          />
          <div
            style={{
              position: "absolute",
              left: 94,
              top: 22 + LINE_H * 3,
              width: 868,
              height: LINE_H,
            }}
          >
            <CodeBlock
              lines={[{ parts: LINK_PARTS, active: true }]}
              typed={typed}
              fontSize={31}
              lineHeight={LINE_H}
              lineNumbers={false}
              caret
            />
          </div>

          {/* <head> block highlight */}
          <div
            style={{
              position: "absolute",
              left: 82,
              top: 22 + LINE_H * 2 - 5,
              width: 858,
              height: LINE_H * 3 + 10,
              borderRadius: 12,
              border: `3px dashed ${C_GREEN}`,
              opacity: headBox * 0.85,
              boxShadow: `0 0 26px ${C_GREEN}44, inset 0 0 26px ${C_GREEN}11`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 22,
              top: 22 + LINE_H * 2 + 4,
              fontSize: 34,
              opacity: headBox,
              filter: `drop-shadow(0 0 12px ${C_GOLD})`,
            }}
          >
            📍
          </div>
        </EditorFrame>
      </div>

      {/* animated pointer to the attribute gap */}
      <div
        style={{
          position: "absolute",
          left: 289,
          top: 566 + 54 + 22 + LINE_H * 3 + 5,
          width: 8,
          height: 42,
          borderRadius: 4,
          background: C_ORANGE,
          boxShadow: `0 0 22px ${C_ORANGE}, 0 0 50px ${C_ORANGE}99`,
          zIndex: 45,
          opacity: gap,
          transform: `scaleY(${0.85 + Math.abs(Math.sin(t * 7)) * 0.25})`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 300,
          top: 566 + 54 + 22 + LINE_H * 3 + 25,
          width: 286,
          borderTop: `3px dashed ${C_ORANGE}`,
          opacity: gap * 0.8,
          zIndex: 44,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 596,
          top: 566 + 54 + 22 + LINE_H * 3 - 12,
          zIndex: 46,
          opacity: gap,
          transform: `translateX(${(1 - gap) * -14}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.96)",
            border: `3px solid ${C_ORANGE}`,
            boxShadow: `0 0 34px ${C_ORANGE}66, 0 12px 30px rgba(0,0,0,0.5)`,
            direction: "ltr",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 32, fontWeight: 900, color: C_ORANGE }}>
            rel + href
          </span>
          <span style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
            👈
          </span>
        </div>
      </div>

      <SparkleBurst start={78} x={310} y={860} count={10} radius={110} duration={22} />

      {/* note: link inside head */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, note),
          transform: `scale(${0.72 + 0.28 * note})`,
        }}
      >
        <NotePill color={C_GREEN} fontSize={48} icon="✅">
          <K color={C_GREEN} size={48}>
            &lt;link&gt;
          </K>
          <span> جوه </span>
          <K color={C_PURPLE} size={48}>
            &lt;head&gt;
          </K>
          <span> 📍</span>
        </NotePill>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1382,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: Math.min(1, legend),
          transform: `translateY(${(1 - legend) * 20}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "14px 34px",
            borderRadius: 100,
            background: "rgba(5,10,30,0.88)",
            border: `2px solid ${C_ORANGE}66`,
            direction: "rtl",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 32, fontWeight: 900, color: C_ORANGE, direction: "ltr" }}>
            rel + href
          </span>
          <span style={{ fontFamily: FONT, fontSize: 26, fontWeight: 800, color: "#CBD5E1" }}>
            خصائص وسم الرابط
          </span>
        </div>
      </div>

      {/* file-created toast */}
      <div
        style={{
          position: "absolute",
          top: 1330,
          right: 70,
          padding: "10px 20px",
          borderRadius: 12,
          background: "rgba(5,10,30,0.9)",
          border: `2px solid ${C_CYAN}77`,
          color: C_CYAN,
          fontFamily: MONO,
          fontSize: 22,
          opacity: interpolate(frame, [16, 24, 60, 70], [0, 1, 1, 0], clamp),
          transform: `translateY(${interpolate(frame, [16, 24], [12, 0], clamp)}px)`,
          direction: "ltr",
          zIndex: 32,
        }}
      >
        + style.css {complete ? "✓" : ""}
      </div>
    </AbsoluteFill>
  );
};
