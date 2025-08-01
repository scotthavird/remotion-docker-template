import React from 'react';
import { AnimatedText } from '../atoms/AnimatedText';
import { ScrollingPage } from '../atoms/ScrollingPage';

interface ContentSectionProps {
  delay?: number;
  duration?: number;
  headerText?: string;
  headerDelay?: number;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  delay = 3,
  duration = 4,
  headerText = "Discover More",
  headerDelay = 3
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <AnimatedText 
          text={headerText}
          delay={headerDelay}
          fontSize={50}
          color="#333333"
        />
      </div>
      
      <ScrollingPage 
        delay={delay}
        duration={duration}
        backgroundColor="#ffffff"
        textColor="#333333"
      />
    </div>
  );
}; 