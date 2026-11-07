import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CssMark, ProgressBar, Stage } from "../css/parts";
import { HookScene } from "./scenes/HookScene";
import { FontSizeScene } from "./scenes/FontSizeScene";
import { FontFamilyScene } from "./scenes/FontFamilyScene";
import { FontWeightScene } from "./scenes/FontWeightScene";
import { TextAlignScene } from "./scenes/TextAlignScene";
import { LineHeightScene } from "./scenes/LineHeightScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

const T = 8;
const timing = linearTiming({ durationInFrames: T });

/**
 * 60-second vertical CSS typography crash course (9:16, 30fps).
 *
 * Scene durations sum to 1856; the 7 transitions consume 56 frames → 1800.
 * Visible spans (frames):
 *   Hook 0-180 · font-size 180-450 · font-family 450-750 ·
 *   font-weight 750-990 · text-align 990-1260 · line-height 1260-1500 ·
 *   summary 1500-1650 · CTA 1650-1800
 *
 * The voice track (62.85s) is played at 1.0475x so it finishes exactly
 * at the 60s mark.
 */
export const CssTypographyShorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Stage />
      <ProgressBar />
      <CssMark />
      <Audio src={staticFile("voice/csstypoghraphyvoice.mp3")} playbackRate={1.0475} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={236}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence
          name="FontSize"
          durationInFrames={277}
          trimBefore={48}
        >
          <FontSizeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence
          name="FontFamily"
          durationInFrames={239}
          trimBefore={47}
        >
          <FontFamilyScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="FontWeight" durationInFrames={248}>
          <FontWeightScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="TextAlign" durationInFrames={278}>
          <TextAlignScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="LineHeight" durationInFrames={248}>
          <LineHeightScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Summary" durationInFrames={236}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Cta" durationInFrames={94} trimBefore={78}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
