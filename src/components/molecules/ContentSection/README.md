# ContentSection

A Remotion molecule component that combines AnimatedText and ScrollingPage atoms to create a content section with a header and scrolling content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | `number` | `0` | Delay before scrolling animation starts (in seconds) |
| `duration` | `number` | `2.5` | Duration of the scrolling animation (in seconds) |
| `headerText` | `string` | `"Discover More"` | Text to display in the header |
| `headerDelay` | `number` | `0` | Delay before header animation starts (in seconds) |

## Usage

```tsx
import { ContentSection } from '@/components/molecules/ContentSection';

// Basic usage
<ContentSection />

// Custom configuration
<ContentSection 
  headerText="Learn More" 
  headerDelay={0.5}
  delay={1}
  duration={3}
/>
```

## Composition

This molecule combines:
- **AnimatedText** (atom) - For the header text with spring animations
- **ScrollingPage** (atom) - For the scrolling content area

## Styling

The component features:
- Fixed header positioning at the top center
- Z-index layering for proper header visibility
- Responsive layout that fills the container
- Integration with the theme color system

## Testing

Run tests with:
```bash
npm test src/components/molecules/ContentSection
```

The component includes unit tests that verify:
- Component renders without crashing
- Props are passed correctly to child atoms
- Layout and styling are applied properly
- Header text is displayed correctly 