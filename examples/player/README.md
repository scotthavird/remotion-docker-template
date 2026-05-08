# Remotion Player Embed Example

Standalone HTML page that embeds a Remotion composition via `@remotion/player`. Use this as a reference for embedding a composition in your own React or Next.js app — it's not part of the Studio or render pipeline.

## Run it

The example uses Vite's HTML entry point. From the repo root:

```bash
npx vite examples/player
```

Open the URL Vite prints (usually http://localhost:5173). You should see a controllable Player playing the `HelloWorld` composition.

## What's in here

- `index.html` — Vite HTML entry; just a `<div id="root">` and a script tag pointing at `main.tsx`.
- `main.tsx` — mounts a React tree with `<Player>`. Imports `HelloWorldComposition` directly from `src/components/organisms/`.

## Embedding in your own app

Install the player in your target project:

```bash
npm install @remotion/player react react-dom
```

Then mount it like the example:

```tsx
import { Player } from '@remotion/player';
import { HelloWorldComposition } from './HelloWorldComposition';

<Player
  component={HelloWorldComposition}
  durationInFrames={240}
  compositionWidth={1920}
  compositionHeight={1080}
  fps={30}
  controls
  inputProps={{ title: 'Hello' }}
/>
```

For more options (looping, autoplay, custom controls, server-side props) see https://www.remotion.dev/docs/player.
