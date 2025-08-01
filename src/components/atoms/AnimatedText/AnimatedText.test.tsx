import { render } from '@testing-library/react';
import { AnimatedText } from './index';

// Mock the colors theme
jest.mock('../../../theme/colors', () => ({
  colors: {
    text: {
      inverse: '#ffffff',
    },
  },
}));

describe('AnimatedText', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<AnimatedText text="Hello World" />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    const { getByText } = render(<AnimatedText text="Custom Text" />);
    expect(getByText('Custom Text')).toBeInTheDocument();
  });

  it('renders with custom font size', () => {
    const { container } = render(<AnimatedText text="Test" fontSize={80} />);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toHaveStyle({ fontSize: '80px' });
  });

  it('renders with custom color', () => {
    const { container } = render(<AnimatedText text="Test" color="#ff0000" />);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toHaveStyle({ color: '#ff0000' });
  });

  it('applies correct styles', () => {
    const { container } = render(<AnimatedText text="Test" />);
    const textElement = container.firstChild as HTMLElement;
    
    expect(textElement).toHaveStyle({
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transform: 'scale(1)',
    });
  });

  it('renders with custom delay', () => {
    const { getByText } = render(<AnimatedText text="Test" delay={1} />);
    expect(getByText('Test')).toBeInTheDocument();
  });
}); 