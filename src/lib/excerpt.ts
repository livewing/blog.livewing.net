import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkGFM from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { isText } from '@/lib/type-guard';

export const generateExcerpt = (article: string, length = 200): string => {
  let text = '';
  unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(
      () => t =>
        visit(t, isText, ({ value }) => {
          text += value;
        })
    )
    .processSync(article);

  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};
