import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { ContentSection } from '../molecules/ContentSection';
import { IntroSection } from '../molecules/IntroSection';
import { OutroSection } from '../molecules/OutroSection';

interface HelloWorldCompositionProps {
  title?: string;
  subtitle?: string;
  contentHeader?: string;
  outroMessage?: string;
}

export const HelloWorldComposition: React.FC<HelloWorldCompositionProps> = ({
  title = "Hello World",
  subtitle = "Welcome to Remotion",
  contentHeader = "Discover More",
  outroMessage = "Thank You!"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Define timing for sections (in seconds)
  const introEnd = 3; // 0-3 seconds
  const contentEnd = 8; // 3-8 seconds  
  const outroEnd = 15; // 8-15 seconds
  
  // Calculate opacity for each section
  const introOpacity = interpolate(
    frame,
    [0, introEnd * fps - 30, introEnd * fps],
    [1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const contentOpacity = interpolate(
    frame,
    [(introEnd - 0.5) * fps, introEnd * fps, contentEnd * fps - 30, contentEnd * fps],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const outroOpacity = interpolate(
    frame,
    [(contentEnd - 0.5) * fps, contentEnd * fps, outroEnd * fps],
    [0, 1, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Intro Section */}
      <AbsoluteFill style={{ opacity: introOpacity }}>
        <IntroSection
          title={title}
          subtitle={subtitle}
          titleDelay={0.2}
          subtitleDelay={0.8}
          circleDelay={1}
        />
      </AbsoluteFill>
      
      {/* Content Section */}
      <AbsoluteFill style={{ opacity: contentOpacity }}>
        <ContentSection
          delay={0} // Relative to when this section becomes visible
          duration={4}
          headerText={contentHeader}
          headerDelay={0.2}
        />
      </AbsoluteFill>
      
      {/* Outro Section */}
      <AbsoluteFill style={{ opacity: outroOpacity }}>
        <OutroSection
          message={outroMessage}
          delay={0.5} // Relative to when this section becomes visible
          circleDelay={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}; 