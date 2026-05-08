import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { CaptionsDemo } from './index';

const continueRender = jest.fn();
const cancelRender = jest.fn();

jest.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, width: 1080, height: 1920 }),
  staticFile: (p: string) => `/static/${p}`,
  useDelayRender: () => ({
    delayRender: () => 1,
    continueRender,
    cancelRender,
  }),
  AbsoluteFill: ({ children, ...props }: any) =>
    React.createElement('div', { 'data-testid': 'absolute-fill', ...props }, children),
  Sequence: ({ children, from, durationInFrames }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'sequence', 'data-from': from, 'data-duration': durationInFrames },
      children,
    ),
}));

const SAMPLE_SRT = `1
00:00:00,000 --> 00:00:01,200
hello world
`;

const mockCaption = { text: 'hello world ', startMs: 0, endMs: 1200 };

jest.mock('@remotion/captions', () => ({
  parseSrt: jest.fn(() => ({ captions: [mockCaption] })),
  createTikTokStyleCaptions: jest.fn(() => ({
    pages: [
      {
        text: 'hello world',
        startMs: 0,
        durationMs: 1200,
        tokens: [
          { text: 'hello ', fromMs: 0, toMs: 600 },
          { text: 'world', fromMs: 600, toMs: 1200 },
        ],
      },
    ],
  })),
}));

beforeEach(() => {
  continueRender.mockClear();
  cancelRender.mockClear();
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve(SAMPLE_SRT),
    }),
  );
});

describe('CaptionsDemo', () => {
  it('renders without crashing while captions are loading', () => {
    render(<CaptionsDemo srtPath="captions/sample.srt" />);
  });

  it('fetches SRT, parses it, and renders a Sequence per page', async () => {
    const { findAllByTestId } = render(<CaptionsDemo srtPath="captions/sample.srt" />);
    const sequences = await findAllByTestId('sequence');
    expect(sequences).toHaveLength(1);
    expect(continueRender).toHaveBeenCalled();
  });

  it('cancels render on fetch failure', async () => {
    (global as any).fetch = jest.fn(() => Promise.reject(new Error('boom')));
    render(<CaptionsDemo srtPath="captions/missing.srt" />);
    await waitFor(() => expect(cancelRender).toHaveBeenCalled());
  });
});
