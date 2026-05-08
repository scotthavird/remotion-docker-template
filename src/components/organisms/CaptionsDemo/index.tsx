import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useDelayRender,
  useVideoConfig,
} from 'remotion';
import {
  createTikTokStyleCaptions,
  parseSrt,
  type Caption,
} from '@remotion/captions';
import { colors } from '../../../theme/colors';
import { CaptionPage } from '../../molecules/CaptionPage';
import { CaptionsDemoProps } from './types';

const SWITCH_CAPTIONS_EVERY_MS = 1200;

export const CaptionsDemo: React.FC<CaptionsDemoProps> = ({
  srtPath = 'captions/sample.srt',
}) => {
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(srtPath));
      const text = await response.text();
      const { captions: parsed } = parseSrt({ input: text });
      setCaptions(parsed);
      continueRender(handle);
    } catch (e) {
      cancelRender(e);
    }
  }, [srtPath, continueRender, cancelRender, handle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions) return [];
    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
    }).pages;
  }, [captions]);

  if (!captions) {
    return (
      <AbsoluteFill style={{ background: colors.gradients.primary }} />
    );
  }

  return (
    <AbsoluteFill style={{ background: colors.gradients.hero }}>
      <AbsoluteFill className="flex items-end justify-center pb-32">
        {pages.map((page, index) => {
          const nextPage = pages[index + 1] ?? null;
          const startFrame = (page.startMs / 1000) * fps;
          const endFrame = Math.min(
            nextPage ? (nextPage.startMs / 1000) * fps : Infinity,
            startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps,
          );
          const durationInFrames = endFrame - startFrame;

          if (durationInFrames <= 0) {
            return null;
          }

          return (
            <Sequence
              key={index}
              from={startFrame}
              durationInFrames={durationInFrames}
            >
              <CaptionPage page={page} fontSize={96} />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
