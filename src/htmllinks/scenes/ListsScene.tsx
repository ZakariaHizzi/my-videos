import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { BrowserMock } from "../../vscode/mocks";
import { VscodeWindow } from "../../vscode/mocks";
import {
  C_UL,
  C_LI,
  CopyPanel,
  RenderBulletList,
  TypedCodeBlock,
  cumChars,
  fadeUp,
  popAt,
} from "../parts";

const LINES = [
  "<ul>",
  '  <li>الرئيسية</li>',
  '  <li>من نحن</li>',
  "</ul>",
];

export const ListsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const total = cumChars(LINES, LINES.length);
  const typed = frame >= 20 ? Math.min(total, Math.floor((frame - 20) * 1.5)) : 0;
  const showList = frame >= 60;

  const cap1 = fadeUp(frame, 2, 22);
  const cap2 = fadeUp(frame, 50, 72);
  const win = popAt(frame, fps, 4, 14, 130);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={14} seed={7} colors={["#A855F7", "#F472B6", "#22D3EE"]} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 90,
          width: 860,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={860} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={typed} size={30} showPointer={typed < total} />
        </VscodeWindow>
      </div>

      {/* browser output */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 560,
          width: 860,
          zIndex: 10,
          opacity: Math.min(1, popAt(frame, fps, 140, 14, 130)),
          transform: `scale(${0.9 + 0.1 * popAt(frame, fps, 140, 14, 130)})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserMock width={860} url="my-site.com" bodyStyle={{ padding: 24, background: "#F8FAFC", minHeight: 260 }}>
          <div style={{ direction: "rtl", textAlign: "right", fontFamily: FONT, fontSize: 30, color: "#0F172A" }}>
            <div>قائمة الصفحات:</div>
            <div style={{ marginTop: 16 }}>
              {showList ? (
                <RenderBulletList items={["الرئيسية", "من نحن"]} width={760} fontSize={34} />
              ) : null}
            </div>
          </div>
        </BrowserMock>
      </div>

      {/* labels */}
      <div style={{ position: "absolute", top: 1280, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap1.opacity, transform: cap1.translate }}>
        <CopyPanel style={{ borderColor: `${C_UL}99` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ fontFamily: "monospace", direction: "ltr", unicodeBidi: "isolate", color: C_UL }}>{'<ul>'}</span> = قائمة نقطية <span>🔵</span>
          </div>
        </CopyPanel>
      </div>

      <div style={{ position: "absolute", top: 1500, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap2.opacity, transform: cap2.translate }}>
        <CopyPanel style={{ borderColor: `${C_LI}99` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ fontFamily: "monospace", direction: "ltr", unicodeBidi: "isolate", color: C_LI }}>{'<li>'}</span> = عنصر <span>📌</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
