import { createClient } from 'microcms-js-sdk';

const { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } = process.env;
if (typeof MICROCMS_API_KEY === 'undefined')
  throw new Error('MICROCMS_API_KEY is not defined');
if (typeof MICROCMS_SERVICE_DOMAIN === 'undefined')
  throw new Error('MICROCMS_SERVICE_DOMAIN is not defined');

export const client = createClient({
  apiKey: MICROCMS_API_KEY,
  serviceDomain: MICROCMS_SERVICE_DOMAIN
});
