import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, MONO } from "../../vscode/theme";
import { VscodeWindow } from "../../vscode/mocks";
import { ClickRipple, MouseCursor } from "../../vscode/lang/parts";
import { Twinkles } from "../../browser/parts";
import {
  C_BUTTON,
  C_FORM,
  RenderButton,
  RenderInput,
  TypedCodeBlock,
  fadeUp,
  popAt,
  totalChars,
} from "../parts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const WIN = { x: 70, w: 940 };

const LINES = [
  "<button",
  '  type="submit">',
  "  تسجيل الدخول",
  "</button>",
];
const TOTAL = totalChars(LINES);
const T0 = 6;
const T1 = 64;

/** the <button type="submit"> — code typed on "بنستخدم button", the pointer
 * clicks right as "عشان يبعت البيانات" is said (~f104), then success. */
export const ButtonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const win = popAt(frame, fps, 2, 14, 130);
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );

  // filled-in credentials (fields are already valid)
  const filled = frame >= T1 - 16;

  // pointer clicks the submit button
  const CLICK = 104;
  const cx = interpolate(frame, [72, CLICK], [820, 300], clamp);
  const cy = interpolate(frame, [72, CLICK], [1220, 1420], clamp);
  const success = frame >= CLICK + 8;
  const successPop = popAt(frame, fps, CLICK + 8, 10, 190);

  // burst of confetti on success
  const burst = Math.max(0, Math.min(1, (frame - (CLICK + 8)) / 36));

  const cap1 = fadeUp(frame, 66, 88);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={61} box={{ x: 20, y: 1500, w: 1040, h: 360 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 240,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <TypedCodeBlock lines={LINES} typed={n} size={34} glowAttrs={["submit"]} glowOn={frame > T1} />
        </VscodeWindow>
      </div>

      {/* browser preview */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 720,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
        }}
      >
        <div
          style={{
            borderRadius: 24,
            background: "#0B1130",
            border: "2px solid rgba(255,255,255,0.5)",
            boxShadow: "0 26px 66px rgba(0,0,0,0.55)",
            padding: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              textAlign: "left",
              direction: "ltr",
              marginBottom: 22,
            }}
          >
            🔒 my-site.com/login
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 22,
            }}
          >
            <RenderInput
              placeholder="اسم المستخدم"
              value={filled ? "أحمد" : ""}
              width={760}
              fontSize={38}
            />
            <RenderInput
              placeholder="كلمة السر"
              type="password"
              value={filled ? "secret1" : ""}
              width={760}
              fontSize={38}
            />
            <RenderButton
              label="تسجيل الدخول"
              width={760}
              fontSize={38}
              pressed={frame >= CLICK && !success}
              success={success}
            />
          </div>

          {/* success burst */}
          {burst > 0 && burst < 1
            ? Array.from({ length: 20 }, (_, i) => {
                const a = (i / 20) * Math.PI * 2;
                const d = burst * 340;
                const colors = ["#FFD700", "#22D3EE", "#A855F7", "#34D399", "#F472B6"];
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 480 + Math.cos(a) * d,
                      top: 210 + Math.sin(a) * d * 0.8,
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: colors[i % colors.length],
                      opacity: 1 - burst,
                      transform: `rotate(${burst * 360}deg)`,
                    }}
                  />
                );
              })
            : null}
        </div>
      </div>

      {/* travelling pointer + ripple */}
      {frame >= 68 ? (
        <>
          <MouseCursor x={cx} y={cy} size={54} />
          <ClickRipple frame={frame} at={CLICK} x={cx + 10} y={cy + 10} color="#FFFFFF" />
        </>
      ) : null}

      {/* success toast */}
      {success ? (
        <div
          style={{
            position: "absolute",
            top: 1300,
            left: 0,
            width: 1080,
            display: "flex",
            justifyContent: "center",
            zIndex: 26,
            opacity: Math.min(1, successPop * 1.5),
            transform: `scale(${0.6 + 0.4 * successPop})`,
          }}
        >
          <div
            style={{
              padding: "20px 50px",
              borderRadius: 100,
              background: "linear-gradient(180deg,#22C55E,#15803D)",
              color: "#FFFFFF",
              fontSize: 50,
              fontWeight: 900,
              boxShadow: `0 0 ${30 + 20 * Math.sin(t * 5)}px rgba(34,197,94,0.7)`,
            }}
          >
            تم إرسال النموذج بنجاح ✓🎉
          </div>
        </div>
      ) : null}

      {/* captions */}
      <div
        style={{
          position: "absolute",
          top: 1500,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 30px",
              borderRadius: 100,
              background: "rgba(6,10,30,0.94)",
              border: `3px solid ${C_BUTTON}`,
              boxShadow: `0 0 26px ${C_BUTTON}66`,
            }}
          >
            <span style={{ fontSize: 40 }}>🔘</span>
            <span style={{ fontFamily: MONO, fontSize: 40, fontWeight: 700, color: C_BUTTON, direction: "ltr" }}>
              button
            </span>
            <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 900, color: "#FFFFFF" }}>
              = الزر
            </span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 30px",
              borderRadius: 100,
              background: "rgba(6,10,30,0.94)",
              border: `3px solid ${C_FORM}`,
              boxShadow: `0 0 26px ${C_FORM}66`,
            }}
          >
            <span style={{ fontSize: 40 }}>📤</span>
            <span style={{ fontFamily: MONO, fontSize: 40, fontWeight: 700, color: C_FORM, direction: "ltr" }}>
              type='submit'
            </span>
            <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 900, color: "#FFFFFF" }}>
              = إرسال
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
