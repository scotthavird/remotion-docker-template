import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../../../theme/colors';
import { ContentSection } from '../../molecules/ContentSection';
import { IntroSection } from '../../molecules/IntroSection';
import { OutroSection } from '../../molecules/OutroSection';
import { HelloWorldCompositionProps } from './types';

export const HelloWorldComposition: React.FC<HelloWorldCompositionProps> = ({
  title = "Hello World",
  subtitle = "Welcome to Remotion",
  contentHeader = "Discover More",
  outroMessage = "Thank You!"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Define timing for sections (in seconds) - Total 8 seconds
  const introEnd = 2.5; // 0-2.5 seconds
  const contentEnd = 5.5; // 2.5-5.5 seconds  
  const outroEnd = 8; // 5.5-8 seconds
  
  // Calculate opacity for each section
  const introOpacity = interpolate(
    frame,
    [0, introEnd * fps - 20, introEnd * fps],
    [1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const contentOpacity = interpolate(
    frame,
    [(introEnd - 0.3) * fps, introEnd * fps, contentEnd * fps - 20, contentEnd * fps],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const outroOpacity = interpolate(
    frame,
    [(contentEnd - 0.3) * fps, contentEnd * fps, outroEnd * fps],
    [0, 1, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill
      style={{
        background: colors.gradients.hero,
      }}
    >
      {/* Intro Section */}
      <AbsoluteFill style={{ opacity: introOpacity }}>
        <IntroSection
          title={title}
          subtitle={subtitle}
          titleDelay={0.2}
          subtitleDelay={0.6}
          circleDelay={0.8}
        />
      </AbsoluteFill>
      
      {/* Content Section */}
      <AbsoluteFill style={{ opacity: contentOpacity }}>
        <ContentSection
          delay={0} // Relative to when this section becomes visible
          duration={5.5}
          headerText={contentHeader}
          headerDelay={0.2}
        />
      </AbsoluteFill>
      
      {/* Outro Section */}
      <AbsoluteFill style={{ opacity: outroOpacity }}>
        <OutroSection
          message={outroMessage}
          delay={0.3} // Relative to when this section becomes visible
          circleDelay={0.6}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}; 