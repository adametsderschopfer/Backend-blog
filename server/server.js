import chalk from "chalk";
import { isMaster, isWorker, fork } from "cluster";
import { cpus } from "os";

import { server } from "./server/index";
import { port } from "./config";

const numCPUs = cpus().length;

if (isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    fork();
  }
} else if (isWorker) {
  raiseTheServer();
}

function raiseTheServer() {
  server.listen(port || 3000, () => {
    console.log(chalk.black.bgGreen(`Server has been started. PORT: ${port}`));
  });
}
