// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://senntou.github.io',
  base: '/pnotes',
  markdown: {
    // マークダウン → HTML の変換処理。
    // remarkPlugins はマークダウンの段階、rehypePlugins はHTMLの段階で効く。
    // ここにプラグインを足し引きすればレンダリングを自由に変えられる。
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
