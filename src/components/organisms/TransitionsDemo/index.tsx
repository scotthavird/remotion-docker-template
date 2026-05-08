import React from 'react';
import { AbsoluteFill } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { AnimatedText } from '../../atoms/AnimatedText';
import { colors } from '../../../theme/colors';
import { TransitionsDemoProps } from './types';

const SCENE_DURATION_IN_FRAMES = 100;
const TRANSITION_DURATION_IN_FRAMES = 15;

interface SceneProps {
  text: string;
  background: string;
}

const Scene: React.FC<SceneProps> = ({ text, background }) => (
  <AbsoluteFill
    className="flex items-center justify-center"
    style={{ background }}
  >
    <AnimatedText text={text} fontSize={120} color={colors.text.inverse} />
  </AbsoluteFill>
);

export const TransitionsDemo: React.FC<TransitionsDemoProps> = ({
  sceneOneText = 'Welcome',
  sceneTwoText = 'Built with Remotion',
  sceneThreeText = 'Render Anywhere',
}) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION_IN_FRAMES}>
        <Scene text={sceneOneText} background={colors.gradients.primary} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION_IN_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION_IN_FRAMES}>
        <Scene text={sceneTwoText} background={colors.gradients.secondary} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION_IN_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION_IN_FRAMES}>
        <Scene text={sceneThreeText} background={colors.gradients.hero} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// Net duration: 3 * 100 - 2 * 15 = 270 frames (9s @ 30fps).
export const TRANSITIONS_DEMO_DURATION_IN_FRAMES =
  3 * SCENE_DURATION_IN_FRAMES - 2 * TRANSITION_DURATION_IN_FRAMES;
