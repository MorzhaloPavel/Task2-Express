import {ConnectionOptions} from "typeorm";
import dotenv from 'dotenv';
import path from "path";

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
  synchronize: true,
  logging: false,
  entities: [
    `src/entity/**/*.ts`
  ],
  migrations: [
    `src/migration/**/*.ts`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;
