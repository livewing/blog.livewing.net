import React from 'react';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import remarkGFM from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { codeTitle, linkCard } from '@/lib/unified';
import { ArticleImage } from './ArticleImage';
import { ArticleLink } from './ArticleLink';
import type { OGPRecord } from '@/services/ogp';
import type { ElementContent } from 'hast';
import type { FC } from 'react';

interface ArticleProps {
  children: string;
  ogp: OGPRecord;
}
export const Article: FC<ArticleProps> = ({ children, ogp }) => (
  <div className="markdown">
    {
      unified()
        .use(remarkParse)
        .use(linkCard)
        .use(remarkGFM)
        .use(remarkMath)
        .use(remarkRehype, {
          allowDangerousHtml: true,
          handlers: {
            linkCard: (_, { url }: { url: string }) =>
              (ogp => ({
                type: 'element',
                tagName: 'a',
                properties: {
                  className: 'link-card',
                  href: url
                },
                children: [
                  ...((ogp?.images?.length ?? 0) >= 1
                    ? [
                        {
                          type: 'element',
                          tagName: 'img',
                          properties: {
                            src: ogp?.images[0]?.url,
                            'data-ogp-image': true
                          },
                          children: []
                        } as ElementContent
                      ]
                    : []),
                  {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: 'link-card--text' },
                    children: [
                      {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: 'link-card--title' },
                        children: [
                          { type: 'text', value: ogp?.title ?? '無題' }
                        ]
                      },
                      {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: 'link-card--description' },
                        children: [
                          { type: 'text', value: ogp?.description ?? '' }
                        ]
                      },
                      {
                        type: 'element',
                        tagName: 'div',
                        properties: { className: 'link-card--url' },
                        children: [
                          {
                            type: 'text',
                            value: new URL(url).host.replace(/^www\./, '')
                          }
                        ]
                      }
                    ]
                  }
                ]
              }))(ogp[url])
          }
        })
        .use(codeTitle)
        .use(rehypePrism, { ignoreMissing: true })
        .use(rehypeKatex)
        .use(rehypeRaw)
        .use(rehypeReact, {
          createElement: React.createElement,
          components: { a: ArticleLink, img: ArticleImage }
        })
        .processSync(children).result
    }
  </div>
);
