import Link from 'next/link';
import type { FC } from 'react';

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title: siteTitle }) => (
  <header className="sticky top-0 z-10 overflow-hidden truncate bg-blue-600/80 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] pr-[max(0.5rem,env(safe-area-inset-right))] pl-[max(0.5rem,env(safe-area-inset-left))] text-2xl font-bold text-neutral-100 backdrop-blur">
    <div className="container mx-auto px-2">
      <Link href="/">
        <a>{siteTitle}</a>
      </Link>
    </div>
  </header>
);
