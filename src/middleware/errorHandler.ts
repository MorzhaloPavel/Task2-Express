export {}
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, getStatusText } = require('http-status-codes');
const express = require('express')
const logger = require('../common/logger.ts');

const error = express.Error
const request = express.Request
const response = express.Response
const nextFunction = express.NextFunction

class ValidationError extends Error {
  status = BAD_REQUEST;
  text = getStatusText(this.status)
}

const errorHandler = (err: typeof error, _req: typeof request, res: typeof response, next: typeof nextFunction) => {
  if (err.status instanceof ValidationError) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(getStatusText(INTERNAL_SERVER_ERROR));
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorHandler;
