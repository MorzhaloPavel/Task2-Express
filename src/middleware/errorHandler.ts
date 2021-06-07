import express from 'express'
import logger from '../utils/logger'
import {IError} from '../types'

const errorHandler = (err: IError, _req: express.Request, res: express.Response, next: express.NextFunction) : void => {
  logger.error(err);
  res.status(err.status || 500).send({error: {
    error: err.status || 500,
    message: err.message || 'Oppss!'
  }});
  next()
};

export default errorHandler;
