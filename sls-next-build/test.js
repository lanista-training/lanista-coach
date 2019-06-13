
  const page = require("./test.original.js");
  const handlerFactory = require("next-aws-lambda");

  module.exports.render = (event, context, callback) => {
    const handler = handlerFactory(page);
    handler(event, context, callback);
  };