/**
 * WPBakery shortcode stripper — issue 3 from Inbox/Raw Prompt Thoughts.
 *
 * The scraped excelvaults.com copy still carries builder shortcodes, e.g.
 *   [vc_row][vc_column width="1/2"]
 *   [vc_custom_heading text="About Us" font_container="tag:h3|text_align:left"]
 *   [vc_column_text css=".vc_custom_1595194250019{margin-bottom: 30px !important;}"]
 *
 * In RAW mode we leave the copy exactly as scraped so it can be diffed against the
 * live site. In FIXED mode we strip the tags and keep the human-readable text.
 */

// Matches any [vc_*] or [/vc_*] tag, including smart quotes seen in the scrape.
const SHORTCODE = /\[\/?vc_[^\]]*\]/g;

// Pulls text="..." out of [vc_custom_heading ...] so headings survive stripping.
const HEADING_WITH_TEXT = /\[vc_custom_heading[^\]]*?text=["“”']([^"“”']*)["“”'][^\]]*\]/g;

export function stripShortcodes(input) {
  if (typeof input !== 'string' || input.length === 0) return input;

  const out = input
    .replace(HEADING_WITH_TEXT, (_match, text) => text)
    .replace(SHORTCODE, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  console.log('[shortcodes] stripped copy:', {
    before: input.length,
    after: out.length,
  });
  return out;
}

export function hasShortcodes(input) {
  return typeof input === 'string' && /\[\/?vc_/.test(input);
}
