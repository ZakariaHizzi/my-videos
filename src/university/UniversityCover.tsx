import React from "react";
import { AbsoluteFill } from "remotion";
import { FrameStrip } from "../sites/coverKit";
import { FONT, MONO } from "../vscode/theme";

/** Academic serif used by the Veritas University site. */
const SERIF = "Georgia, 'Times New Roman', serif";

const NAV: { t: string; active?: boolean }[] = [
  { t: "Home", active: true },
  { t: "About" },
  { t: "Degrees & Programs" },
  { t: "Campus Life" },
];

const STATS = [
  { k: "1872", v: "Founded" },
  { k: "12", v: "Faculties" },
  { k: "R1", v: "Carnegie Doctoral" },
];

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

/** Navy shield with a gold open book — the site's logo. */
const Shield: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block", flexShrink: 0 }}>
    <rect width="40" height="40" rx="9" fill="#12315E" />
    <path d="M8 12c5-2 9-1 12 2 3-3 7-4 12-2v16c-5-2-9-1-12 2-3-3-7-4-12-2z" fill="#F2C14E" />
    <path d="M20 14v16" stroke="#12315E" strokeWidth="2.2" />
  </svg>
);

/** White page card with a navy page-name label. */
const PageCard: React.FC<{ label: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  label,
  children,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      background: "#FFFFFF",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #E3E9F4",
      boxShadow: "0 24px 60px rgba(10,31,68,0.18)",
      ...style,
    }}
  >
    <div
      style={{
        height: 42,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 18px",
        background: "#12315E",
        direction: "ltr",
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFD700" }} />
      <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: 2.4, color: "#FFE9A3" }}>
        {label}
      </span>
    </div>
    <div style={{ flex: 1, minHeight: 0, overflow: "hidden", direction: "ltr" }}>{children}</div>
  </div>
);

/** Warm library interior — the hero photo of the site. */
const LibraryArt: React.FC<{ small?: boolean }> = ({ small }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: small ? 10 : 16,
      overflow: "hidden",
      background: "linear-gradient(165deg,#7A5230 0%,#4A2F1B 55%,#241408 100%)",
      boxShadow: small ? "0 16px 40px rgba(0,0,0,0.45)" : "0 30px 70px rgba(0,0,0,0.5)",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: small ? 10 : 22,
        padding: small ? "34px 22px 0" : "54px 44px 0",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: small ? 210 : 320,
            borderRadius: small ? "70px 70px 6px 6px" : "120px 120px 8px 8px",
            background: "linear-gradient(180deg,#F7E7C4 0%,#EBCB92 42%,#A97C44 100%)",
            boxShadow: "0 0 40px rgba(245,226,184,0.5)",
          }}
        />
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: small ? 110 : 190,
        background: "linear-gradient(180deg,rgba(36,20,8,0.05),rgba(16,9,3,0.92))",
      }}
    >
      <div style={{ display: "flex", gap: small ? 12 : 24, padding: small ? "18px 16px" : "30px 34px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: small ? 38 : 62,
              borderRadius: 5,
              background: "rgba(255,214,150,0.32)",
              boxShadow: "0 0 22px rgba(255,200,130,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const RankCard: React.FC<{ small?: boolean }> = ({ small }) => (
  <div
    style={{
      position: "absolute",
      left: small ? -22 : -46,
      top: small ? 26 : 54,
      width: small ? 172 : 320,
      background: "#FFFFFF",
      borderRadius: small ? 9 : 14,
      padding: small ? "12px 15px" : "22px 26px",
      boxShadow: "0 18px 44px rgba(0,0,0,0.45)",
      textAlign: "left",
      direction: "ltr",
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: small ? 9 : 15, fontWeight: 800, letterSpacing: small ? 1.6 : 2.4, color: "#B4881B" }}>
      ✦ TOP TIER
    </div>
    <div style={{ fontFamily: SERIF, fontSize: small ? 25 : 44, fontWeight: 700, color: "#0E2A55", lineHeight: 1.15, marginTop: 4 }}>
      #4 National
    </div>
    <div style={{ fontSize: small ? 10 : 17, color: "#64748B", marginTop: 4, lineHeight: 1.45 }}>
      Comprehensive
      <br />
      Collegiate Ranking 2024
    </div>
  </div>
);

const MandateCard: React.FC<{ small?: boolean }> = ({ small }) => (
  <div
    style={{
      position: "absolute",
      right: small ? -16 : -30,
      bottom: small ? -26 : -46,
      width: small ? 268 : 560,
      background: "#FFFFFF",
      borderRadius: small ? 9 : 14,
      padding: small ? "11px 14px" : "22px 26px",
      boxShadow: "0 18px 44px rgba(0,0,0,0.45)",
      textAlign: "left",
      direction: "ltr",
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: small ? 8.5 : 15, fontWeight: 800, letterSpacing: small ? 1.5 : 2.4, color: "#B4881B" }}>
      INSTITUTIONAL MANDATE
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: small ? 8 : 14, marginTop: small ? 4 : 8 }}>
      <div style={{ fontFamily: SERIF, fontSize: small ? 20 : 36, fontWeight: 700, color: "#0E2A55", lineHeight: 1.1 }}>
        Veritas Omnibus
      </div>
      <svg width={small ? 17 : 34} height={small ? 17 : 34} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="11" fill="#1D4ED8" />
        <path d="M6.5 12.4l3.6 3.6 7.4-7.8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div style={{ fontSize: small ? 10 : 17, color: "#64748B", marginTop: small ? 4 : 8, lineHeight: 1.5 }}>
      Carnegie R1 Doctoral University with Very High Research Activity.
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* page 1 — home                                                       */
/* ------------------------------------------------------------------ */

const HomeMini: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FFFFFF" }}>
    {/* hero */}
    <div
      style={{
        flex: 1,
        display: "flex",
        gap: 22,
        padding: "24px 26px 22px",
        background:
          "radial-gradient(520px 420px at 76% 45%, rgba(242,193,78,0.20), transparent 65%)," +
          "linear-gradient(130deg,#0C2451 0%,#133B6C 55%,#0A1F44 100%)",
        minHeight: 0,
      }}
    >
      <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 15 }}>
        <div
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 100,
            padding: "7px 15px",
            color: "#DCE6F5",
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 1.7,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FFD700" }} />
          CHARTERED &amp; ACCREDITED 1884
        </div>

        <div style={{ fontFamily: SERIF, fontSize: 35, lineHeight: 1.15, color: "#FFFFFF", fontWeight: 700 }}>
          Excellence in Inquiry,
          <br />
          <span style={{ color: "#F2C14E", fontStyle: "italic" }}>Leadership</span> in Action.
        </div>

        <div style={{ fontSize: 12.5, lineHeight: 1.65, color: "#A8BCDA" }}>
          Veritas University empowers visionary scholars across 12 distinct collegiate faculties with world-class
          mentorship, accredited global degree pathways, and pioneering research environments.
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              background: "linear-gradient(90deg,#C8951C,#E8B33A)",
              color: "#0B1B3A",
              fontSize: 13,
              fontWeight: 800,
              padding: "11px 16px",
              borderRadius: 7,
              whiteSpace: "nowrap",
            }}
          >
            Access Academic Portal →
          </div>
          <div
            style={{
              border: "1.6px solid rgba(255,255,255,0.6)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 15px",
              borderRadius: 7,
              whiteSpace: "nowrap",
            }}
          >
            ◇ Explore Degree Programs
          </div>
        </div>

        <div style={{ display: "flex", gap: 30, borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: 15 }}>
          {STATS.map((s) => (
            <div key={s.v}>
              <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: "#FFD700", lineHeight: 1 }}>{s.k}</div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#8FA6C9", fontWeight: 700, marginTop: 5 }}>
                {s.v.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: "1 1 45%", position: "relative", alignSelf: "center", height: "88%", minHeight: 300 }}>
        <LibraryArt small />
        <RankCard small />
        <MandateCard small />
      </div>
    </div>

    {/* admissions bar */}
    <div
      style={{
        height: 44,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 22px",
        background: "#06132E",
        borderTop: "2px solid rgba(255,215,0,0.55)",
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFD700" }} />
      <span style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: 1.8, color: "#FFD700" }}>ADMISSIONS CYCLE:</span>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#EAF1FB" }}>
        Fall 2025 Priority Filing Open • Regular Deadline Nov 15
      </span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* page 2 — degrees & programs                                         */
/* ------------------------------------------------------------------ */

const FILTERS = ["All Programs (6)", "Bachelor's Degrees", "Master's & Doctoral", "Professional Certifications", "Specialized Diplomas"];

const PROGRAMS = [
  {
    tag: "STEM DESIGNATED",
    tagC: "#1D4ED8",
    tagBg: "#E7EEFA",
    tag2: "DUAL CAMPUS",
    school: "INSTITUTE FOR HEALTH INFORMATICS",
    title: "M.Sc. in Data Science & Biomedical Informatics",
  },
  {
    tag: "FULLY FUNDED FELLOWSHIP",
    tagC: "#B4881B",
    tagBg: "#FDF3DC",
    tag2: "DOCTORAL",
    school: "GRADUATE SCHOOL OF ARTS & SCIENCES",
    title: "Ph.D. in Cognitive Neuroscience",
  },
];

const DegreesMini: React.FC = () => (
  <div style={{ height: "100%", background: "#F7F8FC", padding: "16px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 18 }}>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: 2.2, color: "#B4881B" }}>
          ACADEMIC REGISTRY &amp; CATALOG
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 29, fontWeight: 700, color: "#0E2A55", lineHeight: 1.15, marginTop: 5 }}>
          Accredited Degrees &amp; Certifications
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#12315E", whiteSpace: "nowrap" }}>
        ⤓ Download 2024–2025 Catalog
      </div>
    </div>

    <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
      {FILTERS.map((f, i) => (
        <div
          key={f}
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 11.5,
            fontWeight: 700,
            whiteSpace: "nowrap",
            background: i === 2 ? "#12315E" : "#FFFFFF",
            color: i === 2 ? "#FFFFFF" : "#475569",
            border: "1px solid #E2E8F0",
          }}
        >
          {f}
        </div>
      ))}
    </div>

    <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
      {PROGRAMS.map((p) => (
        <div
          key={p.title}
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: "1px solid #E6EBF4",
            borderRadius: 12,
            padding: "13px 15px",
            boxShadow: "0 10px 26px rgba(15,35,75,0.07)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span
              style={{
                background: p.tagBg,
                color: p.tagC,
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 0.6,
                padding: "5px 9px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              {p.tag}
            </span>
            <span style={{ background: "#EEF2F7", color: "#475569", fontSize: 9.5, fontWeight: 800, padding: "5px 9px", borderRadius: 6, whiteSpace: "nowrap" }}>
              {p.tag2}
            </span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.3, color: "#8A94A6", marginTop: 11 }}>
            {p.school}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700, color: "#0E2A55", lineHeight: 1.2, marginTop: 6 }}>
            {p.title}
          </div>
          <div style={{ height: 7, background: "#EEF2F7", borderRadius: 5, marginTop: 11, width: "92%" }} />
          <div style={{ height: 7, background: "#F3F6FA", borderRadius: 5, marginTop: 6, width: "72%" }} />
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* page 3 — sign in portal                                             */
/* ------------------------------------------------------------------ */

const BADGES = ["✓ SSL 256-BIT TLS 1.3", "◉ FERPA COMPLIANT", "🔒 DUO SSO ACTIVE"];

const LoginMini: React.FC = () => (
  <div
    style={{
      height: "100%",
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      padding: "16px 20px",
    }}
  >
    {/* brand */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
      <Shield size={46} />
      <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 700, color: "#0E2A55", letterSpacing: 3, lineHeight: 1 }}>
        VERITAS
      </div>
      <div style={{ fontSize: 8.5, letterSpacing: 2.2, color: "#8A94A6", fontWeight: 800 }}>
        UNIVERSITY PORTAL SYSTEM • EST. 1842
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {BADGES.map((b) => (
          <span
            key={b}
            style={{
              background: "#F1F5FB",
              color: "#334155",
              border: "1px solid #E2E8F0",
              fontSize: 10,
              fontWeight: 700,
              padding: "5px 11px",
              borderRadius: 7,
              whiteSpace: "nowrap",
            }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>

    {/* form */}
    <div
      style={{
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #E6EBF4",
        borderRadius: 12,
        boxShadow: "0 14px 34px rgba(15,35,75,0.10)",
        padding: "14px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, letterSpacing: 1.8, color: "#B4881B" }}>
        INSTITUTIONAL SINGLE SIGN-ON
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: "#0E2A55", lineHeight: 1 }}>
        Sign In to Portal
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800, color: "#0E2A55" }}>
          <span>Official Email</span>
          <span style={{ color: "#94A3B8", fontWeight: 600 }}>e.g. s.doe@veritas.edu</span>
        </div>
        <div
          style={{
            marginTop: 4,
            border: "1px solid #D7DFEC",
            background: "#F8FAFD",
            borderRadius: 7,
            padding: "7px 11px",
            fontSize: 12,
            color: "#334155",
          }}
        >
          ✉ sarah.jenkins@veritas.edu
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800, color: "#0E2A55" }}>
          <span>Master Passphrase</span>
          <span style={{ color: "#B4881B", fontWeight: 700 }}>Forgot Password?</span>
        </div>
        <div
          style={{
            marginTop: 4,
            border: "1px solid #D7DFEC",
            background: "#F8FAFD",
            borderRadius: 7,
            padding: "7px 11px",
            fontSize: 12,
            color: "#334155",
            letterSpacing: 3,
          }}
        >
          🔑 ••••••••••••
        </div>
      </div>

      <div
        style={{
          background: "#12315E",
          color: "#fff",
          fontSize: 13.5,
          fontWeight: 800,
          textAlign: "center",
          padding: "11px 0",
          borderRadius: 7,
          boxShadow: "0 10px 24px rgba(18,49,94,0.3)",
        }}
      >
        ↪ Enter Portal
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* page 4 — faculty gradebook                                          */
/* ------------------------------------------------------------------ */

const GRADES = [
  { i: "AW", n: "Alexander Wright", c: "B.Sc. Computer Science & AI", a: "94.5%", b: "96.0%", s: "Milestone Verified", g: "3.91", ok: true },
  { i: "MS", n: "Marcus Sterling", c: "B.S. Comp. Science · Algorithms", a: "89.0%", b: "91.5%", s: "Spec Submitted", g: "3.75", ok: true },
  { i: "DM", n: "DeVaughn Miller", c: "B.S. Comp. Science · Core Req.", a: "64.0%", b: "71.0%", s: "Incomplete Draft", g: "2.18", ok: false },
];

const FacultyMini: React.FC = () => (
  <div style={{ height: "100%", background: "#F7F8FC", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 11 }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
      <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700, color: "#0E2A55" }}>Faculty Gradebook</div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: "#8A94A6" }}>
        SECTION 01 CHANNEL
      </div>
    </div>

    <div style={{ display: "flex", gap: 9 }}>
      {[
        { l: "MEDIAN SCORE", v: "86.8%", c: "#0E2A55" },
        { l: "AVERAGE GPA", v: "3.53", c: "#0E2A55" },
        { l: "MAX RECORDED", v: "100.0%", c: "#B4881B" },
      ].map((s) => (
        <div
          key={s.l}
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: "1px solid #E6EBF4",
            borderRadius: 10,
            padding: "8px 10px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 8, fontWeight: 800, letterSpacing: 1, color: "#8A94A6" }}>{s.l}</div>
          <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: s.c, lineHeight: 1.2 }}>{s.v}</div>
        </div>
      ))}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {GRADES.map((s) => (
        <div
          key={s.i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: "#FFFFFF",
            border: "1px solid #E6EBF4",
            borderRadius: 10,
            padding: "7px 10px",
            boxShadow: "0 6px 16px rgba(15,35,75,0.06)",
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#12315E",
              color: "#FFD700",
              fontSize: 11,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.i}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#0E2A55", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {s.n}
            </div>
            <div style={{ fontSize: 9.5, color: "#8A94A6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.c}</div>
          </div>
          <span
            style={{
              background: s.ok ? "#E7F7EC" : "#FDECEC",
              color: s.ok ? "#1B7F3B" : "#C0392B",
              fontSize: 9,
              fontWeight: 800,
              padding: "4px 8px",
              borderRadius: 100,
              whiteSpace: "nowrap",
            }}
          >
            {s.a}
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: s.ok ? "#0E2A55" : "#C0392B" }}>{s.g}</span>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: "auto",
        background: "#FFFFFF",
        border: "1px solid #E6EBF4",
        borderRadius: 10,
        padding: "10px 12px",
        boxShadow: "0 8px 22px rgba(15,35,75,0.07)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: "#B4881B" }}>
          CLASS DISPATCH
        </span>
        <span style={{ fontSize: 9.5, color: "#8A94A6" }}>42 enrolled students</span>
      </div>
      <div style={{ fontSize: 11, color: "#475569", marginTop: 5, lineHeight: 1.45 }}>
        Broadcast official notice to all enrolled students via student portal inbox and collegiate email alerts.
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
        <div style={{ flex: 1, border: "1px solid #D7DFEC", background: "#F8FAFD", borderRadius: 6, padding: "6px 9px", fontSize: 10.5, color: "#64748B", whiteSpace: "nowrap", overflow: "hidden" }}>
          Midterm 2 Regrade Windows &amp; Office Hours
        </div>
        <div
          style={{
            background: "#12315E",
            color: "#fff",
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 16px",
            borderRadius: 6,
            whiteSpace: "nowrap",
          }}
        >
          ➤ Broadcast
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* page 5 — admin dashboard                                            */
/* ------------------------------------------------------------------ */

const STUDENTS = [
  { i: "AW", n: "Alexander Wright", id: "VU-883921", lvl: "Year 3 (Junior)", gpa: "3.84" },
  { i: "MS", n: "Marcus Sterling", id: "VU-883109", lvl: "Year 3 (Junior)", gpa: "3.91" },
  { i: "ER", n: "Elena Rostova", id: "VU-884210", lvl: "Year 2 (Sophomore)", gpa: "3.75" },
];

const AdminMini: React.FC = () => (
  <div style={{ height: "100%", background: "#F7F8FC", display: "flex", gap: 20, padding: "16px 22px" }}>
    {/* registry table */}
    <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: 11, minWidth: 0, justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#E7EEFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          👥
        </span>
        <div>
          <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700, color: "#0E2A55", lineHeight: 1.1 }}>
            Student Registry &amp; Enrollment Records
          </div>
          <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 2 }}>
            Complete scholar directory with matriculation, academic standing and advisor assignments.
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {STUDENTS.map((s) => (
          <div
            key={s.i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#FFFFFF",
              border: "1px solid #E6EBF4",
              borderRadius: 10,
              padding: "10px 13px",
              boxShadow: "0 8px 20px rgba(15,35,75,0.06)",
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#12315E",
                color: "#FFD700",
                fontSize: 13,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.i}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0E2A55", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {s.n}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: "#8A94A6" }}>{s.id}</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 700, color: "#475569", whiteSpace: "nowrap" }}>{s.lvl}</span>
            <span
              style={{
                background: "#E7F7EC",
                color: "#1B7F3B",
                fontSize: 10.5,
                fontWeight: 800,
                padding: "5px 11px",
                borderRadius: 100,
                whiteSpace: "nowrap",
              }}
            >
              ● Active
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700, color: "#0E2A55" }}>{s.gpa}</span>
          </div>
        ))}
      </div>
    </div>

    {/* onboarding card */}
    <div
      style={{
        flex: "1 1 45%",
        background: "#FFFFFF",
        border: "1px solid #E6EBF4",
        borderRadius: 12,
        padding: "16px 18px",
        boxShadow: "0 14px 34px rgba(15,35,75,0.10)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#B4881B" }}>
        REGISTRAR INTAKE
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 23, fontWeight: 700, color: "#0E2A55", lineHeight: 1.05 }}>
        Onboard New Scholar
      </div>
      <div style={{ fontSize: 11.5, color: "#64748B" }}>
        Record the name, matriculation number and academic record for a new student.
      </div>

      <div style={{ display: "flex", gap: 9 }}>
        {[
          { l: "FIRST NAME", v: "amara" },
          { l: "MIDDLE NAME", v: "N." },
          { l: "LAST NAME", v: "okafor" },
        ].map((f) => (
          <div key={f.l} style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.7, color: "#64748B" }}>{f.l} *</div>
            <div
              style={{
                marginTop: 3,
                border: "1px solid #D7DFEC",
                background: "#F8FAFD",
                borderRadius: 6,
                padding: "7px 9px",
                fontSize: 12,
                color: "#334155",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {f.v}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 9 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.7, color: "#64748B" }}>MATRICULATION NUMBER *</div>
          <div
            style={{
              marginTop: 3,
              border: "1px solid #D7DFEC",
              background: "#F8FAFD",
              borderRadius: 6,
              padding: "7px 9px",
              fontSize: 12,
              color: "#334155",
              fontFamily: MONO,
            }}
          >
            ve-12345
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.7, color: "#64748B" }}>CUMULATIVE GPA *</div>
          <div
            style={{
              marginTop: 3,
              border: "1px solid #D7DFEC",
              background: "#F8FAFD",
              borderRadius: 6,
              padding: "7px 9px",
              fontSize: 12,
              color: "#334155",
            }}
          >
            3.75
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 9 }}>
        <div style={{ flex: 1, background: "#EEF2F7", color: "#475569", fontSize: 13, fontWeight: 700, textAlign: "center", padding: "11px 0", borderRadius: 7 }}>
          Cancel
        </div>
        <div
          style={{
            flex: 1.7,
            background: "#12315E",
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
            textAlign: "center",
            padding: "11px 0",
            borderRadius: 7,
            whiteSpace: "nowrap",
          }}
        >
          Add Student to Registry
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* the cover — all pages of the site                                   */
/* ------------------------------------------------------------------ */

export const UniversityCover: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, background: "#EDF1F8", overflow: "hidden", direction: "ltr" }}>
    {/* site header */}
    <div
      style={{
        height: 112,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 34,
        padding: "0 56px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E8ECF3",
      }}
    >
      <Shield size={60} />
      <div>
        <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 35, color: "#0E2A55", lineHeight: 1.05 }}>
          Veritas University
        </div>
        <div style={{ fontSize: 12, letterSpacing: 2.5, color: "#8A94A6", fontWeight: 800, marginTop: 6 }}>
          EST. 1872 • CURIA &amp; ACADEMIA
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 40 }}>
        {NAV.map((n) => (
          <div
            key={n.t}
            style={{
              padding: "11px 22px",
              borderRadius: 10,
              fontSize: 22,
              fontWeight: 600,
              color: n.active ? "#12315E" : "#334155",
              background: n.active ? "#E7EEFA" : "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {n.t}
          </div>
        ))}
      </div>

      <div
        style={{
          marginLeft: "auto",
          background: "#12315E",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          padding: "15px 40px",
          borderRadius: 8,
          boxShadow: "0 10px 26px rgba(18,49,94,0.35)",
        }}
      >
        Log In
      </div>
    </div>

    {/* all pages */}
    <div style={{ flex: 1, display: "flex", gap: 24, padding: "30px 32px 32px", minHeight: 0 }}>
      {/* left column: home + degrees */}
      <div style={{ flex: "1 1 700px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
        <PageCard label="HOME" style={{ flex: "1 1 520px" }}>
          <HomeMini />
        </PageCard>
        <PageCard label="DEGREES & PROGRAMS" style={{ flex: "1 1 390px" }}>
          <DegreesMini />
        </PageCard>
      </div>

      {/* right column: portal + faculty + admin */}
      <div style={{ flex: "1 1 812px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 24, flex: "1 1 455px", minHeight: 0 }}>
          <PageCard label="SIGN IN PORTAL" style={{ flex: 1, minWidth: 0 }}>
            <LoginMini />
          </PageCard>
          <PageCard label="FACULTY & GRADES" style={{ flex: 1, minWidth: 0 }}>
            <FacultyMini />
          </PageCard>
        </div>
        <PageCard label="ADMIN DASHBOARD" style={{ flex: "1 1 455px" }}>
          <AdminMini />
        </PageCard>
      </div>
    </div>

    <FrameStrip
      background="#EDF1F8"
      borderTop="1px solid #E8ECF3"
      dot="#FFD700"
      label="REEL FRAMES"
      labelColor="#12315E"
      sublabel="Veritas University — straight from the walkthrough"
      sublabelColor="#8A94A6"
      border="1.5px solid #DCE4F0"
      shadow="0 16px 34px rgba(14,42,85,0.14)"
      images={Array.from({ length: 10 }, (_, i) => `stills/university-${i + 1}.jpg`)}
    />

    {/* admissions bar */}
    <div
      style={{
        height: 88,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 64px",
        background: "#06132E",
        borderTop: "2px solid rgba(255,215,0,0.55)",
      }}
    >
      <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#FFD700", boxShadow: "0 0 18px #FFD700" }} />
      <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: 2.6, color: "#FFD700" }}>ADMISSIONS CYCLE:</span>
      <span style={{ fontSize: 24, fontWeight: 700, color: "#EAF1FB" }}>
        Fall 2025 Priority Filing Open • Regular Deadline Nov 15
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 21,
          fontWeight: 800,
          color: "#0B1B3A",
          background: "linear-gradient(90deg,#FFD700,#F2C14E)",
          padding: "12px 30px",
          borderRadius: 100,
        }}
      >
        Apply Now →
      </span>
    </div>
  </AbsoluteFill>
);
