---
title: サンプル記事 2
slug: /sample2
date: 2021-01-02T00:00:00
tags: [Sample, Markdown, KaTeX, LilyPond]
tocMaxDepth: 2
---

ファイル名: `articles/sample2/index.md`

# 画像 (`<img>`)

```markdown
![Kannai Jiro](./kannai.jpg)
```

![Kannai Jiro](./kannai.jpg)

# 数式 ($ \KaTeX $)

```markdown
$$
e^{i\pi} + 1 = 0
$$

ここで $ e $ はネイピア数、 $ i $ は虚数単位、 $ \pi $ は円周率である。
```

$$
e^{i\pi} + 1 = 0
$$

ここで $ e $ はネイピア数、 $ i $ は虚数単位、 $ \pi $ は円周率である。

# 楽譜 (LilyPond)

ビルドに [LilyPond](https://lilypond.org/) が必要です。楽譜の埋め込み機能を無効にすることもできます。

````markdown
```lilypond:embed
\version "2.22.0"
\paper { page-breaking = #ly:one-line-auto-height-breaking }

\relative {
  \clef treble
  \key g \major
  \time 4/4
  \tempo 4 = 193

  d''4 b8 c d4 b8 c | d4 c b c |
  b4 g8 a b4 g8 a | b4 g b d |
  e2 fis4 g | a g fis e |
  e d cis e | d2. r4 |
}
```
````

```lilypond:embed
\version "2.22.0"
\paper { page-breaking = #ly:one-line-auto-height-breaking }

\relative {
  \clef treble
  \key g \major
  \time 4/4
  \tempo 4 = 193

  d''4 b8 c d4 b8 c | d4 c b c |
  b4 g8 a b4 g8 a | b4 g b d |
  e2 fis4 g | a g fis e |
  e d cis e | d2. r4 |
}
```
