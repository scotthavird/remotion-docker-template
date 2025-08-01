import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { z } from 'zod';
import { HelloWorldComposition } from './components/organisms/HelloWorldComposition';

// Define schema for visual editing
export const HelloWorldSchema = z.object({
  title: z.string().default('Hello World'),
  subtitle: z.string().default('Welcome to Remotion'),
  contentHeader: z.string().default('Discover More'),
  outroMessage: z.string().default('Thank You!'),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorldComposition}
        durationInFrames={240} // 8 seconds at 30fps
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
    </>
  );
};

registerRoot(RemotionRoot); 