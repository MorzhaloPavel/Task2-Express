import {createConnection} from "typeorm";
import { PORT } from './common/config';
import ORMconfig from './common/ormconfig'
import logger from './utils/logger'
import app from './app';

createConnection(ORMconfig).then(async () => {
  app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}\n`)
  )
}).catch(error => logger.error("TypeORM connection error: ", error));

