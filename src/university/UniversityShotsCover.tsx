import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT, MONO } from "../vscode/theme";

/** Academic serif used by the Veritas University site. */
const SERIF = "Georgia, 'Times New Roman', serif";

const NAVY = "#0E2A55";
const NAVY_DEEP = "#06132E";
const GOLD = "#F2C14E";

const NAV: { t: string; active?: boolean }[] = [
  { t: "Home", active: true },
  { t: "About" },
  { t: "Degrees & Programs" },
  { t: "Campus Life" },
];

const STATS = [
  { k: "9", v: "Real Pages" },
  { k: "3", v: "Portals" },
  { k: "100%", v: "Responsive" },
];

/** Every screenshot in public/university images, cropped to the card shape. */
const PAGES: { src: string; label: string; pos: string; zoom?: number }[] = [
  { src: "university images/Capture.PNG", label: "HOME", pos: "top center" },
  {
    src: "university images/Capture1.PNG",
    label: "DEGREES & PROGRAMS",
    pos: "top center",
  },
  {
    src: "university images/Capture2.PNG",
    label: "CAMPUS & FACILITIES",
    pos: "top center",
  },
  {
    src: "university images/Capture3.PNG",
    label: "SIGN IN PORTAL",
    pos: "top center",
    zoom: 1.55,
  },
  {
    src: "university images/Capture4.PNG",
    label: "ADMIN SUITE",
    pos: "top center",
  },
  {
    src: "university images/Capture5.PNG",
    label: "STUDENT DASHBOARD",
    pos: "left center",
  },
  {
    src: "university images/Capture6.PNG",
    label: "WEEKLY TIMETABLE",
    pos: "top center",
  },
  {
    src: "university images/Capture7.PNG",
    label: "FACULTY GRADEBOOK",
    pos: "top center",
  },
  {
    src: "university images/Capture8.PNG",
    label: "ROSTER & EVALUATION",
    pos: "top center",
  },
];

/** Navy shield with a gold open book — the site's logo. */
const Shield: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ display: "block", flexShrink: 0 }}
  >
    <rect width="40" height="40" rx="9" fill="#12315E" />
    <path
      d="M8 12c5-2 9-1 12 2 3-3 7-4 12-2v16c-5-2-9-1-12 2-3-3-7-4-12-2z"
      fill="#F2C14E"
    />
    <path d="M20 14v16" stroke="#12315E" strokeWidth="2.2" />
  </svg>
);

/** One real page capture, framed like a browser card. */
const ShotCard: React.FC<{ page: (typeof PAGES)[number] }> = ({ page }) => (
  <div
    style={{
      position: "relative",
      flex: 1,
      minWidth: 0,
      borderRadius: 14,
      overflow: "hidden",
      background: "#FFFFFF",
      border: "1px solid #D9E2F0",
      boxShadow: "0 16px 34px rgba(14,42,85,0.14)",
    }}
  >
    <Img
      src={staticFile(page.src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: page.pos,
        transform: page.zoom ? `scale(${page.zoom})` : undefined,
        transformOrigin: "center top",
        display: "block",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 12,
        bottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: "rgba(6,19,46,0.86)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 6,
        padding: "5px 10px",
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.7,
          color: "#FFFFFF",
        }}
      >
        {page.label}
      </span>
    </div>
  </div>
);

export const UniversityShotsCover: React.FC = () => (
  <AbsoluteFill
    style={{
      fontFamily: FONT,
      background: "#EDF1F8",
      overflow: "hidden",
      direction: "ltr",
    }}
  >
    {/* site header */}
    <div
      style={{
        height: 104,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 30,
        padding: "0 40px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E8ECF3",
      }}
    >
      <Shield size={56} />
      <div>
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 33,
            color: NAVY,
            lineHeight: 1.05,
          }}
        >
          Veritas University
        </div>
        <div
          style={{
            fontSize: 11.5,
            letterSpacing: 2.4,
            color: "#8A94A6",
            fontWeight: 800,
            marginTop: 5,
          }}
        >
          EST. 1872 • CURIA &amp; ACADEMIA
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginLeft: 34,
        }}
      >
        {NAV.map((n) => (
          <div
            key={n.t}
            style={{
              padding: "10px 20px",
              borderRadius: 9,
              fontSize: 19,
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
          fontSize: 19,
          fontWeight: 700,
          padding: "13px 32px",
          borderRadius: 8,
          boxShadow: "0 10px 24px rgba(18,49,94,0.32)",
          whiteSpace: "nowrap",
        }}
      >
        Log In
      </div>
    </div>

    {/* cover title band */}
    <div
      style={{
        height: 232,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 44,
        padding: "0 40px",
        background:
          "radial-gradient(760px 420px at 82% 30%, rgba(242,193,78,0.20), transparent 68%)," +
          "linear-gradient(120deg,#0C2451 0%,#133B6C 58%,#0A1F44 100%)",
        borderBottom: "2px solid rgba(242,193,78,0.45)",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#FFD700",
              boxShadow: "0 0 14px #FFD700",
            }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 12.5,
              fontWeight: 800,
              letterSpacing: 2.6,
              color: GOLD,
            }}
          >
            VERITAS UNIVERSITY • FULL SITE SHOWCASE
          </span>
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FFFFFF",
            marginTop: 12,
          }}
        >
          The Complete{" "}
          <span style={{ color: GOLD, fontStyle: "italic" }}>Campus</span>{" "}
          Website.
        </div>
        <div
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            color: "#A8BCDA",
            marginTop: 10,
            maxWidth: 880,
          }}
        >
          Nine real pages from the build — admissions homepage, accredited
          degrees, campus facilities, student portal, weekly timetable, faculty
          gradebook and the admin suite.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        {STATS.map((s) => (
          <div
            key={s.v}
            style={{
              width: 142,
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 38,
                fontWeight: 700,
                color: "#FFD700",
                lineHeight: 1,
              }}
            >
              {s.k}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: 1.5,
                color: "#9FB4D6",
                marginTop: 7,
              }}
            >
              {s.v.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* real screenshots, 3 x 3 */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "18px 30px",
        minHeight: 0,
      }}
    >
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          style={{ flex: 1, display: "flex", gap: 16, minHeight: 0 }}
        >
          {PAGES.slice(row * 3, row * 3 + 3).map((p) => (
            <ShotCard key={p.src} page={p} />
          ))}
        </div>
      ))}
    </div>

    {/* bottom bar */}
    <div
      style={{
        height: 88,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 40px",
        background: NAVY_DEEP,
        borderTop: "2px solid rgba(255,215,0,0.55)",
      }}
    >
      <span
        style={{
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: "#FFD700",
          boxShadow: "0 0 18px #FFD700",
        }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: 2.4,
          color: "#FFD700",
        }}
      >
        FULL WALKTHROUGH
      </span>
      <span style={{ fontSize: 22, fontWeight: 700, color: "#EAF1FB" }}>
        Every page of the site — captured from the live build.
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: MONO,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: 1.4,
          color: "#8FA6C9",
          whiteSpace: "nowrap",
        }}
      >
        Nextjs • TailwindCss • Nodejs
      </span>
      <span
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0B1B3A",
          background: "linear-gradient(90deg,#FFD700,#F2C14E)",
          padding: "12px 28px",
          borderRadius: 100,
          whiteSpace: "nowrap",
        }}
      >
        veritas.edu →
      </span>
    </div>
  </AbsoluteFill>
);
