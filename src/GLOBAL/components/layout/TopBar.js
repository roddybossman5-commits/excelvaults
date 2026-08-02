import React from 'react';
import { OFFICES } from '../../../content/siteData';
import '../styles/TopBar.scss';

/**
 * Three-office strip above the header, matching the live site.
 * Hidden below the md breakpoint there too.
 */
export default function TopBar() {
  console.log('[TopBar] rendering offices:', OFFICES.length);

  return (
    <div className="topbar">
      <div className="container topbar__inner">
        {OFFICES.map((office) => (
          <div className="topbar__office" key={office.label}>
            <span className="topbar__label">{office.label}</span>
            <a className="topbar__phone" href={`tel:${office.phone.replace(/\s/g, '')}`}>
              {office.phone}
            </a>
            <a className="topbar__email" href={`mailto:${office.email}`}>
              {office.email}
            </a>
            {office.hours && <span className="topbar__hours">{office.hours}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
