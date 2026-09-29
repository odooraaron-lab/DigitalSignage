# myQR Digital Signage

Venues put specials, events and announcements on the TVs in their venue, managed from one dashboard.
Live at `digitalsignage.myqr.co.nz`.

## Pages

| Address | Who | What |
| --- | --- | --- |
| `digitalsignage.myqr.co.nz` | Public | Sales page, pricing, sign-up (`/start`), `/privacy`, `/terms` |
| `digitalsignage.myqr.co.nz/tv` | A TV | Shows a 6-digit pairing code. Once paired, the TV remembers itself (cookie) |
| `<venue>.digitalsignage.myqr.co.nz/dashboard` | Venue owner | Playlist (upload images/video, build specials, days + hours per slide, order), TVs (pair, rename, disconnect, online status), settings, billing |
| `<venue>…/enter?t=…` | Venue owner | Link from the welcome email; remembers the device and opens the dashboard |
| `<venue>…/tv?k=…` | A paired TV | Full-screen player. Each TV has its own key |

Without `SCREENS_DOMAIN` set, every venue also works at `/s/<venue>/…` (handy on a `vercel.app` address).

## How the TV works

The player is plain old JavaScript (TV browsers are often out of date). It checks the feed every 45 s,
filters slides by day and time in the venue's time zone, crossfades between them, plays videos muted
to the end, and keeps playing from its saved copy if the internet drops. It reloads itself at 3 am.
Disconnecting a TV in the dashboard sends it back to the pairing screen.

## Deploy

1. **Database.** Run `sql/schema.sql` in the Neon SQL editor. Same database as the admin is fine: tables start with `ds_`.
2. **Vercel.** New Project → import this repo. Add every variable from `.env.example`.
   Domains: `digitalsignage.myqr.co.nz` and `*.digitalsignage.myqr.co.nz`.
3. **Storage.** Vercel project → Storage → Blob → connect. That adds `BLOB_READ_WRITE_TOKEN`.
4. **Stripe.** Product "Digital Signage" with two recurring NZD prices ($39/month, $399/year).
   Webhook `https://digitalsignage.myqr.co.nz/api/stripe/webhook` with `checkout.session.completed`,
   `customer.subscription.updated`, `customer.subscription.deleted`. Customer portal on.
5. **Admin.** Products → add `signage`, copy its secret to `HQ_SECRET`.
6. **Cron.** `vercel.json` runs `/api/cron/prune` daily (abandoned sign-ups, orphaned files, storage report).
