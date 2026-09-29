import { notFound, redirect } from 'next/navigation';
import { getVenue, base } from '@/lib/venues';

export const dynamic = 'force-dynamic';

/** The venue's own address goes to its dashboard. */
export default async function VenueHome({ params }: { params: { slug: string } }) {
  const v = await getVenue(params.slug);
  if (!v || v.status === 'pending') notFound();
  redirect(`${base(v.slug)}/dashboard`);
}
