const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = next(dev);
const server = express();

const handle = app.getRequestHandler();

server.get("/", () => {
  app.render(req, res, "/");
});

server.all("*", (req, res) => {
  handle(req, res, req.url);
});

async () => {
  try {
    await app.prepare();
  } catch (error) {
    throw error;
  }

  server.listen(PORT, () => {
    console.log(`SERVER HAS BEEN STARTED. http://localhost:${PORT}`);
  });
};
