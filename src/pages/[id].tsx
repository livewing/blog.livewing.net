import { Article } from '@/components/Article';
import { ArticleMetadata } from '@/components/ArticleMetadata';
import { ArticlePrevNext } from '@/components/ArticlePrevNext';
import { Layout } from '@/components/Layout';
import { Share } from '@/components/Share';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { extractLinkCardURL } from '@/lib/ogp';
import { hostname } from '@/lib/url';
import { getArticle, getPrevAndNextArticles } from '@/services/articles';
import { getOGPMetadata } from '@/services/ogp';
import { getSiteMetadata } from '@/services/site-metadata';
import { generateExcerpt } from '../lib/excerpt';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage
} from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = ({
  url,
  siteMetadata,
  article,
  excerpt,
  ogp,
  prevnext
}) => (
  <Layout
    siteMetadata={siteMetadata}
    title={article.metadata.title}
    url={url}
    description={excerpt}
    ogp={article.metadata.ogpImage?.url}
  >
    <main className="flex flex-col gap-8">
      <article className="flex flex-col gap-8">
        <ArticleMetadata metadata={article.metadata} />
        <Article ogp={ogp}>{article.article}</Article>
      </article>
      <Share url={url} title={article.metadata.title} />
      <ArticlePrevNext {...prevnext} />
    </main>
  </Layout>
);
export default Page;

export const getStaticProps = async ({
  params
}: GetStaticPropsContext<{ id: string }>) => {
  const siteMetadata = await getSiteMetadata();
  if (typeof params === 'undefined') throw new Error('params is undefined');
  if (typeof params.id !== 'string') throw new Error('[id] is not string');

  try {
    const article = await getArticle(params.id);
    const ogp = await getOGPMetadata(await extractLinkCardURL(article.article));
    const prevnext = await getPrevAndNextArticles(params.id);
    return {
      props: {
        url: `${hostname}/${params.id}`,
        siteMetadata,
        article,
        excerpt: generateExcerpt(article.article),
        ogp,
        prevnext
      },
      revalidate: REVALIDATE_SECONDS
    };
  } catch (e) {
    if (e instanceof Error && /404/.test(e.message)) {
      return { notFound: true, props: void 0 as never };
    }
    throw e;
  }
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = () => ({
  paths: [],
  fallback: 'blocking'
});
