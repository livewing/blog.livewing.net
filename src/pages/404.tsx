import React from 'react';
import type { FC } from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';

const Page: FC = () => (
  <Layout>
    <Helmet disableOgp subtitle="404" />
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <hr />
      <p className="not-found-description">
        お探しのページは見つかりませんでした。
      </p>
      <Link to="/">トップページへ戻る</Link>
    </div>
  </Layout>
);
export default Page;
