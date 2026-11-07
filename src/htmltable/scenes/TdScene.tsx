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
  C_TD,
  C_TABLE,
  C_TR,
  RenderTable,
  TypedCodeBlock,
  TagChip,
  clamp,
  popAt,
  cumChars,
  totalChars,
  type CellSpec,
} from "../parts";

const WIN = { x: 70, w: 940 };

const LINES = [
  "<table>",
  "  <tr>",
  "    <td>الاسم</td>",
  "    <td>العمر</td>",
  "    <td>المدينة</td>",
  "  </tr>",
  "</table>",
];
const TOTAL = totalChars(LINES);

const T0 = 10;
const T1 = 170;

/* frame at which the k-th td line finishes typing */
const tdFrame = (lineIndex: number) =>
  T0 + (cumChars(LINES, lineIndex + 1) / TOTAL) * (T1 - T0);

const HEADERS = ["الاسم", "العمر", "المدينة"];

/** 25-38s: fill a row with three <td> data cells, then zoom into the result. */
export const TdScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = popAt(frame, fps, 2, 14, 130);
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );

  // the single data row fills cell by cell as each <td> is typed
  const rows: CellSpec[][] = [
    HEADERS.map((text, c) => ({
      text,
      kind: "td" as const,
      appear: tdFrame(2 + c),
    })),
  ];

  // gentle zoom toward the browser cells after typing completes
  const zoom = interpolate(frame, [T1 + 8, T1 + 44], [1, 1.2], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  // "table data / خلية البيانات" ≈ 29.3s (rel ~81) · "كل td = خانة واحدة" ≈ 32.5s (rel ~176)
  const cap1 = fadeUp(frame, 81, 104);
  const cap2 = fadeUp(frame, 176, 198);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={22} box={{ x: 20, y: 1320, w: 1040, h: 460 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 180,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.94 + 0.06 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={n} size={38} />
        </VscodeWindow>
      </div>

      {/* browser preview below, gently zooming on the finished row */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 900,
          width: WIN.w,
          zIndex: 8,
          direction: "rtl",
          opacity: Math.min(1, win),
          transform: `scale(${(0.94 + 0.06 * win) * zoom})`,
          transformOrigin: "50% 30%",
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: "#0B1130",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 26px 66px rgba(0,0,0,0.55)",
            padding: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              color: "rgba(255,255,255,0.45)",
              textAlign: "left",
              direction: "ltr",
              position: "absolute",
              top: 14,
              left: 24,
            }}
          >
            🔒 localhost:5500
          </div>
          <RenderTable
            rows={rows}
            width={820}
            fontSize={44}
            style={{ marginTop: 26 }}
          />
        </div>
      </div>

      {/* caption 1 */}
      <div
        style={{
          position: "absolute",
          top: 1380,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: `${C_TD}88` }}>
          <div style={{ fontSize: 54, fontWeight: 900, color: "#FFFFFF" }}>
            <TagChip label="<td>" color={C_TD} fontSize={44} />
            <span> = خلية (Data) 📦</span>
          </div>
        </CopyPanel>
      </div>

      {/* caption 2 */}
      <div
        style={{
          position: "absolute",
          top: 1580,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap2.opacity,
          transform: cap2.translate,
        }}
      >
        <CopyPanel style={{ borderColor: `${C_TABLE}55`, padding: "20px 40px" }}>
          <div style={{ fontSize: 46, fontWeight: 800, color: "#E2E8F0" }}>
            كل <TagChip label="<td>" color={C_TD} fontSize={38} /> = خانة واحدة
            <span style={{ color: C_TR, marginRight: 10 }}> ➕</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
