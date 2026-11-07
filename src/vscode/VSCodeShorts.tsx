import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Background, ProgressBar } from "./Background";
import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { LanguagesScene } from "./scenes/LanguagesScene";
import { WebScene } from "./scenes/WebScene";
import { LiveServerScene } from "./scenes/LiveServerScene";
import { HypeScene } from "./scenes/HypeScene";
import { CtaScene } from "./scenes/CtaScene";

/**
 * Vertical short about Visual Studio Code, voiced by the recorded take
 * public/voice/vscode/the voice.mp3 (32.0s).
 * Scene starts (frames) snapped to the spoken phrases:
 * hook 0, intro 150 (5.00s "الإجابة في Visual Studio Code"),
 * features 295 (9.84s "مجاني"), languages 419 (13.98s "أهم ميزة"),
 * web 529 (17.64s "ولو بتعلم مواقع"), live 629 (20.98s "بإضافة Live Server"),
 * hype 761 (25.38s "البداية الحقيقية"), CTA 875 (29.16s "لو كنت مهتم").
 */
const T = 12;

export const VSCodeShorts: React.FC = () => {
  const timing = linearTiming({ durationInFrames: T });

  return (
    <AbsoluteFill style={{ background: "#0A1130" }}>
      <Background />
      <ProgressBar />

      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={162}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Intro" durationInFrames={157}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Features" durationInFrames={136}>
          <FeaturesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Languages" durationInFrames={122}>
          <LanguagesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Web focus" durationInFrames={112}>
          <WebScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="Live Server" durationInFrames={144}>
          <LiveServerScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence name="Hype" durationInFrames={126}>
          <HypeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence name="CTA" durationInFrames={100}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence name="the voice.mp3">
        <Audio src={staticFile("voice/vscode/the voice.mp3")} volume={1} />
      </Sequence>
    </AbsoluteFill>
  );
};
