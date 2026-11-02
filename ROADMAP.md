# Roadmap — Balamonis Media (Balamonis LLC)

Media site with server-side brand/what extraction and a Lexora AI cross-sell
upsell module. Professional Services, Tech, Global Mobility, High-Net-Worth,
Other categories detected after brand extraction; upsell appended to response
as `{ campaign, upsell }`.

Ownership: **Balamonis LLC**. Gets no new features during the 90-day Lexora
focus (decided 2026-10-22) — maintained only.

## [NOW] — Maintain (no new features in 90-day window)

- [x] `app/api/generate/upsell.ts` — `detectCategory()` + `buildUpsell()`
- [x] `app/api/generate/route.ts` — upsell built server-side; type safety fixed
  (`b is any` → proper `Extract` type guard); inline strategic_upsell removed
  from SYSTEM prompt
- [x] `feature/route-refactor` merged to `main`
- [ ] Typecheck clean, tests pass, build green
- [ ] No new features — Balamonis LLC is in maintenance mode for 90 days

## [NEXT] — After the 90-day Lexora window

- [ ] Separate Lexora upsell module into its own package
- [ ] AI integration: draft media copy, SEO titles, and social posts from
  extracted brand data
- [ ] Wire Media pending items into the AI Engineering Toolkit tracker

## [LATER] — AI-powered media operations

- [ ] Auto-generate upsell campaigns from brand/what extraction
- [ ] AI-drafted outreach emails to prospective media clients
- [ ] Content performance scoring and suggested next topics

## AI integration

- `upsell.ts` categorizes brands server-side; AI can draft the campaign copy
- AI Engineering Toolkit `inbox_files` source can scan Media notes for
  `TODO`/`PENDING` markers
- Weekly review report can include Media repo pending items

## Rules for this repo

- Work on a branch, never `main`. Small commits with clear messages.
- Before ending a session: update this roadmap and append a dated entry to
  `reports/`.
- Never commit secrets.
