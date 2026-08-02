import React from 'react';
import { Link } from 'react-router-dom';
import { SITE, NAV_LINKS } from '../../../content/siteData';
import '../styles/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <h4>{SITE.name}</h4>
          <p>
            Private and business safe deposit, private wealth management, investment,
            trust and brokerage services.
          </p>
        </div>

        <div className="footer__col">
          <h4>Navigation</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container">{SITE.copyright}</div>
      </div>
    </footer>
  );
}
