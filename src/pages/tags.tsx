import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { hostname } from '@/lib/url';
import { getArticlesMetadata } from '@/services/articles';
import { getSiteMetadata } from '@/services/site-metadata';
import { escapeTagName } from '../lib/tag';
import type { InferGetStaticPropsType, NextPage } from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = ({ url, siteMetadata, tags }) => (
  <Layout
    siteMetadata={siteMetadata}
    title="タグ一覧"
    url={url}
    description={`${siteMetadata.title} のタグ一覧です。`}
  >
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">タグ一覧</h1>
      <nav>
        <ul className="flex flex-wrap gap-2">
          {tags.map(({ tag, n }) => (
            <li key={tag}>
              <Link href={`/tags/${escapeTagName(tag)}`}>
                <a className="flex items-baseline gap-2 rounded-full bg-blue-500/20 px-3 py-0.5 text-sm text-blue-600 transition-colors hover:bg-blue-500 hover:text-white dark:text-blue-400">
                  <div>{tag}</div>
                  <div className="text-xs opacity-80">{n}</div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  </Layout>
);
export default Page;

export const getStaticProps = async () => {
  const siteMetadata = await getSiteMetadata();
  const tags = Object.entries(
    (await getArticlesMetadata()).contents
      .flatMap(({ metadata: { tags = [] } }) => tags.map(({ tag }) => tag))
      .reduce(
        (acc, cur) => ({ ...acc, [cur]: (acc[cur] ?? 0) + 1 }),
        {} as Record<string, number>
      )
  )
    .map(([tag, n]) => ({ tag, n }))
    .sort((a, b) => (a.n !== b.n ? b.n - a.n : a.tag < b.tag ? -1 : 1));
  return {
    props: { url: `${hostname}/tags`, siteMetadata, tags },
    revalidate: REVALIDATE_SECONDS
  };
};
