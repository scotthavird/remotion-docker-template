# CaptionPage

Renders one page of TikTok-style captions produced by `createTikTokStyleCaptions()`. Highlights the currently-spoken token by comparing each token's `fromMs`/`toMs` against the absolute video time.

## Props

```ts
{
  page: TikTokPage;          // from @remotion/captions
  highlightColor?: string;   // default "#39E508"
  baseColor?: string;        // default "#FFFFFF"
  fontSize?: number;         // default 80
}
```

## Pattern

`CaptionPage` is meant to be used inside a `<Sequence>` whose `from`/`durationInFrames` are derived from the page's `startMs`. The parent (`CaptionsDemo` organism) takes care of that math; this molecule just renders.

See `.claude/skills/remotion/rules/display-captions.md` for the full pattern.
