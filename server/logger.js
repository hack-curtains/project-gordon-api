const pino = require('pino')('./logs/info.log');
const expressPino = require('express-pino-logger')({
  logger: pino,
});

module.exports = expressPino;
