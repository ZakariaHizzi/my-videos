import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "../vscode/Background";
import { HookScene } from "./scenes/HookScene";
import { RuleScene } from "./scenes/RuleScene";
import { TableTrScene } from "./scenes/TableTrScene";
import { TdScene } from "./scenes/TdScene";
import { ThScene } from "./scenes/ThScene";
import { SummaryScene } from "./scenes/SummaryScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical educational short: building tables in HTML with
 * <table>, <tr>, <td> and <th> (Arabic, absolute beginners, no presenter).
 * 1620 frames @ 30fps (54.0s), 1080x1920 — Shorts / Reels / TikTok.
 *
 * Every cut is locked to the narration in voice/htmltablevoice.mp3
 * (word timings: scripts/htmltable-voice-transcript.json):
 * hook 0-6.8 · golden rule 6.8-17.5 · table+tr 17.5-26.6 · td 26.6-35.2 ·
 * th 35.2-43.3 · summary 43.3-50.3 · CTA 50.3-54.0 (voice ends 53.2, tail
 * lets the follow CTA linger).
 *
 * TransitionSeries overlaps 12 frames per cut (6 cuts = 72), so the
 * sequence durations below sum to 1692 and yield exactly 1620.
 */
const T = 12;

export const HtmlTableShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />
      <Audio src={staticFile("voice/htmltablevoice.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={216}
          style={{ scale: 0.995 }}
        >
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="GoldenRule" durationInFrames={333}>
          <RuleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="TableTr" durationInFrames={285}>
          <TableTrScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="TdTag" durationInFrames={270}>
          <TdScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="ThTag" durationInFrames={255}>
          <ThScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Summary" durationInFrames={223}>
          <SummaryScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={110}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
