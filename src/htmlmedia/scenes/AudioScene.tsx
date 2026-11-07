import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { Twinkles } from "../../browser/parts";
import { clamp, CopyPanel, popAt, TypedCode } from "../parts";
import { AudioPlayerArt } from "../art";

const CODE = '<audio src="song.mp3"\n controls autoplay loop></audio>';

const BADGES = [
  { t: "src", c: "#9CDCFE", d: 106 },
  { t: "controls", c: "#22D3EE", d: 157 },
  { t: "autoplay", c: "#FFD700", d: 199 },
  { t: "loop", c: "#A855F7", d: 257 },
];

/** 42-50s: the audio tag — same idea as video, just sound. */
export const AudioScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = popAt(frame, fps, 4, 15, 130);
  const win = popAt(frame, fps, 6, 15, 120);
  const typed = Math.round(interpolate(frame, [6, 140], [0, CODE.length], clamp));
  const player = popAt(frame, fps, 30, 13, 140);
  const combo = popAt(frame, fps, 268, 12, 160);
  const same = popAt(frame, fps, 54, 11, 170);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", textAlign: "center", overflow: "hidden" }}>
      <Twinkles count={12} seed={44} />

      {/* title */}
      <div style={{ position: "absolute", top: 166, left: 50, right: 50, zIndex: 30, opacity: Math.min(1, title * 1.3) }}>
        <CopyPanel style={{ padding: "24px 44px", borderColor: "rgba(34,211,238,0.5)" }}>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#fff" }}>&lt;audio&gt; = صوت 🎵</div>
        </CopyPanel>
      </div>

      {/* editor */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 50,
          zIndex: 20,
          opacity: Math.min(1, win),
          transform: `scale(${0.94 + 0.06 * win})`,
        }}
      >
        <VscodeWindow width={980} tab="index.html" showStatus={false} activityBar={false}>
          <TypedCode code={CODE} typed={typed} size={30} pointer />
        </VscodeWindow>
      </div>

      {/* the audio player */}
      <div
        style={{
          position: "absolute",
          top: 596,
          left: 90,
          zIndex: 18,
          opacity: Math.min(1, player * 1.4),
          transform: `scale(${0.86 + 0.14 * player})`,
          transformOrigin: "50% 40%",
        }}
      >
        <AudioPlayerArt width={900} />
      </div>

      {/* the combined attribute line */}
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 40,
          right: 40,
          opacity: Math.min(1, combo * 1.4),
          transform: `translateY(${(1 - combo) * 26}px)`,
          zIndex: 22,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 36px",
            borderRadius: 18,
            background: "rgba(6,10,30,0.95)",
            border: "3px solid #4EC9B0",
            boxShadow: "0 0 32px rgba(78,201,176,0.45)",
            fontFamily: MONO,
            fontSize: 46,
            fontWeight: 700,
            color: "#4EC9B0",
            direction: "ltr",
          }}
        >
          src + controls + autoplay + loop
        </div>
      </div>

      {/* attribute badges */}
      <div
        style={{
          position: "absolute",
          top: 970,
          left: 0,
          width: 1080,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 22,
          zIndex: 24,
        }}
      >
        {BADGES.map((b) => {
          const s = popAt(frame, fps, b.d, 12, 165);
          if (s <= 0.001) return null;
          return (
            <div key={b.t} style={{ opacity: Math.min(1, s * 1.4), transform: `scale(${0.6 + 0.4 * s})` }}>
              <div
                style={{
                  padding: "14px 30px",
                  borderRadius: 100,
                  background: "rgba(6,10,30,0.92)",
                  border: `3px solid ${b.c}`,
                  boxShadow: `0 0 26px ${b.c}66`,
                  color: b.c,
                  fontFamily: MONO,
                  fontSize: 38,
                  fontWeight: 700,
                  direction: "ltr",
                }}
              >
                {b.t}
              </div>
            </div>
          );
        })}
      </div>

      {/* same-concept callout */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 26,
          opacity: Math.min(1, same * 1.4),
          transform: `scale(${0.6 + 0.4 * same})`,
        }}
      >
        <div
          style={{
            padding: "26px 54px",
            borderRadius: 100,
            background: "linear-gradient(140deg,#22D3EE,#A855F7)",
            color: "#fff",
            fontSize: 66,
            fontWeight: 900,
            boxShadow: "0 0 44px rgba(99,102,241,0.6), 0 18px 44px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
          }}
        >
          نفس الفكرة! ✅
        </div>
      </div>
    </AbsoluteFill>
  );
};
