# Remotion Docker Template

Dockerized [Remotion](https://remotion.dev) starter with **Tailwind CSS v4**, **scene transitions**, **TikTok-style captions**, an **embeddable Player**, an **AWS Lambda** alternative deploy path, and **bundled Claude Code skills** so AI coding agents understand Remotion best practices the moment you open the project.

📖 **[Read the developer guide](https://www.scotthavird.com/blog/remotion-docker-template)** for the deeper walkthrough.

## Bundled Claude Code skills

Open this repo in Claude Code and the agent automatically picks up two skills:

- **`remotion-best-practices`** — vendored from [remotion-dev/skills](https://github.com/remotion-dev/skills), covers transitions, captions, audio, fonts, FFmpeg, light leaks, and 30+ other reference rules.
- **`remotion-docker-template`** — project-specific (composition map, Docker pipeline, Tailwind constraints, Lambda flow).

No install step. Just `git clone` and start prompting. Update vendored skills with `npm run skills:sync`.

## What's included

| Composition | Resolution | Duration | Demonstrates |
|---|---|---|---|
| `HelloWorld` | 1920×1080 | 8s | Atomic design, frame interpolation, three-section timeline |
| `TransitionsDemo` | 1920×1080 | 9s | `@remotion/transitions` (`fade`, `slide`) with `TransitionSeries` |
| `CaptionsDemo` | 1080×1920 | 10s | `@remotion/captions` SRT parsing + TikTok-style highlighted pages |

Plus:
- **Tailwind v4** wired via `@remotion/tailwind-v4` (Studio + headless render)
- **`examples/player/`** — standalone Vite-runnable `@remotion/player` embed demo
- **`docs/LAMBDA_DEPLOY.md`** — full IAM + deploy guide for AWS Lambda rendering

## Quick start (Docker)

```bash
git clone https://github.com/scotthavird/remotion-docker-template
cd remotion-docker-template

# Studio with hot reload (open http://localhost:3000)
docker compose up remotion-dev

# Render the default HelloWorld composition to ./out/HelloWorld.mp4
docker compose up remotion-render

# Pick a different composition
COMPOSITION_ID=TransitionsDemo docker compose up remotion-render
COMPOSITION_ID=CaptionsDemo docker compose up remotion-render
```

## Quick start (local)

```bash
npm install
npm run dev                                 # Studio
COMPOSITION_ID=TransitionsDemo node render.mjs  # Render to ./out/
```

Want to scaffold a fresh Remotion project from scratch?

```bash
npx create-video@latest --yes --blank my-video
```

## Player embed

```bash
npx vite examples/player
```

Opens a standalone web page that mounts `<Player>` with the `HelloWorld` composition. Use the source as a copy/paste reference for embedding compositions in your own React or Next.js app. See [`examples/player/README.md`](examples/player/README.md).

## Multi-composition rendering

`render.mjs` reads `COMPOSITION_ID` and dispatches to per-composition input props.

```bash
# HelloWorld
TITLE='Custom title' SUBTITLE='Custom sub' node render.mjs

# TransitionsDemo
COMPOSITION_ID=TransitionsDemo \
  SCENE_ONE_TEXT='Hello' SCENE_TWO_TEXT='World' SCENE_THREE_TEXT='Ship it' \
  node render.mjs

# CaptionsDemo (drop your own SRT into public/captions/<file>.srt)
COMPOSITION_ID=CaptionsDemo SRT_PATH=captions/sample.srt node render.mjs
```

Output lands in `./out/<CompositionId>.mp4`.

## Tailwind

Tailwind v4 is enabled via `@remotion/tailwind-v4` in both [`remotion.config.ts`](remotion.config.ts) (Studio) and [`render.mjs`](render.mjs) (headless). Stylesheet entrypoint: [`src/index.css`](src/index.css).

Use `className` on container elements — see [`src/components/molecules/IntroSection/index.tsx`](src/components/molecules/IntroSection/index.tsx) for the canonical migration. **Avoid `transition-*` and `animate-*` Tailwind classes** — Remotion renders frame-by-frame, so CSS transitions don't apply. Animate via `useCurrentFrame()` instead.

## Lambda deploy (alternative to Docker)

```bash
# One-time IAM setup, then:
npm run lambda:deploy             # renders HelloWorld
npm run lambda:deploy CaptionsDemo
```

Full IAM + deploy + cleanup guide: [`docs/LAMBDA_DEPLOY.md`](docs/LAMBDA_DEPLOY.md).

## GitHub Actions

Three workflows in [`.github/workflows/`](.github/workflows/):

1. **Build & Publish** — pushes Docker image to `ghcr.io/{owner}/{repo}:main` on every push to main
2. **Render Video** — manual dispatch with a `composition_id` choice (HelloWorld | TransitionsDemo | CaptionsDemo) plus per-composition string inputs
3. **Upload to Releases** — attaches the rendered MP4 to a tagged GitHub release

### Setup (~2 min)

1. Settings → Packages → "Inherit access from source repository"
2. `git push origin main` — kicks off the first build
3. Actions tab → "Render Video" → "Run workflow" → pick a composition, customize inputs, run

## Update vendored skills

The `.claude/skills/remotion/` tree is a snapshot of `remotion-dev/skills`. To pull updates:

```bash
npm run skills:sync
```

The script clones upstream, replaces `.claude/skills/remotion/`, and writes the new commit SHA to `.claude/skills/remotion/SOURCE.md`.

## Cursor rules

For Cursor users, [`.cursor/rules/`](.cursor/rules/) carries five rule files (project structure, Remotion components, Docker, GitHub Actions, vendored skills) so AI completions in Cursor stay project-aware. These complement the Claude Code skills above; both can coexist.

## Project structure

```
.
├── .claude/skills/             — Claude Code skills (auto-loaded)
│   ├── remotion/               — vendored from remotion-dev/skills
│   └── remotion-docker-template/ — project-specific
├── .cursor/rules/              — Cursor AI rules
├── .github/workflows/          — CI: build + render + release
├── docs/LAMBDA_DEPLOY.md       — Lambda deploy guide
├── examples/player/            — standalone Player embed demo
├── public/captions/sample.srt  — sample SRT for CaptionsDemo
├── scripts/                    — sync-skills, deploy-lambda, build-and-push, test-local
├── src/
│   ├── components/             — atoms / molecules / organisms
│   ├── theme/colors.ts         — design tokens
│   ├── index.css               — Tailwind v4 entrypoint
│   └── index.tsx               — composition registrations
├── docker-compose.yml          — remotion-dev + remotion-render services
├── Dockerfile                  — node:22-bookworm-slim + Chrome deps
├── remotion.config.ts          — Studio webpack override (Tailwind)
└── render.mjs                  — headless render entry, COMPOSITION_ID-aware
```

## Scripts

- `./scripts/sync-remotion-skills.sh` — refresh `.claude/skills/remotion/` from upstream (`npm run skills:sync`)
- `./scripts/deploy-lambda.sh [composition]` — deploy + render on AWS Lambda (`npm run lambda:deploy`)
- `./scripts/test-local.sh [composition]` — local Docker render
- `./scripts/build-and-push.sh [tag]` — build + push image to GHCR

## License

Some entities require a Remotion company license — [read the terms](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

This template's own code is MIT.

**Built with [Remotion](https://remotion.dev) 4.0.459**
