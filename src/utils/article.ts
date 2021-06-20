import type { Maybe } from '.';

export const filterTags = (
  tags?: Maybe<string>[] | null | undefined
): string[] => tags?.filter((s): s is string => typeof s === 'string') || [];
