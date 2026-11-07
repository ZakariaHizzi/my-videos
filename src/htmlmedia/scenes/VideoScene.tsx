import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { Twinkles } from "../../browser/parts";
import { AttrBadge, clamp, CopyPanel, popAt, TypedCode } from "../parts";
import { VideoPlayerArt } from "../art";

const CODE = '<video src="video.mp4"\n controls autoplay\n loop muted></video>';

const ROWS = [
  { icon: "📁", label: "src = الملف", color: "#9CDCFE", delay: 76 },
  { icon: "▶️", label: "controls = أزرار", color: "#22D3EE", delay: 129 },
  { icon: "⚡", label: "autoplay = تلقائي", color: "#FFD700", delay: 186 },
  { icon: "🔁", label: "loop = تكرار", color: "#A855F7", delay: 248 },
  { icon: "🔇", label: "muted = كتم", color: "#F472B6", delay: 286 },
];

/** 26-42s: the video tag and its five attributes. */
export const VideoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = popAt(frame, fps, 4, 15, 130);
  const win = popAt(frame, fps, 8, 15, 120);
  const typed = Math.round(interpolate(frame, [8, 300], [0, CODE.length], clamp));
  const player = popAt(frame, fps, 66, 13, 140);

  const pops = ROWS.map((r) => popAt(frame, fps, r.delay, 12, 165));

  const badges: { icon: string; color: string }[] = [];
  if (pops[1] > 0.5) badges.push({ icon: "▶️", color: "#22D3EE" });
  if (pops[2] > 0.5) badges.push({ icon: "⚡", color: "#FFD700" });
  if (pops[3] > 0.5) badges.push({ icon: "🔁", color: "#A855F7" });
  if (pops[4] > 0.5) badges.push({ icon: "🔇", color: "#F472B6" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", textAlign: "center", overflow: "hidden" }}>
      <Twinkles count={12} seed={33} />

      {/* title */}
      <div style={{ position: "absolute", top: 166, left: 50, right: 50, zIndex: 30, opacity: Math.min(1, title * 1.3) }}>
        <CopyPanel style={{ padding: "24px 44px", borderColor: "rgba(168,85,247,0.5)" }}>
          <div style={{ fontSize: 76, fontWeight: 900, color: "#fff" }}>&lt;video&gt; = فيديو 🎥</div>
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
        <VscodeWindow width={980} tab="index.html" showStatus={false}>
          <TypedCode code={CODE} typed={typed} size={30} pointer />
        </VscodeWindow>
      </div>

      {/* the video player */}
      <div
        style={{
          position: "absolute",
          top: 610,
          left: 108,
          zIndex: 18,
          opacity: Math.min(1, player * 1.4),
          transform: `scale(${0.84 + 0.16 * player})`,
          transformOrigin: "50% 40%",
        }}
      >
        <VideoPlayerArt width={864} badges={badges} />
      </div>

      {/* attribute rows */}
      <div
        style={{
          position: "absolute",
          top: 1150,
          left: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          zIndex: 26,
        }}
      >
        {ROWS.map((r, i) => {
          const s = pops[i];
          if (s <= 0.001) return null;
          return (
            <div key={r.label} style={{ opacity: Math.min(1, s * 1.4), transform: `scale(${0.62 + 0.38 * s})` }}>
              <AttrBadge icon={r.icon} label={r.label} color={r.color} fontSize={40} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
