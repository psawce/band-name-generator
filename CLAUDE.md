# Band Name Generator

A Next.js app that generates band names using Claude AI or a curated human-written list.

## Stack
- **Next.js 15** / **React 19**
- **Tailwind CSS** (config only — styles are written inline/in a `styles` string in `page.js`)
- **Anthropic SDK** (`@anthropic-ai/sdk`) — Claude powers AI name generation
- All styles and app logic live in `app/page.js`
- API route: `app/api/generate/route.js` (calls Claude, returns a single band name)

## Workflow
1. Make changes here in Claude Code
2. Push to GitHub — either via `git push` in terminal (requires `gh` auth) or **GitHub Desktop**
3. Vercel detects the push to `main` and auto-deploys — live in ~60 seconds

**GitHub repo:** https://github.com/psawce/band-name-generator  
**Deployed on:** Vercel (auto-deploys from `main`)

## Running locally
```
npm run dev
```
Runs on http://localhost:3000. The preview server is configured in `.claude/launch.json` under the name `band-name-generator`.

## How the app works
- **Two modes:** AI Generated (calls Claude via `/api/generate`) and Human Generated (picks from a curated list of ~130 names in `page.js`)
- **Filters:** Genre (with autocomplete), Vibe/mood, Required word, Word count (1–6)
- **Save & Share:** Users can save favorites and share via Messages, WhatsApp, etc.
- **AI generation** uses `claude-opus-4-6` with a 3-second minimum loading time so the equalizer bar animation always plays fully
- **Equalizer animation** plays in the result card while AI is generating

## Key data in page.js
- `LIST_NAMES` — the curated human-written band names
- `HUMAN_NAME_GENRE_BY_NAME` — maps each human name to a genre
- `GENRES` — full list of ~200 genres for autocomplete
- `RANDOM_SEEDS` — random themes injected into the AI prompt for variety

## Design
- Dark navy/black theme with gradient background
- Primary accent: `#005dff` (buttons), `#4d88ff` / `#5b90ff` (text/labels)
- Result card: deep blue gradient (`#0d2d80` → `#0720b0` → `#1508a8`)
