import Link from 'next/link';
import type { FC } from 'react';

const ArticleLink: FC<{ id: string; title: string; next?: boolean }> = ({
  id,
  title,
  next = false
}) => (
  <Link href={`/${id}`}>
    <a
      className={`group flex flex-1 flex-col overflow-hidden ${
        next ? 'text-right' : 'text-left'
      }`}
    >
      <div className="border-b border-neutral-500 text-xs uppercase transition-colors group-hover:border-blue-600 group-hover:text-blue-600 dark:group-hover:border-blue-400 dark:group-hover:text-blue-400">
        {next ? 'Next' : 'Prev'}
      </div>
      <div className="truncate transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {title}
      </div>
    </a>
  </Link>
);

interface ArticlePrevNext {
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}
export const ArticlePrevNext: FC<ArticlePrevNext> = ({ prev, next }) =>
  prev === null && next === null ? null : (
    <nav className="flex flex-col justify-between gap-2 sm:flex-row">
      {prev === null && <div className="flex-1" />}
      {prev !== null && <ArticleLink id={prev.id} title={prev.title} />}
      {next === null && <div className="flex-1" />}
      {next !== null && <ArticleLink id={next.id} title={next.title} next />}
    </nav>
  );
