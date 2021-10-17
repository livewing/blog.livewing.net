import { resolve } from 'path';
import type { GatsbyNode } from 'gatsby';
import {
  convertYearMonth,
  groupYearMonth,
  dateRange
} from './src/utils/archive';
import { escapeTagName } from './src/utils/tag';
import type { CreatePagesQuery } from 'graphql-types';

const templateDirectory = resolve(__dirname, 'src', 'templates');

export interface ArticlePageContext {
  slug: string;
  tocMaxDepth: number;
  olderSlug: string | null;
  newerSlug: string | null;
}

export interface TagPageContext {
  tag: string;
}

export interface ArchivePageContext {
  year: number;
  month: number | undefined;
  gte: string;
  le: string;
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage }
}) => {
  const result = await graphql<CreatePagesQuery>(`
    query CreatePages {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
        articleEdges: edges {
          node {
            frontmatter {
              slug
              date(formatString: "YYYY/M")
              tocMaxDepth
            }
          }
          newer: next {
            frontmatter {
              slug
            }
          }
          older: previous {
            frontmatter {
              slug
            }
          }
        }
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  const articleEdges = result.data?.allMarkdownRemark.articleEdges;
  const tags = result.data?.allMarkdownRemark.tags;
  if (!articleEdges || !tags) {
    return;
  }
  const yearMonths = groupYearMonth(
    (
      articleEdges
        .map(e =>
          typeof e.node.frontmatter?.date === 'string'
            ? e.node.frontmatter.date
            : void 0
        )
        .filter(d => typeof d === 'string') as string[]
    ).map(convertYearMonth)
  );

  articleEdges.forEach(({ node, older, newer }) => {
    const slug = node.frontmatter?.slug || null;
    const tocMaxDepth = node.frontmatter?.tocMaxDepth ?? 6;
    const olderSlug = older?.frontmatter?.slug || null;
    const newerSlug = newer?.frontmatter?.slug || null;
    if (!slug) {
      return;
    }
    createPage({
      path: slug,
      component: resolve(templateDirectory, 'article.tsx'),
      context: {
        slug,
        tocMaxDepth,
        olderSlug,
        newerSlug
      }
    });
  });
  tags.forEach(tag => {
    if (!tag.tag) {
      return;
    }
    createPage({
      path: `/tags/${escapeTagName(tag.tag)}`,
      component: resolve(templateDirectory, 'tag.tsx'),
      context: {
        tag: tag.tag
      }
    });
  });
  yearMonths.forEach(ym => {
    createPage({
      path: `/archives/${ym.year}`,
      component: resolve(templateDirectory, 'archive.tsx'),
      context: {
        year: ym.year,
        month: void 0,
        ...dateRange(ym.year)
      }
    });

    ym.months.forEach(m => {
      createPage({
        path: `/archives/${ym.year}/` + `${m.month}`.padStart(2, '0'),
        component: resolve(templateDirectory, 'archive.tsx'),
        context: {
          year: ym.year,
          month: m.month,
          ...dateRange(ym.year, m.month)
        }
      });
    });
  });
};
