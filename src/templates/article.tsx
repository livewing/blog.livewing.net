import React from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import { ArticlePageContext } from '../../gatsby-node';
import { Layout } from '../components/layout';
import { Helmet } from '../components/helmet';
import { TagLink } from '../components/tag-link';
import { Share } from '../components/share';
import { ArticleNavigation } from '../components/article-navigation';
import { filterTags } from '../utils/article';
import { Maybe } from '../utils';
import type {
  ArticleTemplateQuery,
  SiblingArticleFragment
} from '../../types/graphql-types';

const processSiblingArticle = (
  frontmatter: Maybe<SiblingArticleFragment['frontmatter']>
): { title: string; slug: string } | null => {
  if (!frontmatter) {
    return null;
  }
  const { title, slug } = frontmatter;
  if (!title || !slug) {
    return null;
  }
  return { title, slug };
};

interface PageProps {
  data: ArticleTemplateQuery;
  pageContext: ArticlePageContext;
}

const Page: FC<PageProps> = ({ data, pageContext: { slug } }) => {
  const title = data.article?.frontmatter?.title || void 0;
  const date =
    typeof data.article?.frontmatter?.date === 'string'
      ? data.article.frontmatter.date
      : void 0;
  const update =
    typeof data.article?.frontmatter?.update === 'string' &&
    data.article.frontmatter.update !== date
      ? data.article.frontmatter.update
      : void 0;
  const tags = filterTags(data.article?.frontmatter?.tags);
  const html = data.article?.html || void 0;
  const toc = data.article?.tableOfContents || void 0;
  const excerpt = data.article?.excerpt || void 0;
  const older = processSiblingArticle(data.olderArticle?.frontmatter);
  const newer = processSiblingArticle(data.newerArticle?.frontmatter);

  return (
    <Layout>
      <Helmet
        subtitle={title}
        pageType="article"
        description={excerpt}
        tags={tags}
      />
      <main>
        <article>
          <div className="article-header">
            {date && (
              <p className="article-date">
                <time dateTime={date.replace(/\//g, '-')}>{date}</time> 投稿
                {update && ` (${update} 更新)`}
              </p>
            )}
            {title && <h1 className="article-title">{title}</h1>}
            {tags.length !== 0 && (
              <ul className="article-tags">
                {tags.map(tag => (
                  <li key={tag}>
                    <TagLink tag={tag}>{tag}</TagLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {toc && (
            <details className="article-toc">
              <summary>目次</summary>
              <div dangerouslySetInnerHTML={{ __html: toc }} />
            </details>
          )}
          <hr className="article-header-line" />
          {html && (
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </article>
      </main>
      {title && <Share slug={slug} title={title} />}
      <hr />
      <aside className="article-navigation">
        {older && (
          <ArticleNavigation direction="older" type="link" {...older} />
        )}
        {!older && <ArticleNavigation direction="older" type="none" />}
        {newer && (
          <ArticleNavigation direction="newer" type="link" {...newer} />
        )}
        {!newer && <ArticleNavigation direction="newer" type="none" />}
      </aside>
    </Layout>
  );
};
export default Page;

export const query = graphql`
  query ArticleTemplate(
    $slug: String!
    $tocMaxDepth: Int!
    $olderSlug: String
    $newerSlug: String
  ) {
    article: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD", locale: "ja-JP")
        update(formatString: "YYYY/MM/DD", locale: "ja-JP")
        tags
      }
      excerpt
      tableOfContents(
        absolute: false
        pathToSlugField: "frontmatter.slug"
        maxDepth: $tocMaxDepth
      )
    }
    olderArticle: markdownRemark(frontmatter: { slug: { eq: $olderSlug } }) {
      ...siblingArticle
    }
    newerArticle: markdownRemark(frontmatter: { slug: { eq: $newerSlug } }) {
      ...siblingArticle
    }
  }

  fragment siblingArticle on MarkdownRemark {
    frontmatter {
      title
      slug
    }
  }
`;
