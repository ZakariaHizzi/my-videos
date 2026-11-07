import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, fadeUp } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { CopyPanel, MouseCursor } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN = { x: 110, y: 110, w: 860 };
const LINE_H = 56;
const CHAR_W = 18.2;
const CODE_LEFT = 76 + 26 + 30; // activity bar + padding + indent
const TYPED_LINE_TOP = WIN.y + 70 + 24 + 2 * LINE_H;

const OPEN = "<h1>";
const CLOSE = "</h1>";

const Caret: React.FC = () => {
  const frame = useCurrentFrame();
  const on = frame % 30 < 18;
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: 34,
        marginLeft: 3,
        verticalAlign: "-7px",
        background: on ? "#569CD6" : "transparent",
      }}
    />
  );
};

const Line: React.FC<{
  children: React.ReactNode;
  indent?: number;
  style?: React.CSSProperties;
}> = ({ children, indent = 0, style }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 30,
      lineHeight: `${LINE_H}px`,
      height: LINE_H,
      whiteSpace: "pre",
      direction: "ltr",
      textAlign: "left",
      marginLeft: indent * 30,
      ...style,
    }}
  >
    {children}
  </div>
);

/** 6-18s: type an opening and a closing tag, then explain both brackets. */
export const TagsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 140 } });
  const n1 = Math.round(
    interpolate(frame, [25, 70], [0, OPEN.length], { ...clamp, easing: Easing.linear }),
  );
  const n2 = Math.round(
    interpolate(frame, [95, 150], [0, CLOSE.length], { ...clamp, easing: Easing.linear }),
  );

  const boxIn = spring({ frame: frame - 152, fps, config: { damping: 13, stiffness: 150 } });
  const leftB = spring({ frame: frame - 186, fps, config: { damping: 12, stiffness: 155 } });
  const rightB = spring({ frame: frame - 198, fps, config: { damping: 12, stiffness: 155 } });
  const snap = interpolate(frame, [236, 262], [0, 1], clamp);
  const chip = fadeUp(frame, 256, 280);

  const label1 = fadeUp(frame, 76, 98);
  const label2 = fadeUp(frame, 158, 180);

  const typing = (frame >= 18 && frame <= 158) || (frame > 70 && frame < 95);
  const cursorX =
    frame <= 70
      ? WIN.x + CODE_LEFT + n1 * CHAR_W
      : WIN.x + CODE_LEFT + (OPEN.length + n2) * CHAR_W;

  const openLeft = interpolate(leftB, [0, 1], [10, 140]);
  const closeLeft = interpolate(rightB, [0, 1], [940, 840]);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={16} seed={6} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <Line>
            <span style={{ color: "#C586C0" }}>{"<!DOCTYPE html>"}</span>
          </Line>
          <Line>
            <span style={{ color: "#7DD3FC" }}>{"<html>"}</span>
          </Line>
          <Line indent={1}>
            <span style={{ color: "#7DD3FC" }}>{OPEN.slice(0, n1)}</span>
            {n2 === 0 ? (
              <>
                <Caret />
                <span style={{ color: "#7DD3FC" }} />
              </>
            ) : (
              <>
                <span style={{ color: "#7DD3FC" }}>{CLOSE.slice(0, n2)}</span>
                <Caret />
              </>
            )}
          </Line>
          <Line indent={1}>
            <span style={{ color: "#7DD3FC" }}>{"</html>"}</span>
          </Line>
        </VscodeWindow>
      </div>

      {/* cursor while typing */}
      {typing ? (
        <MouseCursor x={cursorX} y={TYPED_LINE_TOP + 14} size={50} />
      ) : null}

      {/* container / sandwich animation */}
      <div style={{ position: "absolute", left: 0, top: 640, width: 1080, height: 460 }}>
        {/* text box */}
        <div
          style={{
            position: "absolute",
            left: 260,
            top: 90,
            width: 560,
            height: 210,
            borderRadius: 30,
            background: "rgba(6,10,30,0.92)",
            border: `${3 + snap * 2}px solid rgba(125,211,252,${0.35 + snap * 0.65})`,
            boxShadow: `0 0 ${20 + snap * 50}px rgba(34,211,238,${0.25 + snap * 0.5}), 0 24px 60px rgba(0,0,0,0.5)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: Math.min(1, boxIn),
            transform: `scale(${0.8 + 0.2 * boxIn})`,
            zIndex: 6,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#FFFFFF",
              textShadow: "0 0 28px rgba(34,211,238,0.6)",
            }}
          >
            مرحباً
          </div>
        </div>

        {/* opening bracket slides in from the left */}
        <div
          style={{
            position: "absolute",
            left: openLeft,
            top: 76,
            fontFamily: MONO,
            fontSize: 210,
            fontWeight: 700,
            lineHeight: 1,
            color: COLORS.cyan,
            textShadow: `0 0 40px ${COLORS.cyan}`,
            opacity: Math.min(1, leftB * 1.6),
            transform: `rotate(${(1 - leftB) * -25}deg)`,
            zIndex: 8,
          }}
        >
          {"<"}
        </div>

        {/* closing bracket slides in from the right */}
        <div
          style={{
            position: "absolute",
            left: closeLeft,
            top: 76,
            fontFamily: MONO,
            fontSize: 210,
            fontWeight: 700,
            lineHeight: 1,
            color: COLORS.purple,
            textShadow: `0 0 40px ${COLORS.purple}`,
            opacity: Math.min(1, rightB * 1.6),
            transform: `rotate(${(1 - rightB) * 25}deg)`,
            zIndex: 8,
          }}
        >
          {">"}
        </div>

        {/* code chip */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 340,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            opacity: chip.opacity,
            transform: chip.translate,
            zIndex: 9,
          }}
        >
          <div
            style={{
              padding: "16px 40px",
              borderRadius: 18,
              background: "rgba(6,10,30,0.94)",
              border: `3px solid ${COLORS.cyan}`,
              color: "#E6EDF3",
              fontFamily: MONO,
              fontSize: 42,
              fontWeight: 700,
              direction: "ltr",
              boxShadow: `0 0 34px ${COLORS.cyan}55`,
            }}
          >
            <span style={{ color: "#7DD3FC" }}>{OPEN}</span>
            <span style={{ color: "#CE9178" }}>مرحباً</span>
            <span style={{ color: "#7DD3FC" }}>{CLOSE}</span>
          </div>
        </div>

      </div>

      {/* labels */}
      <div
        style={{
          position: "absolute",
          top: 1300,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 20,
          opacity: label1.opacity,
          transform: label1.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(34,211,238,0.6)" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.cyan,
                textShadow: `0 0 22px ${COLORS.cyan}`,
              }}
            >
              {"< >"}
            </span>
            <span> للفتح</span>
          </div>
        </CopyPanel>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1560,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          zIndex: 20,
          opacity: label2.opacity,
          transform: label2.translate,
        }}
      >
        <CopyPanel style={{ borderColor: "rgba(168,85,247,0.6)" }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: "#FFFFFF" }}>
            <span
              style={{
                fontFamily: MONO,
                direction: "ltr",
                unicodeBidi: "isolate",
                color: COLORS.purple,
                textShadow: `0 0 22px ${COLORS.purple}`,
              }}
            >
              {"</ >"}
            </span>
            <span> للإغلاق</span>
          </div>
        </CopyPanel>
      </div>
    </AbsoluteFill>
  );
};
