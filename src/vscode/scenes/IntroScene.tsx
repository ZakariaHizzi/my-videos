import React from "react";
import { interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp, pop } from "../theme";
import { CodeLine, SceneShell } from "../ui";
import { VscodeLogo, VscodeWindow } from "../mocks";

const CODE = [
  [{ t: "<!DOCTYPE html>", c: "#94A3B8" }],
  [{ t: '<html lang="ar">', c: "#7DD3FC" }],
  [
    { t: "  <h1>", c: "#7DD3FC" },
    { t: "أهلاً بك في موقعك!", c: "#F0ABFC" },
    { t: "</h1>", c: "#7DD3FC" },
  ],
  [
    { t: '  <button class="btn">', c: "#7DD3FC" },
    { t: "ابدأ الآن", c: "#FDE68A" },
    { t: "</button>", c: "#7DD3FC" },
  ],
  [
    { t: "  const ", c: "#C084FC" },
    { t: "site", c: "#E2E8F0" },
    { t: " = ", c: "#94A3B8" },
    { t: "await ", c: "#C084FC" },
    { t: "build()", c: "#86EFAC" },
    { t: ";", c: "#94A3B8" },
  ],
  [{ t: "</html>", c: "#7DD3FC" }],
];

/** 5-9.8s (voice.mp3): introduce Visual Studio Code. */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Synced to the voice.mp3 intro: "الإجابة في Visual Studio Code" 5.00-6.88s,
  // "المحرر اللي تكتب فيه كل أكوادك" 7.22-9.56s (scene starts at 5.00s).
  const logo = pop(frame, fps, 4);
  const title = fadeUp(frame, 20, 36);
  const sub = fadeUp(frame, 66, 82);

  // Smooth camera pan across the monitor.
  const panX = interpolate(frame, [0, 157], [-46, 46], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const camScale = interpolate(frame, [0, 157], [1.01, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const winIn = pop(frame, fps, 40);

  return (
    <SceneShell>
      <div
        style={{
          scale: `${logo}`,
          filter: `drop-shadow(0 0 ${26 * logo}px rgba(34,160,240,0.85))`,
        }}
      >
        <VscodeLogo size={190} />
      </div>
      <div style={{ height: 26 }} />
      {/* teaser while the voice says "الإجابة واحدة:" */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: "rgba(255,255,255,0.85)",
          opacity: interpolate(frame, [0, 8, 14, 22], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        المحرر اللي هتختاره؟ 🤔
      </div>
      <div
        style={{
          ...title,
          fontSize: 96,
          fontWeight: 900,
          color: COLORS.gold,
          letterSpacing: 1,
          direction: "ltr",
          textShadow: "0 6px 40px rgba(255,215,0,0.45)",
          lineHeight: 1.15,
        }}
      >
        Visual Studio Code
      </div>
      <div style={{ height: 18 }} />
      <div
        style={{
          ...sub,
          fontSize: 56,
          fontWeight: 800,
          color: "rgba(255,255,255,0.94)",
          lineHeight: 1.4,
        }}
      >
        المحرر اللي بتكتب فيه الأكواد
      </div>
      <div style={{ height: 54 }} />
      <div
        style={{
          scale: `${winIn * camScale}`,
          translate: `${panX}px 0px`,
          rotate: `${interpolate(frame, [0, 157], [-1.2, 1.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}deg`,
          opacity: Math.min(1, winIn),
        }}
      >
        <VscodeWindow width={940} tab="index.html">
          {CODE.map((parts, i) => (
            <CodeLine key={i} parts={parts} size={34} />
          ))}
          <div
            style={{
              fontFamily: MONO,
              fontSize: 34,
              lineHeight: 1.75,
              color: "#22D3EE",
            }}
          >
            ▍
          </div>
        </VscodeWindow>
      </div>
    </SceneShell>
  );
};
