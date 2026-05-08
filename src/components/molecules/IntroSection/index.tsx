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
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <AnimatedText
        text={title}
        delay={titleDelay}
        fontSize={84}
        color={colors.text.inverse}
      />

      {subtitle && (
        <div className="mt-5">
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
