import { render } from '@testing-library/react';
import { HelloWorldComposition } from './index';

// Mock Remotion hooks
jest.mock('remotion', () => ({
  useCurrentFrame: () => 30,
  useVideoConfig: () => ({ fps: 30, width: 1920, height: 1080 }),
  interpolate: jest.fn((frame, input, output) => output[1]),
  spring: jest.fn(() => 1),
  AbsoluteFill: ({ children, style }: any) => <div style={style}>{children}</div>,
}));

describe('HelloWorldComposition', () => {
  it('renders without crashing', () => {
    render(<HelloWorldComposition />);
  });

  it('renders with default props', () => {
    const { getByText } = render(<HelloWorldComposition />);
    expect(getByText('Hello World')).toBeInTheDocument();
    expect(getByText('Welcome to Remotion')).toBeInTheDocument();
    expect(getByText('Discover More')).toBeInTheDocument();
    expect(getByText('Thank You!')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const { getByText } = render(
      <HelloWorldComposition 
        title="Custom Title"
        subtitle="Custom Subtitle"
        contentHeader="Custom Header"
        outroMessage="Custom Outro"
      />
    );
    expect(getByText('Custom Title')).toBeInTheDocument();
    expect(getByText('Custom Subtitle')).toBeInTheDocument();
    expect(getByText('Custom Header')).toBeInTheDocument();
    expect(getByText('Custom Outro')).toBeInTheDocument();
  });

  it('renders all three sections', () => {
    const { container } = render(<HelloWorldComposition />);
    // Should have main container plus 3 section containers
    const absoluteFills = container.querySelectorAll('div');
    expect(absoluteFills.length).toBeGreaterThanOrEqual(4);
  });

  it('applies hero gradient background', () => {
    const { container } = render(<HelloWorldComposition />);
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer.style.background).toBeTruthy();
  });
}); 