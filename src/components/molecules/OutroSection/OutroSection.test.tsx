import { render } from '@testing-library/react';
import { OutroSection } from './index';

// Mock Remotion hooks
jest.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080 }),
  interpolate: jest.fn((frame, input, output) => output[1]),
  spring: jest.fn(() => 1),
}));

describe('OutroSection', () => {
  it('renders without crashing', () => {
    render(<OutroSection />);
  });

  it('renders with default message', () => {
    const { getByText } = render(<OutroSection />);
    expect(getByText('Thank You!')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const { getByText } = render(<OutroSection message="Goodbye!" />);
    expect(getByText('Goodbye!')).toBeInTheDocument();
  });

  it('applies correct container styles', () => {
    const { container } = render(<OutroSection />);
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

  it('applies gradient background', () => {
    const { container } = render(<OutroSection />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.style.background).toBeTruthy();
  });
}); 