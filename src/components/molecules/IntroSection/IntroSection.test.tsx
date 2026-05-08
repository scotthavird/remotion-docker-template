import { render } from '@testing-library/react';
import { IntroSection } from './index';

jest.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080 }),
  interpolate: jest.fn((frame, input, output) => output[1]),
  spring: jest.fn(() => 1),
}));

describe('IntroSection', () => {
  it('renders without crashing', () => {
    render(<IntroSection title="Test Title" />);
  });

  it('renders with title', () => {
    const { getByText } = render(<IntroSection title="Hello World" />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with title and subtitle', () => {
    const { getByText } = render(
      <IntroSection title="Hello World" subtitle="Welcome to Remotion" />
    );
    expect(getByText('Hello World')).toBeInTheDocument();
    expect(getByText('Welcome to Remotion')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = render(<IntroSection title="Hello World" />);
    expect(queryByText('Welcome to Remotion')).not.toBeInTheDocument();
  });

  it('applies layout classes on the container', () => {
    const { container } = render(<IntroSection title="Test" />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'relative',
      'w-full',
      'h-full',
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
    );
  });

  it('wraps subtitle in a margin-top container', () => {
    const { container } = render(
      <IntroSection title="Title" subtitle="Subtitle" />
    );
    const subtitleContainer = container.querySelector('.mt-5') as HTMLElement;
    expect(subtitleContainer).not.toBeNull();
    expect(subtitleContainer).toHaveClass('mt-5');
  });
});
