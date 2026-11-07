import React from "react";
import { ShotsCover, ShotsTheme } from "../sites/shotsCover";

const GOLD = "#E0A94A";
const BRAND = "#7C4E12";

const Compass: React.FC = () => (
  <span
    style={{
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "#A5761F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="31" height="31" viewBox="0 0 24 24">
      <path d="M12 2 L16 12 L12 22 L8 12 Z" fill="#FFFFFF" />
      <path d="M12 2 L16 12 L12 12 Z" fill="#FFE9BF" />
    </svg>
  </span>
);

const theme: ShotsTheme = {
  font: "'Cairo','Segoe UI',Tahoma,Arial,sans-serif",
  pageBg: "#FAF9F3",
  columns: 3,
  header: {
    bg: "#FDFBF6",
    border: "1px solid #EBD2AE",
    logo: <Compass />,
    brand: "Wanderlust",
    brandColor: BRAND,
    brandSize: 36,
    tagline: "CURATED JOURNEYS • WORLDWIDE",
    taglineColor: "#A08B6E",
    nav: [{ t: "Home", active: true }, { t: "Destinations" }],
    navColor: "#4A4A4A",
    navActiveColor: BRAND,
    navActiveBg: "#F3E7D3",
    actions: (
      <>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#6B6B6B",
            padding: "0 8px",
          }}
        >
          Log In
        </span>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#FFFFFF",
            background: BRAND,
            padding: "12px 30px",
            borderRadius: 100,
            boxShadow: "0 10px 24px rgba(124,78,18,0.28)",
            whiteSpace: "nowrap",
          }}
        >
          Sign Up
        </span>
      </>
    ),
  },
  band: {
    height: 484,
    bg:
      "radial-gradient(760px 460px at 82% 30%, rgba(242,193,120,0.24), transparent 68%)," +
      "linear-gradient(120deg,#2C1C0C 0%,#5A3A15 58%,#33200B 100%)",
    borderBottom: "2px solid rgba(192,138,62,0.55)",
    dot: GOLD,
    eyebrow: "WANDERLUST • FULL SITE SHOWCASE",
    eyebrowColor: "#F0C98A",
    title: (
      <>
        The Complete{" "}
        <span style={{ color: "#F2C56A", fontStyle: "italic" }}>Travel</span>{" "}
        Website.
      </>
    ),
    titleSize: 58,
    desc: "Five real pages from the build — the destination catalogue, curated categories, trip details, passenger details and the booking checkout.",
    descColor: "#CBB893",
    descSize: 18,
    chips: [
      "Cultural Immersion",
      "Beach Escape",
      "City Break",
      "Wellness Retreat",
    ],
    stats: [
      { k: "5", v: "REAL PAGES" },
      { k: "1", v: "BOOKING FLOW" },
      { k: "100%", v: "RESPONSIVE" },
    ],
    statKeyColor: "#F2C56A",
    statLabelColor: "#CBB893",
    statPanelBg: "rgba(255,255,255,0.07)",
    statPanelBorder: "1px solid rgba(255,255,255,0.18)",
  },
  card: {
    bg: "#FFFFFF",
    border: "1px solid #EBDCC4",
    shadow: "0 16px 34px rgba(92,58,21,0.16)",
    chipBg: "rgba(44,28,12,0.86)",
    chipBorder: "1px solid rgba(255,255,255,0.14)",
    dot: GOLD,
    labelColor: "#FFFFFF",
  },
  tile: {
    bg: "linear-gradient(135deg,#5A3A15,#2C1C0C)",
    border: "1px solid rgba(224,169,74,0.45)",
    shadow: "0 16px 34px rgba(92,58,21,0.24)",
    eyebrowColor: "#F0C98A",
    titleColor: "#FFFFFF",
    bodyColor: "#DCC9AC",
    dot: GOLD,
  },
  footer: {
    bg: "#2C1C0C",
    borderTop: "2px solid rgba(242,193,120,0.55)",
    dot: "#F0C98A",
    label: "FULL WALKTHROUGH",
    labelColor: "#F0C98A",
    text: "Every screen of the site — captured from the live build.",
    textColor: "#F7EFE0",
    tech: "Nextjs • TailwindCss • supabase",
    techColor: "#B9A588",
    pillBg: "linear-gradient(90deg,#F2C56A,#E0A94A)",
    pillColor: "#2C1C0C",
    pillText: "wanderlust.travel →",
  },
  cells: [
    { kind: "shot", src: "travel images/Capture.PNG", label: "HOME" },
    {
      kind: "shot",
      src: "travel images/Capture1.PNG",
      label: "CURATED CATEGORIES",
    },
    {
      kind: "shot",
      src: "travel images/Capture2.PNG",
      label: "DISCOVER DESTINATIONS",
    },
    { kind: "shot", src: "travel images/Capture4.PNG", label: "TRIP DETAILS" },
    {
      kind: "shot",
      src: "travel images/Capture5.PNG",
      label: "PASSENGER DETAILS",
    },
    {
      kind: "tile",
      eyebrow: "THE BUILD",
      title: "Wanderlust",
      lines: [
        "Destination catalogue with categories & filters",
        "Trip detail with a live booking card",
        "Passenger details through to checkout",
      ],
    },
  ],
};

export const TravelShotsCover: React.FC = () => <ShotsCover theme={theme} />;
