import dotenv from "dotenv";

dotenv.config({ path: "./src/etc/.env" });

export const OUTPUT_DIR = process.env.OUTPUT_DIR;
export const NODE_ENV = process.env.NODE_ENV;
export const HOST = process.env.HOST;
export const PORT = Number(process.env.PORT);
export const DBHOST = process.env.DBHOST;
export const DBPORT = Number(process.env.DBPORT);
export const DBUSER = process.env.DBUSER;
export const MODE = process.env.MODE;
export const DB = process.env.DB;
export const FLUENTD_HOST = process.env.FLUENTD_HOST;
export const FLUENTD_LOG_PREFIX = process.env.FLUENTD_LOG_PREFIX;
export const FLUENTD_PORT = process.env.FLUENTD_PORT;
export const APP_NAME = process.env.APP_NAME;
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
