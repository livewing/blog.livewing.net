import type { ArticleListItemProps } from '../components/article-list';
import type { Maybe } from '.';

interface ConvertArg {
  excerpt?: Maybe<string>;
  frontmatter?: Maybe<{
    title?: Maybe<string>;
    date?: unknown;
    slug?: Maybe<string>;
  }>;
}

const convert = (node: ConvertArg): ArticleListItemProps | null => {
  const { excerpt, frontmatter } = node;
  if (!excerpt || !frontmatter) {
    return null;
  }
  const { title, date, slug } = frontmatter;
  if (!title || typeof date !== 'string' || !slug) {
    return null;
  }
  return { title, date, excerpt, slug };
};

export const convertQueryResult = (
  edges: { node: ConvertArg }[]
): ArticleListItemProps[] =>
  edges
    .map(e => convert(e.node))
    .filter((i): i is ArticleListItemProps => i !== null);
