import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import { join } from "path";
import paths from "../../config/paths";
import serverRenderer from "./middlewares/serverRenderer";

dotenv.config();

const app = express();

const manifestPath = join(
  paths.clientBuild as string,
  paths.publicPath as string
);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
);

app.use(serverRenderer);

app.listen(8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running http://localhost:8500`)
  );
});
