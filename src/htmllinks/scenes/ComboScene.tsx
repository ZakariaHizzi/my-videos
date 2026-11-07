import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { BrowserMock } from "../../vscode/mocks";
import { VscodeWindow } from "../../vscode/mocks";
import {
  C_LINK,
  C_UL,
  C_LI,
  CopyPanel,
  RenderNavMenu,
  TypedCodeBlock,
  cumChars,
  fadeUp,
  popAt,
} from "../parts";

const LINES = [
  "<ul>",
  '  <li><a href="home.html">الرئيسية</a></li>',
  '  <li><a href="about.html" target="_blank">من نحن</a></li>',
  '  <li><a href="services.html">خدماتنا</a></li>',
  '  <li><a href="contact.html">اتصل بنا</a></li>',
  "</ul>",
];

export const ComboScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const total = cumChars(LINES, LINES.length);
  const typed = frame >= 16 ? Math.min(total, Math.floor((frame - 16) * 1.4)) : 0;
  const done = typed >= total - 4;

  // map typed progress to how many nav items to show
  const itemsShown = Math.min(4, Math.floor(typed / (total / 4)) + (typed > 40 ? 1 : 0));

  const cap1 = fadeUp(frame, 2, 22);
  const cap2 = fadeUp(frame, 300, 322);
  const win = popAt(frame, fps, 4, 14, 130);

  const navItems = [
    { label: "الرئيسية", active: true },
    { label: "من نحن" },
    { label: "خدماتنا" },
    { label: "اتصل بنا" },
  ].slice(0, Math.max(1, itemsShown));

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={11} colors={["#3B82F6", "#A855F7", "#F472B6"]} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 80,
          width: 900,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={900} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={typed} size={26} showPointer={typed < total} />
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
          opacity: Math.min(1, popAt(frame, fps, 60, 14, 130)),
          transform: `scale(${0.9 + 0.1 * popAt(frame, fps, 60, 14, 130)})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserMock width={860} url="my-site.com" bodyStyle={{ padding: 18, background: "#F8FAFC", minHeight: 200 }}>
          <div style={{ direction: "rtl", textAlign: "right", fontFamily: FONT, fontSize: 24, color: "#0F172A", marginBottom: 12 }}>
            قائمة التنقل:
          </div>
          <RenderNavMenu items={navItems} width={820} fontSize={26} />
        </BrowserMock>
      </div>

      {/* zoomed nested structure callout */}
      {done ? (
        <div
          style={{
            position: "absolute",
            top: 920,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            zIndex: 16,
            opacity: Math.min(1, popAt(frame, fps, 20, 12, 150)),
          }}
        >
          <div
            style={{
              padding: "14px 30px",
              borderRadius: 16,
              background: "rgba(6,10,30,0.92)",
              border: `3px solid ${C_UL}`,
              fontFamily: "monospace",
              fontSize: 30,
              fontWeight: 700,
              color: "#FFFFFF",
              direction: "ltr",
              boxShadow: `0 0 30px ${C_UL}55`,
            }}
          >
            <span style={{ color: C_UL }}>&lt;ul&gt;</span>
            <span style={{ color: "#94A3B8" }}> → </span>
            <span style={{ color: C_LI }}>&lt;li&gt;</span>
            <span style={{ color: "#94A3B8" }}> → </span>
            <span style={{ color: C_LINK }}>&lt;a&gt;</span>
          </div>
        </div>
      ) : null}

      {/* labels */}
      <div style={{ position: "absolute", top: 1280, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap1.opacity, transform: cap1.translate }}>
        <CopyPanel style={{ borderColor: "rgba(34,211,238,0.5)" }}>
          <div style={{ fontSize: 58, fontWeight: 900, color: "#FFFFFF" }}>
            🧭 قائمة التنقل:
          </div>
        </CopyPanel>
      </div>

      <div style={{ position: "absolute", top: 1520, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap2.opacity, transform: cap2.translate }}>
        <CopyPanel style={{ borderColor: `${C_UL}99` }}>
          <div style={{ fontSize: 46, fontWeight: 900, color: "#FFFFFF", fontFamily: "monospace", direction: "ltr" }}>
            &lt;ul&gt; → &lt;li&gt; → &lt;a&gt;
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
