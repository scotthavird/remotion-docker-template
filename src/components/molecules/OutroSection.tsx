import React from 'react';
import { AnimatedCircle } from '../atoms/AnimatedCircle';
import { AnimatedText } from '../atoms/AnimatedText';

interface OutroSectionProps {
  message?: string;
  delay?: number;
  circleDelay?: number;
}

export const OutroSection: React.FC<OutroSectionProps> = ({
  message = "Thank You!",
  delay = 8,
  circleDelay = 8.5
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
        backgroundColor: '#2c3e50',
      }}
    >
      <AnimatedText 
        text={message}
        delay={delay}
        fontSize={70}
        color="#ecf0f1"
      />
      
      <AnimatedCircle 
        delay={circleDelay}
        duration={3}
        size={80}
        color="#e74c3c"
        position="center"
      />
    </div>
  );
}; 