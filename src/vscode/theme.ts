import { Easing, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cairo";

const { fontFamily } = loadFont("normal", {
  // Cairo is a variable font: declaring the full 200–900 range keeps every
  // intermediate font-weight value rendering distinctly (font-weight slider).
  weights: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});

export const W = 1080;
export const H = 1920;

export const FONT = `${fontFamily}, 'Segoe UI', Tahoma, Arial, sans-serif`;
export const MONO = "'Cascadia Mono','Consolas','Courier New',monospace";

export const COLORS = {
  bgDeep: "#0A1130",
  bg: "#1E3A8A",
  bgPurple: "#3B1D86",
  gold: "#FFD700",
  green: "#00FF00",
  orange: "#FF6B35",
  blue: "#3B82F6",
  purple: "#A855F7",
  cyan: "#22D3EE",
  white: "#FFFFFF",
};

export const pop = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 150 } });

export const fadeUp = (frame: number, start: number, end: number, distance = 70) => {
  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame, [start, end], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, translate: `0px ${y}px` };
};

export const fadeIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

/** Deterministic pseudo random in [0, 1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
