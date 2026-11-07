import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame, EditorFrame, clamp, popAt } from "../../css/parts";
import type { Line } from "../../css/parts";
import { Caption, C_DIV, MouseCursor, SceneShell, T_ATTR, T_PLAIN, T_STR, T_TAG } from "../parts";
import { DemoCard as Card } from "../art";

const CODE: Line[] = [
  {
    parts: [
      { t: "<", c: T_TAG },
      { t: "div", c: T_TAG },
      { t: " ", c: T_PLAIN },
      { t: "class", c: T_ATTR, hl: true, roundStart: true },
      { t: "=", c: T_PLAIN, hl: true },
      { t: '"card"', c: T_STR, hl: true, roundEnd: true },
      { t: ">", c: T_TAG },
    ],
  },
  {
    parts: [
      { t: "  <", c: T_TAG },
      { t: "h2", c: T_TAG },
      { t: ">", c: T_TAG },
      { t: "Title", c: T_PLAIN },
      { t: "</", c: T_TAG },
      { t: "h2", c: T_TAG },
      { t: ">", c: T_TAG },
    ],
  },
  {
    parts: [
      { t: "  <", c: T_TAG },
      { t: "img", c: T_TAG },
      { t: " ", c: T_PLAIN },
      { t: "src", c: T_ATTR },
      { t: "=", c: T_PLAIN },
      { t: '"photo.jpg"', c: T_STR },
      { t: ">", c: T_TAG },
    ],
  },
  {
    parts: [
      { t: "  <", c: T_TAG },
      { t: "button", c: T_TAG },
      { t: ">", c: T_TAG },
      { t: "Buy now", c: T_PLAIN },
      { t: "</", c: T_TAG },
      { t: "button", c: T_TAG },
      { t: ">", c: T_TAG },
    ],
  },
  { parts: [{ t: "</", c: T_TAG }, { t: "div", c: T_TAG }, { t: ">", c: T_TAG }] },
];

const TOTAL = CODE.reduce((a, l) => a + l.parts.reduce((b, p) => b + p.t.length, 0), 0);

/** Section 1 of "practical uses" — typing a card div and lifting it on hover. */
export const CardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const editor = popAt(frame, fps, 4, 14, 145);
  const typed = Math.round(interpolate(frame, [12, 84], [0, TOTAL], clamp));
  const browser = popAt(frame, fps, 88, 14, 150);
  const hover = interpolate(frame, [100, 120], [0, 1], clamp);
  const cursorX = interpolate(frame, [90, 112], [880, 470], clamp);
  const cursorY = interpolate(frame, [90, 112], [1330, 1120], clamp);

  return (
    <SceneShell seed={4}>
      <Caption appear={2} color={C_DIV} fontSize={52} style={{ top: 118 }}>
        الاستخدام الأشهر: Card 🎴
      </Caption>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 262,
          opacity: Math.min(1, editor),
          transform: `translateY(${(1 - editor) * 40}px)`,
        }}
      >
        <EditorFrame width={960} tab="index.html" language="HTML">
          <Code typed={typed} />
        </EditorFrame>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 770,
          opacity: Math.min(1, browser),
          transform: `scale(${0.94 + 0.06 * browser})`,
          transformOrigin: "50% 30%",
        }}
      >
        <BrowserFrame width={960} url="localhost:5500" bodyStyle={{ background: "#EEF2F7" }}>
          <div
            style={{
              height: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Card lifted={hover} white={1} pad={30} width={560} />
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 40,
                fontFamily: "monospace",
                fontSize: 30,
                fontWeight: 700,
                color: hover > 0.5 ? C_DIV : "#94A3B8",
                direction: "ltr",
              }}
            >
              {hover > 0.5 ? ":hover  →  translateY(-26px)" : ".card"}
            </div>
          </div>
        </BrowserFrame>
      </div>

      <div style={{ position: "absolute", inset: 0, opacity: hover > 0.02 ? 1 : 0 }}>
        <MouseCursor x={cursorX} y={cursorY} />
      </div>
    </SceneShell>
  );
};

const Code: React.FC<{ typed: number }> = ({ typed }) => (
  <div
    style={{
      fontFamily: "monospace",
      fontSize: 36,
      lineHeight: "58px",
      direction: "ltr",
      textAlign: "left",
      color: "#D4D4D4",
    }}
  >
    <TypedLines lines={CODE} left={typed} />
  </div>
);

const TypedLines: React.FC<{ lines: Line[]; left: number }> = ({ lines, left }) => {
  let rest = left;
  return (
    <>
      {lines.map((l, i) => {
        const len = l.parts.reduce((a, p) => a + p.t.length, 0);
        let parts = l.parts;
        let caret = false;
        if (rest <= 0) {
          parts = [];
        } else if (rest < len) {
          let n = rest;
          parts = [];
          for (const p of l.parts) {
            if (n <= 0) break;
            parts.push({ ...p, t: p.t.slice(0, n) });
            n -= p.t.length;
          }
          caret = true;
          rest = 0;
        } else {
          rest -= len;
        }
        return (
          <div key={i} style={{ whiteSpace: "pre", display: "flex", minHeight: 58 }}>
            <span style={{ width: 52, color: "#4B5563", textAlign: "right", paddingRight: 18, flexShrink: 0 }}>
              {i + 1}
            </span>
            <span>
              {parts.map((p, j) => (
                <span
                  key={j}
                  style={{
                    color: p.c ?? "#D4D4D4",
                    background: p.hl ? "rgba(255,107,53,0.22)" : undefined,
                    boxShadow: p.hl ? "inset 0 -3px 0 rgba(255,107,53,0.9)" : undefined,
                    borderRadius: p.hl ? "8px" : undefined,
                    padding: p.hl ? "2px 0" : undefined,
                  }}
                >
                  {p.t}
                </span>
              ))}
              {caret ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 4,
                    height: 46,
                    marginLeft: 2,
                    verticalAlign: "-8px",
                    background: "#22D3EE",
                  }}
                />
              ) : null}
            </span>
          </div>
        );
      })}
    </>
  );
};
