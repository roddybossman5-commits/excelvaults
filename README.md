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

`/tracking` is the login route. Credentials are seeded from a JSON file:

```bash
cp src/mocks/seedUsers.example.json src/mocks/seedUsers.local.json
# then fill in real values
```

`seedUsers.local.json` is **gitignored** — this repo is public and the working
credential is a real live-site login, not a fixture. The committed
`seedUsers.example.json` holds dummy values and acts as the runtime fallback, so a
fresh clone builds and runs; it just cannot log in until you supply the local file.

Add an object to `users` to register another account. See
[wiki/mock-auth.md](wiki/mock-auth.md).

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
