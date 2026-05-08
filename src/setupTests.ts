import '@testing-library/jest-dom';
import React from 'react';

jest.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, height: 1080, width: 1920 }),
  interpolate: jest.fn((value: any, input: any, output: any) => output[0]),
  spring: jest.fn(() => 1),
  staticFile: (p: string) => `/static/${p}`,
  useDelayRender: () => ({
    delayRender: () => 1,
    continueRender: jest.fn(),
    cancelRender: jest.fn(),
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

(global as any).console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
