import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import { join } from "path";
import cors from "cors";
import bodyParser from "body-parser";
import paths from "../../config/paths";
import addStore from "./middlewares/addStore";
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

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(addStore);

app.use(serverRenderer);

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`)
  );
});
