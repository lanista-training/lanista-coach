
  const reqResMapper = require("../../compatLayer");
  const page = require("./dos.original.js");

  module.exports.render = (event, context, callback) => {
    const { req, res } = reqResMapper(event, callback);
    page.render(req, res);
  };
