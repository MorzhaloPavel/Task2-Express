import {ConnectionOptions} from "typeorm";
import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } =
  process.env;

export default {
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: POSTGRES_PORT || 5433,
  username: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "postgres",
  database: POSTGRES_DB || "node_project",
  synchronize: false,
  migrationsRun: true,
  entities: [
    `dist/entity/*.js`
  ],
  migrations: [
    `dist/migration/*.js`
  ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
  },
} as ConnectionOptions;
