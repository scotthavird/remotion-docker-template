import { render } from '@testing-library/react';
import React from 'react';
import { TransitionsDemo } from './index';

jest.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080 }),
  interpolate: jest.fn((_v, _i, output) => output[1]),
  spring: jest.fn(() => 1),
  AbsoluteFill: ({ children, ...props }: any) =>
    React.createElement('div', { 'data-testid': 'absolute-fill', ...props }, children),
  Sequence: ({ children }: any) => React.createElement('div', null, children),
}));

jest.mock('@remotion/transitions', () => ({
  TransitionSeries: Object.assign(
    ({ children }: any) =>
      React.createElement('div', { 'data-testid': 'transition-series' }, children),
    {
      Sequence: ({ children }: any) =>
        React.createElement('div', { 'data-testid': 'ts-sequence' }, children),
      Transition: () =>
        React.createElement('div', { 'data-testid': 'ts-transition' }),
    },
  ),
  linearTiming: jest.fn(() => ({})),
}));

jest.mock('@remotion/transitions/fade', () => ({ fade: jest.fn(() => ({})) }));
jest.mock('@remotion/transitions/slide', () => ({ slide: jest.fn(() => ({})) }));

describe('TransitionsDemo', () => {
  const defaultProps = {
    sceneOneText: 'Welcome',
    sceneTwoText: 'Built with Remotion',
    sceneThreeText: 'Render Anywhere',
  };

  it('renders without crashing', () => {
    render(<TransitionsDemo {...defaultProps} />);
  });

  it('renders all three scene texts', () => {
    const { getByText } = render(<TransitionsDemo {...defaultProps} />);
    expect(getByText('Welcome')).toBeInTheDocument();
    expect(getByText('Built with Remotion')).toBeInTheDocument();
    expect(getByText('Render Anywhere')).toBeInTheDocument();
  });

  it('renders three TransitionSeries.Sequence wrappers', () => {
    const { getAllByTestId } = render(<TransitionsDemo {...defaultProps} />);
    expect(getAllByTestId('ts-sequence')).toHaveLength(3);
  });

  it('renders two transitions between the scenes', () => {
    const { getAllByTestId } = render(<TransitionsDemo {...defaultProps} />);
    expect(getAllByTestId('ts-transition')).toHaveLength(2);
  });
});
