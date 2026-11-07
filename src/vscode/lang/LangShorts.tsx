import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../Background";
import { HookScene } from "./scenes/HookScene";
import { ExtensionScene } from "./scenes/ExtensionScene";
import { ExtensionsScene } from "./scenes/ExtensionsScene";
import { MagicScene } from "./scenes/MagicScene";
import { ManualScene } from "./scenes/ManualScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical short: how VS Code detects the language of a file.
 * 1360 frames @ 30fps (45.33s), 1080x1920 — cut to voice/vscodelang.mp3
 * (45.32s). Every scene boundary lands on the moment its line is spoken.
 *
 * Scene boundaries (TransitionSeries overlaps 12 frames per cut, so the
 * sequence durations below sum to 1432 and yield exactly 1360):
 * hook 0-5.8s · file extension 5.4-14.0s · extensions 13.6-23.1s ·
 * syntax magic 22.7-29.8s · manual 29.4-35.2s · summary 34.8-42.6s ·
 * CTA 42.2-45.3s.
 */
const T = 12;

export const LangShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/vscodelang.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={174}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="File extension" durationInFrames={259}>
          <ExtensionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Extensions" durationInFrames={283}>
          <ExtensionsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Syntax magic" durationInFrames={213}>
          <MagicScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Manual override" durationInFrames={174}>
          <ManualScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Summary" durationInFrames={235}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="CTA" durationInFrames={94}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
