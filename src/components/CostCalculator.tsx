'use client';
import { useState } from 'react';

/** How many TVs? Shows our flat price per TV against a typical per-screen plan (the rate is editable). */
export function CostCalculator({ monthly = 39 }: { monthly?: number }) {
  const [tvs, setTvs] = useState(4);
  const [rate, setRate] = useState(15);
  const per = monthly / tvs;
  const them = tvs * rate;
  const fmt = (n: number) => `$${n.toFixed(n < 10 && n % 1 ? 2 : 0)}`;
  return (
    <div className="calc card" aria-label="Cost calculator">
      <h3>What would your screens cost?</h3>
      <label className="calc-row">
        <span>Number of TVs</span>
        <input type="range" min={1} max={20} value={tvs} onChange={(e) => setTvs(Number(e.target.value))} aria-label="Number of TVs" />
        <b className="calc-n">{tvs}</b>
      </label>
      <div className="calc-grid">
        <div className="calc-us">
          <small>myQR Digital Signage</small>
          <strong>{fmt(monthly)}<em>/month</em></strong>
          <span>That’s {fmt(per)} per TV. Same price for 1 or 20 TVs.</span>
        </div>
        <div className="calc-them">
          <small>A typical per-screen plan</small>
          <strong>{fmt(them)}<em>/month</em></strong>
          <span>
            {tvs} × $<input type="number" min={1} max={200} value={rate} onChange={(e) => setRate(Math.max(1, Number(e.target.value) || 1))} aria-label="Per-screen price" /> per screen
          </span>
        </div>
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        {them > monthly ? <>You’d save about <b>{fmt((them - monthly) * 12)}</b> a year on software alone, before hardware and installation. </> : null}
        Per-screen rate is an example in NZD: change it to match any quote you have.
      </p>
    </div>
  );
}
