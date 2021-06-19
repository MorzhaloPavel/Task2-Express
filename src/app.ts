import express from 'express';
import swaggerUI from 'swagger-ui-express';
import {createConnection} from "typeorm";
import path from 'path';
import YAML from 'yamljs';
import ORMconfig from './common/ormconfig'
import ErrorNotFound from './utils/ErrorNotFound';
import loggerMiddleware from './middleware/loggerMiddleware'
import errorHandler from './middleware/errorHandler'
import { router as userRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/boards.router';
import { router as tasksRouter } from './resources/tasks/tasks.router';
import logger from './utils/logger';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

createConnection(ORMconfig).then(async () => {
  process.stdout.write('Connected to Database\n');
}).catch(error => {
  process.stdout.write('Error connection to Database\n');
  logger.error(error)
});

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', loggerMiddleware);
app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use((_req, _res, next) => {
  const error = new ErrorNotFound('This request does not exist!')
  next(error)
})
app.use(errorHandler)

export default app;



