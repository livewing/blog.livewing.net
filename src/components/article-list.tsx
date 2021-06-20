import React from 'react';
import type { FC } from 'react';
import { Link } from 'gatsby';

export interface ArticleListItemProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const ArticleListItem: FC<ArticleListItemProps> = ({
  title,
  date,
  excerpt,
  slug
}) => (
  <article className="article-list-item">
    <Link to={slug}>
      <p className="article-list-date">{date}</p>
      <h1 className="article-list-title">{title}</h1>
      <p className="article-list-excerpt">{excerpt}</p>
    </Link>
  </article>
);

interface ArticleListProps {
  items: ArticleListItemProps[];
}

export const ArticleList: FC<ArticleListProps> = ({ items }) => (
  <>
    {items.map(i => (
      <ArticleListItem key={i.slug} {...i} />
    ))}
  </>
);
