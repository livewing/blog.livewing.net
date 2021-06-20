import React from 'react';
import type { FC } from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import { convertYearMonth, groupYearMonth } from '../utils/archive';
import { ArchivesPageQuery } from '../../types/graphql-types';

interface PageProps {
  data: ArchivesPageQuery;
}

const Page: FC<PageProps> = ({ data }) => {
  const yearMonths = (
    data.allMarkdownRemark?.nodes
      .map(n =>
        typeof n.frontmatter?.date === 'string' ? n.frontmatter.date : void 0
      )
      .filter(d => typeof d === 'string') as string[]
  ).map(convertYearMonth);
  const ymg = groupYearMonth(yearMonths);

  return (
    <Layout>
      <Helmet subtitle="アーカイブ" />
      <div className="archive-list">
        <h1>アーカイブ</h1>
        <hr />
        {ymg.map(y => (
          <React.Fragment key={y.year}>
            <h2 className="archive-item">
              <Link to={`/archives/${y.year}/`}>{y.year} 年</Link>
              <span className="archive-count">
                {y.months.map(m => m.count).reduce((acc, cur) => (acc += cur))}
              </span>
            </h2>
            <ul>
              {y.months.map(m => (
                <li key={m.month} className="archive-item">
                  <Link
                    to={
                      `/archives/${y.year}/` +
                      `${m.month}`.padStart(2, '0') +
                      '/'
                    }
                  >
                    {y.year} 年 {m.month} 月
                  </Link>
                  <span className="archive-count">{m.count}</span>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
};
export default Page;

export const query = graphql`
  query ArchivesPage {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "YYYY/M")
        }
      }
    }
  }
`;
