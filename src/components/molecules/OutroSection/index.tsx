import React from 'react';
import { colors } from '../../../theme/colors';
import { AnimatedCircle } from '../../atoms/AnimatedCircle';
import { AnimatedText } from '../../atoms/AnimatedText';
import { OutroSectionProps } from './types';

export const OutroSection: React.FC<OutroSectionProps> = ({
  message = "Thank You!",
  delay = 0.3,
  circleDelay = 0.6
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
        background: colors.gradients.primary,
      }}
    >
      <AnimatedText 
        text={message}
        delay={delay}
        fontSize={72}
        color={colors.text.inverse}
      />
      
      <AnimatedCircle 
        delay={circleDelay}
        duration={1.5}
        size={80}
        color={colors.secondary[500]}
        position="center"
      />
    </div>
  );
}; 