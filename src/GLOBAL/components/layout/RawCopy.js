import React from 'react';
import { hasShortcodes } from '../../../utils/shortcodes';
import '../styles/RawCopy.scss';

/**
 * RAW-mode page body — prints the unprocessed WPBakery copy exactly as the live
 * site shows it to visitors. Deliberately NOT stripped: this is the fidelity
 * reference the fixed build gets diffed against. See wiki/bypass-flags.md.
 */
export default function RawCopy({ copy }) {
  console.log('[RawCopy] rendering unprocessed copy:', {
    length: copy.length,
    shortcodesPresent: hasShortcodes(copy),
  });

  return (
    <div className="container section">
      <p className="raw-copy" data-testid="raw-copy">
        {copy}
      </p>
    </div>
  );
}
