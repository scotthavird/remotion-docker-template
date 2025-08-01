# AnimatedCircle

A Remotion component that renders an animated circle with spring animations and opacity transitions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `100` | Size of the circle in pixels |
| `color` | `string` | `colors.secondary[500]` | Color of the circle |
| `delay` | `number` | `0` | Delay before animation starts (in seconds) |
| `duration` | `number` | `2` | Duration of the animation (in seconds) |
| `position` | `'bottom' \| 'center' \| 'top'` | `'bottom'` | Vertical position of the circle |

## Usage

```tsx
import { AnimatedCircle } from '@/components/atoms/AnimatedCircle';

// Basic usage
<AnimatedCircle />

// Custom size and position
<AnimatedCircle size={200} position="center" />

// With custom timing
<AnimatedCircle delay={1} duration={3} />
```

## Animation Details

- Uses Remotion's `spring` function for scale animation
- Uses `interpolate` for opacity transitions
- Position is calculated based on video height and circle size
- Supports three vertical positions: top, center, bottom

## Testing

Run tests with:
```bash
npm test src/components/atoms/AnimatedCircle
```

The component includes unit tests that mock Remotion hooks and verify:
- Component renders without crashing
- Custom props are applied correctly
- Styles are applied as expected 