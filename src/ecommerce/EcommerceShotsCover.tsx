import React from "react";
import { ShotsCover, ShotsTheme } from "../sites/shotsCover";

const ORANGE = "#F5821F";

const Cart: React.FC = () => (
  <span
    style={{
      width: 54,
      height: 54,
      borderRadius: 13,
      background: ORANGE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 10px 24px rgba(245,130,31,0.30)",
    }}
  >
    <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 3.5h2.2l2.3 10.2h9.7l2.2-7.7H6.1"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.4" cy="18.6" r="1.7" fill="#FFFFFF" />
      <circle cx="16.4" cy="18.6" r="1.7" fill="#FFFFFF" />
    </svg>
  </span>
);

const theme: ShotsTheme = {
  font: "'Cairo','Segoe UI',Tahoma,Arial,sans-serif",
  pageBg: "#FDF5EF",
  columns: 3,
  header: {
    bg: "#FFFDFA",
    border: "1px solid #F0E4D8",
    logo: <Cart />,
    brand: "Shopcart",
    brandColor: ORANGE,
    brandSize: 34,
    tagline: "EVERYDAY ESSENTIALS • FAST SHIPPING",
    taglineColor: "#A08B7C",
    nav: [
      { t: "Home" },
      { t: "All Products", active: true },
      { t: "Deals" },
      { t: "Support" },
    ],
    navColor: "#3F3A35",
    navActiveColor: ORANGE,
    navActiveBg: "#FDEEE2",
    actions: (
      <>
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#3F3A35",
            padding: "0 8px",
          }}
        >
          Login
        </span>
        <span
          style={{
            fontSize: 19,
            fontWeight: 800,
            color: "#FFFFFF",
            background: ORANGE,
            padding: "12px 30px",
            borderRadius: 8,
            boxShadow: "0 10px 24px rgba(245,130,31,0.28)",
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
      "radial-gradient(760px 420px at 82% 30%, rgba(255,160,60,0.30), transparent 68%)," +
      "linear-gradient(120deg,#3A1C04 0%,#A34C08 58%,#552405 100%)",
    borderBottom: "2px solid rgba(245,130,31,0.50)",
    dot: "#FFB066",
    eyebrow: "SHOPCART • FULL SITE SHOWCASE",
    eyebrowColor: "#FFC98F",
    title: (
      <>
        The Complete{" "}
        <span style={{ color: "#FFD08A", fontStyle: "italic" }}>
          E-commerce
        </span>{" "}
        Website.
      </>
    ),
    desc: "Eight real pages from the build — the product catalogue, categories, product detail, cart, checkout, sign-in and account pages.",
    descColor: "#F0D3B8",
    stats: [
      { k: "8", v: "REAL PAGES" },
      { k: "1", v: "CART + CHECKOUT" },
      { k: "100%", v: "RESPONSIVE" },
    ],
    statKeyColor: "#FFD08A",
    statLabelColor: "#E7BE97",
    statPanelBg: "rgba(255,255,255,0.07)",
    statPanelBorder: "1px solid rgba(255,255,255,0.18)",
  },
  card: {
    bg: "#FFFFFF",
    border: "1px solid #F0E4D8",
    shadow: "0 16px 34px rgba(120,64,10,0.14)",
    chipBg: "rgba(58,28,4,0.86)",
    chipBorder: "1px solid rgba(255,255,255,0.14)",
    dot: "#FFB066",
    labelColor: "#FFFFFF",
  },
  tile: {
    bg: "linear-gradient(135deg,#A34C08,#3A1C04)",
    border: "1px solid rgba(245,130,31,0.45)",
    shadow: "0 16px 34px rgba(120,64,10,0.22)",
    eyebrowColor: "#FFC98F",
    titleColor: "#FFFFFF",
    bodyColor: "#F2D6BC",
    dot: "#FFB066",
  },
  footer: {
    bg: "#2A1608",
    borderTop: "2px solid rgba(245,130,31,0.55)",
    dot: ORANGE,
    label: "FULL WALKTHROUGH",
    labelColor: "#FFB066",
    text: "Every screen of the site — captured from the live build.",
    textColor: "#FFF1E4",
    tech: "Reactjs • CSS • supabase",
    techColor: "#B89272",
    pillBg: "linear-gradient(90deg,#FFA24D,#F5821F)",
    pillColor: "#2A1608",
    pillText: "shopcart.store →",
  },
  cells: [
    {
      kind: "shot",
      src: "ecommerce images/Capture.PNG",
      label: "ALL PRODUCTS",
      pos: "left top",
    },
    {
      kind: "shot",
      src: "ecommerce images/Capture2.PNG",
      label: "FEATURED CATEGORIES",
      pos: "left top",
    },
    {
      kind: "shot",
      src: "ecommerce images/Capture1.PNG",
      label: "BEST SELLERS",
      pos: "left top",
    },
    {
      kind: "shot",
      src: "ecommerce images/Capture5.PNG",
      label: "PRODUCT DETAIL",
      pos: "left top",
    },
    { kind: "shot", src: "ecommerce images/Capture6.PNG", label: "CART" },
    { kind: "shot", src: "ecommerce images/Capture7.PNG", label: "CHECKOUT" },
    { kind: "shot", src: "ecommerce images/Capture3.PNG", label: "SIGN IN" },
    {
      kind: "shot",
      src: "ecommerce images/Capture4.PNG",
      label: "CREATE ACCOUNT",
    },
    {
      kind: "tile",
      eyebrow: "THE BUILD",
      title: "Shopcart",
      lines: [
        "Catalogue, categories and product detail",
        "Cart to checkout with live order summary",
        "Sign-in and account creation included",
      ],
    },
  ],
};

export const EcommerceShotsCover: React.FC = () => <ShotsCover theme={theme} />;
