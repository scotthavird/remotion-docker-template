# AnimatedText

A Remotion component that renders animated text with spring scale animations and opacity transitions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The text to display |
| `delay` | `number` | `0` | Delay before animation starts (in seconds) |
| `fontSize` | `number` | `60` | Font size in pixels |
| `color` | `string` | `colors.text.inverse` | Text color |

## Usage

```tsx
import { AnimatedText } from '@/components/atoms/AnimatedText';

// Basic usage
<AnimatedText text="Hello World" />

// Custom styling
<AnimatedText 
  text="Welcome" 
  fontSize={80} 
  color="#ff0000" 
/>

// With delay
<AnimatedText text="Animated" delay={1} />
```

## Animation Details

- Uses Remotion's `spring` function for scale animation
- Uses `interpolate` for opacity transitions
- Spring configuration: damping: 100, stiffness: 200, mass: 0.5
- Opacity animates from 0 to 1 over 20 frames
- Scale animates with spring physics

## Styling

The component includes:
- Bold font weight
- Center text alignment
- Text shadow for depth
- Inter font family with fallbacks
- Responsive scaling animation

## Testing

Run tests with:
```bash
npm test src/components/atoms/AnimatedText
```

The component includes unit tests that verify:
- Component renders with correct text
- Custom props are applied correctly
- Styles are applied as expected
- Animation props are handled properly 