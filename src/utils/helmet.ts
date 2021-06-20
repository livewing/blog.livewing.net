const concat = (arr: string[], delimiter: string): string =>
  arr
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .join(delimiter);

export const makeTitle = (
  subtitle: string | string[] = '',
  subtitleDelimiter = ' - '
): string =>
  concat(
    [...(typeof subtitle === 'string' ? [subtitle] : subtitle)],
    subtitleDelimiter
  );

export const makePageTitle = (
  siteTitle: string,
  subtitle: string | string[] = '',
  subtitleDelimiter = ' - '
): string =>
  concat(
    [makeTitle(subtitle, subtitleDelimiter), siteTitle],
    subtitleDelimiter
  );
