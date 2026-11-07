import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT } from "../vscode/theme";
import { BottomBar, CoverGrid, FrameStrip, PageCard } from "../sites/coverKit";

const ORANGE = "#F5821F";
const ORANGE_DARK = "#D96A10";
const CREAM = "#FDF5EF";
const INK = "#1F1B16";
const GREY = "#8A8078";
const BORDER = "#F0E4D8";

/* ------------------------------------------------------------------ */
/* product list                                                        */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { t: "Apple AirPods Pro 2nd Gen", p: "$129.99", o: "$179.99", r: "4.8", e: "🎧", g: "linear-gradient(140deg,#F5F5F7,#D9D9DE)" },
  { t: "MacBook Air 13\" M2", p: "$1,299.99", o: "$1,499.99", r: "4.9", e: "💻", g: "linear-gradient(140deg,#E8EDF5,#B9C4D6)" },
  { t: "iPhone 15 Pro Max", p: "$1,199.00", o: "$1,299.00", r: "4.9", e: "📱", g: "linear-gradient(140deg,#E4E9F0,#AEB8C7)" },
  { t: "Apple Watch Series 9", p: "$329.99", o: "$399.99", r: "4.7", e: "⌚", g: "linear-gradient(140deg,#FDECE0,#F3C9A6)" },
  { t: "Sony WH-1000XM5", p: "$278.00", o: "$349.99", r: "4.8", e: "🎙", g: "linear-gradient(140deg,#EDEDF2,#C3C3CC)" },
  { t: "iPad Air 11\" M2", p: "$549.00", o: "$599.00", r: "4.8", e: "📲", g: "linear-gradient(140deg,#E7F1F7,#B7D4E6)" },
  { t: "Samsung 65\" QLED 4K", p: "$897.00", o: "$1,099.00", r: "4.6", e: "📺", g: "linear-gradient(140deg,#E9E9EE,#BFBFC9)" },
  { t: "PlayStation 5 Slim", p: "$449.99", o: "$499.99", r: "4.9", e: "🎮", g: "linear-gradient(140deg,#EDF0FA,#C0C9E4)" },
];

const ProductCard: React.FC<(typeof PRODUCTS)[number]> = (p) => (
  <div
    style={{
      background: "#FFFFFF",
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 8px 22px rgba(80,50,20,0.06)",
    }}
  >
    <div
      style={{
        height: 74,
        background: p.g,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 34,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 8,
          top: 8,
          background: ORANGE,
          color: "#FFFFFF",
          fontSize: 8.5,
          fontWeight: 900,
          padding: "3px 8px",
          borderRadius: 100,
        }}
      >
        SALE
      </span>
      {p.e}
    </div>
    <div style={{ padding: "9px 11px 11px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
      <div style={{ fontSize: 11.5, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{p.t}</div>
      <div style={{ fontSize: 10, color: "#E8A33D", fontWeight: 800 }}>★★★★★ <span style={{ color: GREY }}>({p.r})</span></div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: "auto" }}>
        <span style={{ fontSize: 17, fontWeight: 900, color: ORANGE }}>{p.p}</span>
        <span style={{ fontSize: 10.5, color: "#B9AEA3", textDecoration: "line-through" }}>{p.o}</span>
      </div>
      <div
        style={{
          marginTop: 6,
          background: ORANGE,
          borderRadius: 7,
          padding: "7px 0",
          textAlign: "center",
          fontSize: 11,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: 0.6,
        }}
      >
        Add to Cart
      </div>
    </div>
  </div>
);

const SiteHeader: React.FC<{ search: string }> = ({ search }) => (
  <div
    style={{
      height: 54,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "0 20px",
      background: "#FFFFFF",
      borderBottom: `1px solid ${BORDER}`,
    }}
  >
    <span style={{ fontSize: 17, fontWeight: 900, color: ORANGE, letterSpacing: -0.4 }}>shopcart</span>
    <div style={{ display: "flex", gap: 16, fontSize: 12.5, fontWeight: 700, color: "#5C554E" }}>
      <span style={{ color: ORANGE, borderBottom: `2px solid ${ORANGE}`, paddingBottom: 3 }}>Home</span>
      <span>All Products</span>
      <span>Deals</span>
    </div>
    <div
      style={{
        flex: 1,
        maxWidth: 330,
        height: 32,
        background: CREAM,
        border: `1px solid ${BORDER}`,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 14px",
        fontSize: 12,
        color: "#A79B90",
      }}
    >
      🔍 {search}
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: 16, position: "relative" }}>
        🛒
        <span
          style={{
            position: "absolute",
            right: -7,
            top: -5,
            background: ORANGE,
            color: "#FFFFFF",
            fontSize: 8,
            fontWeight: 900,
            width: 15,
            height: 15,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          3
        </span>
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 12,
          fontWeight: 800,
          color: "#5C554E",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: ORANGE,
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Z
        </span>
        Zakaria
      </span>
    </div>
  </div>
);

const ProductListPage: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
    <SiteHeader search="Search products..." />
    <div style={{ padding: "14px 18px 16px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 25, fontWeight: 900, color: INK, lineHeight: 1.1 }}>All Products</div>
          <div style={{ fontSize: 11.5, color: GREY, marginTop: 4 }}>Showing 8 of 124 items</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 7,
            border: `1px solid ${BORDER}`,
            background: "#FFFFFF",
            borderRadius: 8,
            padding: "8px 13px",
            fontSize: 11.5,
            fontWeight: 700,
            color: "#5C554E",
          }}
        >
          Sort by: Featured ▾
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 11 }}>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.t} {...p} />
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* product detail                                                      */
/* ------------------------------------------------------------------ */

const DetailPage: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
    <SiteHeader search="Search products..." />
    <div style={{ flex: 1, minHeight: 0, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 11, color: GREY }}>Home › All Products › Headphones</div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", gap: 20 }}>
        {/* gallery */}
        <div style={{ flex: "1 1 44%", display: "flex", flexDirection: "column", gap: 9 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              background: "linear-gradient(140deg,#FFFFFF,#EFEFF4)",
              border: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 92,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 14,
                top: 14,
                background: ORANGE,
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 900,
                padding: "5px 13px",
                borderRadius: 100,
              }}
            >
              -28%
            </span>
            🎧
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 46,
                  borderRadius: 9,
                  background: i === 0 ? "#FFFFFF" : "#F5F5F7",
                  border: i === 0 ? `2px solid ${ORANGE}` : `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                🎧
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div style={{ flex: "1 1 56%", minWidth: 0, display: "flex", flexDirection: "column", gap: 9 }}>
          <span
            style={{
              alignSelf: "flex-start",
              background: "#E9F7EF",
              color: "#1B7F3B",
              fontSize: 10.5,
              fontWeight: 900,
              padding: "5px 13px",
              borderRadius: 100,
              letterSpacing: 0.8,
            }}
          >
            IN STOCK
          </span>
          <div style={{ fontSize: 27, fontWeight: 900, color: INK, lineHeight: 1.15 }}>
            Apple AirPods Pro 2nd Generation
          </div>
          <div style={{ fontSize: 12, color: "#E8A33D", fontWeight: 800 }}>
            ★★★★★ <span style={{ color: GREY, fontWeight: 700 }}>4.8 · 2,341 reviews</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 38, fontWeight: 900, color: ORANGE }}>$129.99</span>
            <span style={{ fontSize: 16, color: "#B9AEA3", textDecoration: "line-through" }}>$179.99</span>
            <span
              style={{
                background: "#FFF0E0",
                color: ORANGE_DARK,
                fontSize: 11.5,
                fontWeight: 900,
                padding: "5px 12px",
                borderRadius: 100,
              }}
            >
              SAVE $50
            </span>
          </div>
          <div style={{ height: 1, background: BORDER }} />
          <div style={{ fontSize: 12.5, lineHeight: 1.65, color: "#5C554E" }}>
            Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio with dynamic head tracking.
            Up to 6 hours of listening time.
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            {["ANC", "Spatial Audio", "Wireless Charging", "IP54"].map((c) => (
              <span
                key={c}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                  color: "#5C554E",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "6px 13px",
                  borderRadius: 100,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${BORDER}`,
                background: "#FFFFFF",
                borderRadius: 9,
                overflow: "hidden",
              }}
            >
              <span style={{ padding: "11px 15px", fontSize: 16, fontWeight: 900, color: GREY }}>−</span>
              <span style={{ padding: "0 6px", fontSize: 15, fontWeight: 900, color: INK }}>1</span>
              <span style={{ padding: "11px 15px", fontSize: 16, fontWeight: 900, color: GREY }}>+</span>
            </div>
            <span
              style={{
                flex: 1,
                background: ORANGE,
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 900,
                color: "#FFFFFF",
                boxShadow: "0 12px 26px rgba(245,130,31,0.32)",
              }}
            >
              🛒 Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* checkout                                                            */
/* ------------------------------------------------------------------ */

const CART = [
  { t: "Apple AirPods Pro 2nd Gen", v: "Qty 1", p: "$129.99", e: "🎧" },
  { t: "Anker 65W USB-C Charger", v: "Qty 1", p: "$45.99", e: "🔌" },
  { t: "Logitech MX Master 3S", v: "Qty 1", p: "$99.99", e: "🖱" },
];

const Input: React.FC<{ v: string; ph?: boolean; flex?: number }> = ({ v, ph, flex = 1 }) => (
  <div
    style={{
      flex,
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF",
      borderRadius: 9,
      padding: "11px 13px",
      fontSize: 13.5,
      color: ph ? "#A79B90" : INK,
      fontWeight: ph ? 500 : 700,
    }}
  >
    {v}
  </div>
);

const CheckoutPage: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
    <SiteHeader search="Search products..." />
    <div style={{ flex: 1, minHeight: 0, padding: "16px 22px", display: "flex", gap: 20 }}>
      {/* form */}
      <div style={{ flex: "1 1 56%", minWidth: 0, display: "flex", flexDirection: "column", gap: 11 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: INK, lineHeight: 1 }}>Checkout</div>
        <div style={{ fontSize: 12.5, color: GREY }}>Step 1 of 3 — Shipping & Payment</div>

        <div style={{ fontSize: 13, fontWeight: 900, color: INK, letterSpacing: 0.6 }}>CONTACT</div>
        <Input v="zakaria.hizzi@gmail.com" />

        <div style={{ fontSize: 13, fontWeight: 900, color: INK, letterSpacing: 0.6, marginTop: 3 }}>
          SHIPPING ADDRESS
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Input v="Zakaria" />
          <Input v="Hizzi" />
        </div>
        <Input v="1247 Innovation Street, Apt 8B" />
        <div style={{ display: "flex", gap: 10 }}>
          <Input v="San Francisco" />
          <Input v="94107" flex={0.6} />
          <Input v="United States ▾" flex={0.9} />
        </div>

        <div style={{ fontSize: 13, fontWeight: 900, color: INK, letterSpacing: 0.6, marginTop: 3 }}>
          PAYMENT INFORMATION
        </div>
        <div
          style={{
            border: `2px solid ${ORANGE}`,
            background: "#FFFFFF",
            borderRadius: 11,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 10px 24px rgba(245,130,31,0.10)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 34,
                height: 22,
                borderRadius: 4,
                background: "linear-gradient(135deg,#1A1F71,#3D4CA8)",
                color: "#FFFFFF",
                fontSize: 8,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              VISA
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: INK, letterSpacing: 1.6 }}>
              4242 4242 4242 4242
            </span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: GREY }}>09 / 28</span>
            <span style={{ fontSize: 13, color: GREY }}>•••</span>
          </div>
          <div style={{ height: 1, background: BORDER }} />
          <div style={{ display: "flex", gap: 10 }}>
            <Input v="Zakaria Hizzi" />
            <Input v="ZIP 94107" flex={0.6} />
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            background: ORANGE,
            borderRadius: 10,
            padding: "14px 0",
            textAlign: "center",
            fontSize: 16,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: 0.8,
            boxShadow: "0 16px 34px rgba(245,130,31,0.32)",
          }}
        >
          Pay $421.17
        </div>
      </div>

      {/* summary */}
      <div
        style={{
          flex: "1 1 44%",
          alignSelf: "flex-start",
          background: "#FFFFFF",
          border: `1px solid ${BORDER}`,
          borderRadius: 14,
          padding: "16px 18px",
          boxShadow: "0 22px 50px rgba(80,50,20,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        <div style={{ fontSize: 17, fontWeight: 900, color: INK }}>Order Summary</div>
        {CART.map((c) => (
          <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span
              style={{
                width: 42,
                height: 42,
                borderRadius: 9,
                background: "#F5F5F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                position: "relative",
              }}
            >
              {c.e}
              <span
                style={{
                  position: "absolute",
                  right: -6,
                  top: -6,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: ORANGE,
                  color: "#FFFFFF",
                  fontSize: 9.5,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1
              </span>
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 12.5, fontWeight: 800, color: INK }}>{c.t}</span>
              <span style={{ display: "block", fontSize: 11, color: GREY, marginTop: 2 }}>{c.v}</span>
            </span>
            <span style={{ marginLeft: "auto", fontSize: 13.5, fontWeight: 900, color: INK }}>{c.p}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 9 }}>
          <div
            style={{
              flex: 1,
              border: `1px solid ${BORDER}`,
              background: CREAM,
              borderRadius: 9,
              padding: "10px 12px",
              fontSize: 12.5,
              color: "#A79B90",
            }}
          >
            Discount code
          </div>
          <span
            style={{
              background: INK,
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 900,
              padding: "10px 18px",
              borderRadius: 9,
            }}
          >
            Apply
          </span>
        </div>
        <div style={{ height: 1, background: BORDER }} />
        {[
          ["Subtotal", "$278.97"],
          ["Shipping", "$12.00"],
          ["Tax", "$25.20"],
          ["Free Shipping Promo", "−$8.00"],
        ].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: GREY, fontWeight: 600 }}>
            <span>{l}</span>
            <span style={{ color: l.startsWith("Free") ? "#1B7F3B" : GREY, fontWeight: 800 }}>{v}</span>
          </div>
        ))}
        <div style={{ height: 1, background: BORDER }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: INK }}>Total</span>
          <span style={{ fontSize: 30, fontWeight: 900, color: ORANGE }}>$421.17</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 10.5, color: GREY, fontWeight: 700 }}>
          <span>🔒 Secure checkout</span>
          <span>↩ 30-day returns</span>
          <span>🚚 2-day delivery</span>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* home                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { t: "Phones", e: "📱" },
  { t: "Laptops", e: "💻" },
  { t: "Audio", e: "🎧" },
  { t: "Wearables", e: "⌚" },
  { t: "Gaming", e: "🎮" },
];

const HomePage: React.FC = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
    <SiteHeader search="Search for anything..." />
    <div style={{ flex: 1, minHeight: 0, padding: "14px 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* hero */}
      <div
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          borderRadius: 16,
          background: "linear-gradient(115deg,#F5821F 0%,#FF9E42 55%,#FFB868 100%)",
          padding: "20px 26px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -70,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.14)",
          }}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
          <span
            style={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.94)",
              color: ORANGE_DARK,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 1.6,
              padding: "6px 15px",
              borderRadius: 100,
            }}
          >
            MEGA SALE · UP TO 40% OFF
          </span>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.06, letterSpacing: -0.6 }}>
            Next-Gen Tech,
            <br />
            Everyday Prices.
          </div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.94)", fontWeight: 600 }}>
            Shop the newest Apple, Sony and Samsung gear — free shipping on every order.
          </div>
          <div style={{ display: "flex", gap: 11 }}>
            <span
              style={{
                background: "#FFFFFF",
                color: ORANGE_DARK,
                fontSize: 14,
                fontWeight: 900,
                padding: "13px 28px",
                borderRadius: 100,
                boxShadow: "0 14px 30px rgba(120,60,10,0.24)",
              }}
            >
              Shop Now →
            </span>
            <span
              style={{
                border: "2px solid rgba(255,255,255,0.9)",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 900,
                padding: "12px 26px",
                borderRadius: 100,
              }}
            >
              View Deals
            </span>
          </div>
        </div>
        <div
          style={{
            flex: "0 0 240px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 14,
              right: 8,
              background: "#FFFFFF",
              color: ORANGE_DARK,
              fontSize: 15,
              fontWeight: 900,
              padding: "8px 16px",
              borderRadius: 100,
              transform: "rotate(8deg)",
              boxShadow: "0 12px 26px rgba(120,60,10,0.24)",
            }}
          >
            $129.99
          </span>
          🎧
        </div>
      </div>

      {/* categories */}
      <div style={{ display: "flex", gap: 11 }}>
        {CATEGORIES.map((c) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              background: "#FFFFFF",
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 8px 20px rgba(80,50,20,0.05)",
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#FFF3E7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 19,
              }}
            >
              {c.e}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: INK }}>{c.t}</span>
          </div>
        ))}
      </div>

      {/* featured row */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 17, fontWeight: 900, color: INK }}>Featured Today</span>
        <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 800, color: ORANGE }}>See all →</span>
      </div>
      <div style={{ display: "flex", gap: 11 }}>
        {PRODUCTS.slice(0, 4).map((p) => (
          <div
            key={p.t}
            style={{
              flex: 1,
              minWidth: 0,
              background: "#FFFFFF",
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "9px 11px 11px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 8px 20px rgba(80,50,20,0.05)",
            }}
          >
            <span
              style={{
                width: 46,
                height: 46,
                borderRadius: 9,
                background: p.g,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {p.e}
            </span>
            <span style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "block",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: INK,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.t}
              </span>
              <span style={{ display: "block", fontSize: 15, fontWeight: 900, color: ORANGE, marginTop: 3 }}>
                {p.p}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* cover                                                               */
/* ------------------------------------------------------------------ */

const cardProps = {
  dot: ORANGE,
  barBg: "#2A1F14",
  labelColor: "#FFD9AE",
  bodyBg: "#FFFFFF",
  border: `1px solid ${BORDER}`,
};

export const EcommerceCover: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FONT, background: CREAM, overflow: "hidden", direction: "ltr" }}>
    {/* header */}
    <div
      style={{
        height: 112,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "0 56px",
        background: "#FFFFFF",
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <span
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `linear-gradient(135deg,${ORANGE},#FFB05C)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          boxShadow: "0 14px 30px rgba(245,130,31,0.34)",
        }}
      >
        🛒
      </span>
      <span style={{ fontSize: 36, fontWeight: 900, color: ORANGE, letterSpacing: -1 }}>shopcart</span>

      <div style={{ display: "flex", gap: 30, marginLeft: 36, fontSize: 21, fontWeight: 700, color: "#5C554E" }}>
        <span style={{ color: ORANGE, borderBottom: `3px solid ${ORANGE}`, paddingBottom: 5 }}>Home</span>
        <span>All Products</span>
        <span>Deals</span>
        <span>Support</span>
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <span
          style={{
            width: 300,
            height: 46,
            background: CREAM,
            border: `1px solid ${BORDER}`,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 20px",
            fontSize: 17,
            color: "#A79B90",
          }}
        >
          🔍 Search products…
        </span>
        <span style={{ fontSize: 26, position: "relative" }}>
          🛒
          <span
            style={{
              position: "absolute",
              right: -9,
              top: -7,
              background: ORANGE,
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 900,
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 19, fontWeight: 800, color: "#5C554E" }}>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: ORANGE,
              color: "#FFFFFF",
              fontSize: 19,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Z
          </span>
          Zakaria
        </span>
      </div>
    </div>

    <CoverGrid
      background={CREAM}
      left={[
        <PageCard key="list" label="PRODUCT LIST" {...cardProps}>
          <ProductListPage />
        </PageCard>,
        <PageCard key="detail" label="PRODUCT DETAIL" {...cardProps}>
          <DetailPage />
        </PageCard>,
      ]}
      right={[
        <PageCard key="checkout" label="CHECKOUT" {...cardProps}>
          <CheckoutPage />
        </PageCard>,
        <PageCard key="home" label="HOME" {...cardProps}>
          <HomePage />
        </PageCard>,
      ]}
    />

    <FrameStrip
      background={CREAM}
      borderTop={`1px solid ${BORDER}`}
      dot={ORANGE}
      label="REEL FRAMES"
      labelColor={ORANGE}
      sublabel="shopcart — straight from the walkthrough"
      sublabelColor={GREY}
      border={`1.5px solid ${BORDER}`}
      shadow="0 16px 34px rgba(42,31,20,0.14)"
      images={Array.from({ length: 10 }, (_, i) => `stills/ecommerce-${i + 1}.jpg`)}
    />

    <BottomBar
      background="#2A1F14"
      borderTop={`2px solid ${ORANGE}`}
      dot={ORANGE}
      label="FREE SHIPPING:"
      labelColor="#FFB05C"
      text="On every order • 30-day returns • Secure checkout"
      textColor="#F5EDE3"
      pillBg="linear-gradient(90deg,#F5821F,#FFA94D)"
      pillColor="#2A1F14"
      pillText="Shop Now →"
    />
  </AbsoluteFill>
);
