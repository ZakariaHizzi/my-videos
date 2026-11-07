import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { TagsScene } from "./scenes/TagsScene";
import { StructureScene } from "./scenes/StructureScene";
import { DemoScene } from "./scenes/DemoScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical educational short: HTML basics for absolute beginners.
 * 1276 frames @ 30fps (42.5s), 1080x1920 — cut to the narration in
 * public/voice/html voice.mp3 (Whisper word timings, see
 * scripts/html-voice-transcript.json).
 *
 * Beat map (30fps, from the voice):
 * hook 0-6.4s · tags 6.4-17.6s · head/body 17.6-28.4s ·
 * demo 28.4-34.4s · summary 34.4-39.9s · CTA 39.9-42.5s.
 *
 * TransitionSeries overlaps 12 frames per cut, so the sequence durations
 * below sum to 1336 and yield exactly 1276.
 */
const T = 12;

export const HtmlShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/html voice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={198}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Tags" durationInFrames={348}>
          <TagsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Head and body" durationInFrames={336}>
          <StructureScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Demo" durationInFrames={192}>
          <DemoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Summary" durationInFrames={178}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={84}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
