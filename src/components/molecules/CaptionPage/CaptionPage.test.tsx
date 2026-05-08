import { render } from '@testing-library/react';
import React from 'react';
import { CaptionPage } from './index';

jest.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1080, height: 1920 }),
  AbsoluteFill: ({ children, ...props }: any) =>
    React.createElement('div', { 'data-testid': 'absolute-fill', ...props }, children),
}));

const page = {
  text: 'hello world',
  startMs: 0,
  endMs: 2000,
  tokens: [
    { text: 'hello ', fromMs: 0, toMs: 1000 },
    { text: 'world', fromMs: 1000, toMs: 2000 },
  ],
};

describe('CaptionPage', () => {
  it('renders all token text', () => {
    const { getByText } = render(<CaptionPage page={page as any} />);
    expect(getByText('hello')).toBeInTheDocument();
    expect(getByText('world')).toBeInTheDocument();
  });

  it('highlights the active token at the current frame', () => {
    // At frame 30 / 30fps = 1000ms absolute -> "world" is active (1000-2000ms range)
    const { getByText } = render(<CaptionPage page={page as any} />);
    const worldEl = getByText('world');
    expect(worldEl.getAttribute('style')).toContain('color: rgb(57, 229, 8)');
  });
});
