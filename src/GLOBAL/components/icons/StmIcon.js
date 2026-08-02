import React from 'react';
import '../styles/StmIcon.scss';

/**
 * The transcargo theme's own icon font, mirrored from
 * excelvaults.com/wp-content/uploads/stm_fonts/stm/ into public/fonts/.
 *
 * The live site renders these via `[stm_icon drawing="yes" drawing_icon="stm-*"]`.
 * Using the real font instead of stand-in glyphs means the icons match the design
 * exactly and inherit `currentColor`, so they follow the theme palette wherever
 * they are placed.
 *
 * Codepoints read out of the theme's stm.css. Written as escapes rather than
 * literal private-use characters so the source stays copy-paste safe. Keyed by the
 * shortcode name the live page uses, so the mapping is traceable to the source.
 */
export const STM_ICONS = {
  'stm-security': '\ue951',
  'stm-fast-delivery': '\ue950',
  'stm-support': '\ue94f',
  'stm-packaging-and-storage': '\ue945',
  'stm-warehousing-service': '\ue947',
  'stm-ground-transport': '\ue943',
  'stm-projects-done': '\ue946',
  'stm-people-in-team': '\ue956',
};

export default function StmIcon({ name, size, className = '' }) {
  const glyph = STM_ICONS[name];

  if (!glyph) {
    console.error('[StmIcon] unknown icon name:', { name });
    return null;
  }

  return (
    <span
      className={`stm-icon ${className}`.trim()}
      style={size ? { fontSize: `${size}px` } : undefined}
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
}

