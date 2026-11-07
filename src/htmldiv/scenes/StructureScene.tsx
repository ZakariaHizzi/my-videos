import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp } from "../../css/parts";
import { Caption, C_GOLD, SceneShell } from "../parts";
import { PageStructure } from "../art";

/** Section 2 of "practical uses" — header (with nav) / main / footer. */
export const StructureScene: React.FC = () => {
  const frame = useCurrentFrame();

  const bIn = interpolate(frame, [16, 34], [0, 1], clamp);
  const step = interpolate(frame, [40, 58, 76, 94, 112, 130], [0, 1, 1, 2, 2, 3], clamp);

  return (
    <SceneShell seed={4}>
      <Caption appear={18} color={C_GOLD} fontSize={50} style={{ top: 118 }}>
        أو: header, main, footer
      </Caption>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 300,
          opacity: bIn,
          transform: `translateY(${(1 - bIn) * 44}px)`,
        }}
      >
        <PageStructure step={step} />
      </div>
    </SceneShell>
  );
};
