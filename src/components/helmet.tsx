import React from 'react';
import type { FC } from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { makePageTitle, makeTitle } from '../utils/helmet';
import type { HelmetComponentQuery } from '../../types/graphql-types';

interface HelmetProps {
  disableOgp?: boolean;
  language?: string;
  locale?: string;
  subtitle?: string | string[];
  subtitleDelimiter?: string;
  pageType?: string;
  description?: string;
  tags?: string[];
}

export const Helmet: FC<HelmetProps> = ({
  disableOgp = false,
  language,
  locale,
  subtitle,
  subtitleDelimiter,
  pageType = 'website',
  description,
  tags
}) => {
  const { pathname } = useLocation();
  const data = useStaticQuery<HelmetComponentQuery>(graphql`
    query HelmetComponent {
      site {
        siteMetadata {
          title
          description
          defaultLanguage
          defaultLocale
          siteUrl
        }
      }
    }
  `);

  if (!data.site?.siteMetadata) {
    return null;
  }

  const {
    title: siteTitle,
    description: siteDescription,
    defaultLanguage,
    defaultLocale,
    siteUrl
  } = data.site.siteMetadata;

  const pageTitle = siteTitle
    ? makePageTitle(siteTitle, subtitle, subtitleDelimiter)
    : null;
  const ogpTitle = makeTitle(subtitle, subtitleDelimiter) || siteTitle || null;
  const desc = description || siteDescription || null;
  const lang = language || defaultLanguage || null;
  const loc = locale || defaultLocale || null;
  const url = (siteUrl && `${siteUrl}${pathname}`) || null;
  const ogpImageUrl = siteUrl && `${siteUrl}/ogp.png`;

  return (
    <>
      <ReactHelmet>
        {lang && <html lang={lang} />}
        {pageTitle && <title>{pageTitle}</title>}
        {desc && <meta name="description" content={desc} />}
      </ReactHelmet>
      {!disableOgp && (
        <ReactHelmet>
          {ogpTitle && <meta property="og:title" content={ogpTitle} />}
          <meta property="og:type" content={pageType} />
          {url && <meta property="og:url" content={url} />}
          {ogpImageUrl && <meta property="og:image" content={ogpImageUrl} />}
          {desc && <meta property="og:description" content={desc} />}
          {loc && <meta property="og:locale" content={loc} />}
          {siteTitle && <meta property="og:site_name" content={siteTitle} />}
          {pageType === 'article' &&
            tags &&
            tags.map(t => (
              <meta key={t} property="og:article:tag" content={t} />
            ))}

          <meta name="twitter:card" content="summary_large_image" />
          {pageTitle && <meta name="twitter:title" content={pageTitle} />}
          {desc && <meta name="twitter:description" content={desc} />}
          {ogpImageUrl && <meta name="twitter:image" content={ogpImageUrl} />}
        </ReactHelmet>
      )}
    </>
  );
};
