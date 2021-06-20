import React from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import type { TagPageContext } from '../../gatsby-node';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import type { TagTemplateQuery } from '../../types/graphql-types';
import { ArticleList } from '../components/article-list';
import { convertQueryResult } from '../utils/article-list';

interface PageProps {
  data: TagTemplateQuery;
  pageContext: TagPageContext;
}

const Page: FC<PageProps> = ({ data, pageContext: { tag } }) => (
  <Layout>
    <div className="tag-list">
      <h1 className="tag-list-container">{tag}</h1>
    </div>
    <hr />
    <Helmet subtitle={[tag, 'タグ']} />
    <ArticleList items={convertQueryResult(data.allMarkdownRemark.edges)} />
  </Layout>
);
export default Page;

export const query = graphql`
  query TagTemplate($tag: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
