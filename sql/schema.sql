-- myQR Digital Signage tables. Run once in your Neon / Supabase SQL editor.
-- They're prefixed ds_ so they can share a database with the other apps. Safe to re-run.

create table if not exists ds_venues (
  slug                   text primary key,               -- the-local-bar
  venue_name             text not null,                  -- "The Local Bar"
  owner_name             text not null,
  owner_email            text not null,
  status                 text not null default 'pending',-- pending | active | lapsed | disabled
  plan                   text not null default 'yearly', -- monthly | yearly
  stripe_customer_id     text,
  stripe_subscription_id text,
  checkout_session_id    text,
  owner_token            text not null,                  -- dashboard link
  timezone               text not null default 'Pacific/Auckland',
  slide_seconds          int not null default 10,        -- default time per image / promo
  created_at             timestamptz not null default now(),
  activated_at           timestamptz
);

-- One row per TV in the venue. Each TV has its own key (in its link and a cookie).
create table if not exists ds_screens (
  id           bigserial primary key,
  slug         text not null references ds_venues(slug) on delete cascade,
  name         text not null default 'TV',
  screen_key   text not null unique,
  last_seen_at timestamptz,
  created_at   timestamptz not null default now()
);
create index if not exists ds_screens_slug_idx on ds_screens (slug);

-- The playlist: uploaded images/videos and promos built in the dashboard.
create table if not exists ds_slides (
  id         bigserial primary key,
  slug       text not null references ds_venues(slug) on delete cascade,
  kind       text not null,                    -- image | video | promo
  title      text not null default '',         -- the venue's own label, e.g. "Happy hour"
  media_url  text,
  bytes      bigint not null default 0,
  promo      jsonb,                            -- { headline, price, detail, style }
  seconds    int,                              -- null = venue default (videos play to the end)
  days       int[],                            -- 0 = Sunday … 6 = Saturday; null = every day
  start_min  int,                              -- minutes after midnight; null = all day
  end_min    int,
  active     boolean not null default true,
  position   int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists ds_slides_slug_idx on ds_slides (slug, position);

-- TV pairing codes (the app also creates this by itself on first use).
create table if not exists ds_tv_pairings (
  code       text primary key,
  device     text not null unique,
  slug       text references ds_venues(slug) on delete cascade,
  screen_key text,
  created_at timestamptz not null default now()
);
