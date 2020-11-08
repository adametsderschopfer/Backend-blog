import path from "path";
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression"
import logger from "morgan";

import AdminAPI from "./api/v1/AdminAPI";
import api from "./api/v1/api";
import { isDev, isProd } from "../config";
import fileMiddleware from "./middlewares/file";

const server = express();

server
  .use(cookieParser())
  .use(cors())
  .use(compression())
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, "../", "public"))) 
  .use(fileMiddleware.single("img"));

if (isDev) {
  server.use(logger("dev"));
}

// APIs

server.use("/admin/api/v1", AdminAPI);
server.use("/api/v1", api);

// ROUTES

if (isProd) {
  server.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../AdminPanel", "build", "index.html"));
  });
}

export { server };
