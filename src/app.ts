export {}
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loggerMiddleware = require('./middleware/loggerMiddleware.ts')
const errorHandler = require('./middleware/errorHandler.ts')
const userRouter = require('./resources/users/user.router.ts');
const boardsRouter = require('./resources/boards/boards.router.ts');
const tasksRouter = require('./resources/tasks/tasks.router.ts');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards/:boardId/tasks', tasksRouter);

app.use(errorHandler)

module.exports = app;
