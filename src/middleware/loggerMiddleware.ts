export {}
const { finished } = require('stream');
const express = require('express')
const logger = require('./logger.ts');

const request = express.Request
const response = express.Response
const nextFunction = express.NextFunction

const loggerMiddleware = (req: typeof request, res: typeof response, next: typeof nextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  const { method, url, body, query } = req;
  const start = Date.now();

  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `method: ${method},
      URL: ${decodeURI(url)},
      query parameters: ${JSON.stringify(query)},
      request body: ${JSON.stringify(body)}, 
      ${statusCode} [${ms}ms]`
    );
  });
};

module.exports = loggerMiddleware;
