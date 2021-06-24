import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import ApiErroe from './utils/ApiErroe';
import loggerMiddleware from './middleware/loggerMiddleware'
import errorHandler from './middleware/errorHandler'
import { router as loginRouter } from './resources/login/login.router';
import { router as userRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/boards.router';
import { router as tasksRouter } from './resources/tasks/tasks.router';
import loginMiddleware from './middleware/loginMiddleware';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', loggerMiddleware);
app.use('/login', loginRouter);
app.use(loginMiddleware)
app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use((_req, _res, next) => {
  const error = ApiErroe.badRequest('This request does not exist!')
  next(error)
})
app.use(errorHandler)

export default app;



