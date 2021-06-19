import {ConnectionOptions} from "typeorm";
import dotenv from 'dotenv';
import path from "path";
import User from '../resources/users/user.model'
import Board from "../resources/boards/boards.model";
import Columns from "../resources/boards/columns.model"
import Task from "../resources/tasks/tasks.model"


dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } =
  process.env;

export default {
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: POSTGRES_PORT || 5432,
  username: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "postgres",
  database: POSTGRES_DB || "node_project",
  // migrationsTableName: "custom_migration_table",
  synchronize: true,
  logging: false,
  entities: [
    User,
    Board,
    Columns,
    Task
  ],
  // migrations: [
  //   `src/migration/*.ts`
  // ],
  // cli: {
  //   "migrationsDir": "src/migration",
  // },
} as ConnectionOptions;
