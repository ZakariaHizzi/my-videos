import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MONO, fadeUp, pop } from "../theme";
import { CodeLine, SceneShell } from "../ui";
import { BrowserMock, VscodeWindow } from "../mocks";

// Synced to the voice.mp3 web line: "ولو بتعلم مواقع" 17.64-18.70s,
// "يبقى ده المكان المناسب لك" 18.96-20.74s (scene starts at 17.64s).
const WEB_CHIPS = [
  { name: "HTML", color: "#E44D26", delay: 70 },
  { name: "CSS", color: "#264DE4", delay: 82 },
  { name: "JavaScript", color: "#F7DF1E", delay: 94 },
];

/** 17.6-21s (voice.mp3): VS Code on the left, the website it builds on the right. */
export const WebScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = fadeUp(frame, 0, 18);
  const left = pop(frame, fps, 38);
  const right = pop(frame, fps, 55);

  return (
    <SceneShell>
      <div style={head}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.orange,
            textShadow: "0 0 34px rgba(255,107,53,0.5)",
            lineHeight: 1.3,
          }}
        >
          جنة لمبرمجي الويب! 🎯
        </div>
      </div>
      <div style={{ height: 50 }} />
      <div style={{ display: "flex", gap: 30, direction: "ltr", alignItems: "stretch" }}>
        <div style={{ scale: `${left}`, opacity: Math.min(1, left) }}>
          <VscodeWindow width={445} tab="index.html">
            <CodeLine parts={[{ t: "<h1>", c: "#7DD3FC" }, { t: "Portfolio", c: "#F0ABFC" }, { t: "</h1>", c: "#7DD3FC" }]} size={27} />
            <CodeLine parts={[{ t: "<p>", c: "#7DD3FC" }, { t: "أهلاً بيك", c: "#FDE68A" }, { t: "</p>", c: "#7DD3FC" }]} size={27} />
            <CodeLine parts={[{ t: ".btn {", c: "#7DD3FC" }]} size={27} />
            <CodeLine parts={[{ t: "  background: ", c: "#E2E8F0" }, { t: "#FFD700", c: "#FDE68A" }, { t: ";", c: "#94A3B8" }]} size={27} />
            <CodeLine parts={[{ t: "  border-radius: 12px;", c: "#E2E8F0" }]} size={27} />
            <CodeLine parts={[{ t: "}", c: "#7DD3FC" }]} size={27} />
            <CodeLine parts={[{ t: "btn.", c: "#E2E8F0" }, { t: "onClick", c: "#86EFAC" }, { t: "(() => wow)", c: "#94A3B8" }]} size={27} />
          </VscodeWindow>
        </div>
        <div style={{ scale: `${right}`, opacity: Math.min(1, right) }}>
          <BrowserMock width={445} url="mysite.com">
            <div
              style={{
                borderRadius: 18,
                background: "linear-gradient(135deg,#1E3A8A,#7C3AED)",
                padding: "26px 22px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 900 }}>Portfolio</div>
              <div style={{ fontSize: 26, marginTop: 8, opacity: 0.9 }}>
                موقعك الأول على الإنترنت
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: "inline-block",
                  background: COLORS.gold,
                  color: "#111",
                  fontSize: 26,
                  fontWeight: 900,
                  borderRadius: 12,
                  padding: "12px 30px",
                }}
              >
                ابدأ الآن
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18, justifyContent: "center", direction: "ltr" }}>
              {["Section 1", "Section 2", "Section 3"].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: 84,
                    borderRadius: 12,
                    background: "#E2E8F0",
                    color: "#64748B",
                    fontFamily: MONO,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </BrowserMock>
        </div>
      </div>
      <div style={{ height: 56 }} />
      <div style={{ display: "flex", gap: 24 }}>
        {WEB_CHIPS.map((c) => {
          const s = pop(frame, fps, c.delay);
          return (
            <div
              key={c.name}
              style={{
                scale: `${s}`,
                opacity: Math.min(1, s),
                padding: "20px 36px",
                borderRadius: 20,
                background: c.color,
                color: c.name === "JavaScript" ? "#111" : "#fff",
                fontSize: 46,
                fontWeight: 900,
                fontFamily: "'Segoe UI', Arial, sans-serif",
                boxShadow: `0 0 32px ${c.color}AA, 0 14px 36px rgba(0,0,0,0.4)`,
              }}
            >
              {c.name}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
