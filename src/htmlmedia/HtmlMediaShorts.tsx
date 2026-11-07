import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { RuleScene } from "./scenes/RuleScene";
import { ImageScene } from "./scenes/ImageScene";
import { VideoScene } from "./scenes/VideoScene";
import { AudioScene } from "./scenes/AudioScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical educational short: adding images, video and audio in HTML (Arabic).
 * 1842 frames @ 30fps (61.4s), 1080x1920 — Shorts / Reels / TikTok.
 *
 * Every cut is locked to the narration in voice/htmlmediavoice.mp3
 * (word timings: scripts/htmlmedia-voice-transcript.json):
 * hook 0-7.1 · golden rule 7.24-15.4 · img 15.6-27.7 · video 27.9-38.7 ·
 * audio 38.9-48.3 · summary 48.5-58.3 · CTA 58.5-61.4.
 *
 * TransitionSeries overlaps 12 frames per cut (6 cuts = 72), so the
 * sequence durations below sum to 1914 and yield exactly 1842.
 */
const T = 12;

export const HtmlMediaShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/htmlmediavoice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={219} style={{ scale: 0.995 }}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="GoldenRule" durationInFrames={261}>
          <RuleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence name="ImageTag" durationInFrames={381}>
          <ImageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="VideoTag" durationInFrames={344}>
          <VideoScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence name="AudioTag" durationInFrames={299}>
          <AudioScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Summary" durationInFrames={313}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={97}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
