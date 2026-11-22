# Paper Notes

読んだ論文のメモ。公開先: https://senntou.github.io/pnotes/

## 書き方

1. `make new n=なにか` で `src/content/posts/今日の日付-なにか.md` ができる（中身は `templates/note.md`、`date` は今日）
   - 別の日付にしたいときは `make new n=なにか DATE=2026-11-20`
2. 冒頭（frontmatter）を埋めて本文を書く
3. `main` にプッシュすると自動で公開される

- `date` の日に草が1マス塗られる（同じ日の本数で濃くなる）
- `draft: true` にすると公開されず、草にも数えない
- 数式は `$...$`（文中）と `$$...$$`（別行）
- 画像は記事と同じフォルダに置いて `![説明](./fig.png)` で参照できる

## 手元で確認

```sh
npm install
npm run dev   # http://localhost:4321/pnotes/
```

## レンダリングを変えたいとき

`astro.config.mjs` の `remarkPlugins`（マークダウン段階）と `rehypePlugins`（HTML段階）にプラグインを足し引きする。
