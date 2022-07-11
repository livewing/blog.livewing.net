import Link from 'next/link';
import type { FC } from 'react';

interface FooterProps {
  author: string;
  authorUrl?: string;
}
export const Footer: FC<FooterProps> = ({ author, authorUrl }) => (
  <footer className="bg-neutral-400 pr-[max(0.5rem,env(safe-area-inset-right))] pl-[max(0.5rem,env(safe-area-inset-left))] pb-[env(safe-area-inset-bottom)] text-neutral-900 dark:bg-neutral-600 dark:text-neutral-100">
    <div className="container mx-auto p-2">
      <div className="flex flex-col items-start">
        <Link href="/tags">
          <a className="underline">タグ一覧</a>
        </Link>
        <Link href="/archives">
          <a className="underline">アーカイブ</a>
        </Link>
      </div>
      <div className="mt-4 text-sm">
        &copy;{' '}
        {typeof authorUrl !== 'undefined' && (
          <a href={authorUrl} className="underline">
            {author}
          </a>
        )}
        {typeof authorUrl === 'undefined' && author}.
      </div>
    </div>
  </footer>
);
