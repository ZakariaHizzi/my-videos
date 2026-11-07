import React from "react";
import { interpolate, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp, pop } from "../theme";
import { CodeLine, SceneShell } from "../ui";
import { BrowserMock, VscodeWindow } from "../mocks";

const OLD_COLOR = "#3B82F6";
const NEW_COLOR = "#22FF88";
// Synced to the voice.mp3 live-server line: "بإضافة Live Server" 20.98-22.04s,
// "الأكواد بتتحول لموقع" 22.36-23.76s, "قدامك لحظيًا" 23.76-25.38s
// (scene starts at 20.98s).
const EDIT_START = 44;
const APPLY_AT = 100;

const valueAt = (frame: number) => {
  if (frame < EDIT_START) return OLD_COLOR;
  const chars = Math.min(
    NEW_COLOR.length,
    Math.max(0, Math.floor((frame - EDIT_START) / 3.5))
  );
  return NEW_COLOR.slice(0, chars);
};

/** 21-25.4s (voice.mp3): Live Server - edit code, the browser updates instantly. */
export const LiveServerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const head = fadeUp(frame, 0, 18);
  const sub = fadeUp(frame, 16, 38);
  const panels = pop(frame, fps, 26);
  const applied = frame >= APPLY_AT;
  const value = valueAt(frame);

  const zoom = interpolate(frame, [APPLY_AT - 25, APPLY_AT + 40], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const flash = interpolate(frame, [APPLY_AT, APPLY_AT + 18], [0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const badge = pop(frame, fps, APPLY_AT + 6);
  const cursorOn = Math.floor(t * 2.4) % 2 === 0;
  const chevron = (frame % 15) / 15;

  return (
    <SceneShell>
      <div style={head}>
        <div
          style={{
            fontSize: 94,
            fontWeight: 900,
            color: COLORS.gold,
            direction: "ltr",
            textShadow: "0 0 36px rgba(255,215,0,0.5)",
            lineHeight: 1.2,
          }}
        >
          Live Server
        </div>
      </div>
      <div style={{ height: 14 }} />
      <div
        style={{
          ...sub,
          fontSize: 54,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.4,
        }}
      >
        الأكواد تتحول لموقع{" "}
        <span
          style={{
            color: COLORS.green,
            textShadow: "0 0 26px rgba(0,255,0,0.55)",
          }}
        >
          لحظياً
        </span>{" "}
        🔄
      </div>
      <div style={{ height: 46 }} />
      <div
        style={{
          scale: `${panels * zoom}`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 30, direction: "ltr" }}>
          {/* editor */}
          <div style={{ position: "relative" }}>
            <VscodeWindow width={445} tab="style.css">
              <CodeLine parts={[{ t: ".site-title {", c: "#7DD3FC" }]} size={27} />
              <div
                style={{
                  background: frame >= EDIT_START ? "rgba(255,215,0,0.12)" : "transparent",
                  borderRadius: 8,
                  margin: "0 -10px",
                  padding: "0 10px",
                  outline: frame >= EDIT_START ? "1px solid rgba(255,215,0,0.35)" : "none",
                }}
              >
                <CodeLine
                  parts={[
                    { t: "  color: ", c: "#E2E8F0" },
                    { t: value, c: applied ? NEW_COLOR : "#FDE68A" },
                    { t: ";", c: "#94A3B8" },
                    { t: cursorOn && frame >= EDIT_START ? " ▍" : "", c: "#22D3EE" },
                  ]}
                  size={27}
                />
              </div>
              <CodeLine parts={[{ t: "  font-size: 28px;", c: "#E2E8F0" }]} size={27} />
              <CodeLine parts={[{ t: "  padding: 12px;", c: "#E2E8F0" }]} size={27} />
              <CodeLine parts={[{ t: "}", c: "#7DD3FC" }]} size={27} />
            </VscodeWindow>
            <div
              style={{
                position: "absolute",
                bottom: -24,
                left: 12,
                padding: "10px 20px",
                borderRadius: 14,
                background: frame >= EDIT_START ? COLORS.gold : "rgba(255,255,255,0.16)",
                color: "#111",
                fontSize: 26,
                fontWeight: 900,
                fontFamily: MONO,
                whiteSpace: "nowrap",
                opacity: frame >= EDIT_START ? 1 : 0.75,
                scale: frame >= EDIT_START ? `${1 + 0.06 * Math.sin(t * 8)}` : "1",
              }}
            >
              {frame >= EDIT_START ? "● جاري التعديل..." : "index.css"}
            </div>
          </div>
          {/* browser */}
          <div style={{ position: "relative" }}>
            <BrowserMock width={445} url="localhost:5500">
              <div
                style={{
                  borderRadius: 18,
                  background: "linear-gradient(140deg,#0F172A,#1E293B)",
                  padding: "30px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 900,
                    color: applied ? NEW_COLOR : OLD_COLOR,
                    textShadow: applied ? `0 0 24px ${NEW_COLOR}88` : "none",
                  }}
                >
                  Portfolio
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "inline-block",
                    background: applied ? NEW_COLOR : OLD_COLOR,
                    color: "#0F172A",
                    fontSize: 24,
                    fontWeight: 900,
                    borderRadius: 12,
                    padding: "12px 28px",
                  }}
                >
                  ابدأ الآن
                </div>
              </div>
            </BrowserMock>
            {/* instant-update flash */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 26,
                background: "#fff",
                opacity: flash,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 30,
                border: `4px solid ${NEW_COLOR}`,
                opacity: interpolate(frame, [APPLY_AT, APPLY_AT + 34], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                boxShadow: `0 0 40px ${NEW_COLOR}`,
              }}
            />
          </div>
        </div>

        {/* code -> website arrow */}
        <div
          style={{
            marginTop: 54,
            display: "flex",
            alignItems: "center",
            gap: 18,
            direction: "ltr",
          }}
        >
          <div
            style={{
              padding: "14px 28px",
              borderRadius: 16,
              background: "rgba(10,17,48,0.85)",
              border: `2px solid ${COLORS.cyan}`,
              color: COLORS.cyan,
              fontFamily: MONO,
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            {"</>"}
          </div>
          {[0, 1, 2].map((i) => {
            const o = 0.35 + 0.65 * (((chevron + i / 3) % 1));
            return (
              <div
                key={i}
                style={{
                  fontSize: 44,
                  color: COLORS.gold,
                  opacity: o,
                  translate: `${((chevron + i / 3) % 1) * 26 - 13}px 0px`,
                }}
              >
                ➜
              </div>
            );
          })}
          <div
            style={{
              padding: "14px 28px",
              borderRadius: 16,
              background: "rgba(10,17,48,0.85)",
              border: `2px solid ${COLORS.green}`,
              color: COLORS.green,
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            🌐
          </div>
          <div
            style={{
              scale: `${badge}`,
              opacity: Math.min(1, badge),
              padding: "14px 26px",
              borderRadius: 100,
              background: applied ? COLORS.green : "rgba(255,255,255,0.14)",
              color: applied ? "#052E16" : "#fff",
              fontSize: 34,
              fontWeight: 900,
              marginLeft: 10,
              boxShadow: applied ? `0 0 34px ${COLORS.green}88` : "none",
            }}
          >
            ⚡ تحديث تلقائي
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
