import type { DemoSlide } from '@/components/TvDemo';

// One landing page per kind of venue, at /for/<slug>. Written for people searching things like
// "digital signage for gyms NZ" or "TV menu screens for cafés". Keep claims honest: no made-up stats.
export type Industry = {
  slug: string;
  name: string;          // "Bars & pubs"
  short: string;         // for links: "Bars"
  title: string;         // <title>, ~60 chars
  description: string;   // meta description, ~155 chars
  h1: string;
  intro: string;
  venue: string;         // example venue name on the demo TV
  demo: DemoSlide[];     // exactly 4, the demo cycles in 16s
  ideas: { h: string; p: string }[];
  tips: string[];
  faq: [string, string][];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'bars-pubs',
    name: 'Bars & pubs',
    short: 'Bars & pubs',
    title: 'Digital Signage for Bars & Pubs NZ | myQR',
    description: 'Put happy hour, tap specials, live sport and events on the TVs in your bar. Schedule by day and hour and update from your phone. From $39 a month.',
    h1: 'Digital signage for bars and pubs',
    intro: 'Your TVs are already on the wall. Between the games, use them to sell: tap specials, happy hour, bar snacks and what’s on this week, switching automatically at the right time of day.',
    venue: 'The Local',
    demo: [
      { style: 'berry', head: 'Happy Hour Pints', price: '$8', detail: 'Weekdays 4–6pm' },
      { style: 'night', head: 'Live Sport This Weekend', price: 'Sat 7:35pm', detail: 'Big screen, sound on. Book a table.' },
      { style: 'sun', head: 'Loaded Fries', price: '$12', detail: 'Add pulled pork +$4' },
      { style: 'fresh', head: 'Quiz Night', price: 'Thursday', detail: 'Teams of up to 6. Starts 7pm.' },
    ],
    ideas: [
      { h: 'Happy hour that runs itself', p: 'Schedule your happy hour slide for 4–6pm weekdays and it appears and disappears on its own. No one has to remember.' },
      { h: 'Bar snacks while they drink', p: 'Show fries, wings and sharing plates to people who are already sitting down with a drink and thinking about food.' },
      { h: 'What’s on this week', p: 'Quiz night, live music, the big game, a DJ on Saturday. Tell the whole room what’s coming and give them a reason to come back.' },
      { h: 'New on tap', p: 'Rotate new beers, seasonal cocktails and the wine of the month without reprinting a single blackboard.' },
    ],
    tips: [
      'Keep each slide to one offer and one price, readable from across the room.',
      'Use 8–10 seconds per slide so a slide is on screen when someone glances up.',
      'Follow the alcohol advertising rules and your licence conditions: no promotions that encourage excessive drinking.',
    ],
    faq: [
      ['Can I still show the sport?', 'Yes. Use one TV for signage and keep the others on the game, or switch a TV’s input back to Sky whenever you need it. Signage carries on where it left off when you switch back.'],
      ['Can customers put their own photos on our TVs for a function?', 'Yes. For 21sts, work dos and birthdays, point them to our sister service Wishcast (myqr.co.nz/photo-wall): guests scan a QR code and their photos play live on your TVs.'],
      ['Can specials change automatically for happy hour?', 'Yes. Every slide can have its own days and hours, so happy hour slides only show during happy hour.'],
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    short: 'Restaurants',
    title: 'Digital Signage & TV Menu Boards for Restaurants NZ | myQR',
    description: 'Show chef’s specials, set menus, desserts and upcoming events on your restaurant’s TVs. Change them from your phone, scheduled by time of day. From $39/month.',
    h1: 'Digital signage for restaurants',
    intro: 'Tell diners about tonight’s specials, the set menu and dessert, right when they’re deciding. Lunch slides at lunch, dinner slides at dinner, and a change of menu takes seconds, not a reprint.',
    venue: 'Harbour Kitchen',
    demo: [
      { style: 'night', head: 'Chef’s Special', price: '$34', detail: 'Market fish, crushed potatoes, lemon butter' },
      { style: 'clean', head: 'Two-Course Lunch', price: '$29', detail: 'Weekdays 12–2:30pm' },
      { style: 'berry', head: 'Save Room for Dessert', price: '$14', detail: 'Sticky date pudding, butterscotch, vanilla ice cream' },
      { style: 'fresh', head: 'Book Your Christmas Function', price: 'Now taking bookings', detail: 'Groups of 10–60. Ask our team.' },
    ],
    ideas: [
      { h: 'Specials that sell out', p: 'Put the dish you want to move on screen with a photo and a price. It’s the easiest upsell you’ll make.' },
      { h: 'Menus by time of day', p: 'Breakfast, lunch and dinner slides switch automatically, so the screen always matches what’s in the kitchen.' },
      { h: 'Desserts and drinks', p: 'A dessert slide at the end of the night reminds people there’s more before they ask for the bill.' },
      { h: 'Functions and events', p: 'Promote private dining, Christmas functions, Mother’s Day and wine dinners to guests who already like your food.' },
    ],
    tips: [
      'Use your own food photos, landscape and well lit. Real dishes beat stock photos every time.',
      'Put the price on the slide. Diners respond to a clear offer.',
      'If a special sells out, hide the slide from your phone in a couple of taps.',
    ],
    faq: [
      ['Can I use it as a menu board?', 'Yes. Upload your menu as images (one per TV, or a few rotating), or build slides for each section. Many restaurants use one screen for the menu and another for specials.'],
      ['Can lunch and dinner show different things?', 'Yes. Set the hours on each slide and the TVs switch over by themselves.'],
    ],
  },
  {
    slug: 'cafes',
    name: 'Cafés',
    short: 'Cafés',
    title: 'Café Digital Menu Boards & TV Screens NZ | myQR',
    description: 'Turn a TV into a café menu board. Show the cabinet specials, combo deals and new drinks, change them in seconds and schedule breakfast and lunch. $39/month.',
    h1: 'Digital menu boards and signage for cafés',
    intro: 'Customers look up while they wait in line. Show them today’s cabinet specials, the coffee-and-muffin combo, the new iced drink and the brunch menu, switching from breakfast to lunch by themselves.',
    venue: 'Corner Café',
    demo: [
      { style: 'sun', head: 'Coffee + Muffin', price: '$9', detail: 'Before 10am, every day' },
      { style: 'clean', head: 'Iced Latte Season', price: '$6.50', detail: 'Oat, almond or soy at no extra cost' },
      { style: 'fresh', head: 'Brunch Served All Day', price: 'Weekends', detail: 'Eggs Benedict, big breakfast, pancakes' },
      { style: 'berry', head: 'Loyalty Card', price: '10th free', detail: 'Ask at the counter' },
    ],
    ideas: [
      { h: 'Combos for the queue', p: 'A coffee-and-food combo on screen while people wait is one of the simplest ways to lift the average order.' },
      { h: 'Breakfast then lunch', p: 'Morning slides switch to lunch slides at 11am without anyone touching the TV.' },
      { h: 'Seasonal drinks', p: 'Launch iced drinks in summer and hot chocolate specials in winter the same day you decide to.' },
      { h: 'Your story', p: 'Your roaster, your baker, where the eggs come from. Small details people like knowing.' },
    ],
    tips: [
      'Put the screen where the queue looks: above or beside the counter.',
      'Portrait or landscape both work. Design your images to match how the TV is mounted.',
      'Short text wins. Name, price and one line is plenty.',
    ],
    faq: [
      ['Do I need a special menu board screen?', 'No. Any TV with a web browser works, or any TV with a Chromecast or Fire TV Stick. That’s often far cheaper than dedicated menu board hardware.'],
      ['Can I update prices myself?', 'Yes. Edit a slide from your phone and every screen shows the new price within about a minute.'],
    ],
  },
  {
    slug: 'gyms',
    name: 'Gyms & fitness studios',
    short: 'Gyms',
    title: 'Digital Signage for Gyms & Fitness Studios NZ | myQR',
    description: 'Show class timetables, member challenges, PT offers and supplements on your gym’s TVs. Schedule by time of day and update from your phone. From $39/month.',
    h1: 'Digital signage for gyms and fitness studios',
    intro: 'Your members are already looking at the screens between sets. Use them for the class timetable, this month’s challenge, PT packages, supplements and member shout-outs.',
    venue: 'Iron & Oak',
    demo: [
      { style: 'night', head: 'Tonight’s Classes', price: '5:30 · 6:30', detail: 'HIIT, Spin, Yoga Flow. Book in the app.' },
      { style: 'fresh', head: 'October Step Challenge', price: '100k steps', detail: 'Sign up at reception. Prizes each week.' },
      { style: 'berry', head: 'PT Starter Pack', price: '3 for $99', detail: 'New members only' },
      { style: 'sun', head: 'Protein Shake', price: '$7', detail: 'Made fresh at the counter' },
    ],
    ideas: [
      { h: 'Class timetable', p: 'Show today’s classes in the morning and tonight’s after lunch, scheduled so the screen is always current.' },
      { h: 'Sell PT and add-ons', p: 'Personal training packages, massage, supplements and merch, promoted to the people most likely to buy them.' },
      { h: 'Challenges and community', p: 'Monthly challenges, member milestones and trainer profiles make the gym feel like a community.' },
      { h: 'Notices without the paper', p: 'Holiday hours, equipment maintenance and new rules, on every screen at once.' },
    ],
    tips: [
      'Use big, bold text. People are reading it mid-workout from a distance.',
      'Rotate slides quickly, 6–8 seconds, as members glance up between sets.',
      'Ask before featuring members, and use their first name only.',
    ],
    faq: [
      ['Can different screens show different things?', 'At the moment every TV in a venue plays the same playlist. For different content in different areas, such as a studio and the gym floor, set up a second venue.'],
      ['Will it play videos?', 'Yes. Upload MP4 videos, such as workout demos or promo clips. They play muted, so they suit screens over music.'],
    ],
  },
  {
    slug: 'clubs',
    name: 'Sports & social clubs',
    short: 'Clubs',
    title: 'Digital Signage for Sports & Social Clubs NZ | myQR',
    description: 'Promote club nights, raffles, bar specials, fixtures and sponsors on your clubrooms TVs. Easy enough for any volunteer to update. From $39 a month.',
    h1: 'Digital signage for sports and social clubs',
    intro: 'Clubrooms run on volunteers, so updating the screens has to be easy. Fixtures, results, members’ draws, bar specials and your sponsors, updated by anyone with the dashboard link on their phone.',
    venue: 'Harbour Rugby Club',
    demo: [
      { style: 'night', head: 'Saturday Fixtures', price: 'Premiers 2:45pm', detail: 'Home vs Northcote. Come and support!' },
      { style: 'sun', head: 'Members’ Draw', price: 'Friday 7pm', detail: 'Must be present to win' },
      { style: 'berry', head: 'Club Night Burgers', price: '$15', detail: 'Friday from 5:30pm' },
      { style: 'clean', head: 'Thanks to Our Sponsors', price: 'Smith Builders', detail: 'Support the people who support us' },
    ],
    ideas: [
      { h: 'Thank your sponsors', p: 'Give sponsors a slide on every screen. It’s a real, visible benefit you can offer when you renew.' },
      { h: 'Fixtures and results', p: 'This week’s games and last week’s results, so members know what’s on before they ask.' },
      { h: 'Bar and kitchen', p: 'Club night meals, bar specials and happy hour, scheduled for the nights you’re open.' },
      { h: 'Raffles, draws and events', p: 'Members’ draws, prizegivings, quiz nights and fundraisers, promoted to everyone in the clubrooms.' },
    ],
    tips: [
      'Share the dashboard link with two or three volunteers so it’s never down to one person.',
      'Make a sponsor slide template and swap the logo, so every sponsor looks consistent.',
      'Check raffle and gaming rules before advertising prizes, and keep gaming machines out of your promotions.',
    ],
    faq: [
      ['Can more than one volunteer update it?', 'Yes. Anyone who opens the dashboard link on their device can update the screens. Only share it with people you trust.'],
      ['Is there a discount for clubs?', 'The price is already low at $39 a month or $399 a year for every screen in the clubrooms. Get in touch if you run several clubrooms.'],
    ],
  },
  {
    slug: 'rsa',
    name: 'RSAs & chartered clubs',
    short: 'RSAs',
    title: 'Digital Signage for RSAs & Chartered Clubs NZ | myQR',
    description: 'TV screens for your RSA or chartered club: members’ draws, meal specials, entertainment, housie and notices. Simple to update, from $39 a month.',
    h1: 'Digital signage for RSAs and chartered clubs',
    intro: 'Keep members up to date with what’s on: members’ draws, the bistro specials, live entertainment, housie and notices, on every TV in the club and updated in seconds.',
    venue: 'Harbourside RSA',
    demo: [
      { style: 'fresh', head: 'Members’ Draw', price: 'Friday 7pm', detail: 'Tonight’s jackpot at reception' },
      { style: 'clean', head: 'Roast of the Day', price: '$18', detail: 'Bistro open 5:30–8pm' },
      { style: 'night', head: 'Live Band Saturday', price: '8pm', detail: 'Free entry for members and guests' },
      { style: 'sun', head: 'Housie', price: 'Wednesday 1pm', detail: 'All welcome' },
    ],
    ideas: [
      { h: 'Bistro specials', p: 'Roast of the day, seniors’ lunch and the Sunday carvery, shown during the hours the kitchen is open.' },
      { h: 'Entertainment and events', p: 'Bands, housie, quiz nights, raffles and members’ draws, so nobody misses out.' },
      { h: 'Notices and remembrance', p: 'AGMs, subscription reminders, Anzac Day services and club news, on every screen at once.' },
      { h: 'Membership', p: 'Encourage guests to join with a simple slide about membership benefits.' },
    ],
    tips: [
      'Use large text and high contrast so it’s easy to read for everyone.',
      'Slow the slides down to 12–15 seconds for comfortable reading.',
      'Follow your licence and gaming rules. Signage is for your club’s news and hospitality, not gaming machines.',
    ],
    faq: [
      ['Is it easy for our staff to use?', 'Yes. If you can send a text with a photo, you can update the screens. There’s nothing to install and no software to learn.'],
      ['What TVs do we need?', 'The TVs you have now. Any TV with a web browser works, or a cheap Chromecast or Fire TV Stick plugged into it.'],
    ],
  },
  {
    slug: 'retail',
    name: 'Retail stores',
    short: 'Retail',
    title: 'Retail Digital Signage for Shops NZ | Window & In-Store TV Screens',
    description: 'Promote sales, new arrivals and in-store offers on TV screens in your shop and window. Schedule promotions and update from your phone. From $39 a month.',
    h1: 'Retail digital signage for shops',
    intro: 'Stop people on the footpath with a window screen, then show them what’s new and what’s on sale once they’re inside. Schedule your promotions ahead of time so they start and end on their own.',
    venue: 'Kōwhai Store',
    demo: [
      { style: 'berry', head: 'Spring Sale', price: '30% off', detail: 'Selected lines, this weekend only' },
      { style: 'clean', head: 'New Arrivals', price: 'In store now', detail: 'The winter collection has landed' },
      { style: 'sun', head: 'Buy 2, Get 1 Free', price: 'Socks & tees', detail: 'Mix and match' },
      { style: 'night', head: 'Click & Collect', price: 'Free', detail: 'Order online, pick up in 2 hours' },
    ],
    ideas: [
      { h: 'Window screens', p: 'A bright, moving window display gets attention from the footpath, even after hours.' },
      { h: 'Sales that start and stop on time', p: 'Schedule a weekend sale to start Friday and finish Sunday night. No one has to remember to take it down.' },
      { h: 'New arrivals and bestsellers', p: 'Show off new stock and your best sellers with your own product photos and videos.' },
      { h: 'Services and loyalty', p: 'Click & collect, gift cards, loyalty programmes and gift wrapping: the things customers don’t know you offer.' },
    ],
    tips: [
      'For window screens, use bold colours and very few words. People are walking past.',
      'Show real products with prices. Specific beats generic.',
      'Make sure sale conditions on screen match the Fair Trading Act rules on price claims.',
    ],
    faq: [
      ['Will it run after the shop closes?', 'Yes, as long as the TV is on. Window screens work well in the evening when the street is busy.'],
      ['Can I schedule a sale ahead of time?', 'Yes. Set which days and hours each slide shows, and it starts and stops on its own.'],
    ],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
