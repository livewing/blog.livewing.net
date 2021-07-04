---
title: サンプル記事
slug: /sample
date: 2021-01-01T00:00:00
tags: [Sample, Markdown]
tocMaxDepth: 2
---

ファイル名: `articles/sample.md`

このブログでは Markdown を使用して記事を書きます。 Markdown の処理には [remark](https://github.com/remarkjs/remark) が使用されています。

# 段落 (`<p>`)

```markdown
The quick brown fox jumps over the lazy dog

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

The quick brown fox jumps over the lazy dog

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# 見出し (`<h1>` - `<h6>`)

```markdown
# h1

## h2

### h3

#### h4

##### h5

###### h6

h1 (alternative)
================

h2 (alternative)
----------------
```

# h1

## h2

### h3

#### h4

##### h5

###### h6

h1 (alternative)
================

h2 (alternative)
----------------

# テキストの装飾 (`<em>`, `<strong>`, `<del>`)

```markdown
normal *em* _em_ **strong** __strong__ ~~del~~
```

normal *em* _em_ **strong** __strong__ ~~del~~

# リスト (`<ul>`, `<ol>`)

```markdown
- Item 1
- Item 2
  - Sub 1
  - Sub 2
    - Sub 3
- Item 3

1. Item 1
1. Item 2
1. Item 3

- [ ] In progress
- [x] Done
```

- Item 1
- Item 2
  - Sub 1
  - Sub 2
    - Sub 3
- Item 3

1. Item 1
1. Item 2
1. Item 3

- [ ] In progress
- [x] Done

# 引用 (`<blockquote>`)

```markdown
> その時、その喉から、鴉からすの啼くような声が、喘あえぎ喘ぎ、下人の耳へ伝わって来た。
>> この髪を抜いてな、この髪を抜いてな、鬘かずらにしようと思うたのじゃ。
```

> その時、その喉から、鴉からすの啼くような声が、喘あえぎ喘ぎ、下人の耳へ伝わって来た。
>> この髪を抜いてな、この髪を抜いてな、鬘かずらにしようと思うたのじゃ。

# 水平線 (`<hr>`)

```markdown
---
- - -
***
* * *
```

---
- - -
***
* * *

# リンク (`<a>`)

```markdown
[Gatsby](https://www.gatsbyjs.com/)
```

[Gatsby](https://www.gatsbyjs.com/)

# 表 (`<table>`)

```markdown
| left-aligned | right-aligned | center-aligned |
|:-------------|--------------:|:--------------:|
| foo          | bar           | baz            |
| 0            | 1             | 2              |
```

| left-aligned | right-aligned | center-aligned |
|:-------------|--------------:|:--------------:|
| foo          | bar           | baz            |
| 0            | 1             | 2              |

# 折り畳み (`<details>`)

```markdown
<details>
<summary>クリックして展開</summary>

こんにちは

</details>
```

<details>
<summary>クリックして展開</summary>

こんにちは

</details>

# コード (`<code>`)

````markdown
`3` の倍数で `"Fizz"` 、 `5` の倍数で `"Buzz"` と出力します。

```rust:title=src/main.rs
fn main() {
    (1..=100).for_each(|i| match (i % 3, i % 5) {
        (0, 0) => println!("FizzBuzz"),
        (0, _) => println!("Fizz"),
        (_, 0) => println!("Buzz"),
        _ => println!("{}", i)
    })
}
```

----------

```diff-typescript:title=index.ts
-const str: string = '愚の直行';
+const str: string = '愚の骨頂';
 console.log(str);
```
````

`3` の倍数で `"Fizz"` 、 `5` の倍数で `"Buzz"` と出力します。

```rust:title=src/main.rs
fn main() {
    (1..=100).for_each(|i| match (i % 3, i % 5) {
        (0, 0) => println!("FizzBuzz"),
        (0, _) => println!("Fizz"),
        (_, 0) => println!("Buzz"),
        _ => println!("{}", i)
    })
}
```

----------

```diff-typescript:title=index.ts
-const str: string = '愚の直行';
+const str: string = '愚の骨頂';
 console.log(str);
```

# 脚注

```markdown
Gatsby[^1] は高速な SSG[^2] です。

[^1]: https://www.gatsbyjs.com/
[^2]: Static Site Generator (静的サイトジェネレータ)
```

Gatsby[^1] は高速な SSG[^2] です。

[^1]: https://www.gatsbyjs.com/
[^2]: Static Site Generator (静的サイトジェネレータ)
