import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, MONO, pop } from "../../theme";
import { ClickRipple, CopyPanel, MouseCursor } from "../parts";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const WIN = { x: 70, y: 470, w: 940, h: 1240 };
const CODE_X = 78;
const LINE_H = 84;
const BLOCK_TOP = 120;
const BLOCK_H = 8 * LINE_H;
const CHAR_W = 28.8;
const LINE8_Y = BLOCK_TOP + 7 * LINE_H;
const TYPO = { f: 48 };

const KW = "#C586C0";
const ID = "#9CDCFE";
const STR = "#CE9178";
const NUM = "#B5CEA8";
const FN = "#DCDCAA";
const OP = "#D4D4D4";
const CMT = "#6A9955";
const PLAIN = "#7E879B";

type Tok = { t: string; c: string };
type Line = { indent: number; toks: Tok[] };

const CODE: Line[] = [
  { indent: 0, toks: [{ t: "const", c: KW }, { t: " name", c: ID }, { t: " = ", c: OP }, { t: '"Sara"', c: STR }, { t: ";", c: OP }] },
  { indent: 0, toks: [{ t: "let", c: KW }, { t: " score", c: ID }, { t: " = ", c: OP }, { t: "95", c: NUM }, { t: ";", c: OP }] },
  { indent: 0, toks: [{ t: "// beginner demo", c: CMT }] },
  { indent: 0, toks: [{ t: "function", c: KW }, { t: " greet", c: FN }, { t: "(", c: OP }, { t: "user", c: ID }, { t: ") {", c: OP }] },
  { indent: 2, toks: [{ t: "console", c: ID }, { t: ".", c: OP }, { t: "log", c: FN }, { t: "(", c: OP }, { t: "user", c: ID }, { t: ");", c: OP }] },
  { indent: 0, toks: [{ t: "}", c: OP }] },
  { indent: 0, toks: [] },
  { indent: 0, toks: [] },
];

const TYPED: Tok[] = [
  { t: "console", c: ID },
  { t: ".", c: OP },
  { t: "log", c: FN },
  { t: "(", c: OP },
  { t: '"Hi"', c: STR },
  { t: ");", c: OP },
];

const SUGGESTIONS = [
  { label: "console", kind: "function", color: "#DCDCAA", glyph: "ƒ" },
  { label: "const", kind: "keyword", color: "#C586C0", glyph: "k" },
  { label: "clear", kind: "function", color: "#DCDCAA", glyph: "ƒ" },
  { label: "constructor", kind: "class", color: "#4EC9B0", glyph: "c" },
  { label: "continue", kind: "keyword", color: "#C586C0", glyph: "k" },
];

const renderCode = (colorize: boolean) => {
  const c = colorize ? null : PLAIN;
  return CODE.map((line, i) => (
    <div
      key={i}
      style={{
        display: "flex",
        height: LINE_H,
        alignItems: "center",
        fontFamily: MONO,
        fontSize: TYPO.f,
        lineHeight: `${LINE_H}px`,
        whiteSpace: "pre",
        direction: "ltr",
        marginLeft: line.indent * CHAR_W * 2,
      }}
    >
      {line.toks.map((tk, j) => (
        <span key={j} style={{ color: c ?? tk.c }}>
          {tk.t}
        </span>
      ))}
    </div>
  ));
};

/** 22.9-29.8s: grey code snaps into colour, then IntelliSense completes the line. */
export const MagicScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = pop(frame, fps, 0);
  const push = interpolate(frame, [186, 213], [0, 0.05], clamp);
  const badgeA = pop(frame, fps, 10);
  const badgeB = pop(frame, fps, 112);
  const badgeGlow = 0.5 + 0.5 * Math.sin((frame / fps) * 3.2);

  const wipe = interpolate(frame, [30, 74], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const sweepOn = wipe > 0 && wipe < 1 ? 1 : 0;

  const n = Math.round(
    interpolate(
      frame,
      [116, 140, 148, 149, 188],
      [0, 3, 3, 7, 18],
      clamp,
    ),
  );
  const listIn = interpolate(frame, [124, 138], [0, 1], clamp);
  const listOut = interpolate(frame, [150, 160], [1, 0], clamp);
  const list = listIn * listOut;
  const accept = interpolate(frame, [146, 158], [0, 1], clamp);

  const cx =
    frame < 116
      ? interpolate(frame, [86, 116], [640, CODE_X + 8], {
          ...clamp,
          easing: Easing.inOut(Easing.cubic),
        })
      : CODE_X + 8 + n * CHAR_W;
  const cy = interpolate(frame, [86, 116], [300, LINE8_Y + LINE_H / 2 + 6], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  const caretOn = frame % 30 < 18;
  const finalGlow = interpolate(frame, [188, 204], [0, 1], clamp);

  let consumed = 0;
  const typedParts = TYPED.map((tk, i) => {
    const start = consumed;
    consumed += tk.t.length;
    const visible = tk.t.slice(0, Math.max(0, Math.min(tk.t.length, n - start)));
    return (
      <span key={i} style={{ color: tk.c }}>
        {visible}
      </span>
    );
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse 85% 55% at 50% 55%, rgba(59,29,134,0.5) 0%, transparent 72%)",
      }}
    >
      {/* badges */}
      <div
        style={{
          position: "absolute",
          top: 128,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <div style={{ opacity: Math.min(1, badgeA), transform: `scale(${badgeA})` }}>
          <CopyPanel style={{ borderColor: "rgba(34,211,238,0.55)", padding: "22px 40px" }}>
            <span
              style={{
                direction: "ltr",
                display: "inline-block",
                fontSize: 54,
                fontWeight: 900,
                color: COLORS.cyan,
                textShadow: `0 0 ${18 + badgeGlow * 26}px rgba(34,211,238,0.7)`,
              }}
            >
              ✨ Syntax Highlighting
            </span>
          </CopyPanel>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 282,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <div style={{ opacity: Math.min(1, badgeB), transform: `scale(${badgeB})` }}>
          <CopyPanel style={{ borderColor: "rgba(168,85,247,0.55)", padding: "22px 40px" }}>
            <span
              style={{
                direction: "ltr",
                display: "inline-block",
                fontSize: 54,
                fontWeight: 900,
                color: "#C4A6FF",
                textShadow: `0 0 ${18 + badgeGlow * 26}px rgba(168,85,247,0.75)`,
              }}
            >
              🧠 IntelliSense
            </span>
          </CopyPanel>
        </div>
      </div>

      {/* ---------- editor window ---------- */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 24,
          overflow: "hidden",
          background: "#14182E",
          border: "2px solid rgba(168,85,247,0.5)",
          boxShadow:
            "0 44px 110px rgba(0,0,0,0.7), 0 0 90px rgba(124,58,237,0.4)",
          direction: "ltr",
          transformOrigin: "50% 50%",
          scale: `${(0.92 + 0.08 * win) * (1 + push)}`,
          opacity: Math.min(1, win),
        }}
      >
        {/* title bar */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 58,
            background: "linear-gradient(90deg,#1B2140,#232A52)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 22px",
          }}
        >
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
          <div
            style={{
              marginLeft: 12,
              padding: "7px 20px",
              borderRadius: 9,
              background: "rgba(255,255,255,0.1)",
              color: "#F7DF1E",
              fontFamily: MONO,
              fontSize: 22,
            }}
          >
            app.js
          </div>
          <div
            style={{
              marginLeft: "auto",
              color: "rgba(255,255,255,0.45)",
              fontFamily: MONO,
              fontSize: 21,
            }}
          >
            Visual Studio Code
          </div>
        </div>

        {/* code */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 102,
            height: BLOCK_H,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: CODE_X,
              top: 18,
              right: 0,
              height: BLOCK_H,
              direction: "ltr",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>{renderCode(false)}</div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 0 ${(1 - wipe) * 100}% 0%)`,
              }}
            >
              {renderCode(true)}
            </div>
          </div>

          {/* moving colour wipe */}
          {sweepOn ? (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 18 + wipe * BLOCK_H - 4,
                height: 8,
                background:
                  "linear-gradient(90deg, transparent, #22D3EE, #A855F7, #FFD700, transparent)",
                boxShadow: "0 0 34px rgba(168,85,247,0.95)",
                opacity: 0.95,
              }}
            />
          ) : null}

          {/* line numbers sit above the layers */}
          <div style={{ position: "absolute", left: 0, top: 18, width: CODE_X - 18 }}>
            {CODE.map((_, i) => (
              <div
                key={i}
                style={{
                  height: LINE_H,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  fontFamily: MONO,
                  fontSize: TYPO.f - 6,
                  color: "#5C6478",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* typed line */}
        <div
          style={{
            position: "absolute",
            left: CODE_X,
            top: LINE8_Y + LINE_H / 2 - TYPO.f * 0.62,
            fontFamily: MONO,
            fontSize: TYPO.f,
            whiteSpace: "pre",
            direction: "ltr",
            textShadow:
              finalGlow > 0
                ? `0 0 ${finalGlow * 26}px rgba(125,211,252,${finalGlow * 0.8})`
                : undefined,
          }}
        >
          {typedParts}
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 48,
              marginLeft: 5,
              verticalAlign: "-9px",
              background: caretOn ? "#569CD6" : "transparent",
            }}
          />
        </div>

        {/* IntelliSense dropdown */}
        <div
          style={{
            position: "absolute",
            left: CODE_X,
            top: LINE8_Y + LINE_H + 4,
            width: 500,
            borderRadius: 12,
            background: "#20253D",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 26px 60px rgba(0,0,0,0.7)",
            overflow: "hidden",
            opacity: list,
            transform: `translateY(${(1 - list) * -16}px) scale(${0.94 + 0.06 * list})`,
            transformOrigin: "20% 0%",
            display: list > 0.01 ? "block" : "none",
          }}
        >
          {SUGGESTIONS.map((s, i) => {
            const active = i === 0;
            return (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  height: 68,
                  padding: "0 20px",
                  background: active
                    ? accept > 0
                      ? `rgba(34,197,94,${0.28 + accept * 0.4})`
                      : "#264F78"
                    : "transparent",
                  fontFamily: MONO,
                  fontSize: 34,
                  direction: "ltr",
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9,
                    background: `${s.color}33`,
                    border: `2px solid ${s.color}`,
                    color: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {s.glyph}
                </span>
                <span style={{ color: "#E6EDF3" }}>{s.label}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 26,
                    fontFamily: FONT,
                  }}
                >
                  {s.kind}
                </span>
              </div>
            );
          })}
        </div>

        {/* status bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 38,
            background: "linear-gradient(90deg,#0B63C5,#2563EB)",
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "0 20px",
            color: "#fff",
            fontFamily: MONO,
            fontSize: 20,
          }}
        >
          <span>◀ main</span>
          <span>{`Ln 8, Col ${n + 1}`}</span>
          <span>UTF-8</span>
          <span style={{ marginLeft: "auto" }}>{"{}"} JavaScript</span>
        </div>

        <MouseCursor x={cx} y={cy} size={54} />
        <ClickRipple frame={frame} at={148} x={CODE_X + 8 + 3 * CHAR_W} y={LINE8_Y + LINE_H / 2} color="#22C55E" />
      </div>
    </AbsoluteFill>
  );
};
