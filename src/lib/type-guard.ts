import type { Element } from 'hast';
import type { Link, Literal, Paragraph, Text } from 'mdast';
import type { Node, Parent } from 'unist';

export const isObject = (a: unknown): a is object =>
  typeof a === 'object' && a !== null;

export const isParent = (a: unknown): a is Parent =>
  isObject(a) &&
  'children' in a &&
  (a as { children: unknown }).children instanceof Array;

export const isNode = (a: unknown): a is Node =>
  isObject(a) &&
  'type' in a &&
  typeof (a as { type: unknown }).type === 'string';

export const isLiteral = (a: unknown): a is Literal =>
  isNode(a) &&
  'value' in a &&
  typeof (a as { value: unknown }).value === 'string';

export const isText = (a: unknown): a is Text =>
  isLiteral(a) && a.type === 'text';

export const isParagraph = (a: unknown): a is Paragraph =>
  isNode(a) && a.type === 'paragraph';

export const isLink = (a: unknown): a is Link => isNode(a) && a.type === 'link';

export const isLinkCard = (
  a: unknown
): a is { type: 'linkCard'; url: string } => isNode(a) && a.type === 'linkCard';

export const isLinkCardParagraph = (a: unknown): a is Paragraph => {
  if (!isParagraph(a)) return false;
  if (a.children.length !== 2) return false;

  const [at, link] = a.children;
  if (!isText(at) || at.value !== '@') return false;
  if (!isLink(link) || link.children.length !== 1) return false;
  const content = link.children[0];
  if (!isText(content) || content.value !== 'card') return false;

  return true;
};

export const isElement = (a: unknown): a is Element =>
  isNode(a) && a.type === 'element';

type CodeBlock = Omit<Element, 'children'> & {
  children: [
    Omit<Element, 'properties'> & { properties: { className: string[] } }
  ];
};

export const isCodeBlock = (a: unknown): a is CodeBlock => {
  if (!isElement(a)) return false;
  if (a.tagName !== 'pre' || a.children.length !== 1) return false;

  const [code] = a.children;
  if (!isElement(code)) return false;
  if (code.tagName !== 'code') return false;
  if (
    typeof code.properties === 'undefined' ||
    !('className' in code.properties) ||
    !((code.properties as { className: unknown }).className instanceof Array)
  )
    return false;
  return true;
};
