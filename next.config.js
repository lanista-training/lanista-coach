const withCSS = require('@zeit/next-css')

const config = {
  target: "serverless",
  //assetPrefix: "https://lanistacoach.s3.amazonaws.com"
};

module.exports = withCSS(config)
