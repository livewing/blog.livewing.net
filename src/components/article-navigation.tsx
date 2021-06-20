import React from 'react';
import type { FC } from 'react';
import { Link } from 'gatsby';

type ArticleNavigationProps = { direction: 'older' | 'newer' } & (
  | { type: 'none' }
  | { type: 'link'; title: string; slug: string }
);

export const ArticleNavigation: FC<ArticleNavigationProps> = props => {
  const className = [
    'article-navigation-item',
    `article-navigation-item-${props.type}`
  ].join(' ');

  const content = (
    <>
      {props.direction === 'older' && (
        <div className="article-navigation-item-older">
          <span>{'<'}</span>
        </div>
      )}
      <div className="article-navigation-item-content">
        <div className="article-navigation-item-header">
          {`${props.direction === 'older' ? '前' : '次'}の記事`}
        </div>
        <div className="article-navigation-item-title">
          {props.type === 'none' ? 'なし' : props.title}
        </div>
      </div>
      {props.direction === 'newer' && (
        <div className="article-navigation-item-newer">
          <span>{'>'}</span>
        </div>
      )}
    </>
  );

  if (props.type === 'none') {
    return <div className={className}>{content}</div>;
  }
  return (
    <Link to={props.slug} className={className}>
      {content}
    </Link>
  );
};
