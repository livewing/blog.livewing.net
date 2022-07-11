import { hostname } from '@/lib/url';
import type { GetServerSideProps, NextPage } from 'next';

const robots = `User-agent: *
Allow: /
Sitemap: ${hostname}/sitemap.xml
Host: ${hostname}
`;

const Page: NextPage = () => null;
export default Page;

export const getServerSideProps: GetServerSideProps = ({ res }) => {
  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/plain');
  res.end(robots);
  return Promise.resolve({ props: {} });
};
