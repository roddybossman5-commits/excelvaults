# Architecture

## Tech Stack `✅ VERIFIED`

Deliberately mirrors mangotv so the same workflow and muscle memory apply.

| Layer | Tech | Version |
|-------|------|---------|
| UI | React | 18.2 |
| Routing | React Router | 6.4.2 |
| State | Redux Toolkit | 1.9.7 |
| HTTP | Axios | 0.27.2 |
| Styling | SCSS (Sass 1.56.1) | — |
| Icons | react-icons | 4.4.0 |
| Build | react-scripts (CRA) | 5.0.1 |

`ajv ^8.18.0` is pinned as a direct dependency. Without it, `ajv-keywords` resolves against
the hoisted ajv v6 and `npm run build` dies with `MODULE_NOT_FOUND` on
`ajv/dist/compile/codegen`. mangotv carries the same pin for the same reason. `✅ VERIFIED`

`.npmrc` sets `legacy-peer-deps=true`, again matching mangotv.

## Directory Structure `✅ VERIFIED`

```
src/
├── index.js                       # React root, Provider, AppWrapper
├── App.js                         # BrowserRouter, routes, ProtectedRoute guard
├── AppWrapper.js                  # Init: resolves render mode, stamps <html data-render-mode>
├── _global.scss                   # Design tokens ONLY (no rule output — safe to @use everywhere)
│
├── styles/
│   └── base.scss                  # Base element styles, imported once from index.js
│
├── GLOBAL/
│   ├── components/
│   │   ├── icons/                 # StmIcon — theme icon font wrapper
│   │   ├── layout/                # TopBar, Navbar, Footer, PageHeader, RawCopy
│   │   └── styles/                # Co-located SCSS
│   │
│   ├── config/
│   │   └── renderMode.js          # The bypass flag — see bypass-flags.md
│   │
│   ├── pages/
│   │   ├── home/                  # HomePage
│   │   ├── about/                 # AboutPage
│   │   ├── services/              # ServicesPage
│   │   ├── contact/               # ContactPage
│   │   ├── shipment/              # ShipmentPage (WP shipment search form)
│   │   ├── tracking/              # TrackingPage (the login portal)
│   │   └── account/               # AccountPage (post-login dashboard)
│   │
│   └── redux/
│       ├── store.js               # configureStore (1 reducer)
│       ├── mockAuthService.js     # Seed-file-backed auth
│       └── slice/authSlice.js     # login thunk, logout, localStorage session
│
├── assets/fonts/                  # stm icon font, mirrored from the live theme
│
├── content/
│   ├── rawCopy.js                 # Verbatim WPBakery strings — RAW mode
│   └── siteData.js                # Same copy as structured data — FIXED mode
│
├── mocks/
│   ├── seedUsers.example.json     # Committed template + fallback
│   └── seedUsers.local.json       # Real creds, GITIGNORED — see mock-auth.md
│
└── utils/
    └── shortcodes.js              # WPBakery shortcode stripper
```

## SCSS Convention `✅ VERIFIED`

`_global.scss` holds **variables only**. CRA compiles each SCSS import as its own
unit, so any rule placed there would be emitted once per importing file. Element
styles therefore live in `styles/base.scss`, imported a single time from `index.js`.

Component stylesheets start with `@use '../../../global' as *;`.

## Entry Point Flow `✅ VERIFIED`

```
index.js
  └── <Provider store={store}>
        └── <AppWrapper>          # Resolves render mode, sets data-render-mode on <html>
              └── <App>           # BrowserRouter + Routes + Navbar/Footer
```

## Routes `✅ VERIFIED`

Paths match the live site's slugs so URLs are comparable one-to-one.

| Path | Component | Notes |
|------|-----------|-------|
| `/` | HomePage | Hero, counters, services, guarantee band, FAQ, quote form |
| `/about-us` | AboutPage | Intro, advantages, CTA, two-column detail |
| `/services-grid` | ServicesPage | Three tinted service columns |
| `/contacts` | ContactPage | Locations, contact form, tel/email |
| `/track-your-shipment` | ShipmentPage | The WP shipment form — **not** the nav's Tracking link |
| `/tracking` | TrackingPage | **Login portal.** Replicates `account.excelvaults.com` |
| `/account` | AccountPage | Guarded dashboard; redirects to `/tracking` when logged out |
| `*` | → `/` | |

`/tracking` and `/account` render **without** the marketing header/footer — on the
real site they live on a separate host with their own chrome (`BARE_ROUTES` in
`App.js`). `✅ VERIFIED`

## Source of the Replica `✅ VERIFIED`

Live site is WordPress 6.9.5, theme **transcargo** (a StylemixThemes "Logistics"
demo — the original `guid` still points at `logistics.stylemixthemes.com`).

Copy was taken from the WP REST API, not scraped HTML:
`https://excelvaults.com/wp-json/wp/v2/pages/{id}` → `content.rendered`

| Page | ID |
|------|-----|
| Home | 1269 |
| About Us | 415 |
| Services Grid | 685 |
| Track Your Shipment | 471 |
| Contacts | 442 |

Gotchas hit while fetching: `?per_page=&_fields=` returns **406** (mod_security);
single-page endpoints work fine with a browser UA and `Accept: application/json`.
The `stm_services` custom post type is not exposed over REST.

Palette sampled from the live CSS: navy `#232c3b`, theme orange `#ff6900`.

## Assets `✅ VERIFIED`

Live imagery is referenced by WP attachment ID (`[vc_single_image image="1313"]`).
Those IDs were resolved via `/wp-json/wp/v2/media/{id}` and the real files mirrored
into `public/images/` rather than hotlinked. The login portal's logo and cover image
came from `account.excelvaults.com/picx/`.

Icons use the theme's own **stm** icon font, mirrored into `src/assets/fonts/` — see
`components/icons/StmIcon.js`. The font must stay under `src/`; an absolute
`url('/fonts/…')` makes resolve-url-loader treat it as a module and the build fails.

## Not Yet Built `❓ NEEDS-CLARIFICATION`

- Deployment. mangotv deploys via GitHub Actions → FTP (`SamKirkland/FTP-Deploy-Action`)
  using `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` secrets, and also carries a
  `vercel.json`. Neither was copied here — no target host has been chosen.
