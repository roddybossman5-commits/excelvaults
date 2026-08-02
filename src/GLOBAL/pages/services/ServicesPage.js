import React from 'react';
import { getRenderMode, MODES } from '../../config/renderMode';
import RawCopy from '../../components/layout/RawCopy';
import PageHeader from '../../components/layout/PageHeader';
import StmIcon from '../../components/icons/StmIcon';
import { SERVICES } from '../../../content/siteData';
import { RAW_SERVICES } from '../../../content/rawCopy';
import './ServicesPage.scss';

export default function ServicesPage() {
  const mode = getRenderMode();
  console.log('[ServicesPage] rendering in mode:', mode);

  if (mode === MODES.RAW) {
    return (
      <>
        <PageHeader title="Services Grid" />
        <RawCopy copy={RAW_SERVICES} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Services Grid" />

      <section className="services-strip">
        <div className="container grid grid--3">
          {SERVICES.map((service, index) => (
            <article
              className="services-strip__item"
              data-shade={index}
              key={service.title}
            >
              <StmIcon name={service.icon} className="services-strip__icon" size={67} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
