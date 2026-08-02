# Excel Vaults Clone

Replica of excelvaults.com. Structure and workflow mirror the `mangotv-main` project,
including the Playwright-based feature verification loop.

Requirements live in the **Excel Vaults** Obsidian vault under `Inbox/`.

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Opens on `http://localhost:3000`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server |
| `npm run build` | Production build (run before every commit) |
| `npm run lint` | ESLint, errors only |
| `npm test` | Tests |

## Render Modes

The app runs in one of two modes, toggled with `?mode=raw` or `?mode=fixed`:

- **`raw`** — reproduces the live site as scraped: WPBakery shortcodes visible in the
  copy, nav links hidden on desktop
- **`fixed`** — shortcodes stripped, nav visible at every viewport (the deliverable)

Default comes from `REACT_APP_RENDER_MODE`. See [wiki/bypass-flags.md](wiki/bypass-flags.md).

## Mock Login

`/tracking` is the login route. Credentials are seeded from
`src/mocks/seedUsers.json` — add an object to `users` to register another account,
no code change needed.

⚠️ Auth is client-side, so the seed file is compiled into the public bundle and its
credentials are readable by anyone. That is a deliberate tradeoff so the deployed
demo is usable — see [wiki/mock-auth.md](wiki/mock-auth.md).

## Project Structure

```
/excelvaults-clone
├── /src
│   ├── /GLOBAL
│   │   ├── /components   Reusable UI (layout + co-located SCSS)
│   │   ├── /config       renderMode.js — the bypass flag
│   │   ├── /pages        Route components
│   │   └── /redux        Store, slices, mock auth service
│   ├── /mocks            Credential seed data
│   ├── /styles           Base element styles
│   ├── /utils            Shortcode stripping
│   └── _global.scss      Design tokens
├── /public               Static files
├── /wiki                 Living knowledge base — start at INDEX.md
└── package.json
```

## Docs

Start at [wiki/INDEX.md](wiki/INDEX.md).
