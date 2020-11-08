import dotenv from "dotenv";
import path from "path";

const path_join = path.join.bind(path, __dirname, "../"); // Specification path m
export const isDev = process.env.NODE_ENV !== "production";
export const isProd = process.env.NODE_ENV === "production";

const ENV_Paths = [".env", `.env.${!isDev ? "production" : "development"}`];

for (let filename of ENV_Paths)
  dotenv.config({
    path: path_join(filename),
  });

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

export const port = process.env.PORT;
