import React from 'react';
import { colors } from '../../../theme/colors';
import { AnimatedText } from '../../atoms/AnimatedText';
import { ScrollingPage } from '../../atoms/ScrollingPage';
import { ContentSectionProps } from './types';

export const ContentSection: React.FC<ContentSectionProps> = ({
  delay = 0,
  duration = 2.5,
  headerText = "Discover More",
  headerDelay = 0
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
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <AnimatedText 
          text={headerText}
          delay={headerDelay}
          fontSize={54}
          color={colors.text.inverse}
        />
      </div>
      
      <ScrollingPage 
        delay={delay}
        duration={duration}
        backgroundColor={colors.background.primary}
        textColor={colors.text.primary}
      />
    </div>
  );
}; 