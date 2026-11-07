import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { CssMark, ProgressBar, Stage } from "./parts";
import { HookScene } from "./scenes/HookScene";
import { DefinitionScene } from "./scenes/DefinitionScene";
import { InlineScene } from "./scenes/InlineScene";
import { ExternalScene } from "./scenes/ExternalScene";
import { SyntaxScene } from "./scenes/SyntaxScene";
import { DemoScene } from "./scenes/DemoScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

const T = 8;

/**
 * 60-second vertical CSS crash course.
 * 188 + 248 + 308 + 368 + 308 + 188 + 98 + 150 - 7*8 = 1800 frames @ 30fps.
 */
export const CssShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Stage />
      <ProgressBar />
      <CssMark />
      <Audio src={staticFile("voice/cssbasicsvoice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={263}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Definition" durationInFrames={255}>
          <DefinitionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence
          name="InlineStyle"
          durationInFrames={260}
          trimBefore={22}
        >
          <InlineScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence
          name="ExternalFile"
          durationInFrames={226}
          trimBefore={34}
        >
          <ExternalScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence
          name="CssSyntax"
          durationInFrames={356}
          trimBefore={72}
        >
          <SyntaxScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence
          name="LiveDemo"
          durationInFrames={188}
          trimBefore={60}
        >
          <DemoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Summary" durationInFrames={176}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Cta" durationInFrames={132} trimBefore={48}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
