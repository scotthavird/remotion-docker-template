// Consistent color palette for the Remotion template
// Based on a modern, professional color scheme

export const colors = {
  // Primary colors - Deep blues and teals
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff', 
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff', // Main primary
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  
  // Secondary colors - Warm accent
  secondary: {
    50: '#fff7e6',
    100: '#ffe7ba',
    200: '#ffd591',
    300: '#ffc069',
    400: '#ffa940',
    500: '#fa8c16', // Main secondary
    600: '#d46b08',
    700: '#ad4e00',
    800: '#873800',
    900: '#612500',
  },
  
  // Neutral colors - Clean grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e8e8e8',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#141414',
  },
  
  // Success, warning, error
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  
  // Text colors
  text: {
    primary: '#262626',
    secondary: '#595959',
    disabled: '#bfbfbf',
    inverse: '#ffffff',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    inverse: '#141414',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
    secondary: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)',
    neutral: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
    hero: 'linear-gradient(135deg, #1890ff 0%, #fa8c16 50%, #096dd9 100%)',
  },
} as const;

// Utility function to get colors with opacity
export const withOpacity = (color: string, opacity: number): string => {
  const hex = Math.round(opacity * 255).toString(16);
  return `${color}${hex.length === 1 ? '0' + hex : hex}`;
}; 