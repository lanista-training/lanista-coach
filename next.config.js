const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})

const config = {
  target: "serverless",
  assetPrefix: "https://s3.amazonaws.com/BUCKET_NAME"
};
