import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { MONO } from "../vscode/theme";

/**
 * "Shots" cover: site header + title band + a grid of real page captures +
 * bottom bar. Geometry is tuned so a 3-column, 3-row body is ~502x236 per
 * card — almost exactly the 2.13 aspect of the browser screenshots, so the
 * captures are shown uncropped.
 */

export type ShotCell =
  | {
      kind: "shot";
      src: string;
      label: string;
      pos?: string;
      zoom?: number;
    }
  | {
      kind: "tile";
      eyebrow: string;
      title: string;
      lines: string[];
    };

export type ShotsTheme = {
  font: string;
  pageBg: string;
  columns: 2 | 3;
  header: {
    height?: number;
    bg: string;
    border: string;
    logo: React.ReactNode;
    brand: string;
    brandColor: string;
    brandSize: number;
    brandLetterSpacing?: number;
    tagline: string;
    taglineColor: string;
    nav: { t: string; active?: boolean }[];
    navColor: string;
    navActiveColor: string;
    navActiveBg: string;
    actions: React.ReactNode;
  };
  band: {
    height: number;
    bg: string;
    borderBottom: string;
    dot: string;
    eyebrow: string;
    eyebrowColor: string;
    title: React.ReactNode;
    titleSize?: number;
    desc: string;
    descColor: string;
    descSize?: number;
    chips?: string[];
    stats: { k: string; v: string }[];
    statKeyColor: string;
    statLabelColor: string;
    statPanelBg: string;
    statPanelBorder: string;
  };
  card: {
    bg: string;
    border: string;
    shadow: string;
    chipBg: string;
    chipBorder: string;
    dot: string;
    labelColor: string;
  };
  tile: {
    bg: string;
    border: string;
    shadow: string;
    eyebrowColor: string;
    titleColor: string;
    bodyColor: string;
    dot: string;
  };
  footer: {
    bg: string;
    borderTop: string;
    dot: string;
    label: string;
    labelColor: string;
    text: string;
    textColor: string;
    tech: string;
    techColor: string;
    pillBg: string;
    pillColor: string;
    pillText: string;
  };
  cells: ShotCell[];
};

const GAP = 16;

const ShotCard: React.FC<{ cell: Extract<ShotCell, { kind: "shot" }>; theme: ShotsTheme }> = ({
  cell,
  theme,
}) => (
  <div
    style={{
      position: "relative",
      flex: `0 0 calc((100% - ${GAP * (theme.columns - 1)}px) / ${theme.columns})`,
      minWidth: 0,
      borderRadius: 14,
      overflow: "hidden",
      background: theme.card.bg,
      border: theme.card.border,
      boxShadow: theme.card.shadow,
    }}
  >
    <Img
      src={staticFile(cell.src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: cell.pos ?? "top center",
        transform: cell.zoom ? `scale(${cell.zoom})` : undefined,
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
        background: theme.card.chipBg,
        border: theme.card.chipBorder,
        borderRadius: 6,
        padding: "5px 10px",
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: theme.card.dot }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.7,
          color: theme.card.labelColor,
        }}
      >
        {cell.label}
      </span>
    </div>
  </div>
);

const Tile: React.FC<{ cell: Extract<ShotCell, { kind: "tile" }>; theme: ShotsTheme }> = ({
  cell,
  theme,
}) => (
  <div
    style={{
      flex: `0 0 calc((100% - ${GAP * (theme.columns - 1)}px) / ${theme.columns})`,
      minWidth: 0,
      borderRadius: 14,
      overflow: "hidden",
      background: theme.tile.bg,
      border: theme.tile.border,
      boxShadow: theme.tile.shadow,
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: theme.tile.dot,
          boxShadow: `0 0 14px ${theme.tile.dot}`,
        }}
      />
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 2.2,
          color: theme.tile.eyebrowColor,
        }}
      >
        {cell.eyebrow}
      </span>
    </div>

    <div
      style={{
        fontSize: 25,
        fontWeight: 900,
        letterSpacing: 0.4,
        lineHeight: 1.1,
        color: theme.tile.titleColor,
        marginTop: 14,
      }}
    >
      {cell.title}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 14 }}>
      {cell.lines.map((line) => (
        <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: theme.tile.dot,
              marginTop: 7,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, lineHeight: 1.45, fontWeight: 600, color: theme.tile.bodyColor }}>
            {line}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const chunk = <T,>(items: T[], size: number): T[][] => {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
};

export const ShotsCover: React.FC<{ theme: ShotsTheme }> = ({ theme }) => {
  const rows = chunk(theme.cells, theme.columns);

  return (
    <AbsoluteFill
      style={{ fontFamily: theme.font, background: theme.pageBg, overflow: "hidden", direction: "ltr" }}
    >
      {/* site header */}
      <div
        style={{
          height: theme.header.height ?? 104,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 30,
          padding: "0 40px",
          background: theme.header.bg,
          borderBottom: theme.header.border,
        }}
      >
        {theme.header.logo}
        <div>
          <div
            style={{
              fontSize: theme.header.brandSize,
              fontWeight: 900,
              letterSpacing: theme.header.brandLetterSpacing ?? 0,
              color: theme.header.brandColor,
              lineHeight: 1.05,
            }}
          >
            {theme.header.brand}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 2.2,
              color: theme.header.taglineColor,
              fontWeight: 800,
              marginTop: 6,
            }}
          >
            {theme.header.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 30 }}>
          {theme.header.nav.map((n) => (
            <div
              key={n.t}
              style={{
                padding: "10px 20px",
                borderRadius: 9,
                fontSize: 19,
                fontWeight: 600,
                color: n.active ? theme.header.navActiveColor : theme.header.navColor,
                background: n.active ? theme.header.navActiveBg : "transparent",
                whiteSpace: "nowrap",
              }}
            >
              {n.t}
            </div>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          {theme.header.actions}
        </div>
      </div>

      {/* cover title band */}
      <div
        style={{
          height: theme.band.height,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 44,
          padding: "0 40px",
          background: theme.band.bg,
          borderBottom: theme.band.borderBottom,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: theme.band.dot,
                boxShadow: `0 0 14px ${theme.band.dot}`,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 12.5,
                fontWeight: 800,
                letterSpacing: 2.6,
                color: theme.band.eyebrowColor,
              }}
            >
              {theme.band.eyebrow}
            </span>
          </div>
          <div
            style={{
              fontSize: theme.band.titleSize ?? 48,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: 0.4,
              color: "#FFFFFF",
              marginTop: 12,
            }}
          >
            {theme.band.title}
          </div>
          <div
            style={{
              fontSize: theme.band.descSize ?? 16,
              lineHeight: 1.55,
              color: theme.band.descColor,
              marginTop: 10,
              maxWidth: 920,
            }}
          >
            {theme.band.desc}
          </div>
          {theme.band.chips ? (
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              {theme.band.chips.map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: theme.band.eyebrowColor,
                    background: theme.band.statPanelBg,
                    border: theme.band.statPanelBorder,
                    padding: "8px 16px",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          {theme.band.stats.map((s) => (
            <div
              key={s.v}
              style={{
                width: 142,
                padding: "14px 16px",
                borderRadius: 12,
                background: theme.band.statPanelBg,
                border: theme.band.statPanelBorder,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: theme.band.statKeyColor,
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
                  color: theme.band.statLabelColor,
                  marginTop: 7,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* real screenshots */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: GAP,
          padding: "18px 30px",
          minHeight: 0,
        }}
      >
        {rows.map((row, i) => (
          <div
            key={i}
            style={{ flex: 1, display: "flex", gap: GAP, minHeight: 0, justifyContent: "center" }}
          >
            {row.map((cell) =>
              cell.kind === "tile" ? (
                <Tile key={cell.title} cell={cell} theme={theme} />
              ) : (
                <ShotCard key={cell.src} cell={cell} theme={theme} />
              ),
            )}
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
          background: theme.footer.bg,
          borderTop: theme.footer.borderTop,
        }}
      >
        <span
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: theme.footer.dot,
            boxShadow: `0 0 18px ${theme.footer.dot}`,
          }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontSize: 17,
            fontWeight: 900,
            letterSpacing: 2.4,
            color: theme.footer.labelColor,
            whiteSpace: "nowrap",
          }}
        >
          {theme.footer.label}
        </span>
        <span style={{ fontSize: 22, fontWeight: 700, color: theme.footer.textColor }}>
          {theme.footer.text}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: MONO,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1.4,
            color: theme.footer.techColor,
            whiteSpace: "nowrap",
          }}
        >
          {theme.footer.tech}
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: theme.footer.pillColor,
            background: theme.footer.pillBg,
            padding: "12px 28px",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          {theme.footer.pillText}
        </span>
      </div>
    </AbsoluteFill>
  );
};
