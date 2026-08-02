import React, { useEffect, useState } from 'react';
import App from './App';
import { getRenderMode } from './GLOBAL/config/renderMode';

/**
 * Init shell, mirroring mangotv's AppWrapper. Resolves the bypass flag once and
 * stamps it on <html data-render-mode> so SCSS can branch on it too.
 */
export default function AppWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mode = getRenderMode();
    document.documentElement.setAttribute('data-render-mode', mode);
    console.log('[AppWrapper] init complete, render mode:', mode);
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="app-loading">Loading…</div>;
  }

  return <App />;
}
