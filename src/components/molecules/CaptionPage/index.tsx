import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { CaptionPageProps } from './types';

const DEFAULT_HIGHLIGHT_COLOR = '#39E508';
const DEFAULT_BASE_COLOR = '#FFFFFF';
const DEFAULT_FONT_SIZE = 80;

export const CaptionPage: React.FC<CaptionPageProps> = ({
  page,
  highlightColor = DEFAULT_HIGHLIGHT_COLOR,
  baseColor = DEFAULT_BASE_COLOR,
  fontSize = DEFAULT_FONT_SIZE,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        className="text-center px-8"
        style={{
          fontSize,
          fontWeight: 'bold',
          whiteSpace: 'pre',
          textShadow: '0 4px 12px rgba(0,0,0,0.6)',
        }}
      >
        {page.tokens.map((token) => {
          const isActive =
            token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{ color: isActive ? highlightColor : baseColor }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
