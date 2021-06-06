import { INTERNAL_SERVER_ERROR, getStatusText } from 'http-status-codes'
import express from 'express'
import logger from '../utils/logger.js'
import {IError} from '../types.js'

const errorHandler = (err: IError, _req: express.Request, res: express.Response, next: express.NextFunction) : void => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

export default errorHandler;
