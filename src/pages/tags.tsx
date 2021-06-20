import React from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import type { TagsPageQuery } from '../../types/graphql-types';
import { TagLink } from '../components/tag-link';

interface PageProps {
  data: TagsPageQuery;
}

const Page: FC<PageProps> = ({ data }) => (
  <Layout>
    <Helmet subtitle="タグ一覧" />
    <div className="tag-list">
      <h1>タグ一覧</h1>
      <hr />
      <ul className="tags-list">
        {data.allMarkdownRemark.group
          .slice()
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(tag =>
            tag.tag ? (
              <li key={tag.tag} className="tag-list-item">
                <TagLink tag={tag.tag} className="tag-list-container">
                  <div className="tag-name">{tag.tag}</div>
                  <div className="tag-count">{tag.totalCount}</div>
                </TagLink>
              </li>
            ) : null
          )}
      </ul>
    </div>
  </Layout>
);
export default Page;

export const query = graphql`
  query TagsPage {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
