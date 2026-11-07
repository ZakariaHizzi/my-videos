import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, fadeUp } from "../../vscode/theme";
import { BrowserMock } from "../../vscode/mocks";
import { CopyPanel } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import { C_TABLE, C_TD, C_TH, C_TR, popAt } from "../parts";

const CHIPS = [
  { t: "<table>", c: C_TABLE, x: 40, y: 1620, rot: -7 },
  { t: "<tr>", c: C_TR, x: 830, y: 1600, rot: 8 },
  { t: "<td>", c: C_TD, x: 120, y: 1790, rot: 6 },
  { t: "<th>", c: C_TH, x: 800, y: 1780, rot: -6 },
];

/* A colourful schedule table that fills in cell by cell. */
const HEADERS = ["السبت", "الأحد", "الاثنين"];
const SUBJECTS = ["رياضيات", "علوم", "تاريخ"];
const PALETTE = ["#22D3EE", "#A855F7", "#FFD700", "#F472B6", "#34D399", "#60A5FA"];

const Schedule: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const grid = popAt(frame, fps, 20, 15, 120);

  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: FONT,
        borderCollapse: "separate",
        borderSpacing: 0,
        opacity: Math.min(1, grid),
        transform: `scale(${0.9 + 0.1 * grid})`,
      }}
    >
      {/* header row */}
      <div style={{ display: "flex" }}>
        <div style={{ width: 180 }} />
        {HEADERS.map((h, i) => {
          const a = popAt(frame, fps, 34 + i * 6, 12, 170);
          return (
            <div
              key={h}
              style={{
                flex: 1,
                padding: "16px 0",
                background: "linear-gradient(180deg,#1E3A8A,#312E81)",
                color: "#FFF",
                fontWeight: 900,
                fontSize: 34,
                textAlign: "center",
                borderLeft: "2px solid #0B1130",
                opacity: Math.min(1, a * 1.4),
                transform: `translateY(${(1 - a) * -14}px)`,
              }}
            >
              {h}
            </div>
          );
        })}
      </div>
      {/* subject rows */}
      {SUBJECTS.map((sName, r) => (
        <div key={sName} style={{ display: "flex" }}>
          <div
            style={{
              width: 180,
              padding: "18px 14px",
              background: "#0F172A",
              color: "#E2E8F0",
              fontWeight: 800,
              fontSize: 32,
              textAlign: "center",
              borderBottom: "2px solid #0B1130",
              opacity: Math.min(1, popAt(frame, fps, 44 + r * 8, 12, 170) * 1.4),
            }}
          >
            {sName}
          </div>
          {HEADERS.map((_, c) => {
            const idx = r * HEADERS.length + c;
            const a = popAt(frame, fps, 56 + idx * 7, 12, 180);
            const col = PALETTE[(r + c) % PALETTE.length];
            return (
              <div
                key={c}
                style={{
                  flex: 1,
                  height: 78,
                  borderLeft: "2px solid #0B1130",
                  borderBottom: "2px solid #0B1130",
                  background: a > 0.02 ? col : "#F1F5F9",
                  opacity: Math.min(1, a * 1.6),
                  transform: `scale(${0.6 + 0.4 * a})`,
                  boxShadow: a > 0.3 ? `inset 0 0 22px rgba(255,255,255,0.35)` : "none",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** 0-6s hook: "how do I make a table?" — a schedule fills itself in. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 26);
  const win = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 130 } });
  const badge = spring({ frame: frame - 118, fps, config: { damping: 10, stiffness: 175 } });
  const glow = 0.5 + 0.5 * Math.sin(t * 5.4);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={3} />

      {/* headline */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 50,
          right: 50,
          zIndex: 30,
          opacity: title.opacity,
          transform: title.translate,
        }}
      >
        <CopyPanel style={{ padding: "30px 42px", borderColor: "rgba(34,211,238,0.5)" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 900,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            إزاي تعمل جدول في موقعك؟ <span>🤔</span>
          </div>
        </CopyPanel>
      </div>

      {/* the self-filling schedule in a browser */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 560,
          width: 880,
          zIndex: 10,
          opacity: Math.min(1, win),
          transform: `scale(${0.9 + 0.1 * win})`,
          transformOrigin: "50% 30%",
        }}
      >
        <BrowserMock
          width={880}
          url="my-site.com/schedule"
          bodyStyle={{
            padding: 30,
            minHeight: 560,
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Schedule frame={frame} />
        </BrowserMock>
      </div>

      {/* golden promise badge */}
      <div
        style={{
          position: "absolute",
          top: 1280,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 26,
          opacity: Math.min(1, badge * 1.5),
          transform: `scale(${0.55 + 0.45 * badge})`,
        }}
      >
        <div
          style={{
            padding: "24px 72px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 66,
            fontWeight: 900,
            boxShadow: `0 0 ${40 + glow * 50}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          4 وسوم بس!
        </div>
      </div>

      {/* floating tag chips */}
      {CHIPS.map((c, i) => {
        const chipIn = spring({
          frame: frame - (44 + i * 7),
          fps,
          config: { damping: 13, stiffness: 150 },
        });
        if (chipIn <= 0.001) return null;
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: c.x,
              top: c.y + Math.sin(t * 1.7 + i * 1.3) * 10,
              opacity: Math.min(1, chipIn),
              transform: `scale(${0.6 + 0.4 * chipIn}) rotate(${c.rot}deg)`,
              padding: "10px 20px",
              borderRadius: 14,
              background: "rgba(6,10,30,0.94)",
              border: `2px solid ${c.c}`,
              boxShadow: `0 0 24px ${c.c}66, 0 14px 30px rgba(0,0,0,0.5)`,
              fontFamily: "monospace",
              fontSize: 32,
              fontWeight: 700,
              color: c.c,
              whiteSpace: "nowrap",
              direction: "ltr",
              zIndex: 12,
            }}
          >
            {c.t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
