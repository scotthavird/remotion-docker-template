import React from 'react';
import { colors } from '../../../theme/colors';
import { AnimatedCircle } from '../../atoms/AnimatedCircle';
import { AnimatedText } from '../../atoms/AnimatedText';
import { IntroSectionProps } from './types';

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
        fontSize={84}
        color={colors.text.inverse}
      />
      
      {subtitle && (
        <div style={{ marginTop: 20 }}>
          <AnimatedText 
            text={subtitle} 
            delay={subtitleDelay}
            fontSize={42}
            color={colors.neutral[100]}
          />
        </div>
      )}
      
      <AnimatedCircle 
        delay={circleDelay}
        duration={1.5}
        size={100}
        color={colors.secondary[500]}
        position="bottom"
      />
    </div>
  );
}; 