// Search-topic pages at /<slug>: each targets a family of searches NZ businesses actually make
// ("cheap digital signage NZ", "digital signage cost", "digital menu board", "fire stick signage"…).
// Rules: honest, specific, NZ-flavoured. No invented stats, no naming competitors.
export type Topic = {
  slug: string;
  nav: string;           // short link text
  title: string;         // <title>
  description: string;   // meta description
  kicker: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string[]; list?: string[] }[];
  faq: [string, string][];
  calculator?: boolean;  // show the cost-per-TV calculator
  related: string[];
};

export const TOPICS: Topic[] = [
  {
    slug: 'cheap-digital-signage',
    nav: 'Cheap digital signage',
    title: 'Cheap Digital Signage NZ: Affordable TV Screens from $39/month | myQR',
    description: 'Affordable digital signage for NZ businesses. Use the TVs you already have, no media player or installer. One flat price for up to 20 TVs: $39/month or $399/year.',
    kicker: 'Affordable digital signage',
    h1: 'Cheap digital signage that doesn’t look cheap',
    intro: 'Most digital signage is priced for chains and head offices: commercial screens, media players, installers and a monthly fee for every screen. If you run one venue, you don’t need any of that. You need your specials on the TVs you already own, for a price that makes sense.',
    calculator: true,
    sections: [
      {
        h2: 'Why most digital signage costs so much',
        body: ['Traditional digital signage is sold as a project. There’s usually a quote, commercial-grade displays, a media player box behind every screen, installation, and ongoing software charged per screen. That’s the right fit for a shopping mall or an airport. It’s overkill for a bar with three TVs.'],
        list: ['Commercial displays and mounting', 'A media player box for every screen', 'Installation and a site visit', 'Software billed per screen, often in US dollars', 'A contract to lock it all in'],
      },
      {
        h2: 'How we keep it cheap',
        body: ['We skipped everything a small venue doesn’t need. Your screens are the TVs already on your walls. The “player” is the TV’s own web browser, or a Chromecast or Fire TV Stick if the TV is older. Setup is typing a 6-digit code. And the price is one flat monthly fee for the whole venue, not per screen.'],
        list: ['Use the TVs you already have', 'No media player to buy (a streaming stick works if you need one)', 'No installer: set up in minutes yourself', 'One price for up to 20 TVs, in NZ dollars', 'No contract on the monthly plan'],
      },
      {
        h2: 'Cheap, not basic',
        body: ['Low price doesn’t mean fewer features. You can upload images and video, build specials with a headline and price in seconds, schedule each slide by day and hour, see which TVs are online, and manage it all from your phone. If the internet drops, the TVs keep playing what they have.'],
      },
    ],
    faq: [
      ['What’s the cheapest way to do digital signage?', 'Use the TVs you already have. Open our TV address in the TV’s web browser (or on a Chromecast or Fire TV Stick) and pair it with a code. You pay one flat subscription for the whole venue and nothing for hardware you already own.'],
      ['Are there any setup fees?', 'No. No setup fee, no installer and no hardware you have to buy from us.'],
      ['Is it really one price for all my TVs?', 'Yes. $39 a month or $399 a year covers up to 20 TVs in one venue.'],
    ],
    related: ['digital-signage-cost', 'easy-digital-signage', 'pricing'],
  },
  {
    slug: 'digital-signage-cost',
    nav: 'Digital signage cost',
    title: 'How Much Does Digital Signage Cost in NZ? (2026 Guide) | myQR',
    description: 'What digital signage really costs in New Zealand: screens, media players, installation and software, explained. Plus the cheapest way to get started.',
    kicker: 'Cost guide',
    h1: 'How much does digital signage cost in New Zealand?',
    intro: 'Short answer: anywhere from the price of a coffee a day to thousands of dollars per screen. It depends on whether you buy a full commercial system or use the TVs you already have. Here’s what goes into the price, so you can work out what you actually need.',
    calculator: true,
    sections: [
      {
        h2: 'The four costs in any digital signage setup',
        body: ['Every digital signage system is made of the same four parts. Most of the price difference between options comes down to which of these you actually need to buy.'],
        list: [
          'The screen: a commercial display, or a normal TV you already own.',
          'The player: a media player box, a PC stick, a streaming stick (Chromecast or Fire TV), or the TV’s own browser.',
          'Installation: mounting, cabling and setup, either by an installer or yourself.',
          'Software: the service you use to upload and schedule content. Usually a monthly fee, often charged per screen.',
        ],
      },
      {
        h2: 'Commercial systems vs using your own TVs',
        body: [
          'A full commercial system, with commercial displays, a media player per screen and professional installation, is built for heavy use and big networks. It can easily run to thousands of dollars per screen before software.',
          'For most bars, cafés, gyms, clubs and shops, the TVs are already on the wall. In that case you only need software and, for older TVs, a streaming stick. That’s the difference between a project and a subscription.',
        ],
      },
      {
        h2: 'Watch out for per-screen pricing',
        body: ['Many digital signage apps charge per screen, per month, and often in US dollars. It looks cheap for one screen, but it adds up as you add TVs and as the exchange rate moves. Our price is one flat fee in NZ dollars for the whole venue, up to 20 TVs, so adding a TV costs nothing extra.'],
      },
      {
        h2: 'Our pricing',
        body: ['$39 a month, or $399 a year (about two months free). Everything’s included: images, video, specials, scheduling, remote management and up to 20 TVs. No setup fee, no contract on monthly.'],
      },
    ],
    faq: [
      ['How much does digital signage software cost?', 'Software is usually a monthly subscription. Ours is $39 NZD a month for the whole venue (up to 20 TVs), rather than a fee for each screen.'],
      ['Do I need to buy special screens?', 'No. Any TV with a web browser works. For older TVs, a Chromecast with Google TV or Fire TV Stick plugged into the HDMI port does the job.'],
      ['Do I need an installer?', 'Not with us. If your TV is already mounted and on Wi-Fi, you can set it up yourself in a few minutes.'],
    ],
    related: ['cheap-digital-signage', 'pricing', 'digital-signage-software'],
  },
  {
    slug: 'easy-digital-signage',
    nav: 'Easy digital signage',
    title: 'Easy Digital Signage: Set Up in Minutes, Update from Your Phone | myQR',
    description: 'The easiest digital signage for busy venues. No software to install, no player box. Pair a TV with a 6-digit code and update adverts from your phone or laptop.',
    kicker: 'Simple digital signage',
    h1: 'The easiest digital signage you’ll ever set up',
    intro: 'If you can send a photo from your phone, you can run your venue’s screens. No software to install, no USB sticks, no training. Here’s the whole process, start to finish.',
    sections: [
      {
        h2: 'Set up in three steps',
        body: [],
        list: [
          'Sign up and pick your venue’s address. Your dashboard link arrives by email.',
          'On each TV, open digitalsignage.myqr.co.nz/tv in the web browser. It shows a 6-digit code.',
          'Type the code into your dashboard. The TV starts playing your adverts. That’s it.',
        ],
      },
      {
        h2: 'Updating is even easier',
        body: ['Open your dashboard on your phone or laptop. Upload a photo or video, or tap “Make a special” and type a headline and price. Every TV in the venue updates within about a minute, whether you’re behind the bar or on the couch at home.'],
      },
      {
        h2: 'Things you never have to do',
        body: [],
        list: [
          'Walk around the venue with a USB stick',
          'Install software on a computer',
          'Remember to take down yesterday’s special: schedule it and it goes on its own',
          'Re-pair a TV after a power cut: it remembers itself',
          'Call an installer',
        ],
      },
    ],
    faq: [
      ['Do I need any technical knowledge?', 'No. If you can use a web browser and type a 6-digit code, you can set it up.'],
      ['Can staff update the screens?', 'Yes. Anyone you share your dashboard link with can update the screens from their own phone.'],
      ['What happens if the power goes out?', 'When the TV turns back on and opens the page, it reconnects by itself and carries on playing.'],
    ],
    related: ['digital-signage-on-any-tv', 'digital-signage-software', 'cheap-digital-signage'],
  },
  {
    slug: 'digital-signage-software',
    nav: 'Digital signage software',
    title: 'Digital Signage Software NZ: Cloud-Based, Easy & Affordable | myQR',
    description: 'NZ cloud digital signage software for venues. Upload images and video, build specials, schedule by day and hour and manage every TV from one dashboard. $39/month.',
    kicker: 'Cloud digital signage software',
    h1: 'Digital signage software for NZ venues',
    intro: 'Cloud-based digital signage software, made in New Zealand for hospitality, fitness, clubs and retail. Everything runs in the browser, on your phone, laptop and TVs, so there’s nothing to install or maintain.',
    sections: [
      {
        h2: 'What’s included',
        body: [],
        list: [
          'Upload images (JPG, PNG, WebP) and videos (MP4) from your phone or laptop',
          'Special builder: a headline, price and small print in five colour styles, no design skills needed',
          'Scheduling by day of the week and time of day, including past midnight',
          'Playlist ordering, hide/show, and slide timing',
          'Up to 20 TVs per venue, each paired with a 6-digit code',
          'Online status for every TV',
          'Offline playback: TVs keep playing if the internet drops',
          'Your venue’s own dashboard address, plus billing you manage yourself',
        ],
      },
      {
        h2: 'Works on the hardware you have',
        body: ['The TV player runs in a web browser, so it works on smart TVs, Chromecast with Google TV, Fire TV Stick, Android TV boxes, and any laptop or mini PC plugged into a screen. It’s built to run on older TV browsers too.'],
      },
      {
        h2: 'Made in New Zealand',
        body: ['Priced in NZ dollars, set to your local time zone, and supported by a Kiwi team. No per-screen US-dollar pricing that jumps with the exchange rate.'],
      },
    ],
    faq: [
      ['Is it cloud-based?', 'Yes. Your adverts are stored securely online and every TV downloads them. You manage everything from a web browser.'],
      ['Does it work on Samsung or LG smart TVs?', 'Most smart TVs have a web browser that works. If yours is old or slow, a Chromecast with Google TV or Fire TV Stick is a cheap, reliable fix.'],
      ['Can I try it first?', 'The monthly plan has no contract, so you can start, try it on your TVs and cancel any time from your dashboard.'],
    ],
    related: ['easy-digital-signage', 'digital-signage-on-any-tv', 'pricing'],
  },
  {
    slug: 'digital-menu-boards',
    nav: 'Digital menu boards',
    title: 'Digital Menu Boards NZ: Turn Any TV into a Menu Board | myQR',
    description: 'Turn the TVs in your café, restaurant or bar into digital menu boards. Change prices from your phone, schedule breakfast and lunch menus. From $39 a month.',
    kicker: 'Digital menu boards',
    h1: 'Digital menu boards on the TVs you already have',
    intro: 'No need for expensive menu board hardware. Put your menu, specials and combos on any TV, change a price from your phone in seconds, and have breakfast switch to lunch by itself.',
    sections: [
      {
        h2: 'Menus that change with the day',
        body: ['Set each menu slide to show at certain hours: breakfast until 11, lunch until 3, then the bar menu. The TVs switch over on their own, every day.'],
      },
      {
        h2: 'Change prices without reprinting',
        body: ['Price going up? Something sold out? Edit it from your phone and every screen updates within about a minute. No reprinting, no blackboard chalk.'],
      },
      {
        h2: 'Menu board ideas',
        body: [],
        list: ['One TV for the menu, another for specials and combos', 'A combo deal on screen while customers queue', 'Your best food photos with the price', 'Daily specials you add in the morning and hide when they sell out', 'Seasonal drinks and desserts'],
      },
    ],
    faq: [
      ['How do I put my menu on a TV?', 'Export your menu as an image (from Canva, Word or your designer) and upload it, or build each item as a special in the dashboard. Then pair your TV with a code.'],
      ['Portrait or landscape?', 'Both work. Design your menu images to match how the TV is mounted.'],
      ['How much does a digital menu board cost?', 'If you already have a TV: $39 a month for up to 20 screens in your venue. Otherwise, add the cost of a TV and, if it’s older, a streaming stick.'],
    ],
    related: ['cheap-digital-signage', 'easy-digital-signage', 'digital-signage-on-any-tv'],
  },
  {
    slug: 'digital-signage-on-any-tv',
    nav: 'Smart TV, Chromecast & Fire TV',
    title: 'Digital Signage on a Smart TV, Chromecast or Fire TV Stick | myQR',
    description: 'Run digital signage on the TV you have: smart TV browser, Chromecast with Google TV, Fire TV Stick or a laptop. No media player box needed. Set up in minutes.',
    kicker: 'Any TV',
    h1: 'Digital signage on any TV: smart TV, Chromecast or Fire TV Stick',
    intro: 'You don’t need a special media player. Our TV player runs in a web browser, so almost any TV can become a digital sign. Here’s how to set up the most common options.',
    sections: [
      {
        h2: 'Smart TVs (Samsung, LG, Sony, Hisense, TCL)',
        body: ['Open the TV’s web browser, go to digitalsignage.myqr.co.nz/tv, and type the code it shows into your dashboard. Set the TV so it doesn’t go to sleep, and you’re done.'],
      },
      {
        h2: 'Chromecast with Google TV or Android TV',
        body: ['Install a web browser from the Play Store, open digitalsignage.myqr.co.nz/tv and pair it. Streaming sticks are cheap and often smoother than older smart TV browsers.'],
      },
      {
        h2: 'Amazon Fire TV Stick',
        body: ['Install the Silk browser (or another browser) from the Amazon app store, open digitalsignage.myqr.co.nz/tv and pair it with the code.'],
      },
      {
        h2: 'A laptop or mini PC',
        body: ['Plug any laptop or mini PC into the TV with HDMI, open the TV address in Chrome and press F11 for full screen.'],
      },
      {
        h2: 'Tips for reliable screens',
        body: [],
        list: ['Turn off the TV’s sleep or eco timer', 'Use Wi-Fi with good signal where the TV is, or a network cable', 'Power the streaming stick from the wall, not the TV’s USB port', 'After a power cut, just reopen the page: the TV remembers its pairing'],
      },
    ],
    faq: [
      ['Do I need a media player?', 'No. A smart TV’s browser, a Chromecast, a Fire TV Stick or a laptop all work.'],
      ['Will it work on an old TV?', 'If the TV has an HDMI port, plug in a streaming stick and use that.'],
      ['Does it play sound?', 'Videos play muted so they don’t clash with your music or the game.'],
    ],
    related: ['easy-digital-signage', 'digital-signage-software', 'cheap-digital-signage'],
  },
  {
    slug: 'small-business-digital-signage',
    nav: 'Small business digital signage',
    title: 'Digital Signage for Small Business NZ: Simple & Affordable | myQR',
    description: 'Digital signage built for small NZ businesses: one flat price, no hardware to buy, set up in minutes and managed from your phone. $39/month for up to 20 TVs.',
    kicker: 'Small business',
    h1: 'Digital signage for small business',
    intro: 'Big-brand digital signage is priced and built for chains. We built ours for the independent café, the local pub, the neighbourhood gym and the corner shop: one venue, a few TVs, and no time to learn complicated software.',
    calculator: true,
    sections: [
      {
        h2: 'Built for one venue, not a head office',
        body: ['No sales calls, no quote, no rollout plan. Sign up online, pair your TVs and put your first special on screen tonight.'],
      },
      {
        h2: 'What small businesses use it for',
        body: [],
        list: ['Specials and combos that lift the average sale', 'Upcoming events, live music and sport', 'New products and seasonal offers', 'Opening hours, notices and holiday closures', 'Thanking local sponsors and suppliers'],
      },
      {
        h2: 'A price that makes sense',
        body: ['One flat price for the venue, in NZ dollars: $39 a month or $399 a year for up to 20 TVs. If one extra coffee, pint or product sells each day because it was on screen, it pays for itself.'],
      },
    ],
    faq: [
      ['Is there a contract?', 'Not on the monthly plan. Cancel any time from your dashboard.'],
      ['I only have one TV. Is it worth it?', 'Yes. The price is the same whether you have one TV or twenty, and you can add more later at no extra cost.'],
      ['Who designs the adverts?', 'You can build specials right in the dashboard, or upload your own images made in Canva or by a designer.'],
    ],
    related: ['cheap-digital-signage', 'easy-digital-signage', 'digital-signage-cost'],
  },
];

export const getTopic = (slug: string) => TOPICS.find((t) => t.slug === slug);
