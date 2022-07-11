import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { isLinkCard } from '@/lib/type-guard';
import { linkCard } from '@/lib/unified';

export const extractLinkCardURL = async (
  markdown: string
): Promise<string[]> => {
  const a: string[] = [];
  await unified()
    .use(remarkParse)
    .use(linkCard)
    .use(
      () => t => visit(t, isLinkCard, ({ url }: { url: string }) => a.push(url))
    )
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return [...new Set(a)];
};
