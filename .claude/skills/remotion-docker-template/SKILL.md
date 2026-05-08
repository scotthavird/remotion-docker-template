---
name: remotion-docker-template
description: Template-specific guidance for remotion-docker-template — compositions, atomic-design layout, Docker rendering pipeline, Tailwind setup, and Lambda deploy path. Use this skill alongside remotion-best-practices when working in this repository.
---

# remotion-docker-template

A dockerized Remotion starter with three example compositions, vendored Remotion skills, and an alternative Lambda deploy path.

## When to use

Apply this skill whenever you are editing code in this repository. For deeper Remotion API patterns (transitions, captions, audio, etc.), defer to the vendored `remotion-best-practices` skill at `.claude/skills/remotion/`.

## Compositions

| ID | Resolution | Duration | Demonstrates |
|---|---|---|---|
| `HelloWorld` | 1920×1080 | 8s (240 frames) | Atomic design pattern, frame interpolation, three-section timeline |
| `TransitionsDemo` | 1920×1080 | 9s (270 frames) | `@remotion/transitions` (`TransitionSeries` with fade and slide presets) |
| `CaptionsDemo` | 1080×1920 | 10s (300 frames) | `@remotion/captions` — `parseSrt` + `createTikTokStyleCaptions` flow |

All compositions are registered in `src/index.tsx` with zod schemas for prop validation in Studio.

## Atomic-design layout

```
src/components/
  atoms/        — primitives (AnimatedText, AnimatedCircle, ScrollingPage)
  molecules/    — composites (IntroSection, ContentSection, OutroSection, CaptionPage)
  organisms/    — full compositions (HelloWorldComposition, TransitionsDemo, CaptionsDemo)
```

When adding a new component, place it at the appropriate layer and follow the existing folder convention:

```
ComponentName/
  index.tsx
  types.ts
  README.md
  ComponentName.test.tsx
```

## Tailwind v4

Tailwind is enabled via `@remotion/tailwind-v4` in two places:

- `remotion.config.ts` — for Studio (`Config.overrideWebpackConfig((c) => enableTailwind(c))`)
- `render.mjs` — for headless renders (`bundle({ ..., webpackOverride: (c) => enableTailwind(c) })`)

Stylesheet entrypoint: `src/index.css` (single line: `@import 'tailwindcss';`).

**Use `className` on container divs** (see `src/components/molecules/IntroSection/index.tsx` as the reference migration).

**Do NOT use `transition-*` or `animate-*` Tailwind classes** — Remotion renders frame-by-frame and CSS transitions don't apply. Animate via `useCurrentFrame()` + `interpolate()` / `spring()` instead. This is enforced by `.claude/skills/remotion/rules/tailwind.md`.

## Rendering

```bash
# Studio (live preview)
npm run dev

# Local render — set COMPOSITION_ID env to pick which one
COMPOSITION_ID=TransitionsDemo node render.mjs
COMPOSITION_ID=CaptionsDemo node render.mjs

# Docker render
COMPOSITION_ID=TransitionsDemo docker compose up remotion-render

# Lambda (alternative)
./scripts/deploy-lambda.sh TransitionsDemo
# Full guide: docs/LAMBDA_DEPLOY.md
```

`render.mjs` reads `COMPOSITION_ID` and dispatches to per-composition input props (TITLE/SUBTITLE for HelloWorld, SCENE_ONE_TEXT/etc. for TransitionsDemo, SRT_PATH for CaptionsDemo).

## CI

GitHub Actions in `.github/workflows/`:

- `build-and-publish.yml` — pushes Docker image to GHCR on main
- `render-video.yml` — manual dispatch with `composition_id` (choice) + per-composition input fields
- `upload-to-releases.yml` — attaches rendered MP4 to a GitHub release

## Updating vendored skills

The `.claude/skills/remotion/` tree is vendored from `remotion-dev/skills`. To pull updates:

```bash
npm run skills:sync
# or directly:
./scripts/sync-remotion-skills.sh
```

The current vendored commit SHA is recorded in `.claude/skills/remotion/SOURCE.md`.
