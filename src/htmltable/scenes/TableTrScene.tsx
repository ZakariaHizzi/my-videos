import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, fadeUp } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import {
  C_TR,
  C_TABLE,
  TypedCodeBlock,
  TagChip,
  clamp,
  popAt,
  totalChars,
} from "../parts";

const WIN = { x: 70, w: 940 };

const LINES = ["<table>", "  <tr>", "  <tr>", "</table>"];
const TOTAL = totalChars(LINES);

const T0 = 8;
const T1 = 200;

/* Rows drawn in the "browser" to the right / below. */
const BrowserRow: React.FC<{ appear: number; label: string }> = ({
  appear,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 13, 150);
  if (s <= 0.001) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `3px dashed ${C_TR}`,
        borderRadius: 14,
        background: `${C_TR}18`,
        boxShadow: `0 0 22px ${C_TR}44`,
        padding: "22px 0",
        marginBottom: 18,
        opacity: Math.min(1, s),
        transform: `translateX(${(1 - s) * 80}px)`,
        fontFamily: FONT,
        fontSize: 40,
        fontWeight: 800,
        color: "#E2E8F0",
      }}
    >
      <span style={{ fontFamily: "monospace", color: C_TR }}>{label}</span>
      <span style={{ marginRight: 18, color: "rgba(255,255,255,0.55)" }}>
        صف فاضي (Row)
      </span>
    </div>
  );
};

/** 14-25s: type <table> with two <tr> rows — each tr becomes a horizontal row. */
export const TableTrScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = popAt(frame, fps, 2, 14, 130);
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );

  // rows appear as their <tr> is typed
  const row1 = T0 + (totalChars(LINES.slice(0, 2)) / TOTAL) * (T1 - T0);
  const row2 = T0 + (totalChars(LINES.slice(0, 3)) / TOTAL) * (T1 - T0);

  // "أول حاجة table لإنشاء الجدول" ≈ rel 0.3s (frame ~10–54) ·
  // "و TR اللي معناها Table Row أو صف" ≈ rel 3s (frame ~89).
  const cap1 = fadeUp(frame, 18, 42);
  const cap2 = fadeUp(frame, 89, 113);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={14} box={{ x: 20, y: 1320, w: 1040, h: 460 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 230,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={n} size={44} />
        </VscodeWindow>
      </div>

      {/* browser preview below */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 760,
          width: WIN.w,
          zIndex: 8,
          direction: "rtl",
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 0%",
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: "#0B1130",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 26px 66px rgba(0,0,0,0.55)",
            padding: 28,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              textAlign: "left",
              direction: "ltr",
              marginBottom: 16,
            }}
          >
            🔒 localhost:5500
          </div>
          <BrowserRow appear={row1} label="<tr>" />
          <BrowserRow appear={row2} label="<tr>" />
        </div>
      </div>

      {/* caption 1: table */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: `${C_TABLE}88` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <TagChip label="<table>" color={C_TABLE} fontSize={44} />
            <span> = الجدول كله 📊</span>
          </div>
        </CopyPanel>
      </div>

      {/* caption 2: tr */}
      <div
        style={{
          position: "absolute",
          top: 1560,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap2.opacity,
          transform: cap2.translate,
        }}
      >
        <CopyPanel style={{ borderColor: `${C_TR}88` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <TagChip label="<tr>" color={C_TR} fontSize={44} />
            <span> = صف (Row) ➖</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
