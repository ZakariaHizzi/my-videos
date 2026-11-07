export type VoiceScene = {
  id: string;
  file: string;
  /** start frame in the timeline (must match Sequence `from`) */
  from: number;
  /** narration text (Modern Standard Arabic, energetic promo style) */
  text: string;
};

export const VOICE = "ar-SA-HamdanNeural"; // male, MSA — energetic promo (use scripts/generate-voice-edge.mjs when network allows)
export const VOICE_RATE = "+18%";
export const VOICE_PITCH = "+6Hz";

// Short punchy lines sized to fit each scene at ~1.15x playback.
// Current MP3s are generated with free Google TTS (neutral voice).
// Re-run `node scripts/generate-voice-edge.mjs` for the male energetic voice
// with the same timings — file names are identical.
export const VOICEOVER: VoiceScene[] = [
  {
    id: "hook",
    file: "voice/scene1-hook.mp3",
    from: 0,
    text: "تحلم تصبح مبرمج محترف؟ من الصفر للاحتراف!",
  },
  {
    id: "stack",
    file: "voice/scene2-stack.mp3",
    from: 150,
    text: "HTML للهيكل! CSS للأناقة! جافاسكريبت للحياة!",
  },
  {
    id: "laptop",
    file: "voice/scene3-laptop.mp3",
    from: 360,
    text: "شاهد، طبق، وابن بنفسك! شرح عربي مبسط من الصفر!",
  },
  {
    id: "projects",
    file: "voice/scene4-projects.mp3",
    from: 600,
    text: "ابن خمسة مشاريع حقيقية! متجر، موقع شخصي، وتطبيق مهام!",
  },
  {
    id: "exercises",
    file: "voice/scene5-exercises.mp3",
    from: 840,
    text: "تمارين وتحديات بعد كل درس! تتعلم بالممارسة لا بالحفظ!",
  },
  {
    id: "certificate",
    file: "voice/scene6-certificate.mp3",
    from: 1080,
    text: "شهادة إتمام ومعرض أعمال يقوي سيرتك الذاتية!",
  },
  {
    id: "support",
    file: "voice/scene7-support.mp3",
    from: 1290,
    text: "اسأل أي وقت! مجتمع ومرشد يجاوبك بسرعة!",
  },
  {
    id: "cta",
    file: "voice/scene8-cta.mp3",
    from: 1500,
    text: "ابدأ اليوم مجانا! اضغط فولو، وتابعنا لتتعلم البرمجة من الصفر!",
  },
];
