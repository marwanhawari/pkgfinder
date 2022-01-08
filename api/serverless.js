const serverless = require("serverless-http");
const {app} = require("./main.js");

module.exports.handler = serverless(app);
