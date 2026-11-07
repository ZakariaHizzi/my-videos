import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { HeadingsScene } from "./scenes/HeadingsScene";
import { ParagraphScene } from "./scenes/ParagraphScene";
import { TagsScene } from "./scenes/TagsScene";
import { ExampleScene } from "./scenes/ExampleScene";
import { RuleScene } from "./scenes/RuleScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical educational short: writing text & headings in HTML (Arabic).
 * 1510 frames @ 30fps (50.3s), 1080x1920 — Shorts / Reels / TikTok.
 *
 * Beat map (30fps, cut to voice/htmltextvoice.mp3 word timings):
 * hook 0-6.9s · headings 6.9-15.6s · paragraph 15.6-23.0s ·
 * tags 23.0-30.9s · example 30.9-38.6s · rule 38.6-47.9s · CTA 47.9-52.3s.
 *
 * TransitionSeries overlaps 12 frames per cut, so the sequence durations
 * below sum to 1582 and yield exactly 1510.
 */
const T = 12;

export const HtmlTextShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/htmltextvoice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={220}
          style={{
            scale: 0.995
          }}
        >
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Headings" durationInFrames={273}>
          <HeadingsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Paragraph" durationInFrames={234}>
          <ParagraphScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Tags" durationInFrames={248}>
          <TagsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Example" durationInFrames={244}>
          <ExampleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Rule" durationInFrames={231}>
          <RuleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={132}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
