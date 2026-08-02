import React, { useState } from 'react';
import { getRenderMode, MODES } from '../../config/renderMode';
import RawCopy from '../../components/layout/RawCopy';
import PageHeader from '../../components/layout/PageHeader';
import { RAW_TRACKING } from '../../../content/rawCopy';
import './ShipmentPage.scss';

/**
 * The WordPress "Track Your Shipment" page (/track-your-shipment on the live site).
 *
 * Note this is NOT the Tracking nav item — that points off-domain to the
 * account.excelvaults.com login portal, replicated at /tracking. This page still
 * exists on the live site and still carries the theme's original placeholder copy
 * ("BestLogistics"), which is reproduced verbatim in RAW mode.
 */
const MODES_OF_TRANSPORT = ['Air Ground', 'Ocean', 'Brokerage', 'All'];
const SEARCH_TYPES = [
  'House Waybill',
  'House Waybill 2',
  'House Waybill 3',
  'House Waybill 4',
];

export default function ShipmentPage() {
  const mode = getRenderMode();
  const [submitted, setSubmitted] = useState(false);

  console.log('[ShipmentPage] rendering in mode:', mode);

  if (mode === MODES.RAW) {
    return (
      <>
        <PageHeader title="Track Your Shipment" />
        <RawCopy copy={RAW_TRACKING} />
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('[ShipmentPage] shipment search submitted (no backend — display only)');
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title="Track Your Shipment" />

      <section className="section">
        <div className="container">
          <h2>Track any Freight Management shipment</h2>
          <p>
            Track any Excel Vaults Freight Management shipment. If you require maximum
            visibility to your customer Freight Management transactions, contact your
            Excel Vaults Representative, or local Excel Vaults Service Center.
          </p>

          <form className="shipment" onSubmit={handleSubmit}>
            <div className="shipment__row">
              <span className="shipment__label">Transportation mode</span>
              <div className="shipment__control shipment__radios">
                {MODES_OF_TRANSPORT.map((option) => (
                  <label key={option}>
                    <input type="radio" name="mode" value={option} /> {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="shipment__row">
              <span className="shipment__label">Search Type</span>
              <div className="shipment__control">
                <select className="field" name="type" aria-label="Search Type">
                  {SEARCH_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="shipment__row">
              <span className="shipment__label">Search Number(s)*</span>
              <div className="shipment__control">
                <textarea className="field" name="numbers" rows="6" required />
              </div>
            </div>

            <div className="shipment__row">
              <span className="shipment__label" />
              <div className="shipment__control shipment__actions">
                <button className="button" type="submit">Track Now →</button>
                <button className="shipment__reset" type="reset">↺ Reset</button>
              </div>
            </div>

            <p className="shipment__note">
              This will return up to 100 records matching your criteria.
            </p>

            {submitted && (
              <p role="status">
                Thanks — this replica has no backend, so no records were searched.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
