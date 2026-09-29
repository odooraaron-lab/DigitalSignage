'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { PROMO_CSS, PROMO_STYLE_NAMES } from '@/lib/promo';
import type { Slide, Screen, Promo } from '@/lib/venues';

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORDER = [1, 2, 3, 4, 5, 6, 0];
const hhmm = (m: number | null) => (m == null ? '' : `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
const mins = (s: string) => { const m = /^(\d{1,2}):(\d{2})$/.exec(s); return m ? Number(m[1]) * 60 + Number(m[2]) : null; };
function when(s: Pick<Slide, 'days' | 'start_min' | 'end_min'>) {
  const d = !s.days ? 'Every day'
    : s.days.length === 5 && [1, 2, 3, 4, 5].every((x) => s.days!.includes(x)) ? 'Weekdays'
    : s.days.length === 2 && s.days.includes(0) && s.days.includes(6) ? 'Weekends'
    : ORDER.filter((x) => s.days!.includes(x)).map((x) => DAY[x]).join(', ');
  return s.start_min == null ? `${d}, all day` : `${d}, ${hhmm(s.start_min)}–${hhmm(s.end_min)}`;
}
const online = (t: string | null) => !!t && Date.now() - new Date(t).getTime() < 3 * 60 * 1000;
function ago(t: string | null) {
  if (!t) return 'Never connected';
  const m = Math.round((Date.now() - new Date(t).getTime()) / 60000);
  return m < 60 ? `Last seen ${m} min ago` : m < 48 * 60 ? `Last seen ${Math.round(m / 60)} h ago` : `Last seen ${Math.round(m / 1440)} days ago`;
}

type VenueInfo = { slug: string; venue_name: string; status: string; timezone: string; slide_seconds: number; billing: boolean };

async function api(url: string, method: string, body?: unknown) {
  const r = await fetch(url, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || 'Something went wrong. Please try again.');
  return d;
}

export function PromoPreview({ promo, venue }: { promo: Promo; venue: string }) {
  return (
    <div className="ds-screen">
      <div className={`promo ${promo.style}`}>
        <div className="p-dot d1" /><div className="p-dot d2" />
        <h2 className="p-head">{promo.headline || 'Your headline'}</h2>
        {promo.price && <div className="p-price">{promo.price}</div>}
        {promo.detail && <div className="p-detail">{promo.detail}</div>}
        <div className="p-venue">{venue}</div>
      </div>
    </div>
  );
}

function Thumb({ s, venue }: { s: Slide; venue: string }) {
  if (s.kind === 'promo' && s.promo) return <PromoPreview promo={s.promo} venue={venue} />;
  if (s.kind === 'video') return <div className="ds-screen"><video src={`${s.media_url}#t=0.5`} muted preload="metadata" playsInline /></div>;
  return <div className="ds-screen"><img src={s.media_url!} alt="" loading="lazy" /></div>;
}

/** Days + hours picker. */
function Schedule({ value, onChange }: { value: Pick<Slide, 'days' | 'start_min' | 'end_min'>; onChange: (v: Pick<Slide, 'days' | 'start_min' | 'end_min'>) => void }) {
  const days = value.days ?? [0, 1, 2, 3, 4, 5, 6];
  const allDay = value.start_min == null;
  const toggle = (d: number) => {
    const next = days.includes(d) ? days.filter((x) => x !== d) : [...days, d];
    onChange({ ...value, days: next.length === 7 ? null : next });
  };
  return (
    <div className="ds-sched">
      <div className="ds-days" role="group" aria-label="Days">
        {ORDER.map((d) => (
          <button type="button" key={d} className={days.includes(d) ? 'on' : ''} aria-pressed={days.includes(d)} onClick={() => toggle(d)}>{DAY[d]}</button>
        ))}
      </div>
      <div className="ds-hours">
        <label className="ds-inline"><input type="checkbox" checked={allDay}
          onChange={(e) => onChange(e.target.checked ? { ...value, start_min: null, end_min: null } : { ...value, start_min: 16 * 60, end_min: 18 * 60 })} /> All day</label>
        {!allDay && (
          <>
            <input type="time" value={hhmm(value.start_min)} aria-label="From" onChange={(e) => onChange({ ...value, start_min: mins(e.target.value) ?? value.start_min })} />
            <span>to</span>
            <input type="time" value={hhmm(value.end_min)} aria-label="Until" onChange={(e) => onChange({ ...value, end_min: mins(e.target.value) ?? value.end_min })} />
          </>
        )}
      </div>
    </div>
  );
}

const blankPromo: Promo = { headline: '', price: '', detail: '', style: 'berry' };

function PromoFields({ promo, set }: { promo: Promo; set: (p: Promo) => void }) {
  return (
    <>
      <label className="field">Headline<input value={promo.headline} maxLength={60} placeholder="Happy Hour Pints" onChange={(e) => set({ ...promo, headline: e.target.value })} /></label>
      <div className="ds-two">
        <label className="field">Price <span className="help">Optional</span><input value={promo.price} maxLength={20} placeholder="$8" onChange={(e) => set({ ...promo, price: e.target.value })} /></label>
        <label className="field">Colours
          <select value={promo.style} onChange={(e) => set({ ...promo, style: e.target.value as Promo['style'] })}>
            {Object.entries(PROMO_STYLE_NAMES).map(([k, n]) => <option key={k} value={k}>{n}</option>)}
          </select>
        </label>
      </div>
      <label className="field">Small print <span className="help">Optional</span><input value={promo.detail} maxLength={120} placeholder="4–6pm weekdays. House tap beers." onChange={(e) => set({ ...promo, detail: e.target.value })} /></label>
    </>
  );
}

function SlideRow({ s, venue, first, last, onMove, flash }: { s: Slide; venue: VenueInfo; first: boolean; last: boolean; onMove: (dir: -1 | 1) => void; flash: (m: string, bad?: boolean) => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState({ title: s.title, seconds: s.seconds, days: s.days, start_min: s.start_min, end_min: s.end_min, promo: s.promo ?? blankPromo });

  async function save(fields: Record<string, unknown>, msg = 'Saved. TVs update within a minute.') {
    setBusy(true);
    try { await api(`/api/venues/${venue.slug}/slides`, 'PATCH', { id: s.id, ...fields }); flash(msg); router.refresh(); setOpen(false); }
    catch (e) { flash((e as Error).message, true); }
    setBusy(false);
  }
  async function remove() {
    if (!confirm('Remove this slide from every TV?')) return;
    setBusy(true);
    try { await api(`/api/venues/${venue.slug}/slides?id=${s.id}`, 'DELETE'); flash('Removed.'); router.refresh(); }
    catch (e) { flash((e as Error).message, true); setBusy(false); }
  }
  const label = s.title || (s.kind === 'promo' ? s.promo?.headline : s.kind === 'video' ? 'Video' : 'Image');

  return (
    <li className={`ds-slide ${s.active ? '' : 'off'}`}>
      <div className="ds-slide-main">
        <Thumb s={s} venue={venue.venue_name} />
        <div className="ds-slide-info">
          <strong>{label}</strong>
          <span className="small muted">{s.kind === 'video' ? 'Video' : s.kind === 'promo' ? 'Special' : 'Image'} · {when(s)} · {s.kind === 'video' && !s.seconds ? 'plays to end' : `${s.seconds || venue.slide_seconds}s`}</span>
          {!s.active && <span className="pill">Hidden</span>}
        </div>
        <div className="ds-slide-actions">
          <button className="ds-icon" disabled={first || busy} onClick={() => onMove(-1)} aria-label="Move up">↑</button>
          <button className="ds-icon" disabled={last || busy} onClick={() => onMove(1)} aria-label="Move down">↓</button>
          <button className="btn small ghost" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Edit'}</button>
        </div>
      </div>
      {open && (
        <div className="ds-edit">
          {s.kind === 'promo' && (
            <div className="ds-builder">
              <div><PromoFields promo={draft.promo} set={(p) => setDraft({ ...draft, promo: p })} /></div>
              <PromoPreview promo={draft.promo} venue={venue.venue_name} />
            </div>
          )}
          <label className="field">Name <span className="help">Only you see this</span><input value={draft.title} maxLength={60} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></label>
          <div className="field">When it shows<Schedule value={draft} onChange={(v) => setDraft({ ...draft, ...v })} /></div>
          <label className="field">Seconds on screen
            <span className="help">{s.kind === 'video' ? 'Leave empty to play the whole video.' : `Leave empty to use your default (${venue.slide_seconds}s).`}</span>
            <input type="number" min={3} max={300} value={draft.seconds ?? ''} onChange={(e) => setDraft({ ...draft, seconds: e.target.value ? Number(e.target.value) : null })} style={{ maxWidth: 140 }} />
          </label>
          <div className="row">
            <button className="btn" disabled={busy} onClick={() => save({ ...draft, promo: s.kind === 'promo' ? draft.promo : undefined })}>Save</button>
            <button className="btn ghost" disabled={busy} onClick={() => save({ active: !s.active }, s.active ? 'Hidden from TVs.' : 'Showing again.')}>{s.active ? 'Hide' : 'Show'}</button>
            <button className="btn ghost danger" disabled={busy} onClick={remove}>Remove</button>
          </div>
        </div>
      )}
    </li>
  );
}

export function Dashboard({ venue, slides, screens, tvAddress, maxSlides, imageBytes, videoBytes }: {
  venue: VenueInfo; slides: Slide[]; screens: Screen[]; tvAddress: string; maxSlides: number; imageBytes: number; videoBytes: number;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ text: string; bad?: boolean } | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [builder, setBuilder] = useState(false);
  const [promo, setPromo] = useState<Promo>(blankPromo);
  const [promoWhen, setPromoWhen] = useState<Pick<Slide, 'days' | 'start_min' | 'end_min'>>({ days: null, start_min: null, end_min: null });
  const [code, setCode] = useState('');
  const [tvName, setTvName] = useState('');
  const [busy, setBusy] = useState(false);
  const [settings, setSettings] = useState({ venue_name: venue.venue_name, slide_seconds: venue.slide_seconds, timezone: venue.timezone });
  const lapsed = venue.status === 'lapsed';

  const flash = (text: string, bad = false) => { setMsg({ text, bad }); setTimeout(() => setMsg(null), 5000); };

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    let added = 0;
    for (const [i, f] of Array.from(files).entries()) {
      const video = f.type.startsWith('video/');
      if (!video && !f.type.startsWith('image/')) { flash(`${f.name}: only images and videos.`, true); continue; }
      if (f.size > (video ? videoBytes : imageBytes)) { flash(`${f.name} is too big (max ${Math.round((video ? videoBytes : imageBytes) / 1048576)} MB).`, true); continue; }
      try {
        setProgress(`Uploading ${i + 1} of ${files.length}…`);
        const safe = f.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').slice(-60);
        const blob = await upload(`ds/${venue.slug}/${safe}`, f, {
          access: 'public', handleUploadUrl: `/api/venues/${venue.slug}/upload`,
          onUploadProgress: (p) => setProgress(`Uploading ${i + 1} of ${files.length}… ${Math.round(p.percentage)}%`),
        });
        await api(`/api/venues/${venue.slug}/slides`, 'POST', { kind: video ? 'video' : 'image', media_url: blob.url, bytes: f.size, title: f.name.replace(/\.[^.]+$/, '').slice(0, 60) });
        added++;
      } catch (e) { flash(`${f.name}: ${(e as Error).message}`, true); }
    }
    setProgress(null);
    if (fileRef.current) fileRef.current.value = '';
    if (added) { flash(`Added ${added} to your playlist. TVs update within a minute.`); router.refresh(); }
  }

  async function addPromo() {
    setBusy(true);
    try {
      await api(`/api/venues/${venue.slug}/slides`, 'POST', { kind: 'promo', promo, title: promo.headline, ...promoWhen });
      flash('Special added. TVs update within a minute.');
      setPromo(blankPromo); setPromoWhen({ days: null, start_min: null, end_min: null }); setBuilder(false); router.refresh();
    } catch (e) { flash((e as Error).message, true); }
    setBusy(false);
  }

  async function move(i: number, dir: -1 | 1) {
    const ids = slides.map((s) => s.id);
    [ids[i], ids[i + dir]] = [ids[i + dir], ids[i]];
    try { await api(`/api/venues/${venue.slug}/slides`, 'PATCH', { order: ids }); router.refresh(); } catch (e) { flash((e as Error).message, true); }
  }

  async function pair(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try { await api(`/api/venues/${venue.slug}/screens`, 'POST', { code, name: tvName }); setCode(''); setTvName(''); flash('TV connected. It will start playing in a few seconds.'); router.refresh(); }
    catch (e) { flash((e as Error).message, true); }
    setBusy(false);
  }
  async function renameTv(s: Screen) {
    const name = prompt('Name this TV (e.g. “Bar”, “Window”)', s.name);
    if (!name) return;
    try { await api(`/api/venues/${venue.slug}/screens`, 'PATCH', { id: s.id, name }); router.refresh(); } catch (e) { flash((e as Error).message, true); }
  }
  async function removeTv(s: Screen) {
    if (!confirm(`Disconnect “${s.name}”? It stops showing your adverts straight away.`)) return;
    try { await api(`/api/venues/${venue.slug}/screens?id=${s.id}`, 'DELETE'); router.refresh(); } catch (e) { flash((e as Error).message, true); }
  }
  async function saveSettings(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try { await api(`/api/venues/${venue.slug}/settings`, 'PATCH', settings); flash('Settings saved.'); router.refresh(); }
    catch (e) { flash((e as Error).message, true); }
    setBusy(false);
  }

  const live = slides.filter((s) => s.active).length;
  const on = screens.filter((s) => online(s.last_seen_at)).length;

  return (
    <main className="wrap ds-dash">
      <style dangerouslySetInnerHTML={{ __html: PROMO_CSS }} />
      {lapsed && (
        <div className="notice bad">Your subscription has lapsed, so your TVs are paused. {venue.billing && <a href={`/api/venues/${venue.slug}/billing`}>Update billing</a>} to switch them back on.</div>
      )}
      {msg && <div className={`ds-toast ${msg.bad ? 'bad' : ''}`} role="status">{msg.text}</div>}

      <div className="ds-stats">
        <div><b>{live}</b><span>slides showing</span></div>
        <div><b>{on}<small>/{screens.length}</small></b><span>TVs online</span></div>
      </div>

      <section className="card ds-section">
        <div className="ds-head">
          <div><h2>Your playlist</h2><p className="muted small">Plays top to bottom on every TV, on repeat. Each slide can have its own days and hours.</p></div>
          <div className="row">
            <input ref={fileRef} type="file" accept="image/*,video/mp4,video/webm,video/quicktime" multiple hidden onChange={(e) => onFiles(e.target.files)} />
            <button className="btn" disabled={!!progress || lapsed || slides.length >= maxSlides} onClick={() => fileRef.current?.click()}>{progress ?? 'Upload images or video'}</button>
            <button className="btn ghost" disabled={lapsed || slides.length >= maxSlides} onClick={() => setBuilder(!builder)}>{builder ? 'Close' : 'Make a special'}</button>
          </div>
        </div>

        {builder && (
          <div className="ds-edit ds-new">
            <h3>Make a special</h3>
            <div className="ds-builder">
              <div>
                <PromoFields promo={promo} set={setPromo} />
                <div className="field">When it shows<Schedule value={promoWhen} onChange={setPromoWhen} /></div>
                <button className="btn" disabled={busy || !promo.headline.trim()} onClick={addPromo}>Add to playlist</button>
              </div>
              <PromoPreview promo={promo} venue={venue.venue_name} />
            </div>
          </div>
        )}

        {slides.length === 0 ? (
          <div className="empty">
            <p><b>Nothing here yet.</b></p>
            <p className="muted small">Upload your adverts (landscape, 1920×1080 looks best) or make a quick special with a headline and price.</p>
          </div>
        ) : (
          <ol className="ds-slides">
            {slides.map((s, i) => <SlideRow key={s.id} s={s} venue={venue} first={i === 0} last={i === slides.length - 1} onMove={(d) => move(i, d)} flash={flash} />)}
          </ol>
        )}
      </section>

      <div className="ds-cols">
        <section className="card ds-section">
          <h2>Your TVs</h2>
          {screens.length > 0 && (
            <ul className="ds-tvs">
              {screens.map((s) => (
                <li key={s.id}>
                  <span suppressHydrationWarning className={`ds-dot ${online(s.last_seen_at) ? 'on' : ''}`} aria-hidden />
                  <div><strong>{s.name}</strong><span className="small muted" suppressHydrationWarning>{online(s.last_seen_at) ? 'Online now' : ago(s.last_seen_at)}</span></div>
                  <button className="btn small ghost" onClick={() => renameTv(s)}>Rename</button>
                  <button className="btn small ghost danger" onClick={() => removeTv(s)}>Disconnect</button>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={pair} className="ds-pair">
            <h3>Connect a TV</h3>
            <p className="muted small">On the TV’s web browser go to <b>{tvAddress}</b>. Type the 6-digit code it shows here.</p>
            <div className="ds-two">
              <label className="field">Code<input inputMode="numeric" autoComplete="off" value={code} maxLength={7} placeholder="123 456" onChange={(e) => setCode(e.target.value)} required /></label>
              <label className="field">Name <span className="help">Optional</span><input value={tvName} maxLength={40} placeholder="Bar" onChange={(e) => setTvName(e.target.value)} /></label>
            </div>
            <button className="btn" disabled={busy || code.replace(/\D/g, '').length !== 6}>Connect</button>
          </form>
        </section>

        <section className="card ds-section">
          <h2>Settings</h2>
          <form onSubmit={saveSettings}>
            <label className="field">Venue name<input value={settings.venue_name} maxLength={60} onChange={(e) => setSettings({ ...settings, venue_name: e.target.value })} /></label>
            <label className="field">Seconds per slide <span className="help">For images and specials, unless a slide sets its own.</span>
              <input type="number" min={3} max={300} value={settings.slide_seconds} onChange={(e) => setSettings({ ...settings, slide_seconds: Number(e.target.value) })} style={{ maxWidth: 140 }} />
            </label>
            <label className="field">Time zone <span className="help">Schedules follow this clock.</span>
              <select value={settings.timezone} onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}>
                {Array.from(new Set([settings.timezone, 'Pacific/Auckland', 'Pacific/Chatham', 'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Adelaide', 'Australia/Perth', 'Pacific/Fiji', 'Pacific/Rarotonga'])).map((z) => <option key={z}>{z}</option>)}
              </select>
            </label>
            <button className="btn" disabled={busy}>Save settings</button>
          </form>
          {venue.billing && (
            <>
              <h3 style={{ marginTop: 28 }}>Subscription</h3>
              <p className="muted small">Change card, switch between monthly and yearly, download invoices or cancel.</p>
              <a className="btn ghost" href={`/api/venues/${venue.slug}/billing`}>Manage billing</a>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
