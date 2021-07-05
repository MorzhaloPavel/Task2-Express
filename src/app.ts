import express from 'express';
import swaggerUI from 'swagger-ui-express';

import path from 'path';
import YAML from 'yamljs';

import ErrorNotFound from './utils/ErrorNotFound';
import logger from './utils/logger'
import loggerMiddleware from './middleware/loggerMiddleware'
import errorHandler from './middleware/errorHandler'
import { router as userRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/boards.router';
import { router as tasksRouter } from './resources/tasks/tasks.router';



const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware);

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use('/boards', boardsRouter);

app.use((_req, _res, next) => {
  const error = new ErrorNotFound('This request does not exist!')
  next(error)
})

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`)
  setTimeout(() => {
    process.exit(1)
  }, 500)  
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(`Unhandled rejection detected: ${reason.message}`)
  setTimeout(() => {
    process.exit(1)
  }, 500) 
});

app.use(errorHandler)

export default app;



