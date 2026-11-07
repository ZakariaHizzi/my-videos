import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EditorFrame, clamp, popAt } from "../../css/parts";
import type { Line } from "../../css/parts";
import {
  Caption,
  Chip,
  C_BLUE,
  C_DIV,
  C_RED,
  K,
  SceneShell,
  T_ATTR,
  T_PLAIN,
  T_STR,
  T_TAG,
} from "../parts";

/* <div> wrapping a heading, a paragraph and an image. */
const CODE: Line[] = [
  { parts: [{ t: "<", c: T_TAG }, { t: "div", c: T_TAG }, { t: ">", c: T_TAG }] },
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
      { t: "p", c: T_TAG },
      { t: ">", c: T_TAG },
      { t: "Text...", c: T_PLAIN },
      { t: "</", c: T_TAG },
      { t: "p", c: T_TAG },
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
      { t: '"pic.jpg"', c: T_STR },
      { t: ">", c: T_TAG },
    ],
  },
  { parts: [{ t: "</", c: T_TAG }, { t: "div", c: T_TAG }, { t: ">", c: T_TAG }] },
];

/* The three inner blocks: scattered first, then snapped into place. */
const ITEMS: { key: string; dx: number; dy: number; r: number; appear: number }[] = [
  { key: "h", dx: -170, dy: -60, r: -9, appear: 36 },
  { key: "p1", dx: 190, dy: -30, r: 7, appear: 66 },
  { key: "p2", dx: 160, dy: 40, r: -6, appear: 66 },
  { key: "img", dx: -140, dy: 90, r: 11, appear: 96 },
];

export const WhatIsDivScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const box = popAt(frame, fps, 24, 13, 150);
  const code = popAt(frame, fps, 30, 14, 145);

  return (
    <SceneShell seed={2}>
      <Caption appear={2} color={C_DIV} fontSize={58} style={{ top: 118 }}>
        <K color="#FFFFFF">div</K> = حاوية عامة 📦
      </Caption>
      <Caption appear={26} color="#22D3EE" fontSize={46} style={{ top: 272 }}>
        زي &apos;علبة&apos; للعناصر
      </Caption>
      <Caption appear={52} color={C_RED} fontSize={46} style={{ top: 382 }}>
        ⚠️ مفيش شكل افتراضي
      </Caption>

      {/* the transparent container */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 500,
          width: 900,
          height: 510,
          zIndex: 8,
          opacity: Math.min(1, box),
          transform: `scale(${0.86 + 0.14 * box})`,
          transformOrigin: "50% 40%",
        }}
      >
        <svg
          width={900}
          height={510}
          viewBox="0 0 900 510"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <rect
            x="4"
            y="4"
            width="892"
            height="502"
            rx="34"
            fill="rgba(255,107,53,0.10)"
            stroke={C_DIV}
            strokeWidth="6"
            strokeDasharray="30 20"
            strokeDashoffset={-frame * 1.4}
          />
        </svg>
        <div style={{ position: "absolute", top: -34, right: 46 }}>
          <div
            style={{
              padding: "10px 30px",
              borderRadius: 14,
              background: "rgba(6,10,30,0.96)",
              border: `3px solid ${C_DIV}`,
              boxShadow: `0 0 26px ${C_DIV}88`,
              color: C_DIV,
              fontFamily: "monospace",
              fontSize: 38,
              fontWeight: 700,
              direction: "ltr",
            }}
          >
            {"<div>"}
          </div>
        </div>

        {ITEMS.map((it) => {
          const org = interpolate(frame, [it.appear, it.appear + 26], [0, 1], clamp);
          if (org <= 0.001) return null;
          const common = {
            position: "absolute" as const,
            right: 60,
            borderRadius: 14,
            border: "3px solid rgba(255,255,255,0.55)",
            opacity: Math.min(1, org * 1.4),
            transform: `translate(${(1 - org) * it.dx}px, ${(1 - org) * it.dy}px) rotate(${
              (1 - org) * it.r
            }deg)`,
          };
          if (it.key === "h")
            return (
              <div
                key={it.key}
                style={{
                  ...common,
                  top: 74,
                  width: 460,
                  height: 76,
                  background: `linear-gradient(90deg, ${C_DIV}, #FFB27A)`,
                }}
              />
            );
          if (it.key === "img")
            return (
              <div
                key={it.key}
                style={{
                  ...common,
                  top: 296,
                  width: 340,
                  height: 158,
                  background: `linear-gradient(135deg, ${C_BLUE}, #22D3EE 55%, #A855F7)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 62,
                }}
              >
                🖼️
              </div>
            );
          return (
            <div
              key={it.key}
              style={{
                ...common,
                top: it.key === "p1" ? 190 : 238,
                width: it.key === "p1" ? 740 : 610,
                height: 30,
                background: "rgba(255,255,255,0.55)",
              }}
            />
          );
        })}
      </div>

      {/* the code behind the box */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1090,
          zIndex: 8,
          opacity: Math.min(1, code),
          transform: `translateY(${(1 - code) * 40}px)`,
        }}
      >
        <EditorFrame width={900} tab="index.html" language="HTML">
          <EditorCode />
        </EditorFrame>
      </div>

      <Chip label="<div>" x={200} y={1660} color={C_DIV} appear={70} rotate={-6} />
      <Chip label="</div>" x={640} y={1690} color="#22D3EE" appear={82} rotate={5} />
    </SceneShell>
  );
};

const EditorCode: React.FC = () => (
  <div
    style={{
      fontFamily: "monospace",
      fontSize: 40,
      lineHeight: "65px",
      direction: "ltr",
      textAlign: "left",
      color: "#D4D4D4",
    }}
  >
    {CODE.map((l, i) => (
      <div key={i} style={{ whiteSpace: "pre", display: "flex", minHeight: 65 }}>
        <span style={{ width: 56, color: "#4B5563", textAlign: "right", paddingRight: 18, flexShrink: 0 }}>
          {i + 1}
        </span>
        <span>
          {l.parts.map((p, j) => (
            <span key={j} style={{ color: p.c ?? "#D4D4D4" }}>
              {p.t}
            </span>
          ))}
        </span>
      </div>
    ))}
  </div>
);
