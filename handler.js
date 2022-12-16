const app = require('./app');
const sls = require('serverless-http');

module.exports.app = sls(app);