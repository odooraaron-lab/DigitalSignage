import type { Topic } from './topics';

// Blog posts at /blog/<slug>. Comparison posts must stay factual and fair (NZ Fair Trading Act):
// describe how other products are built and priced from their public info, say when they're the
// better fit, date the comparison, and never claim anything we can't back up.
const ABOUT: Topic['sections'][number] = {
  h2: 'About this comparison',
  body: ['Written in September 2026 from each company’s public website. Plans and prices change, so check their site for the latest. OptiSigns, Yodeck and ScreenCloud are trademarks of their owners; myQR isn’t affiliated with them.'],
};

export const POSTS: Topic[] = [
  {
    slug: 'why-digital-signage-got-complicated',
    nav: 'Why digital signage got complicated',
    title: 'Why Digital Signage Got So Complicated (And How to Keep It Simple) | myQR',
    description: 'RF modulators, HDMI matrix switches, tuning channels, media players and training days. Why venue screens got complicated, and the simple way to run every TV.',
    kicker: 'Blog',
    h1: 'Why digital signage got so complicated, and how to keep it simple',
    intro: 'Ask a bar manager how the TVs work and you’ll often hear: “Don’t touch anything, it’s all tuned in.” Somewhere along the way, putting a special on a screen turned into racks of AV gear, a login nobody remembers and a phone number for the installer. It doesn’t need to be like that.',
    calculator: true,
    sections: [
      {
        h2: 'How venues ended up with an AV cupboard',
        body: ['Many venues built their screens around getting one source, usually Sky, to lots of TVs. That meant specialist gear, and when signage came along it was bolted on top.'],
        list: [
          'RF modulators, which turn a video source into a TV channel that every screen has to be tuned to',
          'HDMI matrix switches and splitters, to route different sources to different screens',
          'A media player box behind each screen, each needing power, updates and occasional restarts',
          'Signage software with its own login, templates and training',
          'An installer on call for when something drops out',
        ],
      },
      {
        h2: 'Why that’s a problem for staff',
        body: ['When the only person who understands the setup is the installer or the owner, nobody else changes the screens. Specials go stale, last month’s event is still showing, and a retuned TV stays blank until someone gets around to it.'],
      },
      {
        h2: 'The simple way: every TV opens a web page',
        body: ['Modern smart TVs, and cheap streaming sticks like Chromecast and Fire TV, all have a web browser. That means each TV can show your signage on its own, over Wi-Fi, without tuning, modulators or a matrix. Open one address, type a 6-digit code, done.', 'Updating is just as simple. Anyone with the dashboard link changes a special from their phone and every TV updates within about a minute.'],
        list: ['No channels to tune and nothing to retune after a power cut', 'No player boxes or cabling runs for signage', 'Staff can update it from their own phone', 'Add a TV in about a minute'],
      },
      {
        h2: 'Keep your Sky and your sound system',
        body: ['You don’t have to rip anything out. Keep your existing setup for sport, and give signage its own input or streaming stick. Switch a TV between the game and your specials with the remote.'],
      },
    ],
    faq: [
      ['Do I need an RF modulator or HDMI matrix for digital signage?', 'Not with browser-based signage. Each TV plays your adverts itself over Wi-Fi.'],
      ['Can staff change the screens?', 'Yes. Share the dashboard link and they can update specials from their own phone.'],
      ['Can I still show Sky on the same TVs?', 'Yes. Put signage on a spare input or a streaming stick and switch with the remote.'],
    ],
    related: ['browser-based-digital-signage', 'digital-signage-no-extra-hardware', 'easy-digital-signage'],
  },
  {
    slug: 'optisigns-alternative-nz',
    nav: 'OptiSigns alternative (NZ)',
    title: 'OptiSigns Alternative for NZ Venues: Simple, Flat-Price Signage | myQR',
    description: 'Comparing OptiSigns with myQR Digital Signage for NZ bars, cafés and gyms: per-screen vs flat pricing, apps vs browser, features vs simplicity. An honest guide.',
    kicker: 'Comparisons',
    h1: 'Looking for an OptiSigns alternative in New Zealand?',
    intro: 'OptiSigns is a popular, feature-rich digital signage platform used around the world. If you run a single venue in NZ and just want your specials on the TVs, it can be more than you need. Here’s an honest look at the differences.',
    calculator: true,
    sections: [
      {
        h2: 'What OptiSigns does well',
        body: ['OptiSigns supports a wide range of devices through its apps, offers a lot of content types and integrations, and scales to large networks of screens. If you need advanced layouts, dozens of integrations or multi-site management, it’s a strong option.'],
      },
      {
        h2: 'Where it can feel like overkill for one venue',
        body: [],
        list: [
          'Priced per screen, per month, in US dollars, so the cost grows with every TV and moves with the exchange rate',
          'An app to install on each screen’s device',
          'Many features and settings to learn before your first special goes up',
        ],
      },
      {
        h2: 'How myQR Digital Signage is different',
        body: [],
        list: [
          'One flat price in NZ dollars: $39 a month for up to 20 TVs in your venue',
          'Runs in the TV’s web browser: no app to install, no login on the TV',
          'Built for venue staff: upload an image or make a special with a headline and price, then set the days and hours',
          'Made in New Zealand, set to your local time',
        ],
      },
      {
        h2: 'When OptiSigns is the better choice',
        body: ['If you manage many locations, need complex screen layouts, or rely on specific integrations, a larger platform may suit you better. If you want your TVs sorted tonight for one flat price, try us.'],
      },
      ABOUT,
    ],
    faq: [
      ['Is myQR cheaper than OptiSigns?', 'It depends on how many screens you have. OptiSigns charges per screen; we charge one flat NZD price for up to 20 TVs, so the more TVs you have, the more you’re likely to save. Use the calculator with their current rate.'],
      ['Do I need to install an app?', 'Not with us. Our player runs in the TV’s web browser.'],
      ['Can I switch easily?', 'Yes. Export your existing images or videos and upload them to your dashboard. Pair each TV with a code.'],
    ],
    related: ['yodeck-alternative-nz', 'screencloud-alternative-nz', 'pricing'],
  },
  {
    slug: 'yodeck-alternative-nz',
    nav: 'Yodeck alternative (NZ)',
    title: 'Yodeck Alternative for NZ Venues: No Player Box Needed | myQR',
    description: 'Comparing Yodeck with myQR Digital Signage for NZ venues: player hardware vs the TV’s own browser, per-screen vs flat pricing. An honest guide for small venues.',
    kicker: 'Comparisons',
    h1: 'Looking for a Yodeck alternative in New Zealand?',
    intro: 'Yodeck is a well-known digital signage service, especially popular with small businesses. It’s built around a player device for each screen. If your TVs already have a web browser, you might not need one.',
    calculator: true,
    sections: [
      {
        h2: 'What Yodeck does well',
        body: ['Yodeck has a mature product, lots of templates and widgets, and a player (based on Raspberry Pi) that makes screens behave consistently. It offers a free plan for one screen and free players with some annual plans, according to its website.'],
      },
      {
        h2: 'Where it can add steps for a single venue',
        body: [],
        list: [
          'A player device per screen to receive, plug in, power and look after',
          'Priced per screen, in US dollars, so each extra TV adds to the bill',
          'A full-featured dashboard with more to learn than a quick special needs',
        ],
      },
      {
        h2: 'How myQR Digital Signage is different',
        body: [],
        list: [
          'No player box: the TV’s own web browser is the player (older TVs can use a streaming stick)',
          'One flat price in NZ dollars: $39 a month for up to 20 TVs',
          'Pair each TV in about a minute with a 6-digit code',
          'Staff update specials from their phone and every TV follows',
        ],
      },
      {
        h2: 'When Yodeck is the better choice',
        body: ['If your TVs don’t have a usable browser and you want a dedicated player with lots of widgets, or you run one screen and want a free plan, Yodeck is worth a look.'],
      },
      ABOUT,
    ],
    faq: [
      ['Do I need a Raspberry Pi or media player?', 'Not with us. Smart TVs, Chromecast with Google TV and Fire TV Stick all work through a web browser.'],
      ['What if I only have one TV?', 'Our price is the same for 1 or 20 TVs, so we suit venues with several screens best.'],
      ['Can staff use it?', 'Yes. If they can send a photo from a phone, they can update the screens.'],
    ],
    related: ['optisigns-alternative-nz', 'screencloud-alternative-nz', 'digital-signage-no-extra-hardware'],
  },
  {
    slug: 'screencloud-alternative-nz',
    nav: 'ScreenCloud alternative (NZ)',
    title: 'ScreenCloud Alternative for NZ Hospitality & Small Venues | myQR',
    description: 'Comparing ScreenCloud with myQR Digital Signage for NZ bars, cafés, clubs and shops: enterprise features vs a simple flat-price tool staff can use in minutes.',
    kicker: 'Comparisons',
    h1: 'Looking for a ScreenCloud alternative in New Zealand?',
    intro: 'ScreenCloud is a polished cloud signage platform used by many large organisations, with lots of apps and integrations. For a local bar, café, club or shop, a simpler tool is often all you need.',
    calculator: true,
    sections: [
      {
        h2: 'What ScreenCloud does well',
        body: ['ScreenCloud supports many devices, has a big library of apps and integrations (dashboards, social feeds, internal comms) and tools for managing screens across teams and sites. It’s a good fit for corporate communications and large networks.'],
      },
      {
        h2: 'Where it can be more than a venue needs',
        body: [],
        list: ['Per-screen subscription pricing, in US dollars', 'Features aimed at organisations with many teams and sites', 'Device apps and setup that suit an IT team'],
      },
      {
        h2: 'How myQR Digital Signage is different',
        body: [],
        list: [
          'Built for hospitality and small venues: specials, events, scheduling by day and hour',
          'One flat NZD price for up to 20 TVs',
          'Runs in the TV’s browser: no app, no login on the TV',
          'Nothing for an IT team to do: any staff member can update it from their phone',
        ],
      },
      {
        h2: 'When ScreenCloud is the better choice',
        body: ['For company-wide communications, dashboards and many locations managed by an IT team, an enterprise platform makes sense. For one venue that wants to sell more from its TVs, keep it simple.'],
      },
      ABOUT,
    ],
    faq: [
      ['Is it enterprise-ready?', 'We’re built for single venues. If you run many sites with an IT team, an enterprise platform may suit you better.'],
      ['How fast can we be running?', 'Most venues are up in minutes: sign up, add an advert, pair a TV with a code.'],
      ['Is there a contract?', 'Not on the monthly plan. Cancel any time from your dashboard.'],
    ],
    related: ['optisigns-alternative-nz', 'yodeck-alternative-nz', 'why-digital-signage-got-complicated'],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
