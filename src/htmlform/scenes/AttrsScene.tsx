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
  C_PLACEHOLDER,
  C_REQUIRED,
  RenderButton,
  RenderInput,
  TypedCodeBlock,
  cumChars,
  fadeUp,
  popAt,
  totalChars,
} from "../parts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const WIN = { x: 70, w: 940 };

const LINES = [
  '<input type="email"',
  '  placeholder="example@mail.com" required>',
  "",
];
const TOTAL = totalChars(LINES);
const T0 = 4;
const T1 = 36;

/** placeholder/required: cut lands as "مهمين" is said; "placeholder" @~f32,
 * "required" @~f125, and the empty-submit block @~f237 ("لازم يملاهة"). */
export const AttrsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const win = popAt(frame, fps, 2, 14, 130);
  const n = Math.round(
    interpolate(frame, [T0, T1], [0, TOTAL], { ...clamp, easing: Easing.linear }),
  );

  // the field appears once the whole <input ...> tag has been typed
  const fieldAt = T0 + (cumChars(LINES, 2) / TOTAL) * (T1 - T0);

  // pointer travels to the submit button and clicks (empty field)
  const CLICK = 186;
  const cx = interpolate(frame, [148, CLICK], [760, 300], clamp);
  const cy = interpolate(frame, [148, CLICK], [1180, 1330], clamp);
  const showError = frame >= CLICK + 6;

  // camera pushes in on the red validation bubble
  const zoom = interpolate(frame, [CLICK + 6, CLICK + 62], [1, 1.5], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  const cap1 = fadeUp(frame, 28, 48);
  const reqBadge = popAt(frame, fps, 118, 11, 170);

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        direction: "rtl",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Twinkles count={10} seed={22} box={{ x: 20, y: 1420, w: 1040, h: 420 }} />

      {/* editor */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 210,
          width: WIN.w,
          zIndex: 8,
          opacity: Math.min(1, win),
          transform: `scale(${0.92 + 0.08 * win})`,
          transformOrigin: "50% 20%",
        }}
      >
        <VscodeWindow width={WIN.w} tab="index.html" language="HTML">
          <TypedCodeBlock
            lines={LINES}
            typed={n}
            size={30}
            glowAttrs={["placeholder", "required"]}
            glowOn={frame > 30}
          />
        </VscodeWindow>
      </div>

      {/* browser preview */}
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: 700,
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
            🔒 localhost:5500
          </div>

          {/* zoomed group: field + button + validation bubble */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "50% 40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 22,
              // headroom so the validation bubble (top:-74) stays inside the
              // card's overflow:hidden instead of clipping at the top edge
              paddingTop: 84,
            }}
          >
            {frame >= fieldAt ? (
              <div
                style={{
                  position: "relative",
                  opacity: Math.min(1, popAt(frame, fps, fieldAt, 12, 180)),
                }}
              >
                <RenderInput
                  placeholder="example@mail.com"
                  type="email"
                  width={760}
                  fontSize={40}
                  error={showError}
                />
                {/* the browser's own validation bubble */}
                {showError ? (
                  <div
                    style={{
                      position: "absolute",
                      top: -74,
                      right: 10,
                      padding: "12px 22px",
                      borderRadius: 12,
                      background: "#D93025",
                      color: "#FFFFFF",
                      fontFamily: FONT,
                      fontSize: 30,
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      boxShadow: "0 10px 26px rgba(0,0,0,0.5)",
                      opacity: Math.min(1, popAt(frame, fps, CLICK + 6, 11, 200)),
                    }}
                  >
                    ⚠️ Please fill out this field
                    <div
                      style={{
                        position: "absolute",
                        bottom: -12,
                        right: 40,
                        width: 0,
                        height: 0,
                        borderLeft: "12px solid transparent",
                        borderRight: "12px solid transparent",
                        borderTop: "12px solid #D93025",
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}

            <div style={{ opacity: Math.min(1, popAt(frame, fps, fieldAt + 10, 12, 180)) }}>
              <RenderButton label="إرسال" width={760} fontSize={38} pressed={showError} />
            </div>
          </div>
        </div>
      </div>

      {/* travelling pointer + click ripple */}
      {frame >= 144 ? (
        <>
          <MouseCursor x={cx} y={cy} size={54} />
          <ClickRipple frame={frame} at={CLICK} x={cx + 10} y={cy + 10} color="#FFFFFF" />
        </>
      ) : null}

      {/* caption: placeholder */}
      <div
        style={{
          position: "absolute",
          top: 1470,
          left: 0,
          width: 1080,
          zIndex: 22,
          opacity: cap1.opacity,
          transform: cap1.translate,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 50 }}>💬</span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 46,
              fontWeight: 900,
              color: C_PLACEHOLDER,
              direction: "ltr",
              textShadow: `0 0 22px ${C_PLACEHOLDER}99`,
            }}
          >
            placeholder
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              textShadow: "0 6px 20px rgba(0,0,0,0.55)",
            }}
          >
            = نص توضيحي
          </span>
        </div>
      </div>

      {/* caption: required (with red warning badge) */}
      <div
        style={{
          position: "absolute",
          top: 1610,
          left: 0,
          width: 1080,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          zIndex: 22,
          opacity: Math.min(1, reqBadge * 1.5),
          transform: `scale(${0.7 + 0.3 * reqBadge})`,
        }}
      >
        <div
          style={{
            padding: "18px 40px",
            borderRadius: 100,
            background: "rgba(6,10,30,0.94)",
            border: `3px solid ${C_REQUIRED}`,
            boxShadow: `0 0 30px ${C_REQUIRED}88`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 46,
              fontWeight: 900,
              color: C_REQUIRED,
              direction: "ltr",
            }}
          >
            required
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 46,
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            = إجبارية
          </span>
          {/* the red warning badge */}
          <span
            style={{
              fontSize: 44,
              filter: `drop-shadow(0 0 ${10 + 8 * Math.sin(t * 6)}px rgba(255,60,60,0.9))`,
            }}
          >
            ⚠️
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
