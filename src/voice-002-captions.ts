// Word-level timing for public/voice/voice-002.m4a (65.04s)
// Source: scripts/voice-002-transcript.json (Whisper) — cleaned:
// - fixed Arabic typos to match on-screen text
// - merged split Latin words (CSS, HTML, JavaScript)
// - fixed broken tail timestamps (were going backwards past 62s)
// Times are in SECONDS, matching the human recording.

export type VoiceWord = {
  text: string;
  start: number;
  end: number;
  scene: string;
};

export const VOICE_002_DURATION = 65.04;

export const VOICE_002_WORDS: VoiceWord[] = [
  // 0 — Hook (0.0 - 6.1s)
  { text: "تحلم", start: 0.0, end: 1.44, scene: "hook" },
  { text: "تصبح", start: 1.44, end: 2.06, scene: "hook" },
  { text: "مبرمج", start: 2.06, end: 2.98, scene: "hook" },
  { text: "محترف؟", start: 2.98, end: 4.12, scene: "hook" },
  { text: "من", start: 4.12, end: 4.38, scene: "hook" },
  { text: "الصفر", start: 4.38, end: 4.94, scene: "hook" },
  { text: "للاحتراف!", start: 4.94, end: 6.08, scene: "hook" },

  // 1 — Stack (6.6 - 16.2s)
  { text: "ثلاث", start: 6.68, end: 7.2, scene: "stack" },
  { text: "لغات", start: 7.2, end: 7.7, scene: "stack" },
  { text: "تصنع", start: 7.7, end: 8.18, scene: "stack" },
  { text: "مستقبلك", start: 8.18, end: 9.28, scene: "stack" },
  { text: "HTML", start: 9.62, end: 10.46, scene: "stack" },
  { text: "للهيكل", start: 10.46, end: 11.54, scene: "stack" },
  { text: "CSS", start: 11.54, end: 12.68, scene: "stack" },
  { text: "للتصميم", start: 12.68, end: 13.58, scene: "stack" },
  { text: "و", start: 13.58, end: 14.38, scene: "stack" },
  { text: "جافاسكريبت", start: 14.38, end: 15.28, scene: "stack" },
  { text: "للتفاعل", start: 15.28, end: 16.14, scene: "stack" },

  // 2 — Laptop (19.0 - 25.5s)
  { text: "شاهد", start: 18.98, end: 19.86, scene: "laptop" },
  { text: "طبّق", start: 19.86, end: 20.92, scene: "laptop" },
  { text: "ابنِ", start: 20.92, end: 21.7, scene: "laptop" },
  { text: "شرح", start: 22.2, end: 22.54, scene: "laptop" },
  { text: "مبسّط", start: 22.54, end: 23.3, scene: "laptop" },
  { text: "من", start: 23.3, end: 23.7, scene: "laptop" },
  { text: "الصفر", start: 23.7, end: 24.62, scene: "laptop" },
  { text: "للمبتدئين", start: 24.62, end: 25.42, scene: "laptop" },

  // 3 — Projects (26.4 - 33.3s)
  { text: "ابنِ", start: 26.42, end: 26.92, scene: "projects" },
  { text: "خمس", start: 26.92, end: 27.34, scene: "projects" },
  { text: "مشاريع", start: 27.34, end: 27.96, scene: "projects" },
  { text: "بنفسك", start: 27.96, end: 28.72, scene: "projects" },
  { text: "متجر", start: 29.02, end: 29.38, scene: "projects" },
  { text: "إلكتروني", start: 29.38, end: 30.36, scene: "projects" },
  { text: "موقع", start: 30.36, end: 31.1, scene: "projects" },
  { text: "شخصي", start: 31.1, end: 31.8, scene: "projects" },
  { text: "تطبيق", start: 31.8, end: 32.68, scene: "projects" },
  { text: "مهام", start: 32.68, end: 33.22, scene: "projects" },

  // 4 — Exercises (34.2 - 41.1s)
  { text: "تمارين", start: 34.18, end: 34.9, scene: "exercises" },
  { text: "وتطبيقات", start: 34.9, end: 36.0, scene: "exercises" },
  { text: "بعد", start: 36.0, end: 36.98, scene: "exercises" },
  { text: "كل", start: 36.98, end: 37.38, scene: "exercises" },
  { text: "درس", start: 37.38, end: 38.14, scene: "exercises" },
  { text: "تتعلّم", start: 38.36, end: 38.88, scene: "exercises" },
  { text: "بالممارسة", start: 38.88, end: 40.02, scene: "exercises" },
  { text: "ليس", start: 40.02, end: 40.48, scene: "exercises" },
  { text: "بالحفظ", start: 40.48, end: 41.1, scene: "exercises" },

  // 5 — Certificate (42.5 - 47.6s)
  { text: "شهادة", start: 42.48, end: 43.08, scene: "certificate" },
  { text: "إتمام", start: 43.08, end: 43.74, scene: "certificate" },
  { text: "ومعرض", start: 43.74, end: 44.54, scene: "certificate" },
  { text: "أعمال", start: 44.54, end: 45.24, scene: "certificate" },
  { text: "يقوّي", start: 45.24, end: 45.94, scene: "certificate" },
  { text: "سيرتك", start: 45.94, end: 46.7, scene: "certificate" },
  { text: "الذاتية", start: 46.7, end: 47.54, scene: "certificate" },

  // 6 — Support (48.8 - 55.2s)
  { text: "اسأل", start: 48.82, end: 49.28, scene: "support" },
  { text: "في", start: 49.28, end: 49.44, scene: "support" },
  { text: "أي", start: 49.44, end: 50.26, scene: "support" },
  { text: "وقت", start: 50.26, end: 50.74, scene: "support" },
  { text: "فريق", start: 51.14, end: 52.22, scene: "support" },
  { text: "ومجتمع", start: 52.22, end: 53.42, scene: "support" },
  { text: "يجاوبك", start: 53.42, end: 54.42, scene: "support" },
  { text: "بسرعة", start: 54.42, end: 55.14, scene: "support" },

  // 7 — CTA (56.3 - 64.8s) — tail timestamps repaired
  { text: "ابدأ", start: 56.32, end: 57.02, scene: "cta" },
  { text: "رحلتك", start: 57.02, end: 57.66, scene: "cta" },
  { text: "اليوم", start: 57.66, end: 58.04, scene: "cta" },
  { text: "مجاناً", start: 58.04, end: 58.9, scene: "cta" },
  { text: "تابعنا", start: 59.22, end: 59.94, scene: "cta" },
  { text: "لتتعلّم", start: 59.94, end: 62.12, scene: "cta" },
  { text: "من", start: 62.12, end: 62.7, scene: "cta" },
  { text: "الصفر", start: 62.7, end: 63.3, scene: "cta" },
  { text: "إلى", start: 63.3, end: 63.7, scene: "cta" },
  { text: "الاحتراف", start: 63.7, end: 64.8, scene: "cta" },
];

// Scene boundaries (seconds) derived from the word timings above,
// with small padding so each visual appears just before its voice starts.
export const VOICE_002_SCENES = [
  { id: "hook", start: 0, end: 6.5 },
  { id: "stack", start: 6.5, end: 17.0 },
  { id: "laptop", start: 17.0, end: 26.0 },
  { id: "projects", start: 26.0, end: 34.0 },
  { id: "exercises", start: 34.0, end: 41.8 },
  { id: "certificate", start: 41.8, end: 48.3 },
  { id: "support", start: 48.3, end: 55.8 },
  { id: "cta", start: 55.8, end: 66.0 },
] as const;
