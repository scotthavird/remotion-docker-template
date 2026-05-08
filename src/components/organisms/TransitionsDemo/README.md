# TransitionsDemo

Three-scene composition that demonstrates `@remotion/transitions`. Built around `<TransitionSeries>` with two presets: `fade()` between scenes 1 and 2, and `slide({ direction: 'from-right' })` between scenes 2 and 3.

## Specs

- Resolution: 1920×1080
- FPS: 30
- Duration: 270 frames (9s) — `3 * 100 - 2 * 15`

## Props

```ts
{
  sceneOneText: string;   // default: "Welcome"
  sceneTwoText: string;   // default: "Built with Remotion"
  sceneThreeText: string; // default: "Render Anywhere"
}
```

## Render

```bash
COMPOSITION_ID=TransitionsDemo node render.mjs
# or via Docker:
COMPOSITION_ID=TransitionsDemo docker compose up remotion-render
```

Override scene text via env vars: `SCENE_ONE_TEXT`, `SCENE_TWO_TEXT`, `SCENE_THREE_TEXT`.

## Notes

- Total composition duration accounts for the two 15-frame transition overlaps. If you change scene length or transition duration, also update the registration in `src/index.tsx` (or import `TRANSITIONS_DEMO_DURATION_IN_FRAMES`).
- Each `Scene` uses `AbsoluteFill` with a Tailwind-classed flex layout; the gradient backgrounds come from `src/theme/colors.ts`.
- See `.claude/skills/remotion/rules/transitions.md` for the full transitions API.
