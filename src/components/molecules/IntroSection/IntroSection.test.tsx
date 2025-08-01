import { render } from '@testing-library/react';
import { IntroSection } from './index';

// Mock Remotion hooks
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

  it('applies correct container styles', () => {
    const { container } = render(<IntroSection title="Test" />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    });
  });

  it('applies correct subtitle margin when subtitle exists', () => {
    const { container } = render(
      <IntroSection title="Title" subtitle="Subtitle" />
    );
    const subtitleContainer = container.querySelector('div > div') as HTMLElement;
    expect(subtitleContainer).toHaveStyle({
      marginTop: '20px',
    });
  });
}); 