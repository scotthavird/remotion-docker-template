import { render } from '@testing-library/react';
import { AnimatedCircle } from './index';

// Mock Remotion hooks
jest.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, height: 1080, width: 1920 }),
  interpolate: jest.fn((value, input, output) => output[0]),
  spring: jest.fn(() => 1),
}));

// Mock the colors theme
jest.mock('../../../theme/colors', () => ({
  colors: {
    secondary: {
      500: '#6366f1',
    },
    gradients: {
      secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
}));

describe('AnimatedCircle', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedCircle />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<AnimatedCircle size={200} />);
    const circle = container.firstChild as HTMLElement;
    expect(circle).toHaveStyle({ width: '200px', height: '200px' });
  });

  it('renders with custom position', () => {
    const { container } = render(<AnimatedCircle position="center" />);
    const circle = container.firstChild as HTMLElement;
    expect(circle).toHaveStyle({ top: '490px' }); // (1080 - 100) / 2 - 50
  });

  it('renders with custom delay and duration', () => {
    const { container } = render(<AnimatedCircle delay={1} duration={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { container } = render(<AnimatedCircle />);
    const circle = container.firstChild as HTMLElement;
    
    expect(circle).toHaveStyle({
      position: 'absolute',
      left: '50%',
      borderRadius: '50%',
      transform: 'translateX(-50%) scale(1)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    });
  });
}); 