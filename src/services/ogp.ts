import ogs from 'open-graph-scraper';

export interface OpenGraphImage {
  url: string;
  type: string;
  width: string | null;
  height: string | null;
}
export type OGP = ReturnType<typeof map>;
export type OGPRecord = Record<string, OGP>;

const map = (
  res: Partial<
    Record<
      | 'ogTitle'
      | 'dcTitle'
      | 'twitterTitle'
      | 'ogDescription'
      | 'dcDescription'
      | 'twitterDescription',
      string | undefined
    > & {
      ogImage: OpenGraphImage | OpenGraphImage[] | undefined;
    }
  >
) => ({
  title: res.ogTitle ?? res.dcTitle ?? res.twitterTitle,
  description: res.ogDescription ?? res.dcDescription ?? res.twitterDescription,
  images:
    typeof res.ogImage === 'undefined'
      ? []
      : res.ogImage instanceof Array
      ? res.ogImage
      : [res.ogImage]
});

export const getOGPMetadata = async (
  urls: string[]
): Promise<{ [url: string]: OGP }> =>
  (
    await Promise.allSettled(
      urls.map(async url => ({ url, ...(await ogs({ url })) }))
    )
  ).reduce(
    (acc, cur) =>
      cur.status === 'fulfilled' && !cur.value.error
        ? { ...acc, [cur.value.url]: map(cur.value.result) }
        : acc,
    {} as { [url: string]: OGP }
  );
