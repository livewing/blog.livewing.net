import { client } from '@/lib/microcms';
import type { MicroCMSImage } from 'microcms-js-sdk';

export interface SiteMetadata {
  title: string;
  author: string;
  authorUrl?: string;
  locale: string;
  defaultOgpImage: MicroCMSImage;
}

export const getSiteMetadata = (): Promise<SiteMetadata> =>
  client.get({ endpoint: 'site-metadata' });
