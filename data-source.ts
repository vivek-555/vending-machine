import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from 'path';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: false,
  // synchronize: NODE_ENV === "dev" ? false : false,
  // logs sql command on the terminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [
    path.join(__dirname, './src/*/entity.ts')
  ],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});