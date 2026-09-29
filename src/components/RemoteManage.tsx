// "Manage it from anywhere": a laptop and a phone showing the dashboard, plus the key points.
// Needs PROMO_CSS on the page for the little slide thumbnails.

const ROWS = [
  { style: 'berry', head: 'Happy Hour', price: '$8', when: 'Mon–Fri, 16:00–18:00' },
  { style: 'sun', head: 'Loaded Fries', price: '$12', when: 'Every day, all day' },
  { style: 'night', head: 'Quiz Night', price: 'Thu', when: 'Mon–Thu, all day' },
];

function Thumb({ style, head, price }: { style: string; head: string; price: string }) {
  return (
    <div className="rm-thumb">
      <div className={`promo ${style}`}><h2 className="p-head">{head}</h2><div className="p-price">{price}</div></div>
    </div>
  );
}

function Devices() {
  return (
    <div className="rm-devices" aria-hidden="true">
      <div className="rm-laptop">
        <div className="rm-screen">
          <div className="rm-bar"><span /><span /><span /><em>the-local.digitalsignage.myqr.co.nz</em></div>
          <div className="rm-app">
            <div className="rm-app-head"><b>Your playlist</b><span className="rm-btn">Upload images or video</span></div>
            {ROWS.map((r) => (
              <div className="rm-row" key={r.head}>
                <Thumb {...r} />
                <div><b>{r.head}</b><small>{r.when}</small></div>
              </div>
            ))}
            <div className="rm-tvs"><i /> Bar · Online <i /> Dining room · Online <i /> Window · Online</div>
          </div>
        </div>
        <div className="rm-base" />
      </div>
      <div className="rm-phone">
        <div className="rm-notch" />
        <div className="rm-phone-in">
          <b>Make a special</b>
          <div className="rm-field">Headline<span>Brunch Menu</span></div>
          <div className="rm-field">Price<span>$18</span></div>
          <div className="rm-mini"><div className="promo sun"><h2 className="p-head">Brunch Menu</h2><div className="p-price">$18</div></div></div>
          <span className="rm-btn rm-btn-full">Add to playlist</span>
          <small className="rm-sent">✓ On all 3 TVs within a minute</small>
        </div>
      </div>
    </div>
  );
}

export function RemoteManage({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section wrap rm" id="remote">
      <div className="rm-grid">
        <div>
          <span className="eyebrow">Manage it from anywhere</span>
          <h2>Upload adverts from your phone or laptop, wherever you are</h2>
          <p className="muted rm-lede">
            No USB sticks, no climbing ladders, no special software. Log in to your dashboard from home, the office or the
            supplier’s, and your TVs update by themselves.
          </p>
          <ul className="rm-points">
            <li><b>Upload remotely.</b> Drop in images or videos from your laptop, or straight from your phone’s camera roll.</li>
            <li><b>Change a price in seconds.</b> Edit a special from your phone and every TV shows it within about a minute.</li>
            <li><b>Set it and forget it.</b> Schedule adverts by day and hour ahead of time, and they switch on and off on their own.</li>
            {!compact && <li><b>See every screen.</b> Check which TVs are online and what’s playing, even when you’re not at the venue.</li>}
            {!compact && <li><b>Share the job.</b> Your manager can update the screens from their own phone too.</li>}
          </ul>
        </div>
        <Devices />
      </div>
    </section>
  );
}
