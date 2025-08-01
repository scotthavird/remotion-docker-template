import { render } from '@testing-library/react';
import { ScrollingPage } from './index';

// Mock the colors theme
jest.mock('../../../theme/colors', () => ({
  colors: {
    background: {
      primary: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    neutral: {
      200: '#e5e7eb',
    },
  },
}));

describe('ScrollingPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<ScrollingPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom background color', () => {
    const { container } = render(<ScrollingPage backgroundColor="#f0f0f0" />);
    const pageElement = container.firstChild as HTMLElement;
    expect(pageElement).toHaveStyle({ backgroundColor: '#f0f0f0' });
  });

  it('renders with custom text color', () => {
    const { container } = render(<ScrollingPage textColor="#333333" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom delay and duration', () => {
    const { container } = render(<ScrollingPage delay={1} duration={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct container styles', () => {
    const { container } = render(<ScrollingPage />);
    const pageElement = container.firstChild as HTMLElement;
    
    expect(pageElement).toHaveStyle({
      position: 'absolute',
      borderRadius: '24px',
      padding: '40px',
      overflow: 'hidden',
      boxShadow: '0 20px 64px rgba(0,0,0,0.1)',
    });
  });

  it('renders all content items', () => {
    const { getByText } = render(<ScrollingPage />);
    
    expect(getByText('Build videos programmatically')).toBeInTheDocument();
    expect(getByText('Using React components')).toBeInTheDocument();
    expect(getByText('With powerful animations')).toBeInTheDocument();
    expect(getByText('Deploy with Docker')).toBeInTheDocument();
    expect(getByText('Scale infinitely')).toBeInTheDocument();
    expect(getByText('Perfect for automation')).toBeInTheDocument();
  });
}); 