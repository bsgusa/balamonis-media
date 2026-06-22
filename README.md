# Balamonis Studio — AI Creative Engine

The first product of **Balamonis Media**. A business types a one-line brief and the engine
generates a full campaign: ad concepts, a shot-listed short-form video, an original track,
and social posts — in seconds. You can then **copy or download the whole campaign as Markdown**
and take it straight into your workflow.

It's the public face of the studio *and* a working demo of AI-augmented production.

Built with Next.js 14 (App Router) + Tailwind, powered by Claude. Deploys to **Netlify**.

---

## What you need (one thing)

An **Anthropic API key** — this is what powers the generation.
Get one at https://console.anthropic.com/settings/keys

---

## Run it locally (optional — 2 minutes)

```bash
npm install
cp .env.example .env.local      # then paste your key into .env.local
npm run dev
```

Open http://localhost:3000

---

## Deploy it live on Netlify (the real goal)

### Step 1 — Get the code on GitHub
This is already a git repo. Commit your changes and push to a GitHub repository:

```bash
git add .
git commit -m "Balamonis Studio"
git push
```

### Step 2 — Import on Netlify
1. Go to https://app.netlify.com → **Add new site → Import an existing project**.
2. Pick your repo. Netlify auto-detects Next.js (build command `npm run build`, publish
   directory `.next`) — leave the defaults; `netlify.toml` already pins everything.
3. Before deploying, open **Environment variables** and add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your key (`sk-ant-...`)
4. Click **Deploy**.

That's it. In ~1–2 minutes you'll have a live URL like `your-site.netlify.app`.

> Every `git push` redeploys automatically.

> **Free-tier note:** Netlify serverless functions are capped at ~10 seconds. Campaign
> generation usually finishes well within that, but a very long brief can occasionally hit
> the limit — just re-run, or upgrade the plan for longer function timeouts.

---

## Make it yours

- **Custom domain** — Netlify → Domain management; point `studio.balamonis.com` at it.
- **Tighten the brand** — colors live in `tailwind.config.ts`; the voice and output structure
  live in `app/api/generate/route.ts` (the `SYSTEM` prompt). Change those two files and the
  whole studio shifts.
- **Capture leads** — add an email step before generation so every business that plays with
  it becomes a lead.

---

## Project map

```
app/
  layout.tsx              fonts, SEO + social metadata, page shell
  page.tsx                the studio UI, the generated "reel", and copy/download
  globals.css             film-grain texture, vignette, base styling
  icon.svg                favicon (gold "B" monogram)
  api/generate/route.ts   server route that calls Claude and returns the campaign JSON
netlify.toml              Netlify build config + Next.js runtime plugin
next.config.mjs           production security headers
tailwind.config.ts        the cinematic color + type system
.env.example              the one secret you need
```

---

## How updates work (for the auto-coder)

This repo is set up so Claude Code can pick up future changes cleanly:

- **`CLAUDE.md`** documents the architecture, conventions, and how to build/deploy — read it
  first before changing anything.
- A **SessionStart hook** (`.claude/`) prepares the environment automatically when a Claude
  Code web session opens (installs dependencies so lint/build just work).
- An optional **GitHub Action** (`.github/workflows/claude.yml`) lets you mention `@claude`
  on an issue or pull request to have changes coded for you — see the comment in that file
  for the one secret you need to enable it.

---

— Balamonis Media · AI-augmented production
