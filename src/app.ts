import express from 'express';
import swaggerUI from 'swagger-ui-express';

import path from 'path';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';

// import logger from './utils/logger.js'
import loggerMiddleware from './middleware/loggerMiddleware.js'
import errorHandler from './middleware/errorHandler.js'
import { router as userRouter } from './resources/users/user.router.js';
import { router as boardsRouter } from './resources/boards/boards.router.js';
import { router as tasksRouter } from './resources/tasks/tasks.router.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const swaggerDocument = YAML.load(path.join(dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware);



app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', tasksRouter);
app.use('/boards', boardsRouter);
app.use(errorHandler)

export default app;



// process.on('uncaughtException', (error) => {
//   process.stdout.write(`captured error: ${error.message}`);
//   logger.error(`captured error: ${error.message}`)
// });
// process.on('unhandledRejection', (reason: Error) => {
//   process.stdout.write(`Unhandled rejection detected: ${reason.message}`);
//   logger.error(`Unhandled rejection detected: ${reason.message}`)
// });