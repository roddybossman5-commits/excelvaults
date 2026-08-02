/**
 * Bypass flag — see wiki/bypass-flags.md
 *
 * Covers BOTH issue 3 (WPBakery shortcodes embedded in the scraped copy) and
 * issue 4 (desktop nav fix) from Inbox/Raw Prompt Thoughts. One mechanism, not two.
 *
 * Resolution order (first hit wins):
 *   1. ?mode=raw|fixed          — per-request override, what Playwright drives
 *   2. localStorage.renderMode  — sticky manual toggle
 *   3. REACT_APP_RENDER_MODE    — build default
 *   4. 'fixed'
 */

export const MODES = { RAW: 'raw', FIXED: 'fixed' };

const STORAGE_KEY = 'renderMode';

const isValid = (value) => value === MODES.RAW || value === MODES.FIXED;

export function getRenderMode() {
  const fromQuery = new URLSearchParams(window.location.search).get('mode');
  if (isValid(fromQuery)) {
    console.log('[renderMode] resolved from query string:', fromQuery);
    return fromQuery;
  }

  const fromStorage = window.localStorage.getItem(STORAGE_KEY);
  if (isValid(fromStorage)) {
    console.log('[renderMode] resolved from localStorage:', fromStorage);
    return fromStorage;
  }

  const fromEnv = process.env.REACT_APP_RENDER_MODE;
  if (isValid(fromEnv)) {
    console.log('[renderMode] resolved from env:', fromEnv);
    return fromEnv;
  }

  console.log('[renderMode] no override found, defaulting to:', MODES.FIXED);
  return MODES.FIXED;
}

export function setRenderMode(mode) {
  if (!isValid(mode)) {
    console.error('[renderMode] refused to set invalid mode:', { mode });
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, mode);
  console.log('[renderMode] persisted mode:', mode);
}

export const isRawMode = () => getRenderMode() === MODES.RAW;
