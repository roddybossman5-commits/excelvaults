# Log

## 2026-07-30 — Environment, repo, and scaffold

**Environment**
- Obsidian Local REST API re-enabled; stale `OBSIDIAN_API_KEY` in `~/.claude.json`
  replaced. Vault: **Excel Vaults**. MCP server needs a Claude Code restart to pick
  up the key — until then the vault is reachable over curl only.
- `gh` CLI switched to the `roddybossman5-commits` account.

**Repo**
- `git init -b main` in place (folder was empty; chose this over cloning the empty
  remote into a nested directory).
- `origin` → `https://github.com/roddybossman5-commits/excelvaults.git` (public, empty).
- Repo-local identity set to the project GitHub account (see repo git config),
  overriding the global `eamokuandoh@gmail.com`.

**Scaffold** — mirrored from `mangotv-main` after reading its structure
- CRA + React 18 + Router 6 + Redux Toolkit + SCSS, `legacy-peer-deps`, `ajv` pin
- `.mcp.json` with the Playwright MCP server (mangotv's Figma SSE entry dropped — no
  Figma source for this project)
- `wiki/` in the Karpathy pattern with confidence tags
- Routes for the five nav destinations + guarded `/account`
- Bypass flag (`renderMode.js`) covering both shortcodes and desktop nav
- Shortcode stripper, mock auth seeded from JSON, account view with the issue-5 fields
- `npm install` + `npm run build` both pass; build is 67.6 kB gzipped

**Deliberately not copied from mangotv**
- `.github/workflows/deploy.yml` (FTP deploy, needs a host + secrets)
- `vercel.json` (no deploy target chosen)
- `api/`, `scripts/`, `setupProxy.js` (no backend to proxy)

## 2026-07-30 — Site replication

- Read `Inbox/2026-07-30-Excel Vaults Dump`. It holds **only** the profile
  replacement values, not page copy — so copy was sourced from the live site.
- Pulled all five pages from the live WordPress REST API (see architecture.md for
  IDs and the 406 gotcha). Confirmed the theme is `transcargo` and that the
  WPBakery shortcodes really do leak to visitors as literal text — issue 3 verified
  against the live site, not just inferred.
- Discovered the nav's **Tracking** link points off-domain to
  `account.excelvaults.com`, a separate login app. That is the login page from the
  vault notes — not the WP "Track Your Shipment" page, which is a shipment search
  form and still carries the theme's "BestLogistics" placeholder text. Both are
  replicated, at `/tracking` and `/track-your-shipment`.
- Split content into `src/content/rawCopy.js` (verbatim, RAW mode) and
  `src/content/siteData.js` (structured, FIXED mode).
- Built out TopBar, Navbar, Footer, PageHeader, all five pages, the login portal and
  the account dashboard. Retired `PageStub`.
- Seeded the real profile values from the dump into `src/mocks/seedUsers.json`.
- Theme colours sampled from the live CSS (navy `#232c3b`, orange `#ff6900`).
- `npm run build` passes — 75.8 kB JS / 2.8 kB CSS gzipped.

## 2026-08-02 — Real assets + Playwright verification

**Assets.** Resolved the WP attachment IDs via `/wp-json/wp/v2/media/{id}` and
mirrored the real images into `public/images/`: hero safe-deposit shot, home intro
vault, delivery truck, FAQ gold/diamonds, guarantee background, two About images,
and the actual `logo.jpg`. Also pulled the login portal's own logo and cover
background from `account.excelvaults.com/picx/`. Emoji/gradient placeholders are
gone from the header, hero, guarantee band, FAQ, About and both portal screens.
Service-card icons are still glyphs — those are transcargo icon-font characters
(`stm-security` etc.), not images.

**Verification.** Full matrix run against the dev server — see
[bypass-flags.md](bypass-flags.md) for the table. All green.

Two fidelity bugs found and fixed during the run:
1. The portal login button rendered theme orange because the shared `.button` rule
   won on equal specificity. The real portal is a Bootstrap app — button is
   `btn-primary` blue. Fixed by scoping to `.portal__submit.button`.
2. The portal only filled 70vh, leaving dead white space below the fold. Now 100vh.

Console clean apart from two deliberate `console.error`s on the wrong-password path
and React Router v7 future-flag warnings.

## 2026-08-02 — Real icon font replaces emoji

Emoji placeholders are gone. The replica now uses **the theme's own icon font**,
mirrored from `excelvaults.com/wp-content/uploads/stm_fonts/stm/` into
`src/assets/fonts/`. Codepoints were read out of the theme's `stm.css` and are keyed
in `components/icons/StmIcon.js` by the same `drawing_icon` names the live shortcodes
pass, so the mapping stays traceable:

| Icon | Codepoint |
|------|-----------|
| `stm-security` | U+E951 |
| `stm-fast-delivery` | U+E950 |
| `stm-support` | U+E94F |
| `stm-packaging-and-storage` | U+E945 |
| `stm-warehousing-service` | U+E947 |
| `stm-ground-transport` | U+E943 |
| `stm-projects-done` | U+E946 |
| `stm-people-in-team` | U+E956 |

Icons inherit `currentColor`, so they follow the palette per band: **white** on the
dark Special Services / Services Grid bands (matching the live `icon_color="#ffffff"`)
and **theme orange** on the light "What makes us special?" band.

Three gotchas worth remembering:
1. The font must live under `src/`, not `public/`. An absolute `url('/fonts/…')` makes
   resolve-url-loader try to resolve it as a module and the build dies with
   `Cannot find module`.
2. Do not put literal private-use characters in JS source — they get mangled to
   mojibake in transit. Use backslash-u escapes.
3. Writing that file via PowerShell `-Encoding utf8` adds a BOM, which fails the CI
   build on the `unicode-bom` ESLint rule. Strip it.

Verified in-browser: font loads, 7 icons render, zero zero-width glyphs (no tofu),
no emoji left anywhere in the page text. `npm run build` passes.

**Open**
- Seed file holds a real live-site credential and the remote is public. See
  [mock-auth.md](mock-auth.md) before pushing.
- No commits yet.
- RAW mode verified on Home and About; the other three pages share the same
  `RawCopy` path but were only checked in FIXED mode.
