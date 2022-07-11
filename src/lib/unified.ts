import { inspect } from 'unist-util-inspect';
import { visit } from 'unist-util-visit';
import {
  isCodeBlock,
  isLink,
  isLinkCardParagraph,
  isParent
} from '@/lib/type-guard';
import type { Element } from 'hast';
import type { Paragraph } from 'mdast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';

export const linkCard: Plugin = () => tree =>
  visit(
    tree,
    isLinkCardParagraph,
    (node: Paragraph, index: number, parent?: Parent) => {
      if (!isParent(parent)) return;
      const link = node.children[1];
      if (!isLink(link)) return;
      parent.children[index] = {
        type: 'linkCard',
        url: link.url
      } as Node;
    }
  );

export const print: Plugin = () => tree => console.log(inspect(tree));

export const codeTitle: Plugin = () => tree =>
  visit(
    tree,
    node =>
      isCodeBlock(node) &&
      node.children[0].properties.className.some(c =>
        /^language-.+:title=.+$/.test(c)
      ),
    (node, index, parent: unknown) => {
      if (!isParent(parent)) return;
      if (index === null) return;
      if (!isCodeBlock(node)) return;
      const [code] = node.children;
      const { className, lang, title } = code.properties.className.reduce(
        (acc, cur) => {
          const m = cur.match(/^language-(.+):title=(.+)$/);
          if (m === null) return { ...acc, className: [...acc.className, cur] };
          const [, lang, title] = m;
          if (typeof lang === 'undefined' || typeof title === 'undefined')
            throw new Error();
          return {
            className: [...acc.className, `language-${lang}`],
            lang,
            title
          };
        },
        { className: [], lang: null, title: null } as {
          className: string[];
          lang: string | null;
          title: string | null;
        }
      );
      if (typeof lang === 'undefined' || typeof title === 'undefined')
        throw new Error();
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['code-title--wrapper'] },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['code-title--title'] },
            children: [{ type: 'text', value: title }]
          },
          {
            type: 'element',
            tagName: 'pre',
            properties: { className: ['code-title--code'] },
            children: [
              {
                ...code,
                properties: { className }
              } as Element
            ]
          } as Element
        ]
      } as Element;
    }
  );
