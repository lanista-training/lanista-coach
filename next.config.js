const withCSS = require('@zeit/next-css')
module.exports = withCSS()

const config = {
  target: "serverless",
  assetPrefix: "https://s3.amazonaws.com/BUCKET_NAME"
};
