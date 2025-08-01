# IntroSection

A Remotion molecule component that combines AnimatedText and AnimatedCircle atoms to create an introduction section with title, optional subtitle, and decorative circle.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Main title text to display |
| `subtitle` | `string` | `undefined` | Optional subtitle text |
| `titleDelay` | `number` | `0` | Delay before title animation starts (in seconds) |
| `subtitleDelay` | `number` | `0.5` | Delay before subtitle animation starts (in seconds) |
| `circleDelay` | `number` | `0` | Delay before circle animation starts (in seconds) |

## Usage

```tsx
import { IntroSection } from '@/components/molecules/IntroSection';

// Basic usage
<IntroSection title="Hello World" />

// With subtitle
<IntroSection 
  title="Welcome" 
  subtitle="to Remotion"
/>

// Custom timing
<IntroSection 
  title="Custom"
  subtitle="Timing"
  titleDelay={0.2}
  subtitleDelay={0.8}
  circleDelay={1.2}
/>
```

## Composition

This molecule combines:
- **AnimatedText** (atom) - For the title and optional subtitle with spring animations
- **AnimatedCircle** (atom) - For the decorative circle at the bottom

## Styling

The component features:
- Centered flexbox layout
- Large title font (84px) with inverse text color
- Smaller subtitle font (42px) with neutral color
- 20px margin between title and subtitle
- Decorative circle positioned at bottom
- Full container dimensions

## Testing

Run tests with:
```bash
npm test src/components/molecules/IntroSection
```

The component includes unit tests that verify:
- Component renders without crashing
- Title is always displayed
- Subtitle is conditionally rendered
- Props are passed correctly to child atoms
- Layout and styling are applied properly 