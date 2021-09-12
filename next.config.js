/** @type {import('next').NextConfig} */

const urlPrefix = process.env.NEXT_PUBLIC_URL_PREFIX
  ? "/" + process.env.NEXT_PUBLIC_URL_PREFIX
  : "";

module.exports = function (phase, { defaultConfig }) {
  return {
    reactStrictMode: true,
    assetPrefix: urlPrefix,
    basePath: urlPrefix, 
    trailingSlash: true,
  };
};
