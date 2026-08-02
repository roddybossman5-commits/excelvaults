import React from 'react';
import { Link } from 'react-router-dom';
import { getRenderMode, MODES } from '../../config/renderMode';
import RawCopy from '../../components/layout/RawCopy';
import PageHeader from '../../components/layout/PageHeader';
import { ABOUT } from '../../../content/siteData';
import { RAW_ABOUT } from '../../../content/rawCopy';
import './AboutPage.scss';

export default function AboutPage() {
  const mode = getRenderMode();
  console.log('[AboutPage] rendering in mode:', mode);

  if (mode === MODES.RAW) {
    return (
      <>
        <PageHeader title="About Us" />
        <RawCopy copy={RAW_ABOUT} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="About Us" />

      <section className="section">
        <div className="container grid grid--2">
          <div>
            <h3>{ABOUT.heading}</h3>
            {ABOUT.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <img
            className="about__art"
            src={`${process.env.PUBLIC_URL}/images/about-vault.jpg`}
            alt="Excel Vaults bank vault"
          />
        </div>
      </section>

      <section className="section section--band">
        <div className="container about__advantages-row">
          <div>
            <h3>{ABOUT.advantagesHeading}</h3>
            <ul className="about__advantages">
              {ABOUT.advantages.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </div>
          <img
            className="about__art about__art--secondary"
            src={`${process.env.PUBLIC_URL}/images/about-secondary.jpg`}
            alt="Excel Vaults courier operations"
          />
        </div>
      </section>

      <section className="about__cta">
        <div className="container about__cta-inner">
          <h2>{ABOUT.ctaHeading}</h2>
          <Link className="button button--outline" to="/contacts">
            {ABOUT.ctaButton} →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid--2">
          {ABOUT.columns.map((column) => (
            <div key={column.heading}>
              <h3>{column.heading}</h3>
              <p>{column.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
