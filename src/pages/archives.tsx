import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { formatISOToZoned } from '@/lib/date';
import { hostname } from '@/lib/url';
import { getArticlesMetadata } from '@/services/articles';
import { getSiteMetadata } from '@/services/site-metadata';
import type { InferGetStaticPropsType, NextPage } from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = ({ url, siteMetadata, archives }) => (
  <Layout
    siteMetadata={siteMetadata}
    title="アーカイブ"
    url={url}
    description={`${siteMetadata.title} の年別アーカイブです。`}
  >
    <main className="flex flex-col items-start gap-2">
      <h1 className="text-3xl font-bold">アーカイブ</h1>
      <nav>
        <ul className="flex flex-col flex-wrap gap-2">
          {archives.map(({ year, n }) => (
            <li key={year}>
              <Link href={`/archives/${year}`}>
                <a className="flex items-baseline gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  <div className="underline">{year} 年</div>
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
  const archives = Object.entries(
    (await getArticlesMetadata()).contents
      .map(({ metadata: { published } }) => formatISOToZoned(published, 'yyyy'))
      .reduce(
        (acc, cur) => ({ ...acc, [cur]: (acc[cur] ?? 0) + 1 }),
        {} as Record<string, number>
      )
  )
    .map(([year, n]) => ({ year: Number.parseInt(year), n }))
    .sort(({ year: a }, { year: b }) => b - a);

  return {
    props: { url: `${hostname}/archives`, siteMetadata, archives },
    revalidate: REVALIDATE_SECONDS
  };
};
