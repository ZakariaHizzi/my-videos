import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, MONO } from "../vscode/theme";
import { BottomBar, CoverGrid, FrameStrip, PageCard } from "../sites/coverKit";

const GOLD = "#A67C2E";
const BROWN = "#7C4E12";
const CREAM = "#FAF9F3";
const INK = "#1A1A1A";
const GREY = "#6B6B6B";
const PEACH = "#FDF3E9";
const PEACH_BORDER = "#EBD2AE";

/** Brown circle with a white compass needle. */
const Compass: React.FC<{ size?: number }> = ({ size = 46 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#A5761F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
      <path d="M12 2 L16 12 L12 22 L8 12 Z" fill="#FFFFFF" />
      <path d="M12 2 L16 12 L12 12 Z" fill="#FFE9BF" />
    </svg>
  </span>
);

/* ------------------------------------------------------------------ */
/* destination detail                                                  */
/* ------------------------------------------------------------------ */

const DestinationPage: React.FC = () => (
  <div style={{ height: "100%", background: CREAM, padding: "24px 26px", display: "flex", gap: 26 }}>
    {/* photo */}
    <div style={{ flex: "1 1 45%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          flex: 1,
          borderRadius: 16,
          background: "linear-gradient(165deg,#F0A94C 0%,#D2622A 45%,#7C2D12 100%)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 24px 54px rgba(124,45,18,0.28)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 26,
            top: 26,
            width: 74,
            height: 74,
            borderRadius: "50%",
            background: "radial-gradient(circle,#FFF3D0 0%,#FFD98A 70%)",
            boxShadow: "0 0 50px rgba(255,220,150,0.8)",
          }}
        />
        <svg viewBox="0 0 300 340" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M0 250 L70 170 L130 235 L200 150 L300 250 L300 340 L0 340 Z" fill="#5B2415" opacity="0.75" />
          <path d="M0 290 L80 225 L160 290 L240 230 L300 275 L300 340 L0 340 Z" fill="#33120A" opacity="0.9" />
          {[40, 96, 210, 262].map((x) => (
            <g key={x} fill="#1F0B06">
              <rect x={x} y={252} width={5} height={54} />
              <path d={`M${x - 16} 268 L${x + 2.5} 226 L${x + 21} 268 Z`} />
              <path d={`M${x - 12} 292 L${x + 2.5} 254 L${x + 17} 292 Z`} />
            </g>
          ))}
        </svg>
        <span
          style={{
            position: "absolute",
            left: 18,
            top: 18,
            background: "rgba(255,255,255,0.92)",
            color: BROWN,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 2,
            padding: "7px 15px",
            borderRadius: 100,
          }}
        >
          JAPAN
        </span>
        <span
          style={{
            position: "absolute",
            left: 18,
            bottom: 18,
            color: "#FFF3E0",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.4,
          }}
        >
          AUTUMN SEASON · KYOTO
        </span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {["#D2622A", "#B4531F", "#8A3E17"].map((c, i) => (
          <div
            key={c}
            style={{
              flex: 1,
              height: 46,
              borderRadius: 9,
              background: `linear-gradient(150deg,${c},#5B2415)`,
              border: i === 0 ? `2px solid ${GOLD}` : "1px solid #E7E1D2",
            }}
          />
        ))}
      </div>
    </div>

    {/* info */}
    <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
      <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, letterSpacing: 3, color: GOLD }}>
        CULTURAL IMMERSION
      </div>
      <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.05, color: INK }}>Kyoto, Japan</div>
      <div style={{ fontSize: 14, color: "#B5762A", fontWeight: 800 }}>
        ★★★★★ <span style={{ color: GREY, fontWeight: 700 }}>4.9 · 218 traveller reviews</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.65, color: GREY }}>
        Wander through vermilion torii gates, zen gardens and lantern-lit Gion streets with a curated local host.
      </div>
      <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
        {["8 Nights", "2 Adults", "Sep 30 – Oct 8, 2026"].map((c) => (
          <span
            key={c}
            style={{
              background: PEACH,
              border: `1px solid ${PEACH_BORDER}`,
              color: BROWN,
              fontSize: 13,
              fontWeight: 800,
              padding: "8px 15px",
              borderRadius: 100,
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
        <div>
          <div style={{ fontSize: 42, fontWeight: 900, color: BROWN, lineHeight: 1 }}>$2800</div>
          <div style={{ fontSize: 12, color: GREY, marginTop: 4 }}>total trip price</div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            background: BROWN,
            color: "#FFF8EC",
            fontSize: 17,
            fontWeight: 900,
            padding: "16px 34px",
            borderRadius: 10,
            boxShadow: "0 16px 38px rgba(124,45,18,0.32)",
          }}
        >
          Book This Trip →
        </span>
      </div>
      <div style={{ fontSize: 13, color: "#1B7F3B", fontWeight: 700 }}>✓ Free cancellation until Sep 15</div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* sign in                                                              */
/* ------------------------------------------------------------------ */

const AuthField: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div>
    <div style={{ fontSize: 13, fontWeight: 800, color: "#333333" }}>{label}</div>
    <div
      style={{
        marginTop: 6,
        display: "flex",
        alignItems: "center",
        gap: 9,
        border: "1px solid #E3E3E3",
        background: "#FFFFFF",
        borderRadius: 8,
        padding: "9px 12px",
        fontSize: 14,
        color: "#4B5563",
      }}
    >
      <span style={{ color: "#9CA3AF" }}>{icon}</span>
      {value}
    </div>
  </div>
);

const SignInPage: React.FC = () => (
  <div
    style={{
      height: "100%",
      position: "relative",
      background: "linear-gradient(180deg,#7E93A0 0%,#3A4A56 38%,#1E3A46 70%,#16241C 100%)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* lake + pines */}
    <svg viewBox="0 0 700 390" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <path d="M0 190 L120 120 L230 185 L360 100 L500 190 L620 130 L700 180 L700 250 L0 250 Z" fill="#3A4A56" />
      <rect y="250" width="700" height="140" fill="#1E3A46" />
      {[20, 70, 130, 540, 600, 660].map((x) => (
        <g key={x} fill="#16241C">
          <rect x={x} y={196} width={7} height={70} />
          <path d={`M${x - 22} 224 L${x + 3.5} 158 L${x + 29} 224 Z`} />
          <path d={`M${x - 17} 254 L${x + 3.5} 194 L${x + 25} 254 Z`} />
        </g>
      ))}
      <rect y="250" width="700" height="140" fill="url(#shimmer)" opacity="0.35" />
      <defs>
        <linearGradient id="shimmer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E93A0" />
          <stop offset="100%" stopColor="#1E3A46" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <div style={{ position: "absolute", inset: 0, background: "rgba(8,16,20,0.32)" }} />

    <div
      style={{
        position: "relative",
        width: 420,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 16,
        padding: "18px 26px 20px",
        boxShadow: "0 34px 80px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "center" }}>
        <Compass size={30} />
        <span style={{ fontSize: 21, fontWeight: 800, color: GOLD }}>Wanderlust</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color: "#1C1C1C", textAlign: "center", lineHeight: 1.1 }}>
        Welcome Back
      </div>
      <div style={{ fontSize: 13.5, color: GREY, textAlign: "center" }}>Sign in to continue your adventures</div>

      <AuthField label="Email" value="yacinehizzi@gmail.com" icon="✉" />
      <AuthField label="Password" value="••••••" icon="🔒" />

      <div
        style={{
          background: BROWN,
          borderRadius: 8,
          padding: "11px 0",
          textAlign: "center",
          fontSize: 15,
          fontWeight: 900,
          color: "#FFF8EC",
        }}
      >
        Sign In
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 2 }}>
        <span style={{ flex: 1, height: 1, background: "#E7E7E4" }} />
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>or</span>
        <span style={{ flex: 1, height: 1, background: "#E7E7E4" }} />
      </div>
      <div style={{ fontSize: 13, color: GREY, textAlign: "center" }}>
        Do not have an account? <span style={{ color: GOLD, fontWeight: 800 }}>Sign Up</span>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* reservation / checkout                                              */
/* ------------------------------------------------------------------ */

const AddonRow: React.FC<{ t: string; s: string; p: string }> = ({ t, s, p }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: PEACH,
      border: `1px solid ${PEACH_BORDER}`,
      borderRadius: 8,
      padding: "10px 13px",
    }}
  >
    <span
      style={{
        width: 19,
        height: 19,
        borderRadius: 5,
        background: "#2F80ED",
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      ✓
    </span>
    <span style={{ minWidth: 0 }}>
      <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: INK }}>{t}</span>
      <span style={{ display: "block", fontSize: 11.5, color: GREY, marginTop: 2 }}>{s}</span>
    </span>
    <span style={{ marginLeft: "auto", fontSize: 15, fontWeight: 900, color: "#B5762A", whiteSpace: "nowrap" }}>{p}</span>
  </div>
);

const PayInput: React.FC<{ v: string; ph?: boolean }> = ({ v, ph }) => (
  <div
    style={{
      border: "1px solid #E3E3E3",
      background: "#FFFFFF",
      borderRadius: 8,
      padding: "10px 13px",
      fontSize: 14,
      color: ph ? "#9CA3AF" : INK,
      flex: 1,
    }}
  >
    {v}
  </div>
);

const SummaryRow: React.FC<{ l: string; v: string; c?: string; b?: boolean }> = ({ l, v, c, b }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: b ? 15 : 13.5, fontWeight: b ? 900 : 600, color: c ?? (b ? INK : GREY) }}>
    <span>{l}</span>
    <span>{v}</span>
  </div>
);

const ReservationPage: React.FC = () => (
  <div style={{ height: "100%", background: CREAM, padding: "18px 22px", display: "flex", gap: 22 }}>
    {/* left: form */}
    <div style={{ flex: "1 1 58%", minWidth: 0, display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: INK, lineHeight: 1 }}>2. Add-ons</div>
      <AddonRow t="Travel Insurance" s="Comprehensive coverage for peace of mind." p="+ $45" />
      <AddonRow t="Airport Transfer" s="Private car from airport to hotel." p="+ $80" />

      <div style={{ height: 1, background: "#E7E7E4", margin: "2px 0" }} />

      <div style={{ fontSize: 22, fontWeight: 900, color: INK, lineHeight: 1 }}>3. Payment Info</div>
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#374151" }}>Card Information</div>
        <div style={{ display: "flex", gap: 10, marginTop: 7 }}>
          <PayInput v="💳  Card number" />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <PayInput v="MM / YY" ph />
          <PayInput v="CVC" ph />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: INK, alignSelf: "center" }}>← Back</span>
        <span
          style={{
            marginLeft: "auto",
            background: BROWN,
            color: "#FFF8EC",
            fontSize: 14,
            fontWeight: 900,
            padding: "13px 28px",
            borderRadius: 9,
          }}
        >
          Confirm Booking →
        </span>
      </div>
    </div>

    {/* right: summary */}
    <div
      style={{
        flex: "1 1 42%",
        background: "#FFFFFF",
        border: "1px solid #EBE7DC",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 20px 46px rgba(60,45,20,0.12)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 74, background: "linear-gradient(150deg,#F0A94C,#D2622A 55%,#7C2D12)", position: "relative" }}>
        <span
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "radial-gradient(circle,#FFF3D0,#FFD98A)",
          }}
        />
      </div>
      <div style={{ padding: "13px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 900, color: INK, lineHeight: 1.2 }}>
            Kyoto, Japan — Cultural Immersion
          </div>
          <div style={{ fontSize: 12.5, color: GREY, marginTop: 4 }}>8 Nights · Guest: Zakaria Hizzi</div>
        </div>
        <div style={{ height: 1, background: "#EFECE3" }} />
        <SummaryRow l="Dates" v="Sep 30 – Oct 8, 2026" />
        <SummaryRow l="Guests" v="2 Adults" />
        <div style={{ height: 1, background: "#EFECE3" }} />
        <SummaryRow l="Base Price" v="$2800" />
        <SummaryRow l="Taxes & Fees" v="$240" />
        <SummaryRow l="Travel Insurance" v="$45" c="#B5762A" />
        <SummaryRow l="Airport Transfer" v="$80" c="#B5762A" />
        <div style={{ height: 1, background: "#EFECE3" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>Total</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: BROWN }}>$3165</span>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* destinations list                                                   */
/* ------------------------------------------------------------------ */

const TRIPS = [
  { t: "Kyoto, Japan", m: "8 Nights · 2 Adults", p: "$2800", g: "linear-gradient(160deg,#F0A94C,#D2622A 50%,#7C2D12)", e: "⛩" },
  { t: "Santorini, Greece", m: "6 Nights · 2 Adults", p: "$2400", g: "linear-gradient(160deg,#7DB8E8,#2F6FB0 55%,#123A63)", e: "🌊" },
  { t: "Bali, Indonesia", m: "7 Nights · 2 Adults", p: "$1900", g: "linear-gradient(160deg,#7BC98F,#2F8F5B 55%,#12472E)", e: "🌴" },
];

const DestinationsPage: React.FC = () => (
  <div style={{ height: "100%", background: CREAM, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
      <div>
        <div style={{ fontSize: 27, fontWeight: 900, color: INK, lineHeight: 1.1 }}>Destinations</div>
        <div style={{ fontSize: 13, color: GREY, marginTop: 5 }}>Curated trips for every kind of traveller</div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 9,
          border: "1px solid #E3E3E3",
          background: "#FFFFFF",
          borderRadius: 100,
          padding: "10px 18px",
          fontSize: 13.5,
          color: "#9CA3AF",
          width: 250,
        }}
      >
        🔍 Where to next?
      </div>
    </div>

    <div style={{ display: "flex", gap: 10 }}>
      {["All Trips", "Asia", "Europe", "Islands"].map((c, i) => (
        <span
          key={c}
          style={{
            padding: "8px 18px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 800,
            background: i === 0 ? BROWN : "#FFFFFF",
            color: i === 0 ? "#FFF8EC" : "#4B5563",
            border: i === 0 ? "none" : "1px solid #E7E1D2",
          }}
        >
          {c}
        </span>
      ))}
    </div>

    <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 16 }}>
      {TRIPS.map((t) => (
        <div
          key={t.t}
          style={{
            flex: 1,
            minWidth: 0,
            background: "#FFFFFF",
            border: "1px solid #EBE7DC",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(60,45,20,0.10)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 138,
              background: t.g,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 12,
                top: 12,
                background: "rgba(255,255,255,0.94)",
                color: BROWN,
                fontSize: 13,
                fontWeight: 900,
                padding: "5px 12px",
                borderRadius: 100,
              }}
            >
              {t.p}
            </span>
            {t.e}
          </div>
          <div style={{ padding: "13px 15px 15px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: INK, lineHeight: 1.15 }}>{t.t}</div>
            <div style={{ fontSize: 12.5, color: GREY }}>{t.m}</div>
            <div style={{ fontSize: 12.5, color: "#B5762A", fontWeight: 800 }}>★★★★★</div>
            <div
              style={{
                marginTop: "auto",
                alignSelf: "flex-start",
                background: PEACH,
                border: `1px solid ${PEACH_BORDER}`,
                color: BROWN,
                fontSize: 13,
                fontWeight: 900,
                padding: "9px 20px",
                borderRadius: 100,
              }}
            >
              View Trip →
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* cover                                                               */
/* ------------------------------------------------------------------ */

export const TravelCover: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, background: CREAM, overflow: "hidden", direction: "ltr" }}>
    {/* header */}
    <div
      style={{
        height: 112,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 56px",
        background: CREAM,
        borderBottom: "1px solid #EAE7DE",
      }}
    >
      <Compass size={52} />
      <span style={{ fontSize: 35, fontWeight: 800, color: GOLD, letterSpacing: 0.4 }}>Wanderlust</span>

      <div style={{ display: "flex", gap: 34, marginLeft: 44, fontSize: 22, fontWeight: 700, color: "#3D3D3D" }}>
        <span>Home</span>
        <span style={{ color: GOLD, borderBottom: `3px solid ${GOLD}`, paddingBottom: 5 }}>Destinations</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#3D3D3D" }}>Trips</span>
        <span
          style={{
            background: "#6E4B1E",
            color: "#FFF8EC",
            fontSize: 19,
            fontWeight: 900,
            padding: "12px 26px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <svg width={17} height={17} viewBox="0 0 24 24" fill="#FFF8EC">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
          </svg>
          Y
        </span>
      </div>
    </div>

    <CoverGrid
      background={CREAM}
      left={[
        <PageCard key="dest" label="DESTINATION · KYOTO" dot={GOLD} barBg="#2B2115" labelColor="#F0D9A8" bodyBg="#FFFFFF">
          <DestinationPage />
        </PageCard>,
        <PageCard key="signin" label="SIGN IN" dot={GOLD} barBg="#2B2115" labelColor="#F0D9A8" bodyBg="#FFFFFF">
          <SignInPage />
        </PageCard>,
      ]}
      right={[
        <PageCard key="res" label="RESERVATION · CHECKOUT" dot={GOLD} barBg="#2B2115" labelColor="#F0D9A8" bodyBg="#FFFFFF">
          <ReservationPage />
        </PageCard>,
        <PageCard key="list" label="DESTINATIONS" dot={GOLD} barBg="#2B2115" labelColor="#F0D9A8" bodyBg="#FFFFFF">
          <DestinationsPage />
        </PageCard>,
      ]}
    />

    <FrameStrip
      background={CREAM}
      borderTop={`1px solid ${PEACH_BORDER}`}
      dot={GOLD}
      label="REEL FRAMES"
      labelColor={GOLD}
      sublabel="Wanderlust — straight from the walkthrough"
      sublabelColor={GREY}
      border={`1.5px solid ${PEACH_BORDER}`}
      shadow="0 16px 34px rgba(124,78,18,0.16)"
      images={Array.from({ length: 10 }, (_, i) => `stills/travel-${i + 1}.jpg`)}
    />

    <BottomBar
      background="#F3EFE4"
      borderTop="2px solid #A67C2E"
      dot={GOLD}
      label="TRAVEL SEASON:"
      labelColor={GOLD}
      text="Kyoto Autumn • Sep 30 – Oct 8, 2026 • 2 Adults from $2,800"
      textColor={INK}
      pillBg="linear-gradient(90deg,#7C4E12,#A67C2E)"
      pillColor="#FFF8EC"
      pillText="Book Trip →"
    />
  </AbsoluteFill>
);
