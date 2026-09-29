import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { INDUSTRIES } from '@/lib/industries';
import { TOPICS } from '@/lib/topics';
import { POSTS } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({ url: `${SITE}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority });
  return [
    page('', 1),
    page('/pricing', 0.9),
    ...TOPICS.map((t) => page(`/${t.slug}`, 0.9)),
    page('/blog', 0.7),
    ...POSTS.map((p) => page(`/blog/${p.slug}`, 0.7)),
    page('/for', 0.8),
    ...INDUSTRIES.map((i) => page(`/for/${i.slug}`, 0.8)),
    page('/start', 0.6),
    page('/privacy', 0.2),
    page('/terms', 0.2),
  ];
}
