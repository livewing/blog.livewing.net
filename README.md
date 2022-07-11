# blog.livewing.net

[![CI](https://github.com/livewing/blog.livewing.net/workflows/CI/badge.svg)](https://github.com/livewing/blog.livewing.net/actions?query=workflow%3ACI)
[![LICENSE](https://img.shields.io/github/license/livewing/blog.livewing.net)](./LICENSE)

[blog.livewing.net](https://blog.livewing.net/) のブログです。

## 特徴

- [Next.js](https://nextjs.org/) ISR (Incremental Static Regeneration) による動的ページ生成
- [TypeScript](https://www.typescriptlang.org/) で記述
- [microCMS](https://microcms.io/) でコンテンツを管理
- 記事は Markdown で記述 ([remark](https://remark.js.org/))
- タグ機能
- アーカイブ機能
- [KaTeX](https://katex.org/) を用いた数式の埋め込み
- ダークモードに対応 (`prefers-color-scheme`)

## 環境変数

- `APP_PROTOCOL`: ブログ URL のプロトコル (例: `https`)
- `APP_HOST`: ブログ URL のホスト名 (例: `blog.livewing.net`)
- `MICROCMS_API_KEY`: microCMS の API キー
- `MICROCMS_SERVICE_DOMAIN`: microCMS のサービス ID
- `REVALIDATE_SECONDS`: revalidate の秒数 (省略可、デフォルト: `10`)

## microCMS API スキーマ

- [`site-metadata`](./schemas/api-site-metadata.json)
- [`articles`](./schemas/api-articles.json)

## クイックスタート

```shell
$ echo MICROCMS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX > .env.development.local
$ echo MICROCMS_SERVICE_DOMAIN=XXXXX-YYYYY-ZZZZZ >> .env.development.local
$ npm i
$ npm run dev
```

開発サーバーは `http://localhost:3000/` で動きます。

## ライセンス

[The MIT License](./LICENSE) でライセンスされています。
