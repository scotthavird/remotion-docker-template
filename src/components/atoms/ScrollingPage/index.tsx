import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../../../theme/colors';
import { ScrollingPageProps } from './types';

export const ScrollingPage: React.FC<ScrollingPageProps> = ({
  delay = 0,
  duration = 2.5,
  backgroundColor = colors.background.primary,
  textColor = colors.text.primary
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const animationStart = delay * fps;
  const animationEnd = (delay + duration) * fps;
  
  const opacity = interpolate(
    frame,
    [animationStart, animationStart + 10, animationEnd - 10, animationEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const scrollY = interpolate(
    frame - animationStart,
    [0, duration * fps],
    [0, -150],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const content = [
    'Build videos programmatically',
    'Using React components',
    'With powerful animations',
    'Deploy with Docker',
    'Scale infinitely',
    'Perfect for automation'
  ];
  
  return (
    <div
      style={{
        position: 'absolute',
        width: width * 0.7,
        height: height * 0.6,
        left: width * 0.15,
        top: height * 0.2,
        backgroundColor,
        borderRadius: 24,
        padding: 40,
        opacity,
        overflow: 'hidden',
        boxShadow: '0 20px 64px rgba(0,0,0,0.1)',
        border: `2px solid ${colors.neutral[200]}`,
      }}
    >
      <div
        style={{
          transform: `translateY(${scrollY}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {content.map((text, index) => (
          <div
            key={index}
            style={{
              fontSize: 28,
              color: textColor,
              marginBottom: 24,
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}; 