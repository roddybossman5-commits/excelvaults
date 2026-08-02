import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRenderMode, MODES } from '../../config/renderMode';
import RawCopy from '../../components/layout/RawCopy';
import StmIcon from '../../components/icons/StmIcon';
import { HOME, SERVICES, FREIGHT_TYPES, INCOTERMS } from '../../../content/siteData';
import { RAW_HOME } from '../../../content/rawCopy';
import './HomePage.scss';

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq">
      {HOME.faq.map((entry, index) => {
        const open = index === openIndex;
        return (
          <div className="faq__item" key={entry.title}>
            <button
              type="button"
              className="faq__toggle"
              aria-expanded={open}
              onClick={() => {
                console.log('[HomePage] FAQ toggled:', { title: entry.title, open: !open });
                setOpenIndex(open ? -1 : index);
              }}
            >
              {entry.title}
              <span aria-hidden="true">{open ? '⌃' : '⌄'}</span>
            </button>
            {open && <p className="faq__body">{entry.body}</p>}
          </div>
        );
      })}
    </div>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('[HomePage] quote form submitted (no backend — display only)');
    setSubmitted(true);
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <h2>{HOME.quoteHeading}</h2>

      <div className="quote-form__grid">
        <div>
          <select className="field" name="freight_type" defaultValue="" aria-label="Freight Type">
            <option value="">Freight Type</option>
            {FREIGHT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input className="field" name="departure_city" placeholder="City of departure" />
          <input className="field" name="delivery_city" placeholder="Delivery city" />
          <select className="field" name="incoterms" defaultValue="" aria-label="Incoterms">
            <option value="">Incoterms</option>
            {INCOTERMS.map((term) => (
              <option key={term} value={term}>{term}</option>
            ))}
          </select>
          <input className="field" name="total_weight" placeholder="Total gross weight (KG)" />
        </div>

        <div>
          <input className="field" name="dimension" placeholder="Dimension" />
          <input className="field" name="email" type="email" placeholder="Email" />
          <textarea className="field" name="message" rows="6" placeholder="Message" />
          <button className="button" type="submit">Submit →</button>
        </div>
      </div>

      {submitted && (
        <p className="quote-form__notice" role="status">
          Thanks — this replica has no backend, so nothing was sent.
        </p>
      )}
    </form>
  );
}

export default function HomePage() {
  const mode = getRenderMode();
  console.log('[HomePage] rendering in mode:', mode);

  if (mode === MODES.RAW) {
    return <RawCopy copy={RAW_HOME} />;
  }

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-safe-deposit.jpeg)`,
        }}
      >
        <div className="hero__overlay" />
      </section>

      <section className="section">
        <div className="container grid grid--2">
          <div>
            <h2>{HOME.heroHeading}</h2>
            {HOME.heroCopy.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <Link className="button" to="/about-us">About Us →</Link>
          </div>
          <img
            className="hero__aside"
            src={`${process.env.PUBLIC_URL}/images/home-intro.jpg`}
            alt="Excel Vaults safe deposit facility"
          />
        </div>
      </section>

      <section className="counters">
        <div className="container grid grid--4">
          {HOME.counters.map((counter) => (
            <div className="counter" key={counter.title}>
              <strong className="counter__value">{counter.value.toLocaleString()}</strong>
              <span className="counter__title">{counter.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <h2 className="special-services__heading">{HOME.servicesHeading}</h2>
          <p className="special-services__intro">{HOME.servicesIntro}</p>

          <div className="grid grid--3 special-services__grid">
            {SERVICES.map((service) => (
              <article className="service-card" key={service.title}>
                <StmIcon name={service.icon} className="service-card__icon" size={56} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="guarantee"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/guarantee-bg.jpg)`,
        }}
      >
        <div className="container guarantee__inner">
          <div>
            <h2>{HOME.guaranteeHeading}</h2>
            <p>{HOME.guaranteeCopy}</p>
          </div>
          <img
            className="guarantee__art"
            src={`${process.env.PUBLIC_URL}/images/delivery-truck.png`}
            alt="Excel Vaults delivery vehicle"
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid grid--2">
          <img
            className="faq__art"
            src={`${process.env.PUBLIC_URL}/images/faq.png`}
            alt="Excel Vaults storage options"
          />
          <div>
            <h2>FAQ</h2>
            <Faq />
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="container grid grid--2">
          <div>
            <h2>{HOME.specialHeading}</h2>
            <p>{HOME.specialCopy}</p>

            <div className="special-items">
              {HOME.specialItems.map((item) => (
                <div className="special-items__item" key={item.title}>
                  <StmIcon name={item.icon} size={40} />
                  <strong>{item.title}</strong>
                </div>
              ))}
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
