import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../../../theme/colors';
import { AnimatedCircleProps } from './types';

export const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  size = 100,
  color = colors.secondary[500],
  delay = 0,
  duration = 2,
  position = 'bottom'
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  
  const animationStart = delay * fps;
  const animationEnd = (delay + duration) * fps;
  
  const scale = spring({
    frame: frame - animationStart,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });
  
  const opacity = interpolate(
    frame,
    [animationStart, animationStart + 10, animationEnd - 10, animationEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const positionY = position === 'bottom' ? height - size - 50 : 
                   position === 'center' ? height / 2 - size / 2 : 50;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: positionY,
        width: size,
        height: size,
        background: colors.gradients.secondary,
        borderRadius: '50%',
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}
    />
  );
}; 