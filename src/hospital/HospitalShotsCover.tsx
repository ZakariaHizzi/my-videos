import React from "react";
import { ShotsCover, ShotsTheme } from "../sites/shotsCover";

const BLUE = "#2563EB";
const INK = "#0F172A";

const theme: ShotsTheme = {
  font: "'Cairo','Segoe UI',Tahoma,Arial,sans-serif",
  pageBg: "#EDF1F8",
  columns: 3,
  header: {
    bg: "#FFFFFF",
    border: "1px solid #E4E8F2",
    logo: (
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: 12,
          background: BLUE,
          color: "#FFFFFF",
          fontSize: 31,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        H
      </span>
    ),
    brand: "HealSync",
    brandColor: INK,
    brandSize: 33,
    tagline: "MODERN HEALTHCARE • PATIENT FIRST",
    taglineColor: "#8A94A6",
    nav: [{ t: "Home" }, { t: "Find a Doctor", active: true }],
    navColor: "#334155",
    navActiveColor: BLUE,
    navActiveBg: "#E7EEFA",
    actions: (
      <>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: BLUE,
            border: "1.5px solid rgba(37,99,235,0.55)",
            padding: "12px 30px",
            borderRadius: 8,
            whiteSpace: "nowrap",
          }}
        >
          Sign In
        </span>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#FFFFFF",
            background: "#1D4ED8",
            padding: "13px 32px",
            borderRadius: 8,
            boxShadow: "0 10px 24px rgba(29,78,216,0.30)",
            whiteSpace: "nowrap",
          }}
        >
          Register
        </span>
      </>
    ),
  },
  band: {
    height: 232,
    bg:
      "radial-gradient(760px 420px at 82% 30%, rgba(96,165,250,0.30), transparent 68%)," +
      "linear-gradient(120deg,#0A2A66 0%,#1E4FA8 58%,#0B2350 100%)",
    borderBottom: "2px solid rgba(96,165,250,0.45)",
    dot: "#60A5FA",
    eyebrow: "HEALSYNC • FULL SITE SHOWCASE",
    eyebrowColor: "#93C5FD",
    title: (
      <>
        The Complete{" "}
        <span style={{ color: "#7DD3FC", fontStyle: "italic" }}>
          Healthcare
        </span>{" "}
        Website.
      </>
    ),
    desc: "Seven real pages from the build — specialist search, doctor profiles, appointment scheduling, insurance and the patient dashboard.",
    descColor: "#A8BCDA",
    stats: [
      { k: "7", v: "REAL PAGES" },
      { k: "2", v: "PORTALS" },
      { k: "100%", v: "RESPONSIVE" },
    ],
    statKeyColor: "#7DD3FC",
    statLabelColor: "#9FB4D6",
    statPanelBg: "rgba(255,255,255,0.07)",
    statPanelBorder: "1px solid rgba(255,255,255,0.18)",
  },
  card: {
    bg: "#FFFFFF",
    border: "1px solid #D9E2F0",
    shadow: "0 16px 34px rgba(14,42,85,0.14)",
    chipBg: "rgba(6,19,46,0.86)",
    chipBorder: "1px solid rgba(255,255,255,0.14)",
    dot: "#60A5FA",
    labelColor: "#FFFFFF",
  },
  tile: {
    bg: "linear-gradient(135deg,#123B7A,#0A2148)",
    border: "1px solid rgba(96,165,250,0.40)",
    shadow: "0 16px 34px rgba(14,42,85,0.24)",
    eyebrowColor: "#93C5FD",
    titleColor: "#FFFFFF",
    bodyColor: "#BFD3EE",
    dot: "#60A5FA",
  },
  footer: {
    bg: "#06132E",
    borderTop: "2px solid rgba(96,165,250,0.55)",
    dot: "#60A5FA",
    label: "FULL WALKTHROUGH",
    labelColor: "#7DD3FC",
    text: "Every screen of the site — captured from the live build.",
    textColor: "#EAF1FB",
    tech: "Nextjs • TailwindCss • Nodejs",
    techColor: "#8FA6C9",
    pillBg: "linear-gradient(90deg,#60A5FA,#93C5FD)",
    pillColor: "#06132E",
    pillText: "healsync.com →",
  },
  cells: [
    {
      kind: "shot",
      src: "hospital images/Capture2.PNG",
      label: "FIND A DOCTOR",
    },
    {
      kind: "shot",
      src: "hospital images/Capture.PNG",
      label: "DOCTOR PROFILE",
    },
    {
      kind: "shot",
      src: "hospital images/Capture1.PNG",
      label: "FEATURED SPECIALISTS",
    },
    {
      kind: "shot",
      src: "hospital images/Capture6.PNG",
      label: "PATIENT DASHBOARD",
      pos: "left top",
    },
    {
      kind: "shot",
      src: "hospital images/Capture5.PNG",
      label: "CONFIRM APPOINTMENT",
    },
    { kind: "shot", src: "hospital images/Capture3.PNG", label: "SIGN IN" },
    {
      kind: "shot",
      src: "hospital images/Capture4.PNG",
      label: "CREATE ACCOUNT",
    },
    {
      kind: "tile",
      eyebrow: "THE BUILD",
      title: "HealSync",
      lines: [
        "Specialist search, profiles and booking",
        "Appointment, insurance and confirmation flow",
        "Patient dashboard for upcoming visits",
      ],
    },
    {
      kind: "tile",
      eyebrow: "TWO PORTALS",
      title: "One build.",
      lines: [
        "Public site for finding care",
        "Signed-in patient dashboard",
        "Both captured from the live build",
      ],
    },
  ],
};

export const HospitalShotsCover: React.FC = () => <ShotsCover theme={theme} />;
