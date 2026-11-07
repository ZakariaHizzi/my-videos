import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0A1040"/>
      <stop offset="0.30" stop-color="#4C1D95"/>
      <stop offset="0.58" stop-color="#DB2777"/>
      <stop offset="0.82" stop-color="#FB923C"/>
      <stop offset="1" stop-color="#FDE68A"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0" stop-color="#FFF7ED" stop-opacity="0.95"/>
      <stop offset="0.45" stop-color="#FDBA74" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FB923C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FBBF24"/>
      <stop offset="0.22" stop-color="#7C3AED"/>
      <stop offset="0.7" stop-color="#1E3A8A"/>
      <stop offset="1" stop-color="#0B1020"/>
    </linearGradient>
    <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6D28D9"/>
      <stop offset="1" stop-color="#4C1D95"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="640" fill="url(#sky)"/>

  <g fill="#FFFFFF" opacity="0.85">
    <circle cx="180" cy="70" r="2.6"/><circle cx="420" cy="120" r="2"/>
    <circle cx="760" cy="52" r="2.4"/><circle cx="1180" cy="96" r="2"/>
    <circle cx="1420" cy="46" r="2.6"/><circle cx="980" cy="140" r="1.8"/>
    <circle cx="260" cy="190" r="1.8"/><circle cx="1320" cy="180" r="2.2"/>
  </g>

  <circle cx="800" cy="566" r="330" fill="url(#glow)"/>
  <circle cx="800" cy="566" r="104" fill="#FFF7ED"/>
  <circle cx="800" cy="566" r="132" fill="#FDE68A" opacity="0.35"/>

  <path d="M0 640 L150 470 L280 560 L420 430 L560 640 Z" fill="url(#far)" opacity="0.75"/>
  <path d="M330 640 L540 400 L720 560 L830 470 L960 640 Z" fill="#5B21B6" opacity="0.9"/>
  <path d="M760 640 L980 448 L1140 580 L1280 452 L1460 640 Z" fill="url(#far)" opacity="0.8"/>
  <path d="M1240 640 L1440 486 L1600 610 L1600 640 Z" fill="#5B21B6" opacity="0.85"/>
  <path d="M0 640 L200 546 L400 626 L620 540 L860 632 L1100 552 L1360 634 L1600 566 L1600 646 L0 646 Z" fill="#2E1065"/>

  <rect y="646" width="1600" height="354" fill="url(#lake)"/>
  <ellipse cx="800" cy="662" rx="150" ry="20" fill="#FDE68A" opacity="0.55"/>
  <g fill="#FFE9A8">
    <rect x="740" y="678" width="120" height="7" rx="3.5" opacity="0.55"/>
    <rect x="712" y="700" width="176" height="7" rx="3.5" opacity="0.42"/>
    <rect x="684" y="724" width="232" height="7" rx="3.5" opacity="0.32"/>
    <rect x="726" y="752" width="148" height="7" rx="3.5" opacity="0.22"/>
    <rect x="700" y="784" width="200" height="7" rx="3.5" opacity="0.14"/>
  </g>
  <path d="M0 700 Q400 668 800 704 T1600 700" stroke="#C4B5FD" stroke-width="3" fill="none" opacity="0.35"/>
  <path d="M0 780 Q420 748 820 786 T1600 776" stroke="#93C5FD" stroke-width="3" fill="none" opacity="0.25"/>
  <path d="M0 880 Q380 850 760 888 T1600 872" stroke="#A5B4FC" stroke-width="3" fill="none" opacity="0.18"/>

  <g stroke="#1F1147" stroke-width="5" fill="none" stroke-linecap="round">
    <path d="M420 176 q16 -14 32 0 q16 -14 32 0"/>
    <path d="M540 232 q13 -11 26 0 q13 -11 26 0"/>
    <path d="M1092 208 q15 -13 30 0 q15 -13 30 0"/>
  </g>

  <path d="M0 940 Q260 892 520 946 Q780 1000 1040 942 Q1320 884 1600 950 L1600 1000 L0 1000 Z" fill="#0B1020"/>
  <g fill="#05070F">
    <circle cx="120" cy="948" r="34"/><circle cx="200" cy="962" r="26"/><circle cx="60" cy="964" r="28"/>
    <circle cx="1480" cy="944" r="36"/><circle cx="1400" cy="962" r="26"/><circle cx="1552" cy="964" r="30"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 92, chromaSubsampling: "4:4:4" }).toFile("public/bg.jpg");
console.log("public/bg.jpg written");
