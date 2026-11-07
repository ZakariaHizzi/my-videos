import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO, fadeUp } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { C_TD, C_TH, RenderTable, TagChip, clamp, popAt, type CellSpec } from "../parts";

const HEADERS = ["الاسم", "العمر", "المدينة"];

/* Frame offsets are relative to the scene start (abs 35.2s), cut to the voice:
   "بنستخدم th بدل td" (tags flip) ≈ rel 8–114 → TAG_SWAP ≈ 74 ·
   "الفرق؟ th بيخلي النص غامق وفي النص" (cells become header) ≈ rel 123–237 →
   CELL_TRANSFORM ≈ 148. */
/* moment the <td> tag flips to <th> in the editor */
const TAG_SWAP = 74;
/* moment the row's cells visually become header cells (bold + centred) */
const CELL_TRANSFORM = 148;

/** A single-row table used for the td-vs-th comparison. */
const RowTable: React.FC<{
  kind: "td" | "th";
  cells: string[];
  appear: number;
  transformAt?: number; // td row visually becomes bold/centred at this frame
}> = ({ kind, cells, appear, transformAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = popAt(frame, fps, appear, 13, 155);
  if (s <= 0.001) return null;

  // for the th row, animate weight/align from td-look to th-look
  const p =
    transformAt === undefined
      ? 1
      : interpolate(frame, [transformAt, transformAt + 16], [0, 1], clamp);
  const isTh = kind === "th" ? p : 0;
  const flash =
    transformAt === undefined
      ? 0
      : interpolate(frame, [transformAt, transformAt + 22], [1, 0], clamp);

  const rows: CellSpec[][] = [
    cells.map((text) => ({ text, kind: kind as "td" | "th", appear: appear })),
  ];

  return (
    <div
      style={{
        opacity: Math.min(1, s),
        transform: `scale(${0.9 + 0.1 * s})`,
        position: "relative",
      }}
    >
      <RenderTable
        rows={rows}
        width={430}
        fontSize={40}
        cellFlash={(r) => (r === 0 && flash > 0 ? flash : 0)}
        style={{
          // blend between td (right/normal) and th (centre/bold)
          fontWeight: isTh > 0.5 ? 900 : 500,
        }}
      />
      {/* overlay cells to animate the weight/align change smoothly */}
      <div
        style={{
          position: "absolute",
          inset: 3,
          display: "flex",
          direction: "rtl",
          fontFamily: FONT,
        }}
      >
        {cells.map((text, c) => (
          <div
            key={c}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              padding: "0 10px",
              color: isTh > 0.5 ? "#1D4ED8" : "#0F172A",
              fontWeight: Math.round(interpolate(p, [0, 1], [500, 900])),
              textShadow:
                flash > 0.1
                  ? `0 0 ${18 * flash}px rgba(255,215,0,${flash})`
                  : "none",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

/** 38-48s: change <td> to <th> — text turns bold + centred automatically. */
export const ThScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const win = popAt(frame, fps, 2, 14, 130);
  const swap = popAt(frame, fps, TAG_SWAP, 11, 175);
  // cap1 "<th> = عنوان" as the tag is introduced ("بنستخدم th بدل td")
  const cap1 = fadeUp(frame, 6, 28);
  // cap2 "غامق + في النص" when the cells actually transform
  const cap2 = fadeUp(frame, CELL_TRANSFORM + 6, CELL_TRANSFORM + 30);
  const gold = 0.5 + 0.5 * Math.sin(t * 5);

  // editor code: header row whose tags flip td -> th
  const editorTag = frame >= TAG_SWAP ? "th" : "td";

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={12} seed={31} colors={["#F472B6", "#FFD700"]} />

      {/* caption top */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: `${C_TH}88` }}>
          <div style={{ fontSize: 60, fontWeight: 900, color: "#FFFFFF" }}>
            <TagChip label="<th>" color={C_TH} fontSize={48} />
            <span> = عنوان (Header) 🏷️</span>
          </div>
        </CopyPanel>
      </div>

      {/* editor: <tr> full of tags that flip td -> th */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 360,
          width: 940,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.94 + 0.06 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={940} tab="index.html" language="HTML">
          <div
            style={{
              fontFamily: MONO,
              fontSize: 40,
              lineHeight: 1.75,
              direction: "ltr",
              textAlign: "left",
              whiteSpace: "pre",
              color: "#D4D4D4",
            }}
          >
            <div>
              <span style={{ color: "#569CD6" }}>  {"<tr>"}</span>
            </div>
            {HEADERS.map((header, i) => (
              <div key={i}>
                <span style={{ color: "#569CD6" }}>
                  {"    <" + editorTag + ">"}
                </span>
                {/* isolate the Arabic run so bidi doesn't reverse it inside the LTR code view */}
                <span
                  style={{
                    color: "#CE9178",
                    direction: "rtl",
                    unicodeBidi: "isolate",
                  }}
                >
                  {header}
                </span>
                <span style={{ color: "#569CD6" }}>
                  {"</" + editorTag + ">"}
                  {frame >= TAG_SWAP && i === 0 ? (
                    <span
                      style={{
                        marginLeft: 22,
                        color: "#FFD700",
                        fontSize: 30,
                        fontWeight: 700,
                        direction: "rtl",
                        unicodeBidi: "isolate",
                      }}
                    >
                      ← اتغير!
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
            <div>
              <span style={{ color: "#569CD6" }}>  {"</tr>"}</span>
            </div>
          </div>
        </VscodeWindow>
      </div>

      {/* side-by-side comparison: td (normal) vs th (bold + centred) */}
      <div
        style={{
          position: "absolute",
          top: 940,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 40,
          zIndex: 14,
          direction: "ltr",
        }}
      >
        {/* td column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <TagChip label="<td> عادي" color={C_TD} fontSize={36} />
          <RowTable kind="td" cells={HEADERS} appear={20} />
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 800,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            وزن عادي · على اليمين
          </div>
        </div>

        {/* arrow */}
        <div
          style={{
            fontSize: 66,
            color: "#FFD700",
            marginTop: 120,
            textShadow: `0 0 22px rgba(255,215,0,${0.4 + gold * 0.5})`,
            opacity: Math.min(1, swap * 1.4),
            transform: `scale(${0.6 + 0.4 * swap})`,
          }}
        >
          ←
        </div>

        {/* th column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <TagChip
            label={frame >= TAG_SWAP ? "<th> غامق" : "<td> عادي"}
            color={C_TH}
            fontSize={36}
          />
          <RowTable
            kind="th"
            cells={HEADERS}
            appear={40}
            transformAt={CELL_TRANSFORM}
          />
          <div
            style={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: 800,
              color: "#F9A8D4",
              opacity: interpolate(
                frame,
                [CELL_TRANSFORM, CELL_TRANSFORM + 18],
                [0, 1],
                clamp
              ),
            }}
          >
            غامق + في النص ✨
          </div>
        </div>
      </div>

      {/* caption bottom */}
      <div
        style={{
          position: "absolute",
          top: 1520,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 22,
          opacity: cap2.opacity,
          transform: cap2.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(255,215,0,0.5)" }}>
          <div style={{ fontSize: 50, fontWeight: 900, color: "#FFFFFF" }}>
            غامق + في النص تلقائياً <span>⚡</span>
          </div>
        </CopyPanel>
      </div>

      {/* little values hint under the tables to show it's real data */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 0,
          width: 1080,
          textAlign: "center",
          fontSize: 34,
          fontWeight: 700,
          color: "rgba(255,255,255,0.6)",
          opacity: interpolate(frame, [40, 64], [0, 1], clamp),
          zIndex: 12,
        }}
      >
        الصف الأول بيبقى عناوين، والباقي بيانات 👇
      </div>
    </AbsoluteFill>
  );
};
