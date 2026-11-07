import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { MONO } from "./theme";

export const VscodeLogo: React.FC<{ size?: number; style?: CSSProperties }> = ({
  size = 200,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ display: "block", ...style }}
  >
    <path
      fill="#22A0F0"
      d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z"
    />
    <path
      fill="#0B1536"
      d="M18.004 7.05 10.826 12l7.178 4.95V7.05z"
      opacity="0.35"
    />
  </svg>
);

const activityIcons = ["◫", "⌕", "⑂", "⌾", "▷"];

/** VS Code editor window mock (dark theme, colorful code). */
export const VscodeWindow: React.FC<{
  width: number;
  tab?: string;
  language?: string;
  children?: ReactNode;
  style?: CSSProperties;
  showStatus?: boolean;
  activityBar?: boolean;
}> = ({ width, tab = "index.html", language = "HTML", children, style, showStatus = true, activityBar = true }) => (
  <div
    style={{
      width,
      borderRadius: 26,
      background: "#14182E",
      border: "2px solid rgba(96,165,250,0.45)",
      boxShadow:
        "0 34px 90px rgba(0,0,0,0.6), 0 0 70px rgba(59,130,246,0.35)",
      overflow: "hidden",
      direction: "ltr",
      ...style,
    }}
  >
    {/* title bar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 24px",
        background: "linear-gradient(90deg,#1B2140,#232A52)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FF5F57" }} />
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FEBC2E" }} />
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#28C840" }} />
      <div
        style={{
          marginLeft: 14,
          padding: "8px 22px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.85)",
          fontFamily: MONO,
          fontSize: 26,
        }}
      >
        {tab}
      </div>
      {width >= 700 ? (
        <div
          style={{
            marginLeft: "auto",
            color: "rgba(255,255,255,0.5)",
            fontFamily: MONO,
            fontSize: 24,
            whiteSpace: "nowrap",
          }}
        >
          Visual Studio Code
        </div>
      ) : null}
    </div>
    <div style={{ display: "flex", minHeight: 120 }}>
      {/* activity bar */}
      {activityBar ? (
        <div
          style={{
            width: 76,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            background: "#10142A",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {activityIcons.map((g, i) => (
            <div
              key={i}
              style={{
                fontSize: 30,
                color: i === 0 ? "#7DD3FC" : "rgba(255,255,255,0.42)",
              }}
            >
              {g}
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ flex: 1, padding: "24px 26px", overflow: "hidden" }}>{children}</div>
    </div>
    {showStatus ? (
      <div
        style={{
          height: 36,
          background: "linear-gradient(90deg,#0B63C5,#2563EB)",
          display: "flex",
          alignItems: "center",
          gap: 26,
          padding: "0 20px",
          color: "#fff",
          fontFamily: MONO,
          fontSize: 20,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span>◀ main</span>
        <span>Ln 4, Col 12</span>
        <span>UTF-8</span>
        <span style={{ marginLeft: "auto" }}>{"{}"} {language}</span>
      </div>
    ) : null}
  </div>
);

/** Browser window mock with a white page canvas. */
export const BrowserMock: React.FC<{
  width: number;
  url?: string;
  children?: ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}> = ({ width, url = "localhost:5500", children, style, bodyStyle }) => (
  <div
    style={{
      width,
      borderRadius: 26,
      background: "#F8FAFC",
      border: "2px solid rgba(255,255,255,0.65)",
      boxShadow: "0 34px 90px rgba(0,0,0,0.55), 0 0 60px rgba(255,215,0,0.18)",
      overflow: "hidden",
      direction: "ltr",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 20px",
        background: "#E2E8F0",
        borderBottom: "1px solid #CBD5E1",
      }}
    >
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5F57" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FEBC2E" }} />
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#28C840" }} />
      <div
        style={{
          flex: 1,
          marginLeft: 8,
          padding: "8px 18px",
          borderRadius: 100,
          background: "#fff",
          color: "#334155",
          fontFamily: MONO,
          fontSize: 22,
          textAlign: "left",
        }}
      >
        🔒 {url}
      </div>
    </div>
    <div
      style={{
        minHeight: 160,
        padding: 26,
        color: "#0F172A",
        textAlign: "right",
        direction: "rtl",
        ...bodyStyle,
      }}
    >
      {children}
    </div>
  </div>
);
