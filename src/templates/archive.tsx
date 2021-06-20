import React from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import { ArticleList } from '../components/article-list';
import { convertQueryResult } from '../utils/article-list';
import type { ArchivePageContext } from '../../gatsby-node';
import type { ArchiveTemplateQuery } from '../../types/graphql-types';

interface PageProps {
  data: ArchiveTemplateQuery;
  pageContext: ArchivePageContext;
}

const Page: FC<PageProps> = ({ data, pageContext: { year, month } }) => {
  const subtitle =
    typeof month === 'undefined' ? `${year} 年` : `${year} 年 ${month} 月`;
  return (
    <Layout>
      <Helmet subtitle={[subtitle, 'アーカイブ']} />
      <h1>{subtitle}</h1>
      <hr />
      <ArticleList items={convertQueryResult(data.allMarkdownRemark.edges)} />
    </Layout>
  );
};
export default Page;

export const query = graphql`
  query ArchiveTemplate($gte: Date!, $lt: Date!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { date: { gte: $gte, lt: $lt } } }
    ) {
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
