# HelloWorldComposition

A Remotion organism component that orchestrates multiple molecule components to create a complete video composition with intro, content, and outro sections.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Hello World"` | Main title for the intro section |
| `subtitle` | `string` | `"Welcome to Remotion"` | Subtitle for the intro section |
| `contentHeader` | `string` | `"Discover More"` | Header text for the content section |
| `outroMessage` | `string` | `"Thank You!"` | Message for the outro section |

## Usage

```tsx
import { HelloWorldComposition } from '@/components/organisms/HelloWorldComposition';

// Basic usage
<HelloWorldComposition />

// Custom content
<HelloWorldComposition 
  title="Custom Title"
  subtitle="Custom Subtitle"
  contentHeader="Learn More"
  outroMessage="Goodbye!"
/>
```

## Composition

This organism combines:
- **IntroSection** (molecule) - Introduction with title, subtitle, and circle
- **ContentSection** (molecule) - Content area with header and scrolling page
- **OutroSection** (molecule) - Closing message with circle and gradient

## Timeline

The composition runs for 8 seconds total with the following structure:
- **Intro Section**: 0-2.5 seconds
- **Content Section**: 2.5-5.5 seconds (with 0.3s overlap)
- **Outro Section**: 5.5-8 seconds (with 0.3s overlap)

## Animation Flow

Each section has:
- Opacity transitions for smooth section changes
- 20-frame fade transitions between sections
- Overlapping sections for seamless visual flow
- Custom timing delays for each molecule component

## Styling

The component features:
- Hero gradient background from theme colors
- Full viewport dimensions with AbsoluteFill
- Layered sections with opacity-based transitions
- Responsive design that adapts to video configuration

## Testing

Run tests with:
```bash
npm test src/components/organisms/HelloWorldComposition
```

The component includes unit tests that verify:
- Component renders without crashing
- All three sections are rendered
- Props are passed correctly to molecule components
- Timeline and opacity calculations work correctly
- Background styling is applied properly 