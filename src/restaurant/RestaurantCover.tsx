import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, MONO } from "../vscode/theme";
import { BottomBar, CoverGrid, FrameStrip, PageCard } from "../sites/coverKit";

const SALMON = "#F5855F";
const LIGHT = "#FF9C7A";
const ORANGE = "#FF6B00";
const MUTED = "#9AA0A6";
const PANEL = "#111114";
const LINE = "#1E1E22";

/* ------------------------------------------------------------------ */
/* menu page (public)                                                  */
/* ------------------------------------------------------------------ */

const DISHES = [
  { t: "NEON TUNA TARTARE", tag: "RAW", d: "Hand-cut Bluefin tuna marinated in yuzu kosho and black garlic ponzu, served over crispy sushi rice.", p: "24 $", e: "🍣", g: "linear-gradient(135deg,#1F6F63,#0E3B36)" },
  { t: "WAGYU BITES", tag: "SIGNATURE", d: "Premium A5 Japanese Wagyu seared on binchotan charcoal. Glazed with smoked orange reduction.", p: "38 $", e: "🥩", g: "linear-gradient(135deg,#8A4B2A,#3B1E10)" },
  { t: "RAMEN BOWL", tag: "HOT", d: "Rich tonkotsu broth simmered 18 hours, hand-pulled noodles, chashu pork, seasoned soft egg, nori.", p: "22 $", e: "🍜", g: "linear-gradient(135deg,#B4561F,#4A1E08)" },
  { t: "CYBER SPRITZ", tag: "COCKTAIL", d: "Blood orange juice, premium gin, elderflower liqueur, activated charcoal float, dehydrated orange.", p: "16 $", e: "🍸", g: "linear-gradient(135deg,#5B3FA8,#241147)" },
  { t: "VOID SPHERE", tag: "SWEET", d: "Valrhona 70% dark chocolate sphere with passionfruit ganache, tableside warm caramel pour.", p: "18 $", e: "🍫", g: "linear-gradient(135deg,#3A2B22,#120C08)" },
  { t: "CRISPY CALAMARI", tag: "APPETIZER", d: "Calamari in black squid ink batter, flash-fried. Sriracha aioli, pickled Fresno chili, lime.", p: "19 $", e: "🦑", g: "linear-gradient(135deg,#2B4C7A,#101E33)" },
];

const DishCard: React.FC<(typeof DISHES)[number]> = (d) => (
  <div style={{ display: "flex", gap: 12, background: PANEL, border: `1px solid ${LINE}`, borderRadius: 10, padding: 12 }}>
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: 8,
        background: d.g,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        flexShrink: 0,
      }}
    >
      {d.e}
    </div>
    <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: 14,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 0.4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {d.t}
        </span>
        <span
          style={{
            background: "#2B2B30",
            color: "#E8E8EA",
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: 0.8,
            padding: "3px 7px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {d.tag}
        </span>
      </div>
      <div
        style={{
          fontSize: 10,
          lineHeight: 1.5,
          color: "#C7C7CC",
          marginTop: 5,
          maxHeight: 30,
          overflow: "hidden",
        }}
      >
        {d.d}
      </div>
      <div style={{ fontSize: 19, fontWeight: 900, color: LIGHT, marginTop: "auto", paddingTop: 4 }}>{d.p}</div>
    </div>
  </div>
);

const MenuPage: React.FC = () => (
  <div
    style={{
      height: "100%",
      background: "#0B0B0D",
      padding: "16px 24px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    {/* site nav */}
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: 1.6, color: SALMON }}>NEON BISTRO</span>
      <div style={{ display: "flex", gap: 18, marginLeft: 12, fontSize: 13.5, fontWeight: 700, color: "#E8E8EA" }}>
        <span>Home</span>
        <span style={{ color: LIGHT, borderBottom: `2px solid ${LIGHT}`, paddingBottom: 3 }}>Menu</span>
        <span>Book a Table</span>
        <span>Contact</span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#FF7A1A",
            color: "#0B0B0D",
            fontSize: 14,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Y
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#E8E8EA" }}>Logout</span>
      </div>
    </div>

    <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: 2, color: LIGHT, lineHeight: 1 }}>THE MENU</div>

    <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignContent: "start" }}>
      {DISHES.map((d) => (
        <DishCard key={d.t} {...d} />
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* admin dashboard                                                     */
/* ------------------------------------------------------------------ */

const SIDE_ITEMS = ["Dashboard", "Food Menu", "Bookings", "Settings"];
const SIDE_ICONS = ["▦", "☰", "📅", "⚙"];

const AdminSidebar: React.FC<{ active: string }> = ({ active }) => (
  <div
    style={{
      width: 186,
      flexShrink: 0,
      background: PANEL,
      borderRight: `1px solid ${LINE}`,
      padding: "16px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: 1.4, color: SALMON }}>NEON BISTRO</span>
    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: "#6E6E76", marginTop: 10 }}>ADMIN PANEL</span>
    {SIDE_ITEMS.map((s, i) => (
      <div
        key={s}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 11px",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          color: s === active ? LIGHT : "#B8B8BE",
          background: s === active ? "#2E1C10" : "transparent",
          border: s === active ? `1px solid ${ORANGE}` : "1px solid transparent",
        }}
      >
        <span style={{ color: s === active ? ORANGE : "#6E6E76", fontSize: 13 }}>{SIDE_ICONS[i]}</span>
        {s}
      </div>
    ))}
    <div
      style={{
        marginTop: "auto",
        background: "#141418",
        border: `1px solid #232329`,
        borderRadius: 8,
        padding: "11px 12px",
      }}
    >
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: SALMON }}>NEED HELP?</div>
      <div style={{ fontSize: 11, color: "#E8E8EA", marginTop: 6, lineHeight: 1.45 }}>
        Dishes update live on the public menu.
      </div>
      <div style={{ fontSize: 11, fontWeight: 800, color: SALMON, marginTop: 7 }}>View website →</div>
    </div>
  </div>
);

const UserCluster: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
    <span
      style={{
        padding: "7px 13px",
        borderRadius: 7,
        background: "#1A1A1E",
        border: `1px solid ${LINE}`,
        fontSize: 10.5,
        fontWeight: 800,
        color: "#E8E8EA",
        letterSpacing: 1,
      }}
    >
      REFRESH
    </span>
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 12px",
        borderRadius: 7,
        background: "#141418",
        border: `1px solid ${LINE}`,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: ORANGE,
          color: "#0B0B0D",
          fontSize: 12,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Z
      </span>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: "#E8E8EA" }}>Zakaria Hizzi</span>
    </span>
    <span
      style={{
        padding: "7px 14px",
        borderRadius: 7,
        background: ORANGE,
        color: "#FFFFFF",
        fontSize: 10.5,
        fontWeight: 900,
        letterSpacing: 1,
      }}
    >
      LOGOUT
    </span>
  </div>
);

const DashboardPage: React.FC = () => (
  <div style={{ height: "100%", display: "flex", background: "#0D0D10" }}>
    <AdminSidebar active="Dashboard" />
    <div style={{ flex: 1, padding: "16px 18px", minWidth: 0, display: "flex", flexDirection: "column", gap: 13 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>Dashboard</div>
          <div style={{ fontSize: 11.5, color: MUTED, marginTop: 4 }}>Overview of your menu and reservations.</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <UserCluster />
        </div>
      </div>

      <div style={{ display: "flex", gap: 11 }}>
        {[
          { l: "LIVE DISHES", v: "8", c: LIGHT },
          { l: "BOOKINGS TODAY", v: "3", c: ORANGE },
          { l: "TABLES TONIGHT", v: "12", c: "#FFFFFF" },
        ].map((s) => (
          <div key={s.l} style={{ flex: 1, background: PANEL, border: `1px solid #232329`, borderRadius: 10, padding: "11px 13px" }}>
            <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 800, letterSpacing: 1.4, color: "#6E6E76" }}>{s.l}</div>
            <div style={{ fontSize: 27, fontWeight: 900, color: s.c, lineHeight: 1.25, marginTop: 3 }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{ background: PANEL, border: `1px solid #232329`, borderRadius: 10, padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.8, color: SALMON }}>
            TONIGHT&apos;S BOOKINGS
          </span>
          <span style={{ fontSize: 10, color: MUTED }}>View all →</span>
        </div>
        {[
          { t: "7:00 PM", p: "Party of 2 · Window booth", s: "Confirmed", c: "#3DDC84" },
          { t: "8:30 PM", p: "Party of 4 · Chef&apos;s counter", s: "Pending", c: "#FFB020" },
        ].map((r) => (
          <div key={r.t} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 9 }}>
            <span style={{ fontSize: 12.5, fontWeight: 900, color: "#FFFFFF", width: 66 }}>{r.t}</span>
            <span style={{ fontSize: 11.5, color: "#C7C7CC", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: r.p }} />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                color: r.c,
                border: `1px solid ${r.c}55`,
                background: `${r.c}1A`,
                padding: "4px 10px",
                borderRadius: 100,
              }}
            >
              {r.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* admin food menu (table)                                             */
/* ------------------------------------------------------------------ */

const ROWS = [
  { n: "NEON TUNA TARTARE", d: "Hand-cut Bluefin tuna marinated in yuzu kosho…", p: "$24", c: "RAW", e: "🍣" },
  { n: "WAGYU BITES", d: "Premium A5 Japanese Wagyu seared on binchotan…", p: "$38", c: "SIGNATURE", e: "🥩" },
  { n: "RAMEN BOWL", d: "Rich tonkotsu broth simmered 18 hours, hand-pulled…", p: "$22", c: "HOT", e: "🍜" },
  { n: "CYBER SPRITZ", d: "Blood orange juice, premium gin, elderflower…", p: "$16", c: "COCKTAIL", e: "🍸" },
  { n: "VOID SPHERE", d: "Valrhona 70% dark chocolate sphere with passionfruit…", p: "$18", c: "SWEET", e: "🍫" },
  { n: "CRISPY CALAMARI", d: "Calamari in black squid ink batter, flash-fried…", p: "$19", c: "APPETIZER", e: "🦑" },
];

const FoodMenuPage: React.FC = () => (
  <div
    style={{
      height: "100%",
      background: "#0D0D10",
      padding: "16px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>Food Menu</div>
        <div style={{ fontSize: 11.5, color: MUTED, marginTop: 4 }}>8 food items live on the menu.</div>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <UserCluster />
      </div>
    </div>

    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          background: "#141418",
          border: `1px solid ${LINE}`,
          borderTop: "none",
          borderBottom: `2px solid ${ORANGE}`,
          borderRadius: "6px 6px 0 0",
          padding: "9px 13px",
          fontSize: 12,
          color: "#6E6E76",
        }}
      >
        Search dishes...
      </div>
      <div
        style={{
          padding: "9px 16px",
          background: "#141418",
          border: `1px solid ${LINE}`,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 700,
          color: "#E8E8EA",
        }}
      >
        All ▾
      </div>
      <div
        style={{
          padding: "9px 18px",
          background: ORANGE,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: 0.6,
          whiteSpace: "nowrap",
        }}
      >
        + ADD NEW FOOD ITEM
      </div>
    </div>

    {/* table */}
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "0 4px 8px",
          borderBottom: `1px solid ${LINE}`,
          fontFamily: MONO,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 1.4,
          color: "#6E6E76",
        }}
      >
        <span style={{ width: 34 }}>IMAGE</span>
        <span style={{ width: 168 }}>NAME</span>
        <span style={{ flex: 1 }}>DESCRIPTION</span>
        <span style={{ width: 52 }}>PRICE</span>
        <span style={{ width: 92 }}>CATEGORY</span>
        <span style={{ width: 104 }}>ACTIONS</span>
      </div>
      {ROWS.map((r) => (
        <div
          key={r.n}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 4px",
            borderBottom: `1px solid #17171B`,
          }}
        >
          <span
            style={{
              width: 34,
              height: 30,
              borderRadius: 6,
              background: "#1C1C1F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            {r.e}
          </span>
          <span style={{ width: 164, fontSize: 12, fontWeight: 800, color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {r.n}
          </span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 10.5, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {r.d}
          </span>
          <span style={{ width: 52, fontSize: 12.5, fontWeight: 800, color: "#FFFFFF" }}>{r.p}</span>
          <span style={{ width: 92 }}>
            <span
              style={{
                background: "#1C1C1F",
                border: `1px solid ${LINE}`,
                color: "#C7C7CC",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 0.6,
                padding: "4px 8px",
                borderRadius: 5,
                whiteSpace: "nowrap",
              }}
            >
              {r.c}
            </span>
          </span>
          <span style={{ width: 104, display: "flex", gap: 6 }}>
            {["EDIT", "DELETE"].map((a) => (
              <span
                key={a}
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  color: a === "EDIT" ? LIGHT : "#FF6B6B",
                  border: `1px solid ${a === "EDIT" ? "#3A3A42" : "#4A2A2A"}`,
                  padding: "4px 8px",
                  borderRadius: 5,
                }}
              >
                {a}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* add dish modal                                                      */
/* ------------------------------------------------------------------ */

const Field: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div>
    <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: SALMON }}>{label}</div>
    <div
      style={{
        marginTop: 5,
        background: "#17171B",
        border: "1px solid #2A2A30",
        borderRadius: 8,
        padding: "8px 11px",
        fontSize: 12.5,
        color: "#EDEDF0",
        fontFamily: mono ? MONO : FONT,
      }}
    >
      {value}
    </div>
  </div>
);

const AddDishPage: React.FC = () => (
  <div style={{ height: "100%", position: "relative", background: "#0D0D10", overflow: "hidden" }}>
    {/* dimmed page behind */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.4, padding: "16px 20px", display: "flex", gap: 14 }}>
      <div style={{ width: 170, background: PANEL, borderRadius: 10, border: `1px solid ${LINE}` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ height: 44, background: PANEL, borderRadius: 8, border: `1px solid ${LINE}` }} />
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,7,0.74)" }} />

    {/* modal */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: 470,
        background: "#111116",
        border: "1px solid #26262B",
        borderRadius: 14,
        padding: "16px 20px 18px",
        boxShadow: "0 40px 90px rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        gap: 9,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 800, letterSpacing: 2, color: SALMON }}>
          NEW FOOD ITEM
        </span>
        <span style={{ marginLeft: "auto", color: "#8A8A92", fontSize: 15 }}>✕</span>
      </div>
      <div style={{ fontSize: 25, fontWeight: 900, color: LIGHT, lineHeight: 1 }}>Add to the menu</div>

      <Field label="TITLE" value="Pizza" />
      <div>
        <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: SALMON }}>
          DESCRIPTION
        </div>
        <div
          style={{
            marginTop: 5,
            background: "#17171B",
            border: "1px solid #2A2A30",
            borderRadius: 8,
            padding: "8px 11px",
            fontSize: 11,
            lineHeight: 1.5,
            color: "#C7C7CC",
            height: 62,
            overflow: "hidden",
          }}
        >
          Baked at a high temperature, traditionally in a wood-fired oven. It originated in Italy (particularly
          Naples) and has since become one of the world&apos;s most beloved foods.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Field label="PRICE ($)" value="22" />
        </div>
        <div style={{ flex: 1 }}>
          <Field label="CATEGORY" value="SWEET" />
        </div>
      </div>

      <div>
        <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: SALMON }}>
          IMAGE UPLOAD
        </div>
        <div
          style={{
            marginTop: 5,
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: "#17171B",
            border: "1px dashed #3A3A42",
            borderRadius: 8,
            padding: "7px 11px",
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              background: "linear-gradient(135deg,#E8A33D,#B4561F)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
            }}
          >
            🍕
          </span>
          <span>
            <span style={{ fontSize: 11.5, color: "#EDEDF0" }}>images.jpeg</span>
            <span style={{ display: "block", fontSize: 9.5, color: "#6E6E76", marginTop: 2 }}>Click to browse files</span>
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 2,
          background: ORANGE,
          borderRadius: 8,
          padding: "11px 0",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: 1,
        }}
      >
        ADD TO MENU
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* cover                                                               */
/* ------------------------------------------------------------------ */

export const RestaurantCover: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, background: "#0A0A0C", overflow: "hidden", direction: "ltr" }}>
    {/* header */}
    <div
      style={{
        height: 112,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 26,
        padding: "0 56px",
        background: "#0B0B0D",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <span
        style={{
          width: 54,
          height: 54,
          borderRadius: 15,
          background: "linear-gradient(135deg,#7C3AED,#F5855F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 27,
        }}
      >
        ⚡
      </span>
      <span style={{ fontSize: 34, fontWeight: 900, letterSpacing: 3, color: SALMON }}>NEON BISTRO</span>

      <div style={{ display: "flex", gap: 32, marginLeft: 30, fontSize: 21, fontWeight: 700, color: "#E8E8EA" }}>
        <span>Home</span>
        <span style={{ color: LIGHT, borderBottom: `3px solid ${LIGHT}`, paddingBottom: 5 }}>Menu</span>
        <span>Book a Table</span>
        <span>Contact</span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <span
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "#FF7A1A",
            color: "#0B0B0D",
            fontSize: 21,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Y
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#E8E8EA" }}>Logout</span>
      </div>
    </div>

    <CoverGrid
      background="#0A0A0C"
      left={[<PageCard key="menu" label="MENU" barBg="#16161A" dot={ORANGE} labelColor={LIGHT} bodyBg="#0B0B0D" border="1px solid #232329"><MenuPage /></PageCard>,
             <PageCard key="dash" label="ADMIN DASHBOARD" barBg="#16161A" dot={ORANGE} labelColor={LIGHT} bodyBg="#0B0B0D" border="1px solid #232329"><DashboardPage /></PageCard>]}
      right={[<PageCard key="food" label="ADMIN · FOOD MENU" barBg="#16161A" dot={ORANGE} labelColor={LIGHT} bodyBg="#0B0B0D" border="1px solid #232329"><FoodMenuPage /></PageCard>,
              <PageCard key="modal" label="ADMIN · NEW DISH" barBg="#16161A" dot={ORANGE} labelColor={LIGHT} bodyBg="#0B0B0D" border="1px solid #232329"><AddDishPage /></PageCard>]}
    />

    <FrameStrip
      background="#0A0A0C"
      borderTop="1px solid #232329"
      dot={ORANGE}
      label="REEL FRAMES"
      labelColor={LIGHT}
      sublabel="Neon Bistro — straight from the walkthrough"
      sublabelColor="#6E6E76"
      border="1.5px solid rgba(255,107,0,0.45)"
      shadow="0 16px 34px rgba(0,0,0,0.55)"
      images={Array.from({ length: 10 }, (_, i) => `stills/restaurant-${i + 1}.jpg`)}
    />

    <BottomBar
      background="#0D0D10"
      borderTop="2px solid #FF6B00"
      dot={ORANGE}
      label="RESERVATIONS:"
      labelColor={ORANGE}
      text="Book a Table • Wed–Sun 18:00 – 01:00 • Walk-ins welcome"
      textColor="#E8E8EA"
      pillBg="linear-gradient(90deg,#FF6B00,#FF8A3D)"
      pillColor="#0B0B0D"
      pillText="Reserve a Table →"
    />
  </AbsoluteFill>
);
