import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { Twinkles } from "../../browser/parts";
import { CopyPanel, popAt } from "../parts";
import { PhotoArt, VideoPlayerArt, Waveform } from "../art";

/** The blank page that fills with image → video → audio, sequentially. */
const MagicPage: React.FC<{ frame: number }> = ({ frame }) => {
  const img = popAt(frame, 30, 10, 12, 160);
  const vid = popAt(frame, 30, 32, 12, 160);
  const aud = popAt(frame, 30, 54, 12, 160);
  const w = 440;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      {/* colourful image */}
      <div
        style={{
          width: w,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 14px 34px rgba(0,0,0,0.3)",
          opacity: Math.min(1, img * 1.4),
          transform: `scale(${0.7 + 0.3 * img})`,
        }}
      >
        <PhotoArt />
      </div>

      {/* playing video */}
      <div
        style={{
          opacity: Math.min(1, vid * 1.4),
          transform: `scale(${0.7 + 0.3 * vid})`,
        }}
      >
        <VideoPlayerArt width={w} />
      </div>

      {/* audio waveform */}
      <div
        style={{
          width: w,
          height: 96,
          borderRadius: 18,
          background: "linear-gradient(120deg,#12162E,#241656)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          opacity: Math.min(1, aud * 1.4),
          transform: `scale(${0.7 + 0.3 * aud})`,
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: "linear-gradient(140deg,#22D3EE,#A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          ⏸
        </div>
        <Waveform bars={22} width={w - 62 - 60 - 36} height={62} color="#A855F7" />
      </div>
    </div>
  );
};

/** 0-6s hook: a blank page magically fills with media, then the promise. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = popAt(frame, fps, 4, 15, 130);
  const win = popAt(frame, fps, 16, 15, 120);
  const badge = popAt(frame, fps, 108, 11, 170);
  const glow = 0.5 + 0.5 * Math.sin(t * 5.2);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", textAlign: "center", overflow: "hidden" }}>
      <Twinkles count={16} seed={7} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: Math.min(1, title * 1.3),
          transform: `translateY(${(1 - title) * -40}px)`,
        }}
      >
        <CopyPanel style={{ padding: "28px 40px", borderColor: "rgba(125,211,252,0.5)" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.4, color: "#fff", textShadow: "0 8px 34px rgba(0,0,0,0.55)" }}>
            إزاي تضيف وسائط في موقعك؟ <span>🤔</span>
          </div>
        </CopyPanel>
      </div>

      {/* the magically-filling page */}
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 420,
          width: 680,
          zIndex: 10,
          opacity: Math.min(1, win),
          transform: `scale(${0.9 + 0.1 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserMock
          width={680}
          url="my-site.com"
          bodyStyle={{ padding: 28, minHeight: 712, background: "#F8FAFC", display: "flex", alignItems: "center" }}
        >
          <MagicPage frame={frame} />
        </BrowserMock>
      </div>

      {/* presenter pointing at the camera */}
      {/* golden promise badge */}
      <div
        style={{
          position: "absolute",
          top: 1280,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, badge * 1.5),
          transform: `scale(${0.55 + 0.45 * badge})`,
        }}
      >
        <div
          style={{
            padding: "22px 40px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 58,
            fontWeight: 900,
            boxShadow: `0 0 ${36 + glow * 48}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          3 وسوم + خصائصهم!
        </div>
      </div>
    </AbsoluteFill>
  );
};
