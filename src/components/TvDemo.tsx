import type { PromoStyle } from '@/lib/venues';

export type DemoSlide = { style: PromoStyle; head: string; price?: string; detail?: string };

/** A TV on the wall cycling through example specials (CSS only). Needs PROMO_CSS on the page. */
export function TvDemo({ slides, venue = 'The Local' }: { slides: DemoSlide[]; venue?: string }) {
  const each = 4;
  return (
    <div className="sg-wall" aria-hidden="true" data-nosnippet="">
      <div className="sg-tv">
        <div className="sg-tv-screen" style={{ ['--n' as string]: slides.length }}>
          {slides.map((d, i) => (
            <div key={d.head} className={`promo ${d.style} sg-slide`} style={{ animationDelay: `${i * each}s`, animationDuration: `${slides.length * each}s` }}>
              <div className="p-dot d1" /><div className="p-dot d2" />
              <h2 className="p-head">{d.head}</h2>
              {d.price && <div className="p-price">{d.price}</div>}
              {d.detail && <div className="p-detail">{d.detail}</div>}
              <div className="p-venue">{venue}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="sg-bar" />
    </div>
  );
}
