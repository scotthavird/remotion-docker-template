import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface ScrollingPageProps {
  delay?: number;
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const ScrollingPage: React.FC<ScrollingPageProps> = ({
  delay = 3,
  duration = 3,
  backgroundColor = '#f0f0f0',
  textColor = '#333'
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const animationStart = delay * fps;
  const animationEnd = (delay + duration) * fps;
  
  const opacity = interpolate(
    frame,
    [animationStart, animationStart + 15, animationEnd - 15, animationEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const scrollY = interpolate(
    frame - animationStart,
    [0, duration * fps],
    [0, -200],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const content = [
    'Welcome to Remotion',
    'Build videos programmatically',
    'Using React components',
    'With powerful animations',
    'Deploy with Docker',
    'Scale infinitely'
  ];
  
  return (
    <div
      style={{
        position: 'absolute',
        width: width * 0.8,
        height: height * 0.8,
        left: width * 0.1,
        top: height * 0.1,
        backgroundColor,
        borderRadius: 20,
        padding: 40,
        opacity,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
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
              fontSize: 32,
              color: textColor,
              marginBottom: 30,
              fontFamily: 'Arial, sans-serif',
              lineHeight: 1.4,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}; 