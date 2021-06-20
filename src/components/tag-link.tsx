import React from 'react';
import type { FC } from 'react';
import { Link } from 'gatsby';
import type { GatsbyLinkProps } from 'gatsby';
import { escapeTagName } from '../utils/tag';

interface TagLinkProps extends Omit<GatsbyLinkProps<unknown>, 'to' | 'ref'> {
  tag: string;
}

export const TagLink: FC<TagLinkProps> = ({ tag, children, ...rest }) => (
  <Link to={`/tags/${escapeTagName(tag)}`} {...rest}>
    {children}
  </Link>
);
