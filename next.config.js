/** @type {import('next').NextConfig} */

const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";

module.exports = function (phase, { defaultConfig }) {
  return {
    reactStrictMode: true,
    assetPrefix: urlPrefix,
    basePath: urlPrefix, 
    trailingSlash: true,
  };
};
