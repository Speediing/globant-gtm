# Globant x SpaceXAI

Password-gated Grok Bot leave-behind for Globant.

## What it is

Three AI Pod workflows use the source template's storyboard, artifact, and interactive agent-computer patterns. Each scene ends with a finished artifact. Customer claims are limited to linked public Globant sources.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site password is read from `SITE_PASSWORD`.

## Architecture

- Next.js `15.5.24`
- `src/` App Router tree
- Geist package fonts
- vGPU hero telemetry
- Server-side password gate

## Deploy

Deploy under the `jasonwiker` Vercel team with `SITE_PASSWORD` set for the production project. The target alias is `globant-grokbot.vercel.app`.
