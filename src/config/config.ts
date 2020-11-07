import dotenv from "dotenv";

dotenv.config({ path: "./src/etc/.env" });

export const OUTPUT_DIR = process.env.OUTPUT_DIR;
export const NODE_ENV = process.env.NODE_ENV;
export const HOST = process.env.HOST;
export const MODE = process.env.MODE;
export const PORT = Number(process.env.PORT);
export const APP_NAME = process.env.APP_NAME;
