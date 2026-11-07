import React from "react";
import type { CSSProperties } from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  Stage,
  ProgressBar,
  CssMark,
  NotePill,
  EditorFrame,
  CodeBlock,
  Twinkles,
  SparkleBurst,
  popAt,
  C_ORANGE,
  C_GOLD,
  C_PURPLE,
  C_CYAN,
  C_GREEN,
  C_RED,
  totalLen,
} from "../css/parts";
import { FONT, MONO } from "../vscode/theme";
import type { Line, Part } from "../css/parts";

const T = 8;

const L = (parts: Part[]): Line => ({ parts });
const p = (t: string, c?: string, hl?: boolean, style?: CSSProperties): Part => ({ t, c, hl, style });

const codeH1Red: Line[] = [
  L([p("h1", "#569CD6"), p(" {", "#D4D4D4"), p(" color", "#9CDCFE"), p(": ", "#D4D4D4"), p("red", "#CE9178"), p(";", "#D4D4D4"), p(" }", "#D4D4D4")]),
];

const zoomClassHtml: Line[] = [
  L([p("<h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("red", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أحمر", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("<h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("blue", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أزرق", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("<h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("red", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أحمر برضه", "#D4D4D4"), p("</h1>", "#808080")]),
];
const zoomClassCss: Line[] = [
  L([p(".", "#FFD700", true), p("red", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#e74c3c", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
  L([p(".", "#FFD700", true), p("blue", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#3498db", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
];
const zoomIdHtml: Line[] = [
  L([p("<!-- ⭐ id: فريد، مرة واحدة بس -->", "#6A9955")]),
  L([p("<h1 ", "#808080"), p("id", "#9CDCFE"), p('="', "#CE9178"), p("special", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان ذهبي فريد", "#D4D4D4"), p("</h1>", "#808080")]),
];
const zoomIdCss: Line[] = [
  L([p("#", "#FFD700", true), p("special", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#f39c12", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("    font-size", "#9CDCFE"), p(": ", "#D4D4D4"), p("2em", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
];

const codeHtml: Line[] = [
  L([p("<!DOCTYPE html>", "#808080")]),
  L([p("<html ", "#569CD6"), p('lang="ar" ', "#9CDCFE"), p('dir="rtl"', "#9CDCFE"), p(">", "#808080")]),
  L([p("<head>", "#808080")]),
  L([p("  <meta ", "#808080"), p('charset="UTF-8"', "#9CDCFE"), p(">", "#808080")]),
  L([p("  <title>", "#808080"), p("المحددات في CSS", "#D4D4D4"), p("</title>", "#808080")]),
  L([p("  <link ", "#808080"), p('rel="stylesheet" ', "#9CDCFE"), p('href="style.css"', "#CE9178"), p(">", "#808080")]),
  L([p("</head>", "#808080")]),
  L([p("<body>", "#808080")]),
  L([p("  <!-- class: يمكن استخدامه مع عدة عناصر -->", "#6A9955")]),
  L([p("  <h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("red", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أحمر", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("  <h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("blue", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أزرق", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("  <h1 ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("red", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان أحمر برضه", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("  <!-- id: فريد، مرة واحدة بس -->", "#6A9955")]),
  L([p("  <h1 ", "#808080"), p("id", "#9CDCFE"), p('="', "#CE9178"), p("special", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("ده عنوان ذهبي فريد", "#D4D4D4"), p("</h1>", "#808080")]),
  L([p("  <!-- مثال عملي: highlight -->", "#6A9955")]),
  L([p("  <p ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("highlight", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("نص مهم 1", "#D4D4D4"), p("</p>", "#808080")]),
  L([p("  <p ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("highlight", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("نص مهم 2", "#D4D4D4"), p("</p>", "#808080")]),
  L([p("  <p ", "#808080"), p("class", "#9CDCFE"), p('="', "#CE9178"), p("highlight", "#CE9178", true), p('"', "#CE9178"), p(">", "#808080"), p("نص مهم 3", "#D4D4D4"), p("</p>", "#808080")]),
  L([p("</body>", "#808080")]),
  L([p("</html>", "#808080")]),
];
const codeCss: Line[] = [
  L([p("/* المحدد { الخاصية : القيمة ; } */", "#6A9955")]),
  L([p("", "#D4D4D4")]),
  L([p("/* 🔴 class: يبدأ بنقطة . */", "#6A9955")]),
  L([p(".", "#FFD700", true), p("red", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#e74c3c", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
  L([p("", "#D4D4D4")]),
  L([p("/* 🔵 class: نفس الـ class */", "#6A9955")]),
  L([p(".", "#FFD700", true), p("blue", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#3498db", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
  L([p("", "#D4D4D4")]),
  L([p("/* ⭐ id: يبدأ بـ # */", "#6A9955")]),
  L([p("#", "#FFD700", true), p("special", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#f39c12", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("    font-size", "#9CDCFE"), p(": ", "#D4D4D4"), p("2em", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
  L([p("", "#D4D4D4")]),
  L([p("/* ✨ class: highlight */", "#6A9955")]),
  L([p(".", "#FFD700", true), p("highlight", "#FFD700", true), p(" {", "#D4D4D4")]),
  L([p("    background-color", "#9CDCFE"), p(": ", "#D4D4D4"), p("#fff3cd", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("    padding", "#9CDCFE"), p(": ", "#D4D4D4"), p("10px", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("    border-left", "#9CDCFE"), p(": ", "#D4D4D4"), p("4px solid #ffc107", "#CE9178"), p(";", "#D4D4D4")]),
  L([p("}", "#D4D4D4")]),
];

const Heading: React.FC<{ color: string; label?: string; glow?: boolean; size?: number }> = ({ color, label = "h1", glow, size = 1 }) => {
  const s = 170 * size;
  return (
    <div
      style={{
        width: s,
        height: s * 0.59,
        borderRadius: 18,
        background: "linear-gradient(145deg, rgba(5,10,30,0.95), rgba(15,23,42,0.9))",
        border: `3px solid ${color}`,
        color,
        fontFamily: MONO,
        fontSize: 40 * size,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: glow
          ? `0 0 40px ${color}99, 0 18px 40px rgba(0,0,0,0.55)`
          : `0 12px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)`,
        position: "relative",
        transition: "all 0.3s",
      }}
    >
      {label}
    </div>
  );
};

const Badge: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <div
    style={{
      padding: "8px 18px",
      borderRadius: 100,
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      color: "#08102A",
      fontFamily: MONO,
      fontSize: 22,
      fontWeight: 900,
      boxShadow: `0 0 22px ${color}99, 0 8px 18px rgba(0,0,0,0.4)`,
      border: "2px solid rgba(255,255,255,0.4)",
    }}
  >
    {text}
  </div>
);

const SceneShell: React.FC<{ children: React.ReactNode; seed?: number }> = ({ children, seed = 1 }) => (
  <AbsoluteFill style={{ fontFamily: FONT, direction: "rtl", overflow: "hidden" }}>
    <Stage />
    <Twinkles count={18} seed={seed} />
    {children}
  </AbsoluteFill>
);

const GlowDot: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const pulse = 0.6 + 0.4 * Math.sin((frame / fps) * 6);
  return (
    <span
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: C_GOLD,
        boxShadow: `0 0 ${18 + pulse * 14}px ${C_GOLD}`,
        marginLeft: 6,
        verticalAlign: "middle",
      }}
    />
  );
};

export const CssSelectorsShorts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timing = linearTiming({ durationInFrames: T });
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 4);

  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const codeH1Typed = Math.min(totalLen(codeH1Red), Math.floor(interpolate(frame, [10, 50], [0, totalLen(codeH1Red)], clamp)));
  const codeHtmlTyped = Math.min(totalLen(codeHtml), Math.floor(interpolate(frame - 20, [0, 40], [0, totalLen(codeHtml)], clamp)));
  const codeCssTyped = Math.min(totalLen(codeCss), Math.floor(interpolate(frame - 40, [0, 40], [0, totalLen(codeCss)], clamp)));

  return (
    <AbsoluteFill style={{ background: "#0A1130" }} durationInFrames={1560}>
      <Stage />
      <ProgressBar />
      <CssMark />
      <Audio src={staticFile("voice/cssselectorvoice.mp3")} />
      <TransitionSeries>
        {/* 0-8 PROBLEM HOOK */}
        <TransitionSeries.Sequence name="Hook" durationInFrames={240}>
          <SceneShell seed={1}>
            <div style={{ position: "absolute", top: 130, left: 50, right: 50, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 2), transform: `translateY(${(1 - popAt(frame, fps, 2)) * 30}px)` }}>
              <NotePill color={C_RED}>h1 {"{"} color: red; {"}"} ← كل العناوين حمراء 🔴</NotePill>
            </div>
            <div style={{ position: "absolute", top: 245, left: 50, right: 50, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 14) }}>
              <NotePill color={C_GOLD}>بس لو عوزهم مختلفين؟ 🤔</NotePill>
            </div>
            <div style={{ position: "absolute", top: 380, left: 120, width: 840, opacity: popAt(frame, fps, 6), transform: `scale(${0.88 + 0.12 * popAt(frame, fps, 6)})`, transformOrigin: "top center" }}>
              <EditorFrame width={840} tab="style.css" language="CSS">
                <CodeBlock lines={codeH1Red} fontSize={40} typed={codeH1Typed} caret />
              </EditorFrame>
            </div>
            <div style={{ position: "absolute", top: 700, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 34, opacity: popAt(frame, fps, 22) }}>
              <Heading color={C_RED} glow />
              <Heading color={C_RED} glow />
              <Heading color={C_RED} glow />
            </div>
            <SparkleBurst start={12} x={540} y={740} count={18} radius={220} duration={26} />
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 8-16 PROBLEM */}
        <TransitionSeries.Sequence name="Problem" durationInFrames={252}>
          <SceneShell seed={2}>
            <div style={{ position: "absolute", top: 150, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GOLD}>3 عناوين h1 = نفس الاسم 🤷</NotePill>
            </div>
            <div style={{ position: "absolute", top: 260, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_PURPLE}>CSS مش عارف يفرق!</NotePill>
            </div>
            <div style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 44 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ position: "relative", opacity: popAt(frame, fps, 12 + i * 6), transform: `translateY(${(1 - popAt(frame, fps, 12 + i * 6)) * 40}px)` }}>
                  <Heading color={C_RED} />
                  <div style={{ position: "absolute", top: -52, left: 0, right: 0, textAlign: "center", fontSize: 52, filter: `drop-shadow(0 0 14px ${C_GOLD})` }}>❓</div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 36) }}>
              <div style={{ padding: "16px 34px", borderRadius: 20, background: "rgba(5,10,30,0.9)", border: `2px solid ${C_RED}`, color: C_RED, fontFamily: MONO, fontSize: 28, fontWeight: 700 }}>
                h1 {"{"} color: red; {"}"} → ALL red
              </div>
            </div>
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        {/* 16-26 SOLUTION 1 CLASS */}
        <TransitionSeries.Sequence
          name="Class"
          durationInFrames={298}
          trimBefore={12}
        >
          <SceneShell seed={3}>
            <div style={{ position: "absolute", top: 120, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GREEN}>الحل 1: class 🏷️</NotePill>
            </div>
            <div style={{ position: "absolute", top: 225, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_ORANGE}>HTML: class='title-red'</NotePill>
            </div>
            <div style={{ position: "absolute", top: 330, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_ORANGE}>CSS: .title-red {"{"} {"}"} (نقطة!) <GlowDot frame={frame} fps={fps} /></NotePill>
            </div>
            <div style={{ position: "absolute", top: 460, left: 40, right: 40, display: "flex", gap: 20, opacity: popAt(frame, fps, 8) }}>
              <div style={{ flex: 1 }}>
                <EditorFrame width={534} tab="index.html" language="HTML">
                  <CodeBlock lines={codeHtml} fontSize={19} typed={codeHtmlTyped} caret />
                </EditorFrame>
              </div>
              <div style={{ flex: 1, opacity: popAt(frame, fps, 24) }}>
                <EditorFrame width={534} tab="style.css" language="CSS">
                  <CodeBlock lines={codeCss} fontSize={19} typed={codeCssTyped} caret />
                </EditorFrame>
              </div>
            </div>
            {/* Zoomed class view */}
            <div style={{ position: "absolute", top: 420, left: 60, right: 60, opacity: popAt(frame, fps, 60), transform: `scale(${0.85 + 0.15 * popAt(frame, fps, 60)})`, transformOrigin: "center" }}>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <EditorFrame width={470} tab="index.html" language="HTML">
                    <CodeBlock lines={zoomClassHtml} fontSize={26} typed={Infinity} />
                  </EditorFrame>
                </div>
                <div style={{ flex: 1 }}>
                  <EditorFrame width={470} tab="style.css" language="CSS">
                    <CodeBlock lines={zoomClassCss} fontSize={26} typed={Infinity} />
                  </EditorFrame>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24, opacity: popAt(frame, fps, 40) }}>
              <div style={{ position: "relative" }}>
                <Heading color={C_RED} />
                <div style={{ position: "absolute", top: -16, right: -16 }}><Badge color={C_RED} text="red" /></div>
              </div>
              <div style={{ position: "relative" }}>
                <Heading color={C_CYAN} />
                <div style={{ position: "absolute", top: -16, right: -16 }}><Badge color={C_CYAN} text="blue" /></div>
              </div>
              <div style={{ position: "relative" }}>
                <Heading color={C_GREEN} />
                <div style={{ position: "absolute", top: -16, right: -16 }}><Badge color={C_GREEN} text="green" /></div>
              </div>
            </div>
            <SparkleBurst start={40} x={540} y={940} count={16} radius={200} duration={24} />
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 26-38 SOLUTION 2 ID */}
        <TransitionSeries.Sequence name="Id" durationInFrames={232} trimBefore={10}>
          <SceneShell seed={4}>
            <div style={{ position: "absolute", top: 120, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GOLD}>الحل 2: id ⭐</NotePill>
            </div>
            <div style={{ position: "absolute", top: 225, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_ORANGE}>HTML: id='main-title'</NotePill>
            </div>
            <div style={{ position: "absolute", top: 330, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_ORANGE}>CSS: #main-title {"{"} {"}"} (#) <GlowDot frame={frame} fps={fps} /></NotePill>
            </div>
            <div style={{ position: "absolute", top: 460, left: 40, right: 40, display: "flex", gap: 20, opacity: popAt(frame, fps, 8) }}>
              <div style={{ flex: 1 }}>
                <EditorFrame width={534} tab="index.html" language="HTML">
                  <CodeBlock lines={codeHtml} fontSize={19} typed={Infinity} />
                </EditorFrame>
              </div>
              <div style={{ flex: 1, opacity: popAt(frame, fps, 24) }}>
                <EditorFrame width={534} tab="style.css" language="CSS">
                  <CodeBlock lines={codeCss} fontSize={19} typed={Infinity} />
                </EditorFrame>
              </div>
            </div>
            <div style={{ position: "absolute", top: 420, left: 60, right: 60, opacity: popAt(frame, fps, 60), transform: `scale(${0.85 + 0.15 * popAt(frame, fps, 60)})`, transformOrigin: "center" }}>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <EditorFrame width={470} tab="index.html" language="HTML">
                    <CodeBlock lines={zoomIdHtml} fontSize={26} typed={Infinity} />
                  </EditorFrame>
                </div>
                <div style={{ flex: 1 }}>
                  <EditorFrame width={470} tab="style.css" language="CSS">
                    <CodeBlock lines={zoomIdCss} fontSize={26} typed={Infinity} />
                  </EditorFrame>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 40) }}>
              <div style={{ position: "relative" }}>
                <Heading color={C_GOLD} glow label="h1" />
                <div style={{ position: "absolute", top: -30, right: -30, fontSize: 52, filter: `drop-shadow(0 0 20px ${C_GOLD})` }}>⭐</div>
              </div>
            </div>
            <SparkleBurst start={40} x={540} y={940} count={14} radius={180} colors={[C_GOLD, C_ORANGE, "#FFFFFF"]} duration={26} />
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        {/* 38-48 KEY DIFFERENCE */}
        <TransitionSeries.Sequence name="Diff" durationInFrames={250}>
          <SceneShell seed={5}>
            <div style={{ position: "absolute", top: 130, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_CYAN}>class = مجموعة 🔵🔵🔵</NotePill>
            </div>
            <div style={{ position: "absolute", top: 240, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GOLD}>id = واحد بس ⭐</NotePill>
            </div>
            <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24, opacity: popAt(frame, fps, 8) }}>
              <Heading color={C_CYAN} />
              <Heading color={C_CYAN} />
              <Heading color={C_CYAN} />
            </div>
            <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 22) }}>
              <div style={{ marginLeft: 560 }}>
                <Heading color={C_GOLD} glow />
              </div>
            </div>
            <div style={{ position: "absolute", top: 640, left: 100, right: 100, opacity: popAt(frame, fps, 32) }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div style={{ flex: 1, padding: "20px 22px", borderRadius: 20, background: "rgba(5,10,30,0.92)", border: `3px solid ${C_CYAN}`, color: "#fff", fontFamily: FONT, fontSize: 28, fontWeight: 900, textAlign: "center", boxShadow: `0 0 30px ${C_CYAN}44` }}>
                  class → مجموعة
                </div>
                <div style={{ flex: 1, padding: "20px 22px", borderRadius: 20, background: "rgba(5,10,30,0.92)", border: `3px solid ${C_GOLD}`, color: "#fff", fontFamily: FONT, fontSize: 28, fontWeight: 900, textAlign: "center", boxShadow: `0 0 30px ${C_GOLD}44` }}>
                  id → فريد
                </div>
              </div>
            </div>
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 48-55 PRACTICAL APPLICATION */}
        <TransitionSeries.Sequence name="Apply" durationInFrames={199}>
          <SceneShell seed={6}>
            <div style={{ position: "absolute", top: 130, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GREEN}>class = نفس الشكل لعدة عناصر ✅</NotePill>
            </div>
            <div style={{ position: "absolute", top: 240, left: 50, right: 50, display: "flex", justifyContent: "center" }}>
              <NotePill color={C_GOLD}>id = شكل فريد لعنصر واحد ✅</NotePill>
            </div>
            <div style={{ position: "absolute", top: 440, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30, opacity: popAt(frame, fps, 8) }}>
              <Heading color={C_RED} />
              <Heading color={C_CYAN} />
              <Heading color={C_GOLD} glow />
            </div>
            <div style={{ position: "absolute", top: 620, left: 100, right: 100, display: "flex", justifyContent: "center", gap: 18, opacity: popAt(frame, fps, 20), flexWrap: "wrap" }}>
              <div style={{ padding: "16px 26px", borderRadius: 16, background: "rgba(5,10,30,0.92)", border: `2px solid ${C_RED}`, color: C_RED, fontFamily: MONO, fontSize: 26, fontWeight: 700, boxShadow: `0 0 20px ${C_RED}55` }}>.red</div>
              <div style={{ padding: "16px 26px", borderRadius: 16, background: "rgba(5,10,30,0.92)", border: `2px solid ${C_CYAN}`, color: C_CYAN, fontFamily: MONO, fontSize: 26, fontWeight: 700, boxShadow: `0 0 20px ${C_CYAN}55` }}>.blue</div>
              <div style={{ padding: "16px 26px", borderRadius: 16, background: "rgba(5,10,30,0.92)", border: `2px solid ${C_GOLD}`, color: C_GOLD, fontFamily: MONO, fontSize: 26, fontWeight: 700, boxShadow: `0 0 20px ${C_GOLD}55` }}>#special</div>
            </div>
          </SceneShell>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        {/* 55-60 CTA */}
        <TransitionSeries.Sequence name="Cta" durationInFrames={137} trimBefore={39}>
          <SceneShell seed={7}>
            <div style={{ position: "absolute", top: 280, left: 50, right: 50, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 4) }}>
              <NotePill color={C_GOLD} fontSize={50}>إن كنت مهتم بمفاهيم البرمجة</NotePill>
            </div>
            <div style={{ position: "absolute", top: 430, left: 50, right: 50, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 12), transform: `scale(${0.55 + 0.45 * popAt(frame, fps, 12)})` }}>
              <NotePill color={C_GOLD} fontSize={66}>تابعني! 👇</NotePill>
            </div>
            <div style={{ position: "absolute", bottom: 200, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: popAt(frame, fps, 22) }}>
              <div style={{ width: 130, height: 130, borderRadius: "50%", background: `linear-gradient(145deg, ${C_ORANGE}, ${C_PURPLE})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 66, boxShadow: `0 0 ${34 + glow * 46}px ${C_ORANGE}99`, transform: `scale(${1 + glow * 0.08})` }}>
                👇
              </div>
            </div>
            <SparkleBurst start={12} x={540} y={500} count={22} radius={280} duration={32} />
          </SceneShell>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};


