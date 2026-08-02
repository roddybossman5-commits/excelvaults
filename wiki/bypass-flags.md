# Bypass Flags

Covers issues 1–4 from `Inbox/Raw Prompt Thoughts` in the Excel Vaults vault.

## Why One Flag `✅ VERIFIED`

The vault note asks for a bypass flag for the embedded WPBakery shortcodes (issue 3),
then says the same idea should cover the desktop nav fix (issue 4). Those are
implemented as **one mode**, not two independent booleans — otherwise there are four
combinations to test and only two that are meaningful.

| Mode | Shortcodes | Desktop nav |
|------|-----------|-------------|
| `raw` | Left in the copy, exactly as scraped | Hidden above `768px` — reproduces the live-site bug |
| `fixed` | Stripped, readable text kept | Visible at every viewport |

`raw` is for diffing against the live site. `fixed` is the deliverable.

## Resolution Order `✅ VERIFIED`

`src/GLOBAL/config/renderMode.js`, first hit wins:

1. `?mode=raw` / `?mode=fixed` — per-request override, **this is what Playwright drives**
2. `localStorage.renderMode` — sticky manual toggle
3. `REACT_APP_RENDER_MODE` — build default (see `.env.example`)
4. `fixed`

Invalid values are ignored rather than throwing.

## How It Reaches the UI `✅ VERIFIED`

`AppWrapper` resolves the mode once on mount and sets `document.documentElement`'s
`data-render-mode` attribute, so SCSS can branch without prop drilling.

The nav renders **identical markup in both modes** — only the CSS branch differs
(`.navbar__nav[data-raw-mobile-only='true']` gets `display: none` above
`$breakpoint-md`). This matters for verification: Playwright should assert on
*visibility*, not presence, or `raw` and `fixed` look the same to the DOM query.

## Shortcode Stripping `✅ VERIFIED`

`src/utils/shortcodes.js`:
- `stripShortcodes(copy)` — removes `[vc_*]` / `[/vc_*]` tags, but first lifts
  `text="..."` out of `[vc_custom_heading]` so headings survive
- `hasShortcodes(copy)` — predicate, used for logging

The regex tolerates the smart quotes (`”`) present in the scrape.

## Playwright Checks `✅ VERIFIED` — run 2026-08-02

All green against the dev server.

| # | Check | Result |
|---|-------|--------|
| 1 | `/?mode=fixed` @ 1280×800 → nav visible | `display: flex`, 5 links, visible ✅ |
| 2 | `/?mode=raw` @ 1280×800 → nav present but hidden | present, `display: none`, `navVisible: false` ✅ |
| 3 | `/?mode=raw` @ 1280×800 → hamburger also hidden | `hamburgerVisible: false` — Tracking genuinely unreachable ✅ |
| 4 | `/?mode=raw` @ 375×667 → hamburger opens full menu | 5 links incl. Tracking ✅ |
| 5 | `/about-us?mode=raw` → shortcodes leak | `[vc_row]`, `[vc_custom_heading`, smart quotes, `vc_custom_1595194250019` all present ✅ |
| 6 | `/about-us?mode=fixed` → clean | no `[vc_` / `[stm_`, headings preserved ✅ |
| 7 | `/services-grid`, `/contacts`, `/track-your-shipment` fixed | no shortcodes, all copy present ✅ |
| 8 | Every page | zero broken images ✅ |

**Check 3 is the one that matters** and is easy to omit: hiding the nav alone is not
the bug. If the hamburger stays visible on desktop, Tracking is still reachable and
RAW mode understates the problem. Assert on both.

Console was clean apart from two deliberate `console.error` calls from the
wrong-password path, plus React Router v7 future-flag warnings (benign).

### Auth flow `✅ VERIFIED`

| Check | Result |
|-------|--------|
| Wrong credentials | stays on `/tracking`, shows "Wrong Username Or Password" ✅ |
| Seeded credentials | redirects to `/account` ✅ |
| Reload `/account` | session restored from localStorage ✅ |
| Log out | redirects to `/tracking`, guard holds ✅ |
| `/tracking` + `/account` | render without marketing header/footer ✅ |
