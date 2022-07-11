import Link from 'next/link';
import { formatISOToZoned } from '@/lib/date';
import { escapeTagName } from '@/lib/tag';
import type { Article } from '@/services/articles';
import type { FC } from 'react';

interface ArticleMetadataProps {
  metadata: Article['metadata'];
}
export const ArticleMetadata: FC<ArticleMetadataProps> = ({ metadata }) => (
  <div className="flex flex-col gap-1">
    <aside className="text-neutral-600 dark:text-neutral-400">
      <time>{formatISOToZoned(metadata.published, 'yyyy/MM/dd')}</time> 投稿
      {typeof metadata.updated !== 'undefined' &&
        ` (${formatISOToZoned(metadata.updated, 'yyyy/MM/dd')} 更新)`}
    </aside>
    <h1 className="text-3xl font-bold">{metadata.title}</h1>
    {typeof metadata.tags !== 'undefined' && metadata.tags.length > 0 && (
      <aside className="flex flex-wrap gap-2">
        {metadata.tags.map(({ tag }) => (
          <Link key={tag} href={`/tags/${escapeTagName(tag)}`}>
            <a className="rounded-full bg-blue-500/20 px-3 py-0.5 text-sm text-blue-600 transition-colors hover:bg-blue-500 hover:text-white dark:text-blue-400">
              {tag}
            </a>
          </Link>
        ))}
      </aside>
    )}
  </div>
);
