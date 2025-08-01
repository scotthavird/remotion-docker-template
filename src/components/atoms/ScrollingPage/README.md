# ScrollingPage

A Remotion component that renders a scrolling content page with animated opacity and vertical scroll transitions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | `number` | `0` | Delay before animation starts (in seconds) |
| `duration` | `number` | `2.5` | Duration of the animation (in seconds) |
| `backgroundColor` | `string` | `colors.background.primary` | Background color of the page |
| `textColor` | `string` | `colors.text.primary` | Text color for content |

## Usage

```tsx
import { ScrollingPage } from '@/components/atoms/ScrollingPage';

// Basic usage
<ScrollingPage />

// Custom styling
<ScrollingPage 
  backgroundColor="#f8f9fa" 
  textColor="#333333" 
/>

// With custom timing
<ScrollingPage delay={1} duration={3} />
```

## Animation Details

- Uses Remotion's `interpolate` for opacity and scroll animations
- Opacity animates from 0 to 1 and back to 0
- Content scrolls vertically from 0 to -150px
- Page dimensions are calculated based on video config
- Smooth transitions with easing

## Content

The component displays a predefined list of features:
- Build videos programmatically
- Using React components
- With powerful animations
- Deploy with Docker
- Scale infinitely
- Perfect for automation

## Styling

The component includes:
- Rounded corners (24px border radius)
- Box shadow for depth
- Border with neutral color
- Responsive sizing based on video dimensions
- Overflow hidden for clean scrolling

## Testing

Run tests with:
```bash
npm test src/components/atoms/ScrollingPage
```

The component includes unit tests that verify:
- Component renders without crashing
- Custom props are applied correctly
- All content items are rendered
- Styles are applied as expected 