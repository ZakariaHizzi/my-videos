import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { ProgressBar, Stage } from "../css/parts";
import { HookScene } from "./scenes/HookScene";
import { WhatIsDivScene } from "./scenes/WhatIsDivScene";
import { BlockScene } from "./scenes/BlockScene";
import { CardScene } from "./scenes/CardScene";
import { StructureScene } from "./scenes/StructureScene";
import { CssScene } from "./scenes/CssScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { TipScene } from "./scenes/TipScene";
import { CtaScene } from "./scenes/CtaScene";

const T = 10;
const timing = linearTiming({ durationInFrames: T });

/**
 * Vertical <div> crash course (9:16, 30fps) — trimmed to the voice (48.5s).
 *
 * Sequence durations sum to 1532; the 8 transitions consume 80 frames → 1452.
 * Visible spans (frames):
 *   hook 0-163 · what is a div 163-454 · block behaviour 454-677 ·
 *   card use 677-810 · header/main/footer 810-928 · linking CSS 928-1125 ·
 *   summary 1125-1275 · golden tip 1275-1392 · CTA 1392-1452
 */
export const HtmlDivShorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0A1130" }} durationInFrames={1470}>
      <Stage />
      <Audio src={staticFile("voice/devvoice.mp3")} />
      <ProgressBar />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={173}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="WhatIsDiv" durationInFrames={301}>
          <WhatIsDivScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence name="Block" durationInFrames={233}>
          <BlockScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Card" durationInFrames={135}>
          <CardScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence
          name="Structure"
          durationInFrames={119}
          trimBefore={7}
        >
          <StructureScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence name="Css" durationInFrames={208}>
          <CssScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Summary" durationInFrames={152}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence name="Tip" durationInFrames={106}>
          <TipScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Cta" durationInFrames={107}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
