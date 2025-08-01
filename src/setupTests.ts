import '@testing-library/jest-dom';
import React from 'react';

// Mock Remotion hooks globally
jest.mock('remotion', () => ({
  useCurrentFrame: () => 0,
  useVideoConfig: () => ({ fps: 30, height: 1080, width: 1920 }),
  interpolate: jest.fn((value: any, input: any, output: any) => output[0]),
  spring: jest.fn(() => 1),
  AbsoluteFill: ({ children, ...props }: any) => 
    React.createElement('div', { 'data-testid': 'absolute-fill', ...props }, children),
}));

// Mock console methods to reduce noise in tests
(global as any).console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}; 