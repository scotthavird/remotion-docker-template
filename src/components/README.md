# Component Structure

This project uses an atomic design pattern with a modular component structure that's optimized for LLMs and maintainability.

## Structure

Each component follows this structure:
```
src/components/atoms/ComponentName/
├── index.tsx          # Main component
├── types.ts           # TypeScript interfaces
├── ComponentName.test.tsx  # Unit tests
└── README.md          # Documentation
```

## Current Components

### Atoms (Basic Building Blocks)

#### AnimatedCircle
- **Purpose**: Renders an animated circle with spring animations
- **Props**: `size`, `color`, `delay`, `duration`, `position`
- **Tests**: 5 test cases covering rendering, props, and styles
- **Documentation**: Complete API reference and usage examples

#### AnimatedText
- **Purpose**: Renders animated text with scale and opacity transitions
- **Props**: `text`, `delay`, `fontSize`, `color`
- **Tests**: 6 test cases covering text rendering and styling
- **Documentation**: Complete API reference and usage examples

#### ScrollingPage
- **Purpose**: Renders a scrolling content page with predefined features
- **Props**: `delay`, `duration`, `backgroundColor`, `textColor`
- **Tests**: 6 test cases covering content rendering and styling
- **Documentation**: Complete API reference and usage examples

## Testing Setup

### Dependencies
- **Jest**: Test runner
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: Custom matchers
- **ts-jest**: TypeScript support
- **jest-environment-jsdom**: DOM environment

### Configuration
- **jest.config.js**: Jest configuration with TypeScript and path mapping
- **src/setupTests.ts**: Global test setup with Remotion mocks

### Running Tests
```bash
# Run all tests
npm test

# Run specific component tests
npm test -- --testPathPattern=AnimatedCircle

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Benefits for LLMs

### 1. Modular Structure
- Each component is self-contained with its own types, tests, and documentation
- Clear separation of concerns makes it easier for LLMs to understand and modify
- Index.tsx pattern provides clean imports

### 2. Comprehensive Testing
- Unit tests mock Remotion hooks to test component logic
- Tests verify props, styling, and rendering behavior
- Test files serve as usage examples for LLMs

### 3. Documentation
- README files provide clear API documentation
- Usage examples help LLMs understand component capabilities
- Type definitions are separated for better IDE support

### 4. Type Safety
- TypeScript interfaces are exported separately
- Clear prop definitions help LLMs understand component contracts
- Type checking prevents common errors

## Best Practices

### For LLMs
1. **Always check the types.ts file** for component interfaces
2. **Read the README.md** for usage examples and API documentation
3. **Run tests** to verify changes work as expected
4. **Follow the existing pattern** when creating new components

### For Development
1. **Create tests first** when adding new features
2. **Update documentation** when changing component APIs
3. **Use TypeScript** for all new components
4. **Mock Remotion hooks** in tests to isolate component logic

## Example Usage

```tsx
import { AnimatedCircle } from '@/components/atoms/AnimatedCircle';
import { AnimatedText } from '@/components/atoms/AnimatedText';
import { ScrollingPage } from '@/components/atoms/ScrollingPage';

// In a Remotion composition
<AnimatedText text="Welcome" delay={0.5} />
<AnimatedCircle size={200} position="center" />
<ScrollingPage delay={1} duration={3} />
```

## Future Improvements

1. **Add more atom components** for common UI patterns
2. **Create molecule components** that combine atoms
3. **Add integration tests** for component interactions
4. **Implement visual regression testing** for animations
5. **Add Storybook** for component development and documentation 