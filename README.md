# Remotion Docker Template

A dockerized Remotion template built with atomic design principles for scalable video generation. This template creates a 15-second "Hello World" animation and provides a foundation for building complex video compositions.

## 🏗️ Architecture

This project follows **Atomic Design** principles to ensure LLM-friendly component architecture:

### Atomic Design Structure

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   │   ├── AnimatedText.tsx
│   │   ├── AnimatedCircle.tsx
│   │   └── ScrollingPage.tsx
│   ├── molecules/       # Groups of atoms
│   │   ├── IntroSection.tsx
│   │   ├── ContentSection.tsx
│   │   └── OutroSection.tsx
│   └── organisms/       # Complex UI components
│       └── HelloWorldComposition.tsx
└── index.tsx           # Main composition registration
```

### Component Hierarchy

- **Atoms**: `AnimatedText`, `AnimatedCircle`, `ScrollingPage`
- **Molecules**: `IntroSection`, `ContentSection`, `OutroSection`  
- **Organisms**: `HelloWorldComposition`

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- pnpm (package manager)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd remotion-docker-template
```

### 2. Render Video with Docker

```bash
# Build and render video
docker-compose up remotion-render

# Video will be output to ./out/HelloWorld.mp4
```

### 3. Development with Remotion Studio

```bash
# Start development server with hot reload
docker-compose up remotion-dev

# Open http://localhost:3000 for Remotion Studio
```

### 4. Local Development (Alternative)

```bash
# Install dependencies
pnpm install

# Start Remotion Studio
pnpm dev

# Or render directly
pnpm render
```

## 📹 Video Output

The generated video includes:

- **0-3s**: Intro with animated "Hello World" text and circle
- **3-8s**: Scrolling page content with "Discover More" header
- **8-15s**: Outro with "Thank You!" message and final animation

Output: `./out/HelloWorld.mp4` (1920x1080, 30fps, 15 seconds)

### 📺 Preview Video

[![Hello World Video](HelloWorld.mp4)](HelloWorld.mp4)

*Click the video above to view the generated "Hello World" animation*

## 🎨 Visual Editing

This template supports [Remotion's visual editing](https://www.remotion.dev/docs/visual-editing) with Zod schemas:

1. Start the studio: `pnpm dev` or `docker-compose up remotion-dev`
2. Open the props panel (Cmd/Ctrl + J)
3. Edit text values in real-time
4. Use the 💾 button to save changes back to code

### Editable Props

- `title`: Main heading text
- `subtitle`: Secondary text  
- `contentHeader`: Content section header
- `outroMessage`: Final message

## 🏗️ Extending the Template

### Adding New Atomic Components

1. **Create Atom** in `src/components/atoms/`
2. **Compose into Molecule** in `src/components/molecules/`
3. **Integrate into Organism** in `src/components/organisms/`
4. **Register in Main Composition** in `src/index.tsx`

### Example: Adding a New Component

```tsx
// src/components/atoms/NewAtom.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

interface NewAtomProps {
  duration?: number;
  delay?: number;
}

export const NewAtom: React.FC<NewAtomProps> = ({ 
  duration = 2, 
  delay = 0 
}) => {
  const frame = useCurrentFrame();
  // Add animation logic
  return <div>New Component</div>;
};
```

### Future Template Ideas

- **Product Demos**: Showcase features with animations
- **Social Media Content**: Instagram/TikTok optimized formats
- **Educational Videos**: Step-by-step tutorials
- **Marketing Clips**: Brand introductions and promotions
- **Data Visualizations**: Animated charts and graphs

## 🐳 Docker Configuration

### Services

- **remotion-render**: Renders video and exits
- **remotion-dev**: Development server with hot reload

### Output Volume

Videos are output to `./out/` directory which is mounted as a Docker volume for easy access.

### Resource Allocation

For better performance, allocate more CPU/memory to Docker:

```bash
# Run with specific CPU allocation
docker run --cpus=4 --cpuset-cpus=0-3 remotion-docker-template
```

## 🛠️ Monorepo Support

This template includes Turbo for monorepo management:

```json
// turbo.json supports these commands:
{
  "build": "Build compositions",
  "dev": "Development server", 
  "render": "Render videos",
  "studio": "Remotion Studio"
}
```

Perfect for scaling to multiple video templates in a single repository.

## 📋 Scripts

- `pnpm dev` - Start Remotion Studio
- `pnpm build` - Bundle composition
- `pnpm render` - Render video locally
- `pnpm render:video` - Direct CLI render

## 🔧 Configuration

### Remotion Config (`remotion.config.ts`)

- Video format: JPEG images
- Overwrite output: Enabled
- Webpack customizations available

### TypeScript Config (`tsconfig.json`)

- ES2022 target
- React JSX transform
- Strict mode enabled

## 📦 Dependencies

### Core
- **remotion**: Video generation framework
- **react**: Component framework
- **zod**: Schema validation for props

### Development  
- **typescript**: Type safety
- **turbo**: Monorepo tools

## 🚀 Deployment

This template is designed for containerized deployment:

1. **CI/CD Integration**: Trigger renders on content changes
2. **Serverless**: Deploy on cloud functions for on-demand rendering
3. **Batch Processing**: Process multiple videos in parallel
4. **API Integration**: Accept props via REST/GraphQL APIs

## 🤝 LLM Integration

The atomic design pattern makes this template LLM-friendly:

- **Clear Component Boundaries**: Easy to understand and modify
- **Predictable Structure**: Atoms → Molecules → Organisms
- **Type Safety**: TypeScript interfaces for all props
- **Modular Design**: Components can be combined in countless ways

## 📄 License

MIT License - feel free to use for any project!

---

**Built with [Remotion](https://remotion.dev) 🎬**
