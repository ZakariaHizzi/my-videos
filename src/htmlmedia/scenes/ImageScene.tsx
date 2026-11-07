import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { VscodeWindow, BrowserMock } from "../../vscode/mocks";
import { Twinkles } from "../../browser/parts";
import { AttrBadge, clamp, CopyPanel, popAt, TypedCode } from "../parts";
import { PhotoArt } from "../art";

const CODE = '<img src="photo.jpg" alt="وصف الصورة">';

/** 14-26s: the img tag — src, alt and the self-closing rule. */
export const ImageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = popAt(frame, fps, 4, 15, 130);
  const win = popAt(frame, fps, 10, 15, 120);
  const typed = Math.round(interpolate(frame, [10, 110], [0, CODE.length], clamp));
  const glowOn = frame >= 116;
  const shot = popAt(frame, fps, 110, 13, 150);
  const bSrc = popAt(frame, fps, 140, 12, 165);
  const bAlt = popAt(frame, fps, 196, 12, 165);
  const warn = popAt(frame, fps, 292, 11, 175);

  // cinematic push-in onto the editor while src/alt glow
  const zoom = interpolate(frame, [114, 144, 180, 212], [1, 1.18, 1.18, 1], clamp);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", textAlign: "center", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 24%" }}>
        <Twinkles count={12} seed={21} />

        {/* title */}
        <div
          style={{
            position: "absolute",
            top: 166,
            left: 50,
            right: 50,
            zIndex: 30,
            opacity: Math.min(1, title * 1.3),
          }}
        >
          <CopyPanel style={{ padding: "24px 44px", borderColor: "rgba(125,211,252,0.5)" }}>
            <div style={{ fontSize: 78, fontWeight: 900, color: "#fff" }}>&lt;img&gt; = صورة 🖼️</div>
          </CopyPanel>
        </div>

        {/* editor */}
        <div
          style={{
            position: "absolute",
            top: 320,
            left: 50,
            zIndex: 20,
            opacity: Math.min(1, win),
            transform: `scale(${0.94 + 0.06 * win})`,
          }}
        >
          <VscodeWindow width={980} tab="index.html" showStatus={false}>
            <TypedCode
              code={CODE}
              typed={typed}
              size={34}
              glowAttrs={["src", "alt"]}
              glowOn={glowOn}
              pointer
            />
          </VscodeWindow>
        </div>

        {/* browser preview — the photo appears instantly */}
        <div
          style={{
            position: "absolute",
            top: 620,
            left: 178,
            zIndex: 15,
            opacity: Math.min(1, shot * 1.4),
            transform: `scale(${0.86 + 0.14 * shot})`,
            transformOrigin: "50% 30%",
          }}
        >
          <BrowserMock width={724} url="my-site.com" bodyStyle={{ padding: 26, minHeight: 470, background: "#F8FAFC" }}>
            <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.28)" }}>
              <PhotoArt />
            </div>
          </BrowserMock>
        </div>

        {/* attribute call-outs */}
        <div
          style={{
            position: "absolute",
            top: 1200,
            left: 0,
            width: 1080,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 34,
            zIndex: 26,
          }}
        >
          <div style={{ opacity: Math.min(1, bSrc * 1.4), transform: `scale(${0.6 + 0.4 * bSrc})` }}>
            <AttrBadge icon="📍" label="src = مكان الصورة" color="#9CDCFE" />
          </div>
          <div style={{ opacity: Math.min(1, bAlt * 1.4), transform: `scale(${0.6 + 0.4 * bAlt})` }}>
            <AttrBadge icon="📝" label="alt = وصف بديل" color="#CE9178" />
          </div>
        </div>

        {/* self-closing warning */}
        <div
          style={{
            position: "absolute",
            top: 1520,
            left: 90,
            right: 90,
            zIndex: 26,
            opacity: Math.min(1, warn * 1.4),
            transform: `scale(${0.7 + 0.3 * warn})`,
          }}
        >
          <div
            style={{
              padding: "28px 32px",
              borderRadius: 24,
              background: "rgba(140,18,18,0.4)",
              border: "4px solid #FF4D4D",
              boxShadow: "0 0 42px rgba(255,77,77,0.55)",
              fontSize: 60,
              fontWeight: 900,
              color: "#FFD9D9",
              direction: "ltr",
            }}
          >
            ⚠️ Self-closing!
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
