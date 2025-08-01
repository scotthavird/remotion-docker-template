# OutroSection

A Remotion molecule component that combines AnimatedText and AnimatedCircle atoms to create a closing section with a message and decorative circle over a gradient background.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Thank You!"` | Message text to display |
| `delay` | `number` | `0.3` | Delay before message animation starts (in seconds) |
| `circleDelay` | `number` | `0.6` | Delay before circle animation starts (in seconds) |

## Usage

```tsx
import { OutroSection } from '@/components/molecules/OutroSection';

// Basic usage
<OutroSection />

// Custom message
<OutroSection message="Goodbye!" />

// Custom timing
<OutroSection 
  message="See you later!"
  delay={0.5}
  circleDelay={1.0}
/>
```

## Composition

This molecule combines:
- **AnimatedText** (atom) - For the message text with spring animations
- **AnimatedCircle** (atom) - For the decorative circle in the center

## Styling

The component features:
- Centered flexbox layout
- Primary gradient background
- Large message font (72px) with inverse text color
- Medium-sized decorative circle (80px) positioned in center
- Full container dimensions with relative positioning

## Background

The component uses the primary gradient from the theme colors system to create an attractive closing background.

## Testing

Run tests with:
```bash
npm test src/components/molecules/OutroSection
```

The component includes unit tests that verify:
- Component renders without crashing
- Default message is displayed
- Custom message prop works correctly
- Props are passed correctly to child atoms
- Layout, styling and gradient background are applied properly 