import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT } from "../vscode/theme";
import { BottomBar, CoverGrid, FrameStrip, PageCard } from "../sites/coverKit";

const BLUE = "#2563EB";
const INK = "#0F172A";
const GREY = "#64748B";
const BG = "#F5F6FC";
const CARD = "#FFFFFF";
const BORDER = "#E4E8F2";

const Logo: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.22,
      background: BLUE,
      color: "#FFFFFF",
      fontSize: size * 0.58,
      fontWeight: 900,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    H
  </span>
);

/* ------------------------------------------------------------------ */
/* home page                                                           */
/* ------------------------------------------------------------------ */

const HomePage: React.FC = () => (
  <div
    style={{
      height: "100%",
      background: "linear-gradient(120deg,#FFFFFF 0%,#F2F5FE 55%,#E8EEFE 100%)",
      padding: "28px 32px",
      display: "flex",
      gap: 26,
    }}
  >
    <div style={{ flex: "1 1 54%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
      <div style={{ fontSize: 47, fontWeight: 900, lineHeight: 1.12, color: INK }}>
        Modern Healthcare
        <br />
        <span style={{ color: BLUE }}>Designed for You.</span>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: GREY, maxWidth: 400 }}>
        Experience the next generation of patient care. Find world-class specialists, manage your health records, and
        schedule appointments in seconds.
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <span
          style={{
            background: BLUE,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 800,
            padding: "14px 28px",
            borderRadius: 9,
            boxShadow: "0 12px 30px rgba(37,99,235,0.32)",
          }}
        >
          🔍 Find Care
        </span>
        <span
          style={{
            background: "#FFFFFF",
            border: `2px solid ${BLUE}`,
            color: BLUE,
            fontSize: 15,
            fontWeight: 800,
            padding: "13px 26px",
            borderRadius: 9,
          }}
        >
          📍 Find Nearby
        </span>
      </div>
      <div style={{ display: "flex", gap: 26, marginTop: 6, borderTop: "1px solid #DCE3F4", paddingTop: 16 }}>
        {[
          { k: "8", v: "TOP SPECIALISTS" },
          { k: "24/7", v: "CARE SUPPORT" },
          { k: "4.9★", v: "PATIENT RATING" },
        ].map((s) => (
          <div key={s.v}>
            <div style={{ fontSize: 24, fontWeight: 900, color: BLUE, lineHeight: 1 }}>{s.k}</div>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.2, color: GREY, marginTop: 5 }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>

    {/* illustration */}
    <div style={{ flex: "1 1 46%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: "linear-gradient(150deg,#DBEAFE 0%,#EFF4FF 60%,#FFFFFF 100%)",
          border: "1px solid #D7E0F7",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 300 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path
            d="M0 170 H60 l18 -46 l26 92 l22 -66 l16 30 h34 l16 -40 l24 76 l20 -50 h110"
            fill="none"
            stroke={BLUE}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
          <circle cx="228" cy="72" r="40" fill="#FFFFFF" opacity="0.9" />
          <path
            d="M228 92 c-16 -12 -26 -21 -26 -32 a14 14 0 0 1 26 -8 a14 14 0 0 1 26 8 c0 11 -10 20 -26 32 z"
            fill="#EF4444"
            opacity="0.9"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: -14,
          top: 44,
          background: "#FFFFFF",
          borderRadius: 12,
          padding: "12px 15px",
          boxShadow: "0 18px 44px rgba(15,35,75,0.16)",
          border: `1px solid ${BORDER}`,
          width: 250,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#D1FAE5",
              color: "#065F46",
              fontSize: 12,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            RM
          </span>
          <span>
            <span style={{ display: "block", fontSize: 13.5, fontWeight: 800, color: INK }}>Dr. Robert Miller, MD</span>
            <span style={{ display: "block", fontSize: 11, color: GREY, marginTop: 1 }}>Electrophysiology</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <span style={{ background: "#FEF3C7", color: "#92400E", fontSize: 10.5, fontWeight: 800, padding: "5px 11px", borderRadius: 100 }}>
            Scheduled
          </span>
          <span style={{ fontSize: 11, color: GREY, alignSelf: "center" }}>20/09/2026 · 10:30</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: -12,
          bottom: 40,
          background: "#FFFFFF",
          borderRadius: 12,
          padding: "11px 15px",
          boxShadow: "0 18px 44px rgba(15,35,75,0.16)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: GREY }}>★ 4.9</div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: INK, marginTop: 2 }}>502 verified reviews</div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* patient dashboard                                                   */
/* ------------------------------------------------------------------ */

const DashboardPage: React.FC = () => (
  <div style={{ height: "100%", background: BG, padding: "16px 22px 0", display: "flex", flexDirection: "column" }}>
    <div style={{ fontSize: 24, fontWeight: 900, color: INK, lineHeight: 1.15 }}>Welcome, Zakaria Hizzi</div>
    <div style={{ fontSize: 12, color: GREY, marginTop: 4 }}>Manage your appointments and health journey</div>

    <div style={{ display: "flex", gap: 13, marginTop: 14 }}>
      {[
        { n: "1", l: "Total Appointments", c: BLUE },
        { n: "1", l: "Upcoming", c: "#10B981" },
        { n: "0", l: "Completed", c: BLUE },
      ].map((s) => (
        <div key={s.l} style={{ flex: 1, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 15px" }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
          <div style={{ fontSize: 11.5, color: GREY, marginTop: 6, fontWeight: 700 }}>{s.l}</div>
        </div>
      ))}
    </div>

    <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
      <span style={{ fontSize: 17, fontWeight: 900, color: INK }}>My Appointments</span>
      <span
        style={{
          marginLeft: "auto",
          background: BLUE,
          color: "#FFFFFF",
          fontSize: 12.5,
          fontWeight: 800,
          padding: "10px 20px",
          borderRadius: 8,
        }}
      >
        + Book New Appointment
      </span>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 13,
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "13px 16px",
        marginTop: 11,
        boxShadow: "0 10px 26px rgba(15,35,75,0.06)",
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "#D1FAE5",
          color: "#065F46",
          fontSize: 15,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        RM
      </span>
      <span>
        <span style={{ display: "block", fontSize: 15, fontWeight: 800, color: INK }}>Dr. Robert Miller, MD</span>
        <span style={{ display: "block", fontSize: 11.5, color: GREY, marginTop: 2 }}>
          Electrophysiology · 20/09/2026 at 10:30
        </span>
      </span>
      <span
        style={{
          marginLeft: "auto",
          background: "#FEF3C7",
          color: "#92400E",
          fontSize: 12,
          fontWeight: 800,
          padding: "7px 16px",
          borderRadius: 100,
        }}
      >
        Scheduled
      </span>
      <span style={{ color: "#EF4444", fontSize: 16 }}>🗑</span>
    </div>

    {/* footer */}
    <div
      style={{
        marginTop: "auto",
        marginInline: -22,
        background: INK,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: 34,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "#334155",
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          H
        </span>
        <span style={{ fontSize: 15, fontWeight: 900, color: "#FFFFFF" }}>HealSync</span>
      </div>
      <div style={{ fontSize: 11, color: "#94A3B8", maxWidth: 250, lineHeight: 1.5 }}>
        Redefining the medical experience with precision tools and human touch.
      </div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, color: "#94A3B8" }}>QUICK LINKS</div>
        <div style={{ fontSize: 12, color: "#E2E8F0", marginTop: 5 }}>About Us</div>
      </div>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, color: "#94A3B8" }}>RESOURCES</div>
        <div style={{ fontSize: 12, color: "#E2E8F0", marginTop: 5 }}>Terms of Service</div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* find a doctor                                                       */
/* ------------------------------------------------------------------ */

const SPECIALTIES = ["Cardiology", "Dermatology", "Neurology", "Pediatrics"];
const AVAILABILITY = ["Today", "Next 3 days", "Anytime"];

const DoctorCard: React.FC<{
  i: string;
  bg: string;
  fg: string;
  spec: string;
  name: string;
  role: string;
  rating: string;
  years: string;
  next: string;
  ins: string[];
}> = ({ i, bg, fg, spec, name, role, rating, years, next, ins }) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      padding: "13px 16px",
      boxShadow: "0 10px 26px rgba(15,35,75,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 9,
    }}
  >
    <div style={{ display: "flex", gap: 13 }}>
      <span
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: bg,
          color: fg,
          fontSize: 16,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {i}
      </span>
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            background: "#E8EEFF",
            color: BLUE,
            fontSize: 10,
            fontWeight: 800,
            padding: "4px 11px",
            borderRadius: 100,
          }}
        >
          {spec}
        </span>
        <div style={{ fontSize: 16, fontWeight: 900, color: INK, marginTop: 6 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: GREY, marginTop: 2 }}>
          {role} · <span style={{ color: "#F59E0B", fontWeight: 800 }}>★</span>{" "}
          <span style={{ fontWeight: 800, color: INK }}>{rating}</span>
        </div>
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <div style={{ fontSize: 10, color: GREY }}>Experience</div>
        <div style={{ fontSize: 13.5, fontWeight: 900, color: INK, marginBottom: 5 }}>{years}</div>
        <div style={{ fontSize: 10, color: GREY }}>Next Availability</div>
        <div style={{ fontSize: 12, fontWeight: 800, color: BLUE }}>{next}</div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", flex: 1 }}>
        {ins.map((c) => (
          <span
            key={c}
            style={{
              background: "#F1F3F9",
              color: "#4B5563",
              fontSize: 10,
              fontWeight: 700,
              padding: "5px 11px",
              borderRadius: 100,
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <span
        style={{
          background: BLUE,
          color: "#FFFFFF",
          fontSize: 13,
          fontWeight: 800,
          padding: "10px 24px",
          borderRadius: 8,
          boxShadow: "0 10px 24px rgba(37,99,235,0.3)",
        }}
      >
        Book Now
      </span>
    </div>
  </div>
);

const DoctorsPage: React.FC = () => (
  <div style={{ height: "100%", background: BG, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
    <div>
      <div style={{ fontSize: 24, fontWeight: 900, color: INK, lineHeight: 1.15 }}>Top-rated Specialists</div>
      <div style={{ fontSize: 12, color: GREY, marginTop: 4 }}>Showing 8 results in your area</div>
    </div>

    <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 14 }}>
      {/* filters */}
      <div
        style={{
          width: 216,
          flexShrink: 0,
          background: CARD,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: "14px 16px",
          alignSelf: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>Filters</span>
          <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: BLUE }}>Clear all</span>
        </div>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, color: GREY, marginTop: 13 }}>SPECIALTY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 9 }}>
          {SPECIALTIES.map((s) => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#374151" }}>
              <span style={{ width: 15, height: 15, borderRadius: 4, border: "2px solid #CBD5E1" }} />
              {s}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, color: GREY, marginTop: 14 }}>AVAILABILITY</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 9 }}>
          {AVAILABILITY.map((a) => (
            <span key={a} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#374151" }}>
              <span
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  border: "2px solid #CBD5E1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {a === "Anytime" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: BLUE }} />}
              </span>
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* results */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        <DoctorCard
          i="JV"
          bg="#DBEAFE"
          fg="#1E40AF"
          spec="Cardiology"
          name="Dr. Julian Vance, MD"
          role="Board-Certified Cardiologist"
          rating="4.9 (502 reviews)"
          years="15 Years"
          next="Tomorrow at 9:00 AM"
          ins={["BlueCross BlueShield", "Aetna", "Cigna"]}
        />
        <DoctorCard
          i="RM"
          bg="#FCE7F3"
          fg="#9D174D"
          spec="Electrophysiology"
          name="Dr. Robert Miller, MD"
          role="Cardiac Electrophysiologist"
          rating="4.8 (312 reviews)"
          years="18 Years"
          next="Thursday at 10:30 AM"
          ins={["BlueCross BlueShield", "Aetna", "+2 more"]}
        />
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* appointment wizard                                                  */
/* ------------------------------------------------------------------ */

const STEPS = [
  { n: "✓", l: "Schedule", done: true },
  { n: "✓", l: "Details", done: true },
  { n: "3", l: "Insurance", done: false, active: true },
  { n: "4", l: "Confirm", done: false },
];

const WizardField: React.FC<{ label: string; value: string; placeholder?: boolean }> = ({ label, value, placeholder }) => (
  <div>
    <div style={{ fontSize: 13, fontWeight: 800, color: INK }}>{label}</div>
    <div
      style={{
        marginTop: 6,
        border: `1.5px solid ${placeholder ? "#CBD5E1" : BLUE}`,
        background: "#FFFFFF",
        borderRadius: 8,
        padding: "11px 13px",
        fontSize: 14,
        color: placeholder ? "#94A3B8" : INK,
        display: "flex",
        alignItems: "center",
      }}
    >
      {value}
      <span style={{ marginLeft: "auto", color: GREY }}>▾</span>
    </div>
  </div>
);

const AppointmentPage: React.FC = () => (
  <div style={{ height: "100%", background: BG, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
    {/* stepper */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={s.l}>
          {i > 0 && (
            <span
              style={{
                width: 90,
                height: 4,
                background: STEPS[i - 1].done || STEPS[i - 1].active ? BLUE : "#E2E8F0",
                borderRadius: 4,
              }}
            />
          )}
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, width: 96 }}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: s.done || s.active ? BLUE : "#E2E8F0",
                color: s.done || s.active ? "#FFFFFF" : "#94A3B8",
                fontSize: 15,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: s.active ? "0 0 0 6px rgba(37,99,235,0.15)" : undefined,
              }}
            >
              {s.n}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: s.active ? 900 : 700,
                color: s.active ? INK : s.done ? BLUE : "#94A3B8",
              }}
            >
              {s.l}
            </span>
          </span>
        </React.Fragment>
      ))}
    </div>

    {/* form card */}
    <div
      style={{
        width: 560,
        alignSelf: "center",
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        padding: "20px 24px",
        boxShadow: "0 24px 60px rgba(15,35,75,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 13,
      }}
    >
      <div>
        <div style={{ fontSize: 23, fontWeight: 900, color: INK, lineHeight: 1.15 }}>Insurance Information</div>
        <div style={{ fontSize: 13, color: GREY, marginTop: 5 }}>
          We&apos;ll verify your coverage before the appointment.
        </div>
      </div>

      <WizardField label="Insurance Provider" value="UnitedHealthcare" />
      <WizardField label="Member ID" value="ABC123456789" placeholder />
      <WizardField label="Group Number (Optional)" value="GRP-001" placeholder />

      <div style={{ display: "flex", alignItems: "center", marginTop: 3 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>← Back</span>
        <span
          style={{
            marginLeft: "auto",
            background: BLUE,
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 800,
            padding: "13px 28px",
            borderRadius: 9,
            boxShadow: "0 12px 30px rgba(37,99,235,0.32)",
          }}
        >
          Final Review →
        </span>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* cover                                                               */
/* ------------------------------------------------------------------ */

export const HospitalCover: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, background: BG, overflow: "hidden", direction: "ltr" }}>
    {/* header */}
    <div
      style={{
        height: 112,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "0 56px",
        background: "#FFFFFF",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <Logo size={52} />
      <span style={{ fontSize: 35, fontWeight: 900, color: INK }}>HealSync</span>

      <div style={{ display: "flex", gap: 14, marginLeft: 40, fontSize: 21, fontWeight: 700 }}>
        <span style={{ padding: "11px 22px", borderRadius: 10, color: "#475569" }}>Home</span>
        <span style={{ padding: "11px 22px", borderRadius: 10, color: "#475569" }}>Find a Doctor</span>
        <span style={{ padding: "11px 22px", borderRadius: 10, background: "#E8EEFF", color: BLUE }}>My Dashboard</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: GREY }}>Zakaria Hizzi</span>
        <span
          style={{
            border: `2px solid ${BLUE}`,
            color: BLUE,
            fontSize: 19,
            fontWeight: 800,
            padding: "13px 30px",
            borderRadius: 9,
          }}
        >
          Sign Out
        </span>
      </div>
    </div>

    <CoverGrid
      background={BG}
      left={[
        <PageCard key="home" label="HOME" dot={BLUE} barBg="#0F172A" labelColor="#BFDBFE" bodyBg="#FFFFFF">
          <HomePage />
        </PageCard>,
        <PageCard key="dash" label="PATIENT DASHBOARD" dot={BLUE} barBg="#0F172A" labelColor="#BFDBFE" bodyBg="#FFFFFF">
          <DashboardPage />
        </PageCard>,
      ]}
      right={[
        <PageCard key="doctors" label="FIND A DOCTOR" dot={BLUE} barBg="#0F172A" labelColor="#BFDBFE" bodyBg="#FFFFFF">
          <DoctorsPage />
        </PageCard>,
        <PageCard key="appt" label="APPOINTMENT · INSURANCE" dot={BLUE} barBg="#0F172A" labelColor="#BFDBFE" bodyBg="#FFFFFF">
          <AppointmentPage />
        </PageCard>,
      ]}
    />

    <FrameStrip
      background={BG}
      borderTop={`1px solid ${BORDER}`}
      dot={BLUE}
      label="REEL FRAMES"
      labelColor={BLUE}
      sublabel="HealSync — straight from the walkthrough"
      sublabelColor={GREY}
      border={`1.5px solid ${BORDER}`}
      shadow="0 16px 34px rgba(15,23,42,0.12)"
      images={Array.from({ length: 10 }, (_, i) => `stills/hospital-${i + 1}.jpg`)}
    />

    <BottomBar
      background="#0F172A"
      borderTop="2px solid #2563EB"
      dot="#3B82F6"
      label="APPOINTMENTS:"
      labelColor="#60A5FA"
      text="Same-day visits with top-rated specialists • Insurance verified"
      textColor="#E2E8F0"
      pillBg="linear-gradient(90deg,#2563EB,#3B82F6)"
      pillColor="#FFFFFF"
      pillText="Book Now →"
    />
  </AbsoluteFill>
);
