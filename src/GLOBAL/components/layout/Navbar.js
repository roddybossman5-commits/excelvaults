import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getRenderMode, MODES } from '../../config/renderMode';
import { NAV_LINKS, OFFICES } from '../../../content/siteData';
import '../styles/Navbar.scss';

export { NAV_LINKS };

/**
 * Issues 1, 2 and 4 from Inbox/Raw Prompt Thoughts.
 *
 * The live site renders its nav twice — a desktop list and a mobile list — but the
 * desktop one never becomes visible, so Home / About Us / Services / Tracking /
 * Contacts only appear on mobile, and the Tracking (login) route is unreachable on
 * a desktop screen.
 *
 * RAW mode reproduces that faithfully. FIXED mode shows the desktop nav.
 * Markup is identical in both — only the CSS branch differs — so Playwright must
 * assert on visibility, not presence.
 */
export default function Navbar() {
  const mode = getRenderMode();
  const [menuOpen, setMenuOpen] = useState(false);

  console.log('[Navbar] rendering:', { mode, links: NAV_LINKS.length, menuOpen });

  return (
    <header className="navbar" data-mode={mode}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <img
            className="navbar__logo"
            src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
            alt="Excel Vaults"
          />
        </NavLink>

        <nav
          className="navbar__nav"
          data-raw-mobile-only={mode === MODES.RAW ? 'true' : 'false'}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="navbar__link"
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <span className="navbar__call">CALL NOW: {OFFICES[0].phone}</span>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="navbar__link"
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
