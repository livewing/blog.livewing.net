import React from 'react';
import type { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
  InstapaperShareButton,
  InstapaperIcon,
  TumblrShareButton,
  TumblrIcon
} from 'react-share';
import type { ShareComponentQuery } from '../../types/graphql-types';

interface ShareProps {
  slug: string;
  title: string;
  size?: number;
}

export const Share: FC<ShareProps> = ({ slug, title, size = 40 }) => {
  const data = useStaticQuery<ShareComponentQuery>(graphql`
    query ShareComponent {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const siteUrl = data.site?.siteMetadata?.siteUrl;
  if (!siteUrl) {
    return null;
  }
  const url = `${siteUrl}${slug}`;

  const buttons = [
    { button: TwitterShareButton, icon: TwitterIcon },
    { button: FacebookShareButton, icon: FacebookIcon },
    { button: LineShareButton, icon: LineIcon },
    { button: TumblrShareButton, icon: TumblrIcon },
    { button: PocketShareButton, icon: PocketIcon },
    { button: InstapaperShareButton, icon: InstapaperIcon }
  ];

  return (
    <aside className="article-share-buttons">
      {buttons.map(({ button: Button, icon: Icon }, i) => (
        <Button key={i} url={url} title={title}>
          <Icon round size={size} />
        </Button>
      ))}
    </aside>
  );
};
