import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // 読んでまとめた日。草はこの日付で塗られる
    date: z.coerce.date(),
    summary: z.string().optional(),
    paper: z
      .object({
        title: z.string().optional(),
        authors: z.string().optional(),
        venue: z.string().optional(),
        year: z.number().optional(),
        url: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    // true にすると公開されない（草にも数えない）
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
