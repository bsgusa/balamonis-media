# CLAUDE.md

Guidance for Claude Code (and any automated session) working in this repository.
Read this first.

## What this is

**Balamonis Studio — AI Creative Engine.** A single-page web app: a business types a
one-line brief, and Claude generates a full campaign (ad concepts, a shot-listed video, an
original track, and social posts). The result can be copied or downloaded as Markdown.

It is the public marketing site for **Balamonis Media** and a live demo of the product.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling (custom cinematic theme)
- **@anthropic-ai/sdk** — calls Claude from a server route
- Deploys to **Netlify** (Next.js runtime plugin)

## Commands

```bash
npm install      # install deps (the SessionStart hook runs this automatically on web)
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build — ALSO the source-of-truth type check
npm run lint     # ESLint (next/core-web-vitals)
```

Always run `npm run build` before committing — it type-checks the whole app. There is no
unit-test suite yet.

## Architecture / file map

```
app/
  layout.tsx              fonts, SEO + Open Graph metadata, page shell
  page.tsx                client UI: brief form, the generated "reel", copy/download
  globals.css             film-grain texture, vignette, base styling
  icon.svg                favicon (gold "B" monogram)
  api/generate/route.ts   server route → calls Claude, returns campaign JSON
netlify.toml              Netlify build + @netlify/plugin-nextjs
next.config.mjs           production security headers
tailwind.config.ts        color + type system (gold/cream/ink palette)
.claude/                  SessionStart hook (auto-installs deps on web sessions)
.github/workflows/        Claude Code GitHub Action (the "auto-coder")
```

## The data contract (keep these in sync)

The shape of the generated campaign is defined in **three** places that must agree:

1. `app/api/generate/route.ts` — the `SYSTEM` prompt describes the exact JSON shape Claude returns.
2. `app/page.tsx` — the `Campaign` / `Ad` / `Shot` / `Social` TypeScript types.
3. `app/page.tsx` — `campaignToMarkdown()`, which serializes that shape for copy/download.

If you change one (e.g. add a field to the campaign), update all three.

## Conventions & constraints

- **Model:** `claude-sonnet-4-6` in `route.ts`. Chosen deliberately for speed — the route
  must return inside Netlify's serverless function timeout (~10s on free tier). Do not switch
  to a slower model without a reason; if you need more quality, prefer prompt tuning.
- **Secrets:** the only required env var is `ANTHROPIC_API_KEY` (server-side). Never commit
  it, never expose it to the client, never log it. `.env*.local` is gitignored.
- **Output is JSON:** the route parses Claude's reply as JSON (with a brace-extraction
  fallback). Keep the prompt's "JSON only" instruction if you touch it.
- **Styling:** reuse the existing Tailwind theme tokens (`gold`, `cream`, `ink`, `muted`,
  `line`, `panel`) and the mono/`tracking-marquee` label style — don't introduce new colors
  or fonts casually; the cinematic look is the brand.
- **Accessibility/motion:** respect the existing `prefers-reduced-motion` handling in
  `globals.css`.

## Deploying

Push to the default branch → Netlify auto-builds and deploys. The only manual step is setting
`ANTHROPIC_API_KEY` in Netlify (Site configuration → Environment variables). See `README.md`.

## Known follow-ups (nice-to-haves, not blockers)

- `app/layout.tsx` loads Google Fonts via `<link>`; migrating to `next/font` would remove a
  lint warning and improve performance.
- No automated tests yet — adding a couple around `campaignToMarkdown()` would be cheap.
- Remaining `npm audit` advisories need Next.js 16 (a major upgrade) to clear.
