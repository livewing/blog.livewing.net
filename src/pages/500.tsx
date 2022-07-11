import { Layout } from '@/components/Layout';
import { getSiteMetadata } from '@/services/site-metadata';
import type { SiteMetadata } from '@/services/site-metadata';
import type { GetStaticProps, NextPage } from 'next';

interface PageProps {
  siteMetadata: SiteMetadata;
}

const Page: NextPage<PageProps> = ({ siteMetadata }) => (
  <Layout siteMetadata={siteMetadata}>
    <main className="flex flex-col items-center gap-2 divide-neutral-500">
      <h1 className="text-8xl font-extralight">500</h1>
      <p>Internal Server Error</p>
    </main>
  </Layout>
);
export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const siteMetadata = await getSiteMetadata();
  return { props: { siteMetadata } };
};
