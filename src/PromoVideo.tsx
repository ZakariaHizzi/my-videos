import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";



const W = 1080;
const H = 1920;

const FONT = "'Cairo','Tajawal','Segoe UI',Tahoma,Arial,sans-serif";

const COLORS = {
  bg1: "#070B2A",
  bg2: "#1B1450",
  purple: "#7C3AED",
  violet: "#A855F7",
  cyan: "#22D3EE",
  pink: "#EC4899",
  yellow: "#FACC15",
  green: "#22C55E",
  white: "#FFFFFF",
};

/* ---------- Background ---------- */
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const orbs = [
    { x: 150, y: 300, s: 520, c: "#7C3AED", o: 0.55 },
    { x: 850, y: 700, s: 620, c: "#2563EB", o: 0.5 },
    { x: 400, y: 1400, s: 700, c: "#A855F7", o: 0.4 },
    { x: 800, y: 1700, s: 420, c: "#EC4899", o: 0.35 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bg1} 0%, #12164D 32%, #3A1C96 62%, #160F3D 100%)`,
        overflow: "hidden",
      }}
    >
      {/* grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 75%)",
        }}
      />
      {/* orbs */}
      {orbs.map((o, i) => {
        const pulse =
          1 + 0.08 * Math.sin(t * 1.6 + i * 1.8);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o.x - o.s / 2,
              top: o.y - o.s / 2,
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${o.c} 0%, transparent 68%)`,
              opacity: o.o,
              scale: `${pulse}`,
              filter: "blur(10px)",
            }}
          />
        );
      })}
      {/* floating symbols */}
      {[
        { s: "</>", x: 90, y: 180, d: 0 },
        { s: "{}", x: 860, y: 240, d: 1.2 },
        { s: "#", x: 120, y: 1550, d: 2.1 },
        { s: ";", x: 880, y: 1500, d: 0.7 },
        { s: "💻", x: 70, y: 900, d: 1.5 },
        { s: "⚡", x: 900, y: 950, d: 2.5 },
      ].map((p, i) => {
        const fy = Math.sin(t * 1.2 + p.d) * 22;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y + fy,
              fontSize: 56,
              fontWeight: 800,
              color: "rgba(255,255,255,0.22)",
              fontFamily: "monospace",
              rotate: `${Math.sin(t + p.d) * 8}deg`,
            }}
          >
            {p.s}
          </div>
        );
      })}
      {/* top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background:
            "linear-gradient(90deg, #22D3EE, #A855F7, #EC4899, #FACC15)",
        }}
      />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;
  return (
    <div
      style={{
        position: "absolute",
        top: 14,
        left: 40,
        right: 40,
        height: 10,
        borderRadius: 10,
        background: "rgba(255,255,255,0.18)",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: `${p * 100}%`,
          height: "100%",
          borderRadius: 10,
          background: "linear-gradient(90deg,#22D3EE,#A855F7,#EC4899)",
        }}
      />
    </div>
  );
};

const Badge: React.FC<{ text: string; color?: string }> = ({
  text,
  color = "#22D3EE",
}) => (
  <div
    style={{
      display: "inline-block",
      padding: "14px 36px",
      borderRadius: 100,
      background: "rgba(255,255,255,0.12)",
      border: `2px solid ${color}`,
      color: "#fff",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 34,
      letterSpacing: 0.5,
      boxShadow: `0 0 28px ${color}66`,
      direction: "rtl",
    }}
  >
    {text}
  </div>
);

const pop = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });

const fadeUp = (
  frame: number,
  start: number,
  end: number,
  distance = 80
): { opacity: number; translate: string } => {
  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [start, end], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, translate: `0px ${y}px` };
};

/* ---------- Code window ---------- */
const CodeWindow: React.FC<{ frame: number; fps: number; scale?: number }> = ({
  frame,
  fps,
  scale = 1,
}) => {
  const lines = [
    { t: "<div className=\"hero\">", c: "#7DD3FC" },
    { t: "  <h1>مرحبا بالعالم! 👋</h1>", c: "#F0ABFC" },
    { t: "  const dev = await learn();", c: "#FACC15" },
    { t: "  function success() { 🚀 }", c: "#86EFAC" },
    { t: "</div>", c: "#7DD3FC" },
  ];
  const reveal = interpolate(frame, [0, 3 * fps], [0, lines.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 860 * scale,
        borderRadius: 32 * scale,
        background: "rgba(10,14,40,0.92)",
        border: "2px solid rgba(168,85,247,0.55)",
        boxShadow: "0 30px 90px rgba(0,0,0,0.55), 0 0 60px rgba(124,58,237,0.35)",
        overflow: "hidden",
        direction: "ltr",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14 * scale,
          padding: `${20 * scale}px ${28 * scale}px`,
          background: "rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ width: 22 * scale, height: 22 * scale, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 22 * scale, height: 22 * scale, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 22 * scale, height: 22 * scale, borderRadius: "50%", background: "#28C840" }} />
        <div
          style={{
            marginLeft: "auto",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "monospace",
            fontSize: 24 * scale,
          }}
        >
          portfolio.js
        </div>
      </div>
      <div style={{ padding: `${28 * scale}px ${30 * scale}px` }}>
        {lines.slice(0, Math.floor(reveal) + 1).map((l, i) => {
          const last = i === Math.floor(reveal);
          const charCount = last
            ? Math.floor(
                interpolate(frame % (fps * 0.9), [0, fps * 0.9], [0, l.t.length], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              )
            : l.t.length;
          void last;
          return (
            <div
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: 30 * scale,
                lineHeight: 1.7,
                color: l.c,
                whiteSpace: "pre",
                opacity: i <= reveal ? 1 : 0,
              }}
            >
              {l.t.slice(0, i === Math.floor(reveal) ? Math.max(charCount, 1) : l.t.length)}
              {i === Math.floor(reveal) ? <span style={{ color: "#22D3EE" }}>▍</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- SCENES ---------- */

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 5);
  const a1 = fadeUp(frame, 5, 25);
  const a2 = fadeUp(frame, 25, 45);
  // "من الصفر للاحتراف" starts at 2.22s
  const a3 = fadeUp(frame, 62, 82);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        textAlign: "center",
        direction: "rtl",
        fontFamily: FONT,
      }}
    >
      <div style={{ opacity: a1.opacity, translate: a1.translate, scale: `${s}` }}>
        <Badge text="⚡ دورة البرمجة الشاملة" />
      </div>
      <div style={{ height: 36 }} />
      <div
        style={{
          opacity: a2.opacity,
          translate: a2.translate,
          fontSize: 118,
          fontWeight: 900,
          lineHeight: 1.25,
          color: "#fff",
        }}
      >
        هل تحلم تصبح
        <br />
        <span
          style={{
            background: "linear-gradient(90deg,#22D3EE,#A855F7,#EC4899)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 132,
          }}
        >
          مبرمج محترف؟
        </span>
      </div>
      <div style={{ height: 28 }} />
      <div
        style={{
          opacity: a3.opacity,
          translate: a3.translate,
          fontSize: 52,
          fontWeight: 700,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        من الصفـر حتى بناء مشاريع حقيقية 💪
      </div>
      <div style={{ height: 60 }} />
      <div style={{ opacity: a3.opacity, scale: `${0.6 + 0.4 * s}` }}>
        <CodeWindow frame={frame} fps={fps} scale={0.95} />
      </div>
    </div>
  );
};

const SceneStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, 5, 25);
  const items = [
    { big: "HTML", small: "هيكل المواقع", bg: "#FF5722", icon: "🌐" },
    { big: "CSS", small: "التصميم والأناقة", bg: "#2196F3", icon: "🎨" },
    { big: "JS", small: "التفاعل والحياة", bg: "#FACC15", icon: "⚡" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="📚 ماذا ستتعلم؟" color="#A855F7" />
        <div style={{ height: 24 }} />
        <div style={{ fontSize: 96, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          3 لغات تصنع
          <br />
          مستقبلك
        </div>
      </div>
      <div style={{ height: 50 }} />
      <div style={{ display: "flex", gap: 28, direction: "ltr" }}>
        {items.map((it, i) => {
          // pop on the spoken word: HTML 4.12s, CSS 6.18s, JS 8.04s
          const d = [2, 60, 116][i];
          const sc = spring({ frame: frame - d, fps, config: { damping: 12, stiffness: 140 } });
          const yFloat = Math.sin((frame / fps) * 2 + i) * 12;
          return (
            <div
              key={it.big}
              style={{
                scale: `${sc}`,
                translate: `0px ${yFloat}px`,
                width: 280,
                borderRadius: 36,
                padding: "36px 16px",
                background: "rgba(255,255,255,0.10)",
                border: "2px solid rgba(255,255,255,0.18)",
                borderTop: `8px solid ${it.bg}`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${it.bg}44`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 64 }}>{it.icon}</div>
              <div
                style={{
                  fontSize: 62,
                  fontWeight: 900,
                  color: "#fff",
                  fontFamily: "Arial Black, Arial, sans-serif",
                  background: it.bg,
                  borderRadius: 18,
                  padding: "4px 28px",
                }}
              >
                {it.big}
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, color: "rgba(255,255,255,0.9)", fontFamily: FONT }}>
                {it.small}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 44 }} />
      <div
        style={{
          ...fadeUp(frame, 10, 32),
          fontSize: 44,
          fontWeight: 700,
          color: "#FACC15",
          fontFamily: FONT,
        }}
      >
        + مشاريع تطبيقية بعد كل درس 🚀
      </div>
    </div>
  );
};

const SceneLaptop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, 5, 25);
  const lapScale = spring({ frame: frame - 20, fps, config: { damping: 13, stiffness: 120 } });
  const glow = 0.5 + 0.5 * Math.sin((frame / fps) * 3);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="💻 تعلّم بالتطبيق العملي" color="#22D3EE" />
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 92, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          شاهد • طبّق • ابنِ
        </div>
      </div>
      {/* "شرح عربي مبسط من الصفر" starts at 12.60s */}
      <div
        style={{
          ...fadeUp(frame, 80, 100),
          fontSize: 46,
          fontWeight: 700,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        شرح مبسّط للمبتدئين من الصفر
      </div>
      <div style={{ height: 46 }} />
      {/* Laptop */}
      <div style={{ scale: `${lapScale}`, position: "relative" }}>
        <div
          style={{
            width: 820,
            borderRadius: 32,
            background: "#0B1030",
            border: "3px solid rgba(34,211,238,0.6)",
            boxShadow: `0 0 ${40 + glow * 40}px rgba(34,211,238,0.45), 0 30px 80px rgba(0,0,0,0.6)`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg,#1E1B4B,#312E81)",
              padding: "18px 28px",
              display: "flex",
              gap: 12,
              alignItems: "center",
              direction: "ltr",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
            <div style={{ marginLeft: "auto", color: "#fff", fontFamily: "monospace", fontSize: 24 }}>
              my-first-website.html
            </div>
          </div>
          <div style={{ padding: 30, textAlign: "left" }}>
            {[
              { t: "<header> My Portfolio </header>", c: "#F472B6" },
              { t: ".hero { color: #22D3EE; }", c: "#22D3EE" },
              { t: "button.onClick(() => wow!)", c: "#FACC15" },
            ].map((l, i) => {
              const o = interpolate(frame, [30 + i * 18, 45 + i * 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: o,
                    fontFamily: "monospace",
                    fontSize: 32,
                    color: l.c,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    padding: "14px 20px",
                    marginBottom: 14,
                  }}
                >
                  {l.t}
                </div>
              );
            })}
            {/* browser preview mock */}
            <div
              style={{
                marginTop: 10,
                borderRadius: 18,
                background: "#fff",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: interpolate(frame, [90, 115], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "linear-gradient(135deg,#22D3EE,#A855F7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                }}
              >
                🚀
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#111", fontFamily: "Arial" }}>
                  My Awesome Site
                </div>
                <div style={{ fontSize: 24, color: "#666", fontFamily: "Arial" }}>Built by YOU ✨</div>
              </div>
            </div>
          </div>
        </div>
        {/* base */}
        <div
          style={{
            width: 920,
            height: 26,
            marginLeft: -50,
            marginTop: -4,
            borderRadius: "0 0 28px 28px",
            background: "linear-gradient(180deg,#3B425E,#1A1E36)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 18,
          ...fadeUp(frame, 100, 125),
        }}
      >
        {["✅ بدون خبرة", "✅ خطوة بخطوة", "✅ عربي 100%"].map((t) => (
          <div
            key={t}
            style={{
              background: "rgba(34,197,94,0.18)",
              border: "2px solid #22C55E",
              color: "#fff",
              borderRadius: 100,
              padding: "12px 28px",
              fontSize: 36,
              fontWeight: 800,
              fontFamily: FONT,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

const SceneProjects: React.FC = () => {
  const frame = useCurrentFrame();
  const title = fadeUp(frame, 5, 25);
  const cards = [
    { e: "🛒", t: "متجر إلكتروني", d: "سلة + دفع + منتجات", c: "#EC4899" },
    { e: "📝", t: "موقع شخصي", d: "Portfolio يبهر الشركات", c: "#22D3EE" },
    { e: "📱", t: "تطبيق مهام", d: "To-Do App تفاعلي", c: "#A855F7" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="🏆 مشاريع حقيقية لمعرض أعمالك" color="#EC4899" />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 94, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          ابنِ 5+ مشاريع
          <br />
          بنفسك
        </div>
      </div>
      <div style={{ height: 40 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 860 }}>
        {cards.map((c, i) => {
          // pop as each project is named: متجر 17.28s, موقع شخصي 17.72s, تطبيق مهام 18.82s
          const d = [66, 79, 112][i];
          const x = interpolate(frame, [d, d + 20], [-600, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.4)),
          });
          const o = interpolate(frame, [d, d + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={c.t}
              style={{
                opacity: o,
                translate: `${x}px 0px`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "rgba(255,255,255,0.10)",
                border: "2px solid rgba(255,255,255,0.16)",
                borderRight: `10px solid ${c.c}`,
                borderRadius: 28,
                padding: "26px 30px",
                boxShadow: `0 18px 50px rgba(0,0,0,0.4)`,
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 26,
                  background: `${c.c}33`,
                  border: `2px solid ${c.c}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 58,
                  flexShrink: 0,
                }}
              >
                {c.e}
              </div>
              <div style={{ textAlign: "right", flex: 1 }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: "#fff" }}>{c.t}</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{c.d}</div>
              </div>
              <div style={{ fontSize: 44, color: c.c }}>◀</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SceneExercises: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  void fps;
  const title = fadeUp(frame, 5, 25);
  const rows = [
    "تمارين بعد كل درس ✍️",
    "اختبارات قصيرة ✅",
    "تحديات كود أسبوعية 🔥",
    "تصحيح + ملاحظات 📝",
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="✍️ تمارين وتطبيق مستمر" color="#FACC15" />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 96, fontWeight: 900, color: "#fff" }}>لن تنسى أبداً</div>
      </div>
      {/* "تتعلم بالممارسة لا بالحفظ" starts at 22.92s */}
      <div
        style={{
          ...fadeUp(frame, 78, 98),
          fontSize: 46,
          fontWeight: 700,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        لأنك تتعلم بالممارسة وليس بالحفظ
      </div>
      <div style={{ height: 44 }} />
      <div
        style={{
          width: "100%",
          maxWidth: 840,
          background: "rgba(10,14,40,0.85)",
          borderRadius: 32,
          border: "2px solid rgba(250,204,21,0.5)",
          padding: 36,
          boxShadow: "0 20px 70px rgba(0,0,0,0.5)",
        }}
      >
        {rows.map((r, i) => {
          const d = 16 + i * 16;
          const o = interpolate(frame, [d, d + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const sc = spring({ frame: frame - d, fps: 30, config: { damping: 12, stiffness: 160 } });
          return (
            <div
              key={r}
              style={{
                opacity: o,
                scale: `${sc}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: i % 2 === 0 ? "rgba(250,204,21,0.12)" : "rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: "20px 24px",
                marginBottom: 16,
                fontSize: 44,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              {r}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SceneCertificate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, 5, 25);
  const certScale = spring({ frame: frame - 30, fps, config: { damping: 11, stiffness: 100 } });
  const shineX = interpolate(frame, [40, 140], [-400, 800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="🎓 شهادة تثبت مهارتك" color="#22C55E" />
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 92, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          شهادة إتمام
          <br />
          + معرض أعمال
        </div>
      </div>
      <div style={{ height: 40 }} />
      <div style={{ scale: `${certScale}`, position: "relative", rotate: "-3deg" }}>
        <div
          style={{
            width: 840,
            borderRadius: 30,
            background: "linear-gradient(135deg,#FFFDF5 0%,#FEF3C7 50%,#FDE68A 100%)",
            border: "6px double #B45309",
            padding: "44px 40px",
            boxShadow: "0 30px 90px rgba(0,0,0,0.5), 0 0 60px rgba(250,204,21,0.4)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: shineX,
              width: 120,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)",
              rotate: "12deg",
            }}
          />
          <div style={{ fontSize: 38, fontWeight: 800, color: "#92400E", letterSpacing: 2 }}>
            CERTIFICATE OF COMPLETION
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: "#1C1917", marginTop: 8 }}>
            شهادة إتمام الدورة 🎉
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#57534E", marginTop: 6 }}>
            Full-Stack Web Development
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              marginTop: 22,
            }}
          >
            <div style={{ height: 3, width: 180, background: "#B45309" }} />
            <div style={{ fontSize: 64 }}>🏅</div>
            <div style={{ height: 3, width: 180, background: "#B45309" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#78716C" }}>
            HTML • CSS • JavaScript • Projects
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 34,
          fontSize: 44,
          fontWeight: 800,
          color: "#fff",
          background: "rgba(34,197,94,0.2)",
          border: "2px solid #22C55E",
          borderRadius: 100,
          padding: "14px 40px",
          // "يقوي سيرتك الذاتية" starts at 27.20s
          ...fadeUp(frame, 54, 76),
        }}
      >
        قوّي سيرتك الذاتية 💼
      </div>
    </div>
  );
};

const SceneSupport: React.FC = () => {
  const frame = useCurrentFrame();
  const title = fadeUp(frame, 5, 25);
  const msgs = [
    { who: "you", text: "عندي سؤال في الـ Flexbox 😅", delay: 25 },
    { who: "mentor", text: "أهلاً! شوف هذا المثال 👇 ستحلها بدقيقة ✅", delay: 55 },
    { who: "you", text: "وااو فهمتها! شكراً 🙏🔥", delay: 90 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      <div style={{ opacity: title.opacity, translate: title.translate }}>
        <Badge text="💬 دعم متواصل لا تُترك وحدك" color="#22D3EE" />
        <div style={{ height: 18 }} />
        <div style={{ fontSize: 92, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          اسأل في أي وقت
        </div>
        <div style={{ fontSize: 46, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
          مجتمع + مرشد يجاوبك بسرعة
        </div>
      </div>
      <div style={{ height: 36 }} />
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          background: "rgba(10,16,45,0.9)",
          borderRadius: 36,
          border: "2px solid rgba(34,211,238,0.4)",
          padding: 32,
          boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
        }}
      >
        {/* chat header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#22D3EE,#A855F7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
            }}
          >
            👨‍🏫
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#fff" }}>فريق الدعم</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#22C55E" }}>● متصل الآن</div>
          </div>
        </div>
        {msgs.map((m) => {
          const o = interpolate(frame, [m.delay, m.delay + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [m.delay, m.delay + 14], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const isYou = m.who === "you";
          return (
            <div
              key={m.text}
              style={{
                opacity: o,
                translate: `0px ${y}px`,
                display: "flex",
                justifyContent: isYou ? "flex-start" : "flex-end",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  background: isYou ? "linear-gradient(135deg,#7C3AED,#A855F7)" : "rgba(255,255,255,0.14)",
                  border: isYou ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                  borderRadius: 26,
                  borderBottomRightRadius: isYou ? 6 : 26,
                  borderBottomLeftRadius: isYou ? 26 : 6,
                  padding: "20px 28px",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {/* typing */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            opacity: interpolate(frame, [95, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[0, 1, 2].map((i) => {
            const b = Math.abs(Math.sin((frame / 12) + i * 1.2));
            return (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#22D3EE",
                  opacity: 0.4 + b * 0.6,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = fadeUp(frame, 5, 25);
  // "اضغط فولو" starts at 34.64s
  const btnScale = spring({ frame: frame - 46, fps, config: { damping: 9, stiffness: 130 } });
  const pulse = 1 + 0.07 * Math.sin((frame / fps) * Math.PI * 2 * 1.6);
  const handleScale = Math.max(0.001, btnScale * pulse);

  const userScale = spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 140 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 60,
        paddingBottom: 110,
        direction: "rtl",
        fontFamily: FONT,
        textAlign: "center",
      }}
    >
      {/* avatar + glow */}
      <div
        style={{
          ...title,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "auto",
          paddingTop: 130,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#FACC15,#EC4899,#A855F7)",
              padding: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1E1B4B,#3B0764)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 110,
              }}
            >
              👨‍💻
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 6,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#22C55E",
              border: "5px solid #0A0E2A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: "#fff",
              fontWeight: 900,
            }}
          >
            ✓
          </div>
        </div>
        <div style={{ height: 26 }} />
        <div style={{ fontSize: 88, fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
          ابدأ رحلتك
          <br />
          اليوم مجاناً 🔥
        </div>
        <div style={{ fontSize: 44, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 10 }}>
          دروس • مشاريع • شهادة • دعم
        </div>
      </div>

      {/* BIG CTA AT BOTTOM */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            scale: `${handleScale}`,
            width: "100%",
            maxWidth: 900,
            borderRadius: 36,
            background: "linear-gradient(90deg,#EC4899,#A855F7,#6366F1)",
            padding: 8,
            boxShadow: "0 0 70px rgba(236,72,153,0.6), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              borderRadius: 30,
              background: "linear-gradient(90deg,#DB2777,#7C3AED)",
              padding: "30px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 22,
            }}
          >
            <span style={{ fontSize: 72 }}>📸</span>
            <span style={{ fontSize: 78, fontWeight: 900, color: "#fff" }}>اضغط Follow</span>
            <span style={{ fontSize: 72 }}>👇</span>
          </div>
        </div>

        <div style={{ height: 22 }} />

        <div
          style={{
            scale: `${userScale}`,
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "rgba(0,0,0,0.55)",
            border: "2.5px solid rgba(255,255,255,0.35)",
            borderRadius: 100,
            padding: "20px 44px",
            direction: "ltr",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          }}
        >
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(45deg,#FACC15,#EC4899,#A855F7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            📷
          </span>
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#fff",
              fontFamily: "Arial, sans-serif",
              letterSpacing: 0.5,
            }}
          >
            @web.fullstack.dev
          </span>
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 36,
            fontWeight: 700,
            color: "rgba(255,255,255,0.75)",
            fontFamily: FONT,
            opacity: interpolate(frame, [80, 105], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          تابعنا لتتعلم البرمجة من الصفر ✨
        </div>
      </div>
    </div>
  );
};

      /* ---------- Main (scene cuts snapped to "voice vs code.mp3" word timings) ---------- */
export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  void frame;
  return (
    <AbsoluteFill style={{ width: W, height: H, background: COLORS.bg1 }}>
      <Background />
      <ProgressBar />
      {/* Your recorded voice (38.43s) — word timings from scripts/voice-vscode-transcript.json */}
      <Audio src={staticFile("voice/voice vs code.mp3")} volume={1} />

      {/* 0-4.13s Hook — "تحلم تصبح مبرمج محترف؟ من الصفر للاحتراف!" (ends 3.70s) */}
      <Sequence durationInFrames={124}>
        <SceneHook />
      </Sequence>
      {/* 4.13-9.93s Stack — "HTML للهيكل" 4.12s "CSS للأناقة" 6.18s "جافاسكريبت للحياة" 8.04s */}
      <Sequence from={124} durationInFrames={174}>
        <SceneStack />
      </Sequence>
      {/* 9.93-15.03s Laptop — "شاهد طبّق ابن نفسك" 9.94s "شرح عربي مبسط من الصفر" 12.60s */}
      <Sequence from={298} durationInFrames={153}>
        <SceneLaptop />
      </Sequence>
      {/* 15.03-20.23s Projects — "ابن خمس مشاريع" 15.02s متجر 17.28s موقع 17.72s مهام 18.82s */}
      <Sequence from={451} durationInFrames={156}>
        <SceneProjects />
      </Sequence>
      {/* 20.23-25.33s Exercises — "تمارين وتحديات بعد كل درس" 20.24s "تتعلم بالممارسة" 22.92s */}
      <Sequence from={607} durationInFrames={153}>
        <SceneExercises />
      </Sequence>
      {/* 25.33-29.07s Certificate — "شهادة إتمام ومعرض أعمال" 25.32s "يقوي سيرتك الذاتية" 27.20s */}
      <Sequence from={760} durationInFrames={112}>
        <SceneCertificate />
      </Sequence>
      {/* 29.07-33.07s Support — "اسأل أي وقت" 29.08s "مجتمع ومرشد يجاوبك بسرعة" 30.52s */}
      <Sequence from={872} durationInFrames={120}>
        <SceneSupport />
      </Sequence>
      {/* 33.07-38.8s CTA — "ابدأ اليوم مجاناً" 33.06s "اضغط فولو" 34.64s "وتابعنا" 35.70s */}
      <Sequence from={992} durationInFrames={172}>
        <SceneCTA />
      </Sequence>

    </AbsoluteFill>
  );
};
