import React from "react";
import { ShotsCover, ShotsTheme } from "../sites/shotsCover";

const SALMON = "#F5855F";
const LIGHT = "#FF9C7A";
const ORANGE = "#FF6B00";

const theme: ShotsTheme = {
  font: "'Cairo','Segoe UI',Tahoma,Arial,sans-serif",
  pageBg: "#0A0A0C",
  columns: 2,
  header: {
    bg: "#0B0B0D",
    border: "1px solid #1E1E22",
    logo: (
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: 15,
          background: "linear-gradient(135deg,#7C3AED,#F5855F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          flexShrink: 0,
        }}
      >
        ⚡
      </span>
    ),
    brand: "NEON BISTRO",
    brandColor: SALMON,
    brandSize: 34,
    brandLetterSpacing: 3,
    tagline: "MODERN DINING • FULL MENU",
    taglineColor: "#6E6E76",
    nav: [
      { t: "Home" },
      { t: "Menu", active: true },
      { t: "Book a Table" },
      { t: "Contact" },
    ],
    navColor: "#E8E8EA",
    navActiveColor: LIGHT,
    navActiveBg: "#241A13",
    actions: (
      <>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#E8E8EA",
            padding: "0 8px",
          }}
        >
          Log in
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: LIGHT,
            border: "1.5px solid rgba(245,133,95,0.55)",
            padding: "11px 26px",
            borderRadius: 8,
            whiteSpace: "nowrap",
          }}
        >
          Sign Up
        </span>
      </>
    ),
  },
  band: {
    height: 232,
    bg:
      "radial-gradient(760px 420px at 82% 30%, rgba(245,133,95,0.22), transparent 68%)," +
      "linear-gradient(120deg,#0B0B0D 0%,#26140C 58%,#0A0A0C 100%)",
    borderBottom: "2px solid rgba(255,107,0,0.45)",
    dot: ORANGE,
    eyebrow: "NEON BISTRO • FULL SITE SHOWCASE",
    eyebrowColor: LIGHT,
    title: (
      <>
        The Complete{" "}
        <span style={{ color: LIGHT, fontStyle: "italic" }}>Restaurant</span>{" "}
        Website.
      </>
    ),
    desc: "Every screen from the build — the live menu, the reservation flow and the admin dashboard that runs both.",
    descColor: "#B9A49B",
    stats: [
      { k: "3", v: "REAL PAGES" },
      { k: "1", v: "ADMIN SUITE" },
      { k: "100%", v: "RESPONSIVE" },
    ],
    statKeyColor: LIGHT,
    statLabelColor: "#C9A99A",
    statPanelBg: "rgba(255,255,255,0.06)",
    statPanelBorder: "1px solid rgba(255,255,255,0.16)",
  },
  card: {
    bg: "#0B0B0D",
    border: "1px solid #232329",
    shadow: "0 16px 34px rgba(0,0,0,0.55)",
    chipBg: "rgba(10,10,12,0.86)",
    chipBorder: "1px solid rgba(255,107,0,0.35)",
    dot: ORANGE,
    labelColor: "#FFFFFF",
  },
  tile: {
    bg: "linear-gradient(135deg,#2A1409,#0E0C0B 70%)",
    border: "1px solid rgba(255,107,0,0.40)",
    shadow: "0 16px 34px rgba(0,0,0,0.55)",
    eyebrowColor: LIGHT,
    titleColor: "#FFFFFF",
    bodyColor: "#D3BDB2",
    dot: ORANGE,
  },
  footer: {
    bg: "#0D0D10",
    borderTop: "2px solid #FF6B00",
    dot: ORANGE,
    label: "FULL WALKTHROUGH",
    labelColor: "#FF8A3D",
    text: "Every screen of the site — captured from the live build.",
    textColor: "#E8E8EA",
    tech: "Reactjs • TailwindCss • Nodejs",
    techColor: "#6E6E76",
    pillBg: "linear-gradient(90deg,#FF6B00,#FF8A3D)",
    pillColor: "#0B0B0D",
    pillText: "neonbistro.com →",
  },
  cells: [
    { kind: "shot", src: "restaurant images/Capture1.PNG", label: "THE MENU" },
    {
      kind: "shot",
      src: "restaurant images/Capture2.PNG",
      label: "BOOK A TABLE",
    },
    {
      kind: "shot",
      src: "restaurant images/Capture.PNG",
      label: "ADMIN DASHBOARD",
      pos: "left top",
    },
    {
      kind: "tile",
      eyebrow: "THE BUILD",
      title: "Neon Bistro",
      lines: [
        "Full menu in the site's dark, neon UI",
        "Reservation form wired to the admin panel",
        "Every screen captured from the live build",
      ],
    },
  ],
};

export const RestaurantShotsCover: React.FC = () => (
  <ShotsCover theme={theme} />
);
