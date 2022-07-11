import { Readable } from 'stream';
import { parseISO } from 'date-fns';
import { SitemapStream, streamToPromise } from 'sitemap';
import { getArticlesMetadata } from '@/services/articles';
import { formatISOToZoned } from '../lib/date';
import { escapeTagName } from '../lib/tag';
import { hostname } from '../lib/url';
import type { GetServerSideProps, NextPage } from 'next';

const Page: NextPage = () => null;
export default Page;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const { contents: articles } = await getArticlesMetadata();
    const latest = articles
      .flatMap(({ metadata: { published, updated } }) => [
        parseISO(published),
        ...(typeof updated !== 'undefined' ? [parseISO(updated)] : [])
      ])
      .sort((a, b) => b.getTime() - a.getTime())[0];
    const links = [
      typeof latest !== 'undefined'
        ? { url: '/', lastmod: latest.toISOString() }
        : { url: '/' },
      ...articles.map(({ id, metadata: { published, updated } }) => ({
        url: `/${id}`,
        lastmod:
          typeof updated !== 'undefined' &&
          parseISO(published) < parseISO(updated)
            ? updated
            : published
      })),
      typeof latest !== 'undefined'
        ? { url: '/tags', lastmod: latest.toISOString() }
        : { url: '/tags' },
      ...[
        ...new Set(
          articles.flatMap(({ metadata: { tags = [] } }) =>
            tags.map(({ tag }) => tag)
          )
        )
      ].map(tag => ({
        url: `/tags/${escapeTagName(tag)}`
      })),
      typeof latest !== 'undefined'
        ? { url: '/archives', lastmod: latest.toISOString() }
        : { url: '/archives' },
      ...[
        ...new Set(
          articles.map(({ metadata: { published } }) =>
            formatISOToZoned(published, 'yyyy')
          )
        )
      ].map(year => ({ url: `/archives/${year}` }))
    ];

    const stream = new SitemapStream({ hostname });
    const xml = (
      await streamToPromise(Readable.from(links).pipe(stream))
    ).toString();

    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'application/xml');
    res.end(xml);
  } catch {
    res.statusCode = 500;
    res.end();
  }
  return { props: {} };
};
