import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import { BrowserMock } from "../../vscode/mocks";
import { VscodeWindow } from "../../vscode/mocks";
import {
  C_LINK,
  C_HREF,
  C_TARGET,
  CopyPanel,
  TypedCodeBlock,
  cumChars,
  fadeUp,
  popAt,
} from "../parts";

const L1 = ['<a href="about.html">من نحن</a>'];
const L2 = ['<a href="about.html" target="_blank">من نحن</a>'];

export const ATagScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: type basic link
  const typed1 = Math.round(
    (frame >= 20 ? Math.min(cumChars(L1, 1), Math.floor((frame - 20) * 1.6)) : 0),
  );
  const click = frame >= 110 && frame <= 135;
  // Phase 2: type target version
  const typed2 = frame >= 150
    ? Math.min(cumChars(L2, 1), Math.floor((frame - 150) * 1.6))
    : 0;
  const showNewTab = frame >= 230;

  const cap1 = fadeUp(frame, 2, 22);
  const cap2 = fadeUp(frame, 76, 98);
  const cap3 = fadeUp(frame, 158, 180);

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
      <Twinkles count={14} seed={6} colors={["#3B82F6", "#FFD700", "#22D3EE"]} />

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
          {typed2 > 0 ? (
            <TypedCodeBlock lines={L2} typed={typed2} size={30} showPointer={typed2 < cumChars(L2, 1)} />
          ) : (
            <TypedCodeBlock lines={L1} typed={typed1} size={30} showPointer={typed1 < cumChars(L1, 1)} />
          )}
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
          opacity: Math.min(1, popAt(frame, fps, 90, 14, 130)),
          transform: `scale(${0.9 + 0.1 * popAt(frame, fps, 90, 14, 130)})`,
          transformOrigin: "50% 20%",
        }}
      >
        <BrowserMock width={860} url="my-site.com" bodyStyle={{ padding: 24, background: "#F8FAFC", minHeight: 260 }}>
          <div style={{ direction: "rtl", textAlign: "right", fontFamily: FONT, fontSize: 34, color: "#0F172A" }}>
            <div>مرحبا! اضغط على الرابط:</div>
            <div style={{ marginTop: 18 }}>
              <span
                style={{
                  color: C_LINK,
                  textDecoration: "underline",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: click ? "rgba(59,130,246,0.18)" : "transparent",
                  padding: "2px 6px",
                  borderRadius: 6,
                }}
              >
                من نحن
              </span>
            </div>
            {click ? (
              <div style={{ marginTop: 14, fontSize: 24, color: "#64748B" }}>→ الانتقال إلى about.html ...</div>
            ) : null}
          </div>
        </BrowserMock>
      </div>

      {/* new tab animation */}
      {showNewTab ? (
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 520,
            width: 360,
            zIndex: 20,
            opacity: Math.min(1, popAt(frame, fps, 230, 12, 150)),
            transform: `scale(${0.8 + 0.2 * popAt(frame, fps, 230, 12, 150)})`,
          }}
        >
          <div
            style={{
              borderRadius: 16,
              background: "#FFFFFF",
              border: "2px solid #CBD5E1",
              boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "10px 14px", background: "#E2E8F0", fontSize: 18, color: "#334155", direction: "ltr", textAlign: "left" }}>
              🆕 about.html (تاب جديد)
            </div>
            <div style={{ padding: 16, fontSize: 22, color: "#0F172A", direction: "rtl", textAlign: "right", fontFamily: FONT }}>
              من نحن — صفحة جديدة
            </div>
          </div>
        </div>
      ) : null}

      {/* labels */}
      <div style={{ position: "absolute", top: 1280, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap1.opacity, transform: cap1.translate }}>
        <CopyPanel style={{ borderColor: `${C_LINK}99` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ fontFamily: "monospace", direction: "ltr", unicodeBidi: "isolate", color: C_LINK }}>{'<a>'}</span> = رابط (Anchor) <span>🔗</span>
          </div>
        </CopyPanel>
      </div>

      <div style={{ position: "absolute", top: 1500, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap2.opacity, transform: cap2.translate }}>
        <CopyPanel style={{ borderColor: `${C_HREF}99` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ fontFamily: "monospace", direction: "ltr", unicodeBidi: "isolate", color: C_HREF }}>href</span> = الوجهة <span>📍</span>
          </div>
        </CopyPanel>
      </div>

      <div style={{ position: "absolute", top: 1720, left: 0, width: 1080, display: "flex", justifyContent: "center", zIndex: 20, opacity: cap3.opacity, transform: cap3.translate }}>
        <CopyPanel style={{ borderColor: `${C_TARGET}99` }}>
          <div style={{ fontSize: 46, fontWeight: 900, color: "#FFFFFF" }}>
            <span style={{ fontFamily: "monospace", direction: "ltr", unicodeBidi: "isolate", color: C_TARGET }}>target='_blank'</span> = تاب جديد <span>🆕</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
