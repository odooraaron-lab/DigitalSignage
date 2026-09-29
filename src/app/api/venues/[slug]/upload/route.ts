import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { ownerVenue } from '@/lib/venues';
import { LIMITS } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Gives the dashboard a one-off token to upload straight to storage. */
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const v = await ownerVenue(params.slug);
        if (!v) throw new Error('Open your dashboard link from your email first.');
        if (v.status !== 'active') throw new Error('Your subscription has lapsed. Update billing to keep uploading.');
        if (!pathname.startsWith(`ds/${v.slug}/`)) throw new Error('Bad upload path.');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'],
          maximumSizeInBytes: LIMITS.videoBytes,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Upload failed' }, { status: 400 });
  }
}
