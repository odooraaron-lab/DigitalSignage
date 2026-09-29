export const BRAND = process.env.BRAND_NAME || 'myQR';
export const PRODUCT = process.env.PRODUCT_NAME || 'Digital Signage';
export const APP_URL = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
export const SCREENS_DOMAIN = (process.env.SCREENS_DOMAIN || '').toLowerCase();
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || '';
export const PRICES = {
  monthly: { id: process.env.STRIPE_PRICE_MONTHLY || '', label: process.env.PRICE_MONTHLY_LABEL || '$39 a month' },
  yearly: { id: process.env.STRIPE_PRICE_YEARLY || '', label: process.env.PRICE_YEARLY_LABEL || '$399 a year' },
};
export const TRIAL_DAYS = Math.max(0, Number(process.env.TRIAL_DAYS || 0));

/** Limits per venue. */
export const LIMITS = { slides: 60, imageBytes: 15 * 1024 * 1024, videoBytes: 250 * 1024 * 1024, screens: 20 };

/** Words that can't be used as a venue address. */
export const RESERVED = new Set([
  'www', 'admin', 'api', 'app', 'mail', 'email', 'hq', 'help', 'support', 'start', 'status', 'blog',
  's', 'tv', 'dashboard', 'login', 'billing', 'privacy', 'terms', 'static', 'assets', 'cdn', 'test', 'demo',
]);

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;

/** Full link to a page of a venue: https://the-local.digitalsignage.myqr.co.nz/dashboard, or /s/the-local/dashboard without a domain. */
export function venueUrl(slug: string, path = '') {
  if (SCREENS_DOMAIN) return `https://${slug}.${SCREENS_DOMAIN}${path}`;
  return `${APP_URL}/s/${slug}${path}`;
}
