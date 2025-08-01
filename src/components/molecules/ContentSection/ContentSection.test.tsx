import { render } from '@testing-library/react';
import { ContentSection } from './index';

// Mock Remotion hooks
jest.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080 }),
  interpolate: jest.fn((frame, input, output) => output[1]),
  spring: jest.fn(() => 1),
}));

describe('ContentSection', () => {
  it('renders without crashing', () => {
    render(<ContentSection />);
  });

  it('renders with default header text', () => {
    const { getByText } = render(<ContentSection />);
    expect(getByText('Discover More')).toBeInTheDocument();
  });

  it('renders with custom header text', () => {
    const { getByText } = render(<ContentSection headerText="Custom Header" />);
    expect(getByText('Custom Header')).toBeInTheDocument();
  });

  it('applies correct container styles', () => {
    const { container } = render(<ContentSection />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '100%',
    });
  });

  it('positions header correctly', () => {
    const { container } = render(<ContentSection />);
    const headerContainer = container.querySelector('div > div') as HTMLElement;
    expect(headerContainer).toHaveStyle({
      position: 'absolute',
      top: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '10',
    });
  });
}); 