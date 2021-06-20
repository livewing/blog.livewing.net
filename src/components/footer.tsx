import React from 'react';
import type { FC } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import type { FooterComponentQuery } from '../../types/graphql-types';

export const Footer: FC = () => {
  const data = useStaticQuery<FooterComponentQuery>(graphql`
    query FooterComponent {
      site {
        siteMetadata {
          author
          authorUrl
          githubUrl
        }
      }
    }
  `);
  const githubUrl = data.site?.siteMetadata?.githubUrl || void 0;
  return (
    <footer>
      <div className="inside">
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/tags">タグ一覧</Link>
            </li>
            <li>
              <Link to="/archives">アーカイブ</Link>
            </li>
          </ul>
          <ul>
            <li>
              {githubUrl && (
                <a href={githubUrl} aria-label="GitHub">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              )}
            </li>
          </ul>
        </div>
        <p>
          &copy;{' '}
          <a href={data.site?.siteMetadata?.authorUrl || void 0}>
            {data.site?.siteMetadata?.author}
          </a>
        </p>
      </div>
    </footer>
  );
};
