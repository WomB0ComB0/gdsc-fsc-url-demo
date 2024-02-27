import z from 'zod';

export const urlShortener = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(255).regex(/^[a-zA-Z0-9-]+$/i),
});

export type TShortenerSchema = z.infer<typeof urlShortener>;