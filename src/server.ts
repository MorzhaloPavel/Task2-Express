import {createConnection, getManager} from "typeorm";
import bcrypt from "bcrypt";
import { PORT } from './common/config';
import app from './app';
import ORMconfig from './common/ormconfig'
import logger from './utils/logger';


import User from './entity/user';

createConnection(ORMconfig).then(async connection => {
  if(connection.isConnected) {
    process.stdout.write('Connected to Database\n');

    const userRepository = getManager().getRepository(User);
    const adminCreate = await userRepository.create({
      name: 'admin',
      login: 'admin',
      password: bcrypt.hashSync('admin', 8)
    })
    await userRepository.save(adminCreate);

    app.listen(PORT, () =>
    process.stdout.write(`App is running on http://localhost:${PORT}\n`)
    )
  } else {
    connection.connect()
  }
  
}).catch(error => {
  process.stdout.write('Error connection to Database\n');
  logger.error(error)
});