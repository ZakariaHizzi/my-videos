import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { BrowsersScene } from "./scenes/BrowsersScene";
import { TranslatorScene } from "./scenes/TranslatorScene";
import { EngineScene } from "./scenes/EngineScene";
import { DemoScene } from "./scenes/DemoScene";
import { DevToolsScene } from "./scenes/DevToolsScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical short: how a browser turns code into a website.
 * 1419 frames @ 30fps (47.3s), 1080x1920 - cut to voice/BROWSER VOICE.mp3.
 *
 * Every cut sits in a speech gap measured from the voiceover (30fps):
 * hook 0.0-6.4s · browsers 6.4-11.6s · translator 11.6-18.0s ·
 * engine 18.0-26.0s · live demo 26.0-32.4s · devtools 32.4-39.2s ·
 * summary 39.2-44.5s · CTA 44.5-47.3s.
 *
 * TransitionSeries overlaps 12 frames per cut, so the sequence durations
 * below sum to 1503 and yield exactly 1419.
 */
const T = 12;

export const BrowserShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Audio src={staticFile("voice/BROWSER VOICE.mp3")} />
      <Background />
      <ProgressBar />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={204}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Browsers" durationInFrames={169}>
          <BrowsersScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Translator" durationInFrames={204}>
          <TranslatorScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Engine" durationInFrames={252}>
          <EngineScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Live demo" durationInFrames={204}>
          <DemoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="DevTools" durationInFrames={215}>
          <DevToolsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Summary" durationInFrames={171}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="CTA" durationInFrames={84}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
