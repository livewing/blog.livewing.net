import type { ComponentPropsWithoutRef, FC } from 'react';

export const ArticleImage: FC<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentPropsWithoutRef<'img'> & { [_: string]: any }
> = ({ ...props }) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img
    {...props}
    className={
      typeof props['data-ogp-image'] !== 'undefined'
        ? ''
        : 'mx-auto w-full max-w-2xl'
    }
  />
);
