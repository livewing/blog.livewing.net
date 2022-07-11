/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = __dirname;
    config.resolve.alias['@'] = resolve(__dirname, 'src');
    return config;
  }
};
