# blog.livewing.net

[![CI](https://github.com/gssequence/blog.livewing.net/workflows/CI/badge.svg)](https://github.com/gssequence/blog.livewing.net/actions?query=workflow%3ACI)
[![LICENSE](https://img.shields.io/github/license/gssequence/blog.livewing.net)](./LICENSE)

[blog.livewing.net](https://blog.livewing.net/) のブログです。

## デモ

[Netlify](https://blog-livewing-net-demo.netlify.app/)

## 特徴

- [Gatsby](https://www.gatsbyjs.com/) による静的サイト生成
- [TypeScript](https://www.typescriptlang.org/) で記述
- 記事は Markdown で記述 ([remark](https://remark.js.org/))
- タグ機能
- アーカイブ機能
- [KaTeX](https://katex.org/) を用いた数式の埋め込み ([gatsby-remark-katex](https://www.gatsbyjs.com/plugins/gatsby-remark-katex/))
- [LilyPond](https://lilypond.org/) を用いた楽譜の埋め込み ([gatsby-remark-lilypond](./plugins/gatsby-remark-lilypond))
- ダークモードに対応 (`prefers-color-scheme`)
- 開発コンテナに対応

## クイックスタート

```shell
$ npx -p gatsby-cli gatsby new my-blog gssequence/blog.livewing.net
$ cd my-blog
```

システムに LilyPond をインストールしている場合、下記のコマンドで開発サーバーをすぐに実行できます。 LilyPond をインストールしていない場合でも、 Docker 開発コンテナを使用して開発サーバーを実行できます。 Visual Studio Code に [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) をインストールし、 `Remote-Containers: Reopen in Container` を実行します。 LilyPond による楽譜の埋め込み機能を無効にするには、記事に楽譜を埋め込まないようにするか、プラグインを無効化します (後述) 。

```shell
$ npm run dev
```

開発サーバーは `http://localhost:8000/` で動きます。 GraphiQL は `http://localhost:8000/___graphql` で動きます。開発サーバーをアドレス `0.0.0.0` にバインドするには、 `dev` スクリプトの代わりに `dev:net` スクリプトを実行します。

```shell
$ npm run dev:net
```

## ファイル構成 (一部抜粋)

- `gatsby-config.ts`: ブログの設定
- `articles/`: 記事
- `src/`: ブログのソースコード
- `static/`: 静的配信ファイル

## サイトメタデータ

ブログのメタデータは `gatsby-config.ts` 内の `siteMetadata` で設定します。

```typescript
// gatsby-config.ts

const config: GatsbyConfig = {
  siteMetadata: {
    // ブログのタイトル
    title: 'Sample Blog',
    // ブログの著者
    author: 'livewing.net',
    // 著者の URL
    authorUrl: 'https://livewing.net/',
    // ブログの説明
    description: 'Sample blog using Gatsby',
    // ブログの言語 (html[lang] の値)
    defaultLanguage: 'ja',
    // Facebook OGP のロケール (og:locale)
    defaultLocale: 'ja-JP',
    // フッタの GitHub アイコンのリンク
    githubUrl: 'https://github.com/gssequence/blog.livewing.net',
    // ブログの URL (ドメイン部分まで。末尾のスラッシュは付けないこと)
    siteUrl: 'https://blog-livewing-net-demo.netlify.app'
  },
  // ...
}
```

## YAML Front Matter

記事のメタデータは Markdown ファイル先頭の YAML Front Matter で設定します。

```yaml
title: サンプル記事          # 記事タイトル
slug: /sample                # 記事の URL のパス部分
date: 2021-01-01T00:00:00    # 記事の投稿日時
update: 2021-01-01T00:00:00  # 記事の更新日時
tags: [Sample, Markdown]     # 記事についたタグ
tocMaxDepth: 2               # 目次の最大深さ
```

## 楽譜の埋め込みプラグインを無効化する

LilyPond による楽譜の埋め込みを無効化するには、 `gatsby-config.ts` の `'gatsby-remark-lilypond'` の行を削除またはコメントアウトします。

```diff
 const config: GatsbyConfig = {
   // ...
   plugins: [
     // ...
     {
       resolve: 'gatsby-transformer-remark',
       options: {
         plugins: [
-          'gatsby-remark-lilypond',
           'gatsby-remark-katex',
           // ...
         ]
       }
     },
     // ...
   ]
 };
```

## Lint

以下のコマンドで ESLint と stylelint を実行します。

```shell
$ npm run lint
$ npm run stylelint
```

Prettier による自動修正を行うには、 `:fix` を付加します。

```shell
$ npm run lint:fix
$ npm run stylelint:fix
```

## ビルド

以下のコマンドでブログをビルドできます。ビルド結果は `public/` ディレクトリに出力されます。

```shell
$ npm run build
```

## ライセンス

[The MIT License](./LICENSE) でライセンスされています。
