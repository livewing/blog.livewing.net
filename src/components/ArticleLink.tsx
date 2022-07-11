import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';

export const ArticleLink: FC<ComponentPropsWithoutRef<'a'>> = ({
  children,
  href,
  ...props
}) =>
  typeof href !== 'undefined' ? (
    href.startsWith('/') ? (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    ) : (
      <a href={href} {...props} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  ) : (
    <a {...props}>{children}</a>
  );
