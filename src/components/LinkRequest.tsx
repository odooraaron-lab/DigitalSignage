'use client';
import { useState } from 'react';

export function LinkRequest({ slug }: { slug: string }) {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="notice">Sent. Check your inbox (and spam folder) in a minute or two.</div>;
  return (
    <button className="btn" onClick={async () => { await fetch(`/api/venues/${slug}/link`, { method: 'POST' }); setSent(true); }}>
      Email me my dashboard link
    </button>
  );
}
