import { APP_URL, PRODUCT } from '@/lib/config';

export default function NotFound() {
  return (
    <main className="narrow" style={{ paddingTop: 80 }}>
      <h1 style={{ fontSize: 34 }}>We can’t find that screen</h1>
      <p>Check the link you were sent. If you run this venue, open the dashboard link from your welcome email.</p>
      <a className="btn" href={APP_URL}>About {PRODUCT}</a>
    </main>
  );
}
