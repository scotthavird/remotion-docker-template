import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { z } from 'zod';
import './index.css';
import { HelloWorldComposition } from './components/organisms/HelloWorldComposition';
import {
  TransitionsDemo,
  TRANSITIONS_DEMO_DURATION_IN_FRAMES,
} from './components/organisms/TransitionsDemo';
import { CaptionsDemo } from './components/organisms/CaptionsDemo';

export const HelloWorldSchema = z.object({
  title: z.string().default('Hello World'),
  subtitle: z.string().default('Welcome to Remotion'),
  contentHeader: z.string().default('Discover More'),
  outroMessage: z.string().default('Thank You!'),
});

export const TransitionsDemoSchema = z.object({
  sceneOneText: z.string().default('Welcome'),
  sceneTwoText: z.string().default('Built with Remotion'),
  sceneThreeText: z.string().default('Render Anywhere'),
});

export const CaptionsDemoSchema = z.object({
  srtPath: z.string().default('captions/sample.srt'),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorldComposition}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={HelloWorldSchema}
        defaultProps={{
          title: 'Hello World',
          subtitle: 'Welcome to Remotion',
          contentHeader: 'Discover More',
          outroMessage: 'Thank You!',
        }}
      />

      <Composition
        id="TransitionsDemo"
        component={TransitionsDemo}
        durationInFrames={TRANSITIONS_DEMO_DURATION_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        schema={TransitionsDemoSchema}
        defaultProps={{
          sceneOneText: 'Welcome',
          sceneTwoText: 'Built with Remotion',
          sceneThreeText: 'Render Anywhere',
        }}
      />

      <Composition
        id="CaptionsDemo"
        component={CaptionsDemo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        schema={CaptionsDemoSchema}
        defaultProps={{
          srtPath: 'captions/sample.srt',
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
