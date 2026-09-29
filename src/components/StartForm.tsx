'use client';
import { useEffect, useRef, useState } from 'react';

const toSlug = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30);

export function StartForm({ domain, prices, trialDays, plan = 'yearly' }: {
  domain: string; prices: { monthly: string; yearly: string }; trialDays: number; plan?: 'monthly' | 'yearly';
}) {
  const [venue, setVenue] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [slugState, setSlugState] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { if (!slugEdited) setSlug(toSlug(venue)); }, [venue, slugEdited]);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!slug) { setSlugState(null); return; }
    timer.current = setTimeout(async () => {
      const r = await fetch(`/api/slug-check?slug=${encodeURIComponent(slug)}`).then((r) => r.json()).catch(() => null);
      if (r) setSlugState({ ok: r.available, msg: r.message });
    }, 350);
  }, [slug]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setBusy(true);
    (window as any).hqEvent?.('checkout_started');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...data, slug }) });
    const body = await res.json().catch(() => ({}));
    if (res.ok && body.url) { window.location.href = body.url; return; }
    setError(body.error || 'Something went wrong. Please try again.');
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <label className="field">Venue name
        <span className="help">As your customers know it, like “The Local” or “Harbour Café”.</span>
        <input type="text" name="venue_name" required maxLength={60} value={venue} onChange={(e) => setVenue(e.target.value)} autoComplete="organization" />
      </label>

      <label className="field">Your address
        <span className="help">Letters, numbers and dashes. Your dashboard lives here.</span>
        <div className="addr">
          <input type="text" aria-label="Your address" required value={slug} maxLength={30}
            onChange={(e) => { setSlugEdited(true); setSlug(toSlug(e.target.value)); }} />
          <span>.{domain}</span>
        </div>
        <span className={`status-line ${slugState ? (slugState.ok ? 'ok' : 'bad') : ''}`} aria-live="polite">{slugState?.msg}</span>
      </label>

      <label className="field">Your name<input type="text" name="owner_name" required maxLength={60} autoComplete="name" /></label>
      <label className="field">Your email
        <span className="help">We’ll send your dashboard link and set-up steps here.</span>
        <input type="email" name="owner_email" required autoComplete="email" />
      </label>

      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Plan</legend>
        <div className="plans">
          <label className="plan"><input type="radio" name="plan" value="yearly" defaultChecked={plan === 'yearly'} /><strong>{prices.yearly}</strong>Best value</label>
          <label className="plan"><input type="radio" name="plan" value="monthly" defaultChecked={plan === 'monthly'} /><strong>{prices.monthly}</strong>Cancel any time</label>
        </div>
      </fieldset>


      {error && <div className="notice bad" role="alert">{error}</div>}
      <button className="btn block" disabled={busy || (slugState !== null && !slugState.ok)}>
        {busy ? 'Opening secure payment…' : trialDays > 0 ? `Start ${trialDays}-day free trial` : 'Continue to payment'}
      </button>
      <p className="small muted center" style={{ marginTop: 12 }}>Payment is handled securely by Stripe.</p>
    </form>
  );
}
