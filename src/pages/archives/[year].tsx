import { ArticleList } from '@/components/ArticleList';
import { Layout } from '@/components/Layout';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { formatISOToZoned } from '@/lib/date';
import { generateExcerpt } from '@/lib/excerpt';
import { hostname } from '@/lib/url';
import { getArticles } from '@/services/articles';
import { getSiteMetadata } from '@/services/site-metadata';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage
} from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = ({ url, siteMetadata, year, articles }) => (
  <Layout
    siteMetadata={siteMetadata}
    title={`${year} 年 - アーカイブ`}
    url={url}
    description={`${siteMetadata.title} の ${year} 年のアーカイブです。`}
  >
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{year} 年</h1>
      <ArticleList articles={articles} />
    </main>
  </Layout>
);
export default Page;

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{ year: string }>) => {
  const siteMetadata = await getSiteMetadata();
  if (typeof params === 'undefined') throw new Error('params is undefined');
  if (typeof params.year !== 'string') throw new Error('[year] is not string');
  const articles = (await getArticles()).contents.flatMap(
    ({ id, metadata: { title, published: date }, article }) =>
      formatISOToZoned(date, 'yyyy') === `${params.year}`
        ? [
            {
              id,
              title,
              date,
              excerpt: generateExcerpt(article)
            }
          ]
        : []
  );
  if (articles.length === 0) return { notFound: true, props: void 0 as never };
  return {
    props: {
      url: `${hostname}/archives/${params.year}`,
      siteMetadata,
      year: params.year,
      articles
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = () => ({
  paths: [],
  fallback: 'blocking'
});
