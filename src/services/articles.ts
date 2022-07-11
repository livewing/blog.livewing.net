import { client } from '@/lib/microcms';
import type {
  MicroCMSImage,
  MicroCMSListResponse,
  MicroCMSListContent,
  MicroCMSContentId
} from 'microcms-js-sdk';

interface ArticleData {
  metadata: {
    fieldId: 'metadata';
    title: string;
    ogpImage?: MicroCMSImage;
    published: string;
    updated?: string;
    tags?: {
      fieldId: 'tags';
      tag: string;
    }[];
  };
  article: string;
}

export type Article = MicroCMSListContent & ArticleData;
export type Articles = MicroCMSListResponse<ArticleData>;

export const getArticle = (contentId: string): Promise<Article> =>
  client.get({ endpoint: 'articles', contentId });

export const getArticles = (): Promise<Articles> =>
  client.get({
    endpoint: 'articles',
    queries: { limit: 50, orders: '-metadata.published' }
  });

export const getArticlesMetadata = (): Promise<{
  contents: (MicroCMSContentId & Pick<ArticleData, 'metadata'>)[];
  totalCount: number;
  limit: number;
  offset: number;
}> =>
  client.get({
    endpoint: 'articles',
    queries: { limit: 50, orders: '-metadata.published', fields: 'id,metadata' }
  });

export const getPrevAndNextArticles = async (
  id: string
): Promise<{
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}> => {
  const { contents } = await getArticlesMetadata();
  const index = contents.findIndex(article => article.id === id);
  if (index === -1) return { prev: null, next: null };
  const prev = contents[index + 1];
  const next = contents[index - 1];
  return {
    prev:
      typeof prev !== 'undefined'
        ? { id: prev.id, title: prev.metadata.title }
        : null,
    next:
      typeof next !== 'undefined'
        ? { id: next.id, title: next.metadata.title }
        : null
  };
};
