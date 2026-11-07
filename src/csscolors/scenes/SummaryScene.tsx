import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C_CYAN, C_GREEN, C_RED, clamp, popAt } from "../../css/parts";
import { MONO } from "../../vscode/theme";
import { SceneShell } from "../parts";

const ITEMS = [
  { e: "🖌️", t: "color", c: C_RED, at: 2 },
  { e: "🎨", t: "background-color", c: "#3498DB", at: 11 },
  { e: "🖼️", t: "background-image", c: C_CYAN, at: 20 },
  { e: "👻", t: "opacity", c: C_GREEN, at: 29 },
];

const POS = [
  { x: 60, y: 600 },
  { x: 550, y: 600 },
  { x: 60, y: 970 },
  { x: 550, y: 970 },
];

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell seed={7}>
      {ITEMS.map((it, i) => {
        const s = popAt(frame, fps, it.at, 12, 165);
        const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 5 + i);
        const pos = POS[i];
        return (
          <div
            key={it.t}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              width: 470,
              height: 340,
              borderRadius: 34,
              background: "rgba(5,10,30,0.94)",
              border: `4px solid ${it.c}`,
              boxShadow: `0 0 ${34 + pulse * 40}px ${it.c}77, 0 24px 60px rgba(0,0,0,0.55)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
              opacity: Math.min(1, s) * interpolate(frame, [0, 6], [0, 1], clamp),
              transform: `scale(${0.6 + 0.4 * s})`,
            }}
          >
            <div
              style={{
                fontSize: 96,
                filter: `drop-shadow(0 0 ${16 + pulse * 18}px ${it.c})`,
                transform: `scale(${1 + pulse * 0.06})`,
              }}
            >
              {it.e}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: it.t.length > 12 ? 36 : 44,
                fontWeight: 900,
                color: it.c,
                direction: "ltr",
                textShadow: `0 0 22px ${it.c}88`,
              }}
            >
              {it.t}
            </div>
          </div>
        );
      })}
    </SceneShell>
  );
};
