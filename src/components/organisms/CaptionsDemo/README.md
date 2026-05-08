# CaptionsDemo

Vertical (1080×1920) composition that fetches an SRT file from `public/`, parses it with `parseSrt()`, groups tokens into TikTok-style pages with `createTikTokStyleCaptions()`, and renders each page through the `CaptionPage` molecule with per-word highlighting.

## Specs

- Resolution: 1080×1920 (vertical)
- FPS: 30
- Duration: 300 frames (10s)

## Props

```ts
{
  srtPath: string; // path inside public/, default "captions/sample.srt"
}
```

## Customizing the captions

Drop your own SRT into `public/captions/<your-file>.srt`, then either:

- Update the `defaultProps` for `CaptionsDemo` in `src/index.tsx`
- Or pass `SRT_PATH=captions/your-file.srt` to `node render.mjs`

## Implementation notes

- Uses `useDelayRender()` to hold the render until the SRT fetch resolves — without this the renderer would skip the captions on first paint.
- `combineTokensWithinMilliseconds` is set to `1200ms`. Lower for word-by-word; higher for full sentences per page.
- See `.claude/skills/remotion/rules/import-srt-captions.md` and `display-captions.md` for the canonical patterns.
