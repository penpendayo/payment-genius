/** @type {import('next').NextConfig} */

// const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";

module.exports = function (phase, { defaultConfig }) {
  return {
    reactStrictMode: true,
    assetPrefix: "/payment-genius",
    // basePath: "/",//Link (next/link) や Router (next/router) によるリンクのベースパスは、basePath の設定の方が反映される
    trailingSlash: true,
  };
};
