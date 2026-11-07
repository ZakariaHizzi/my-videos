import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../../vscode/theme";
import { Twinkles } from "../../browser/parts";
import {
  C_BUTTON,
  C_FORM,
  C_INPUT,
  CopyPanel,
  RenderButton,
  RenderInput,
  TagChip,
  fadeUp,
  popAt,
} from "../parts";

const CHIPS = [
  { t: "<form>", c: C_FORM, x: 44, y: 1660, rot: -7 },
  { t: "<input>", c: C_INPUT, x: 830, y: 1640, rot: 8 },
  { t: "<button>", c: C_BUTTON, x: 130, y: 1810, rot: 6 },
];

/** 0-6s hook: "how do I make a form?" — a login form builds itself. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const title = fadeUp(frame, 4, 26);
  const win = popAt(frame, fps, 12, 14, 130);
  const badge = popAt(frame, fps, 120, 10, 175);
  const glow = 0.5 + 0.5 * Math.sin(t * 5.4);

  // the form fills in field by field
  const f1 = popAt(frame, fps, 40, 13, 165);
  const f2 = popAt(frame, fps, 62, 13, 165);
  const f3 = popAt(frame, fps, 84, 13, 165);

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
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 8px 34px rgba(0,0,0,0.55)",
            }}
          >
            إزاي تعمل نموذج في موقعك؟ <span>🤔</span>
          </div>
        </CopyPanel>
      </div>

      {/* the self-building login form in a browser */}
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
        <div
          style={{
            borderRadius: 26,
            background: "#F8FAFC",
            border: "2px solid rgba(255,255,255,0.65)",
            boxShadow: "0 34px 90px rgba(0,0,0,0.55), 0 0 60px rgba(255,215,0,0.18)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 20px",
              background: "#E2E8F0",
              borderBottom: "1px solid #CBD5E1",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
            <div
              style={{
                flex: 1,
                marginLeft: 8,
                padding: "8px 18px",
                borderRadius: 100,
                background: "#fff",
                color: "#334155",
                fontSize: 22,
                textAlign: "left",
                direction: "ltr",
              }}
            >
              🔒 my-site.com/login
            </div>
          </div>
          <div
            style={{
              padding: "40px 60px 48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 26,
            }}
          >
            <div
              style={{
                opacity: Math.min(1, f1 * 1.4),
                transform: `translateY(${(1 - f1) * -16}px)`,
              }}
            >
              <RenderInput placeholder="اسم المستخدم" width={760} fontSize={40} />
            </div>
            <div
              style={{
                opacity: Math.min(1, f2 * 1.4),
                transform: `translateY(${(1 - f2) * -16}px)`,
              }}
            >
              <RenderInput placeholder="كلمة السر" type="password" width={760} fontSize={40} />
            </div>
            <div
              style={{
                opacity: Math.min(1, f3 * 1.4),
                transform: `scale(${0.8 + 0.2 * f3})`,
              }}
            >
              <RenderButton label="تسجيل الدخول" width={760} fontSize={40} />
            </div>
          </div>
        </div>
      </div>

      {/* golden promise badge */}
      <div
        style={{
          position: "absolute",
          top: 1300,
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
            padding: "24px 60px",
            borderRadius: 100,
            background: `linear-gradient(180deg, #FFE44D, ${COLORS.gold})`,
            color: "#14182E",
            fontSize: 60,
            fontWeight: 900,
            boxShadow: `0 0 ${40 + glow * 50}px rgba(255,215,0,0.7), 0 18px 44px rgba(0,0,0,0.5)`,
            whiteSpace: "nowrap",
          }}
        >
          3 وسوم + خصائص سحرية!
        </div>
      </div>

      {/* floating tag chips */}
      {CHIPS.map((c, i) => {
        const chipIn = popAt(frame, fps, 44 + i * 7, 13, 150);
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
            }}
          >
            <TagChip label={c.t} color={c.c} fontSize={32} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
