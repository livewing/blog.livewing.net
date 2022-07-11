import { ArticleList } from '@/components/ArticleList';
import { Layout } from '@/components/Layout';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { generateExcerpt } from '@/lib/excerpt';
import { escapeTagName } from '@/lib/tag';
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
const Page: NextPage<PageProps> = ({ url, siteMetadata, tag, articles }) => (
  <Layout
    siteMetadata={siteMetadata}
    title={`${tag} - タグ`}
    url={url}
    description={`${siteMetadata.title} の ${tag} タグ一覧です。`}
  >
    <main className="flex flex-col gap-2">
      <h1 className="gap-2 self-start rounded-full bg-blue-500/20 px-4 py-1 text-2xl text-blue-600 transition-colors dark:text-blue-400">
        {tag}
      </h1>
      <ArticleList articles={articles} />
    </main>
  </Layout>
);
export default Page;

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{ tag: string }>) => {
  const siteMetadata = await getSiteMetadata();
  if (typeof params === 'undefined') throw new Error('params is undefined');
  if (typeof params.tag !== 'string') throw new Error('[tag] is not string');
  let exactTag!: string;
  const articles = (await getArticles()).contents.flatMap(
    ({ id, metadata: { title, tags = [], published: date }, article }) =>
      tags.some(({ tag }) => {
        if (escapeTagName(tag) === params.tag) {
          exactTag = tag;
          return true;
        } else {
          return false;
        }
      })
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
      url: `${hostname}/tags/${params.tag}`,
      siteMetadata,
      tag: exactTag,
      articles
    },
    revalidate: REVALIDATE_SECONDS
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = () => ({
  paths: [],
  fallback: 'blocking'
});
