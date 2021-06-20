import React from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import { ArticleList } from '../components/article-list';
import { convertQueryResult } from '../utils/article-list';
import type { IndexPageQuery } from '../../types/graphql-types';

interface PageProps {
  data: IndexPageQuery;
}

const Page: FC<PageProps> = ({ data }) => (
  <Layout>
    <Helmet />
    <ArticleList items={convertQueryResult(data.allMarkdownRemark.edges)} />
  </Layout>
);
export default Page;

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD", locale: "ja-JP")
            slug
          }
          excerpt
        }
      }
    }
  }
`;
