import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CssMark, ProgressBar, Stage } from "../css/parts";
import { HookScene } from "./scenes/HookScene";
import { ColorScene } from "./scenes/ColorScene";
import { BgColorScene } from "./scenes/BgColorScene";
import { HexScene } from "./scenes/HexScene";
import { BgImageScene } from "./scenes/BgImageScene";
import { OpacityScene } from "./scenes/OpacityScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

const T = 8;
const timing = linearTiming({ durationInFrames: T });

/*
 * 60s @ 30fps = 1800 frames.
 * Scene durations sum to 1856; the 7 transitions consume 56 frames.
 * Visible spans: 0-180, 180-452, 452-744, 744-1126, 1126-1428,
 * 1428-1580, 1580-1642, 1642-1800
 */
export const CssColorsShorts: React.FC = () => {
  return (
    <>
      <AbsoluteFill style={{ background: "#0A1130" }}>
        <Stage />
        <ProgressBar />
        <CssMark />
        <Audio src={staticFile("voice/csscolorsvoice.mp3")} />
        <TransitionSeries>
          <TransitionSeries.Sequence name="Hook" durationInFrames={188}>
            <HookScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
      
          <TransitionSeries.Sequence name="Color" durationInFrames={387}>
            <ColorScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
      
          <TransitionSeries.Sequence
            name="BackgroundColor"
            durationInFrames={241}
            trimBefore={107}
          >
            <BgColorScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
      
          <TransitionSeries.Sequence name="Hex" durationInFrames={352} trimBefore={48}>
            <HexScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
      
          <TransitionSeries.Sequence
            name="BackgroundImage"
            durationInFrames={287}
            trimBefore={10}
            style={{
              translate: "-1px 0px"
            }}
          >
            <BgImageScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
      
          <TransitionSeries.Sequence
            name="Opacity"
            durationInFrames={160}
            style={{
              translate: "-1px 0px"
            }}
          >
            <OpacityScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />
      
          <TransitionSeries.Sequence name="Summary" durationInFrames={142}>
            <SummaryScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
      
          <TransitionSeries.Sequence name="Cta" durationInFrames={86} trimBefore={72}>
            <CtaScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
