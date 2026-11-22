import { getCollection } from 'astro:content';

export const SITE_TITLE = 'Paper Notes';
export const SITE_DESCRIPTION = '読んだ論文のメモ';

/** base（/pnotes）を考慮したパスを作る */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Date → 'YYYY-MM-DD'（frontmatter の日付はUTC 0時として読まれるのでUTCで取る） */
export function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** 公開記事を新しい順で */
export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
