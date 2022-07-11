import Head from 'next/head';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import type { SiteMetadata } from '@/services/site-metadata';
import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode | undefined;
  title?: string | undefined;
  siteMetadata: SiteMetadata;
  url?: string | undefined;
  description?: string | undefined;
  ogp?: string | undefined;
}
export const Layout: FC<LayoutProps> = ({
  children,
  title,
  siteMetadata,
  url,
  description,
  ogp
}) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      {typeof url !== 'undefined' && typeof description !== 'undefined' && (
        <>
          <meta
            name="description"
            content={description.replace(/[\r\n]/g, ' ')}
          />
          <meta
            property="og:title"
            content={
              typeof title === 'undefined'
                ? siteMetadata.title
                : `${title} - ${siteMetadata.title}`
            }
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={url} />
          <meta
            property="og:image"
            content={ogp ?? siteMetadata.defaultOgpImage.url}
          />
          <meta
            property="og:description"
            content={description.replace(/[\r\n]/g, ' ')}
          />
          <meta property="og:locale" content={siteMetadata.locale} />
          <meta property="og:site_name" content={siteMetadata.title} />
          <meta
            property="twitter:card"
            content={description.replace(/[\r\n]/g, ' ')}
          />
        </>
      )}
      <title>
        {typeof title === 'undefined'
          ? siteMetadata.title
          : `${title} - ${siteMetadata.title}`}
      </title>
    </Head>
    <div className="flex min-h-screen flex-col gap-2 bg-neutral-100 text-neutral-900 transition-colors dark:bg-neutral-900 dark:text-neutral-100">
      <Header {...siteMetadata} />
      <div className="flex-1 pr-[max(0.5rem,env(safe-area-inset-right))] pl-[max(0.5rem,env(safe-area-inset-left))]">
        <div className="container mx-auto px-2">{children}</div>
      </div>
      <Footer {...siteMetadata} />
    </div>
  </>
);
