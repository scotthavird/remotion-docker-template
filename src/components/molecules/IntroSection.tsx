import React from 'react';
import { AnimatedCircle } from '../atoms/AnimatedCircle';
import { AnimatedText } from '../atoms/AnimatedText';

interface IntroSectionProps {
  title: string;
  subtitle?: string;
  titleDelay?: number;
  subtitleDelay?: number;
  circleDelay?: number;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  title,
  subtitle,
  titleDelay = 0,
  subtitleDelay = 0.5,
  circleDelay = 0
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatedText 
        text={title} 
        delay={titleDelay}
        fontSize={80}
        color="#ffffff"
      />
      
      {subtitle && (
        <div style={{ marginTop: 20 }}>
          <AnimatedText 
            text={subtitle} 
            delay={subtitleDelay}
            fontSize={40}
            color="#cccccc"
          />
        </div>
      )}
      
      <AnimatedCircle 
        delay={circleDelay}
        duration={2}
        size={120}
        color="#4ecdc4"
        position="bottom"
      />
    </div>
  );
}; 