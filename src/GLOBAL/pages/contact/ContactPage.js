import React, { useState } from 'react';
import { getRenderMode, MODES } from '../../config/renderMode';
import RawCopy from '../../components/layout/RawCopy';
import PageHeader from '../../components/layout/PageHeader';
import { CONTACTS, OFFICES, SITE } from '../../../content/siteData';
import { RAW_CONTACTS } from '../../../content/rawCopy';
import './ContactPage.scss';

export default function ContactPage() {
  const mode = getRenderMode();
  const [submitted, setSubmitted] = useState(false);

  console.log('[ContactPage] rendering in mode:', mode);

  if (mode === MODES.RAW) {
    return (
      <>
        <PageHeader title="Contacts" />
        <RawCopy copy={RAW_CONTACTS} />
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('[ContactPage] contact form submitted (no backend — display only)');
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title="Contacts" />

      <section className="section">
        <div className="container contacts">
          <div className="contacts__locations">
            <h2>{CONTACTS.locationsHeading}</h2>
            {OFFICES.map((office) => (
              <p key={office.label}>{office.address}</p>
            ))}
          </div>

          <div className="contacts__form">
            <h2>{CONTACTS.getInTouchHeading}</h2>
            <p>{CONTACTS.getInTouchCopy}</p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid--2">
                <div>
                  <input className="field" name="name" placeholder="Name *" required />
                  <input className="field" name="email" type="email" placeholder="E-mail *" required />
                </div>
                <textarea className="field" name="message" rows="7" placeholder="Message *" required />
              </div>

              <label className="contacts__check">
                <input type="checkbox" name="newsletter" /> Subscribe to our newsletter
              </label>

              <button className="button" type="submit">Submit →</button>

              {submitted && (
                <p role="status">
                  Thanks — this replica has no backend, so nothing was sent.
                </p>
              )}
            </form>

            <div className="grid grid--2 contacts__details">
              <div>
                <h2>{CONTACTS.telHeading}</h2>
                <p>{OFFICES[0].phone}</p>
              </div>
              <div>
                <h2>{CONTACTS.emailHeading}</h2>
                <p>
                  {SITE.email} {SITE.secondaryEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
