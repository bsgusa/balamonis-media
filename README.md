# Balamonis Studio — AI Creative Engine

The first product of **Balamonis Media**. A business types a one-line brief and the engine
generates a full campaign: ad concepts, a shot-listed short-form video, an original track,
and social posts — in seconds. It's the public face of the studio *and* a working demo of
AI-augmented production.

Built with Next.js 14 (App Router) + Tailwind, powered by Claude. Deploys to Vercel with zero config.

---

## What you need (one thing)

An **Anthropic API key** — this is what powers the generation.
Get one at https://console.anthropic.com/settings/keys (you already use Claude, so this is the same account).

---

## Run it locally (optional — 2 minutes)

```bash
npm install
cp .env.example .env.local      # then paste your key into .env.local
npm run dev
```

Open http://localhost:3000

---

## Deploy it live (the real goal)

### Step 1 — Put it on GitHub
```bash
git init
git add .
git commit -m "Balamonis Studio — initial"
```
Create an empty repo on github.com (name it `balamonis-studio`), then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/balamonis-studio.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com → **Add New → Project**
2. Import your `balamonis-studio` repo (Vercel auto-detects Next.js — leave all settings default)
3. Before clicking Deploy, open **Environment Variables** and add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key (`sk-ant-...`)
4. Click **Deploy**.

That's it. In ~60 seconds you'll have a live URL like `balamonis-studio.vercel.app`.

> Every time you `git push`, Vercel redeploys automatically.

---

## Make it yours next

- **Custom domain** — in Vercel → Settings → Domains, point `studio.balamonis.com` (or whatever you own) at it.
- **Tighten the brand** — colors live in `tailwind.config.ts`, the voice/output structure lives in `app/api/generate/route.ts` (the `SYSTEM` prompt). Change those two files and the whole studio shifts.
- **Add a waitlist / contact capture** — so every business that plays with it becomes a lead.
- **Gate it** — add a simple email step before generation to collect leads, or usage limits if you want to charge.

---

## Project map

```
app/
  layout.tsx              fonts, metadata, page shell
  page.tsx                the studio UI (hero + brief form + the generated "reel")
  globals.css             film-grain texture, vignette, base styling
  api/generate/route.ts   server route that calls Claude and returns the campaign JSON
tailwind.config.ts        the cinematic color + type system
.env.example              the one secret you need
```

— Balamonis Media · AI-augmented production
