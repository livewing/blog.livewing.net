import React from 'react';
import type { FC } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import type { HeaderComponentQuery } from '../../types/graphql-types';

export const Header: FC = () => {
  const data = useStaticQuery<HeaderComponentQuery>(graphql`
    query HeaderComponent {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <header>
      <div className="inside">
        <h1>
          <Link to="/">{data.site?.siteMetadata?.title}</Link>
        </h1>
      </div>
    </header>
  );
};
