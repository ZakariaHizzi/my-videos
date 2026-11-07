// Word-level timing for public/voice/my voice 1.mp3 (38.43s)
// Source: scripts/my-voice-1-transcript.json (Whisper) — cleaned:
// - fixed ASR typos to match on-screen text (Gavacript→جافاسكريبت, مدجر→متجر,
//   وطبيق→وتطبيق, مكتمع→مجتمع, ينابك→يجاوبك, سرتك→سيرتك, إبدأ→ابدأ,
//   إضغط→اض壓, فالوز→فولو, تمرين→تمارين)
// Times are in SECONDS, matching the human recording.

export type VoiceWord = {
  text: string;
  start: number;
  end: number;
  scene: string;
};

export const VOICE_1_DURATION = 38.43;

export const VOICE_1_WORDS: VoiceWord[] = [
  // 0 — Hook (0.0 - 4.0s)
  { text: "تحلم", start: 0.0, end: 0.42, scene: "hook" },
  { text: "تصبح", start: 0.42, end: 0.8, scene: "hook" },
  { text: "مبرمج", start: 0.8, end: 1.28, scene: "hook" },
  { text: "محترف؟", start: 1.28, end: 2.16, scene: "hook" },
  { text: "من", start: 2.24, end: 2.44, scene: "hook" },
  { text: "الصفر", start: 2.44, end: 2.94, scene: "hook" },
  { text: "للاحتراف", start: 2.94, end: 3.72, scene: "hook" },

  // 1 — Stack (4.14 - 9.8s)
  { text: "HTML", start: 4.14, end: 4.74, scene: "stack" },
  { text: "للهيكل", start: 4.74, end: 5.8, scene: "stack" },
  { text: "CSS", start: 6.18, end: 6.68, scene: "stack" },
  { text: "للأناقة", start: 6.68, end: 7.84, scene: "stack" },
  { text: "جافاسكريبت", start: 8.04, end: 8.78, scene: "stack" },
  { text: "للحياة", start: 8.78, end: 9.62, scene: "stack" },

  // 2 — Laptop (9.98 - 15.0s)
  { text: "شاهد", start: 9.98, end: 10.5, scene: "laptop" },
  { text: "طبّق", start: 10.5, end: 11.14, scene: "laptop" },
  { text: "ابن", start: 11.14, end: 11.64, scene: "laptop" },
  { text: "بنفسك", start: 11.64, end: 12.22, scene: "laptop" },
  { text: "شرح", start: 12.6, end: 12.96, scene: "laptop" },
  { text: "عربي", start: 12.96, end: 13.34, scene: "laptop" },
  { text: "مبسط", start: 13.34, end: 13.9, scene: "laptop" },
  { text: "من", start: 13.9, end: 14.14, scene: "laptop" },
  { text: "الصفر", start: 14.14, end: 14.72, scene: "laptop" },

  // 3 — Projects (15.02 - 20.0s)
  { text: "ابنِ", start: 15.02, end: 15.3, scene: "projects" },
  { text: "خمس", start: 15.3, end: 15.8, scene: "projects" },
  { text: "مشاريع", start: 15.8, end: 16.18, scene: "projects" },
  { text: "حقيقية", start: 16.18, end: 16.92, scene: "projects" },
  { text: "متجر", start: 17.26, end: 17.72, scene: "projects" },
  { text: "موقع", start: 17.72, end: 18.28, scene: "projects" },
  { text: "شخصي", start: 18.28, end: 18.82, scene: "projects" },
  { text: "تطبيق", start: 18.82, end: 19.48, scene: "projects" },
  { text: "مهام", start: 19.48, end: 19.88, scene: "projects" },

  // 4 — Exercises (20.24 - 25.2s)
  { text: "تمارين", start: 20.24, end: 20.68, scene: "exercises" },
  { text: "وتحديات", start: 20.68, end: 21.38, scene: "exercises" },
  { text: "بعد", start: 21.38, end: 21.7, scene: "exercises" },
  { text: "كل", start: 21.7, end: 22.08, scene: "exercises" },
  { text: "درس", start: 22.08, end: 22.56, scene: "exercises" },
  { text: "تتعلّم", start: 22.92, end: 23.34, scene: "exercises" },
  { text: "بالممارسة", start: 23.34, end: 24.1, scene: "exercises" },
  { text: "لا", start: 24.1, end: 24.42, scene: "exercises" },
  { text: "بالحفظ", start: 24.42, end: 24.98, scene: "exercises" },

  // 5 — Certificate (25.32 - 29.0s)
  { text: "شهادة", start: 25.32, end: 25.76, scene: "certificate" },
  { text: "إتمام", start: 25.76, end: 26.22, scene: "certificate" },
  { text: "ومعرض", start: 26.22, end: 26.74, scene: "certificate" },
  { text: "أعمال", start: 26.74, end: 27.2, scene: "certificate" },
  { text: "يقوي", start: 27.2, end: 27.7, scene: "certificate" },
  { text: "سيرتك", start: 27.7, end: 28.16, scene: "certificate" },
  { text: "الذاتية", start: 28.16, end: 28.7, scene: "certificate" },

  // 6 — Support (29.08 - 32.8s)
  { text: "اسأل", start: 29.08, end: 29.54, scene: "support" },
  { text: "أي", start: 29.54, end: 29.84, scene: "support" },
  { text: "وقت", start: 29.84, end: 30.2, scene: "support" },
  { text: "مجتمع", start: 30.2, end: 31.06, scene: "support" },
  { text: "ومرشد", start: 31.06, end: 31.64, scene: "support" },
  { text: "يجاوبك", start: 31.64, end: 32.22, scene: "support" },
  { text: "بسرعة", start: 32.22, end: 32.66, scene: "support" },

  // 7 — CTA (33.06 - 38.22s)
  { text: "ابدأ", start: 33.06, end: 33.4, scene: "cta" },
  { text: "اليوم", start: 33.4, end: 33.76, scene: "cta" },
  { text: "مجاناً", start: 33.76, end: 34.52, scene: "cta" },
  { text: "اضغط", start: 34.66, end: 35.0, scene: "cta" },
  { text: "فولو", start: 35.0, end: 35.64, scene: "cta" },
  { text: "وتابعنا", start: 35.64, end: 36.26, scene: "cta" },
  { text: "لتتعلّم", start: 36.26, end: 36.9, scene: "cta" },
  { text: "البرمجة", start: 36.9, end: 37.5, scene: "cta" },
  { text: "من", start: 37.5, end: 37.7, scene: "cta" },
  { text: "الصفر", start: 37.7, end: 38.22, scene: "cta" },
];

// Scene boundaries (seconds) derived from the word timings above,
// with small padding so each visual appears just before its voice starts.
export const VOICE_1_SCENES = [
  { id: "hook", start: 0, end: 4.2 },
  { id: "stack", start: 4.2, end: 10.0 },
  { id: "laptop", start: 10.0, end: 15.2 },
  { id: "projects", start: 15.2, end: 20.2 },
  { id: "exercises", start: 20.2, end: 25.4 },
  { id: "certificate", start: 25.4, end: 29.2 },
  { id: "support", start: 29.2, end: 33.0 },
  { id: "cta", start: 33.0, end: 38.8 },
] as const;
