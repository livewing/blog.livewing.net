import Link from 'next/link';
import { formatISOToZoned } from '@/lib/date';
import type { FC } from 'react';

interface ArticleListProps {
  articles: { id: string; title: string; date: string; excerpt: string }[];
}
export const ArticleList: FC<ArticleListProps> = ({ articles }) => (
  <nav>
    <ul className="flex flex-col">
      {articles.map(({ id, title, date, excerpt }) => (
        <li key={id}>
          <Link href={`/${id}`}>
            <a className="flex flex-col rounded-md p-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800">
              <div className="text-sm">
                {formatISOToZoned(date, 'yyyy/MM/dd')}
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {title}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {excerpt}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
