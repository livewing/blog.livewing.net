import { ArticleList } from '@/components/ArticleList';
import { Layout } from '@/components/Layout';
import { REVALIDATE_SECONDS } from '@/lib/constants';
import { generateExcerpt } from '@/lib/excerpt';
import { hostname } from '@/lib/url';
import { getArticles } from '@/services/articles';
import { getSiteMetadata } from '@/services/site-metadata';
import type { InferGetStaticPropsType, NextPage } from 'next';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const Page: NextPage<PageProps> = ({ url, siteMetadata, articles }) => (
  <Layout
    siteMetadata={siteMetadata}
    url={url}
    description={siteMetadata.title}
  >
    <main>
      <ArticleList articles={articles} />
    </main>
  </Layout>
);
export default Page;

export const getStaticProps = async () => {
  const siteMetadata = await getSiteMetadata();
  const articles = (await getArticles()).contents.map(
    ({ id, metadata: { title, published: date }, article }) => ({
      id,
      title,
      date,
      excerpt: generateExcerpt(article)
    })
  );
  return {
    props: { url: `${hostname}/`, siteMetadata, articles },
    revalidate: REVALIDATE_SECONDS
  };
};
