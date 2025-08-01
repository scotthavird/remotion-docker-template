import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../../../theme/colors';
import { AnimatedTextProps } from './types';

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 60,
  color = colors.text.inverse
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const animationStart = delay * fps;
  const scale = spring({
    frame: frame - animationStart,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });
  
  const opacity = interpolate(
    frame - animationStart,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight: 'bold',
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        transform: `scale(${scale})`,
        opacity,
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {text}
    </div>
  );
}; 