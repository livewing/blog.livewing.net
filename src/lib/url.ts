const { APP_PROTOCOL, APP_HOST } = process.env;
if (typeof APP_PROTOCOL === 'undefined')
  throw new Error('APP_PROTOCOL is not defined');
if (typeof APP_HOST === 'undefined') throw new Error('APP_HOST is not defined');

export const hostname = `${APP_PROTOCOL}://${APP_HOST}`;
