export const escapeTagName = (tag: string): string =>
  tag.replace(/#/g, 'sharp');
