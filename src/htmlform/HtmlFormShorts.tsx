import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { RuleScene } from "./scenes/RuleScene";
import { InputTypeScene } from "./scenes/InputTypeScene";
import { AttrsScene } from "./scenes/AttrsScene";
import { TypeValuesScene } from "./scenes/TypeValuesScene";
import { ButtonScene } from "./scenes/ButtonScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical educational short: building forms in HTML with
 * <form>, <input>, <button> + type / placeholder / required
 * (Arabic, absolute beginners, no presenter).
 * 1800 frames @ 30fps (60.0s), 1080x1920 — Shorts / Reels / TikTok.
 *
 * Narration: public/voice/htmlformvoice.mp3 (≈59.0s; the last second lets
 * the follow CTA linger). Visual beats follow the brief:
 * hook 0-6 · golden rule 6-14 · input+type 14-24 · placeholder/required 24-34 ·
 * other types 34-42 · button+submit 42-50 · summary 50-55 · CTA 55-60.
 *
 * TransitionSeries overlaps 12 frames per cut (7 cuts = 84), so the
 * sequence durations below sum to 1884 and yield exactly 1800.
 */
const T = 12;

export const HtmlFormShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/htmlformvoice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={275}
          style={{ scale: 0.995 }}
        >
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="GoldenRule" durationInFrames={260}>
          <RuleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="InputType" durationInFrames={318}>
          <InputTypeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Attrs" durationInFrames={256}>
          <AttrsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="TypeValues" durationInFrames={264}>
          <TypeValuesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Button" durationInFrames={153}>
          <ButtonScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Summary" durationInFrames={255}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={103}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
