import { resolve } from 'path';
import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Sample Blog',
    author: 'livewing.net',
    authorUrl: 'https://livewing.net/',
    description: 'Sample blog using Gatsby',
    defaultLanguage: 'ja',
    defaultLocale: 'ja-JP',
    githubUrl: 'https://github.com/livewing/blog.livewing.net',
    siteUrl: 'https://blog-livewing-net-demo.netlify.app'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        useResolveUrlLoader: true,
        sassOptions: {
          includePaths: [resolve(__dirname, 'node_modules')],
          precision: 8
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: resolve(__dirname, 'articles'),
        ignore: ['**/\\.*']
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // Remove this line if you don't need LilyPond
          'gatsby-remark-lilypond',
          'gatsby-remark-katex',
          {
            resolve: 'gatsby-remark-code-titles',
            options: {
              className: 'article-code-title'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              quality: 80,
              linkImagesToOriginal: false
            }
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false
            }
          },
          'gatsby-remark-prismjs'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'white',
        showSpinner: true
      }
    },
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
        documentPaths: ['./src/**/*.{ts,tsx}', './gatsby-*.ts']
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/tags/', '/tags/*']
      }
    },
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-no-sourcemaps'
  ]
};
export default config;
