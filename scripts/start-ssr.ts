import webpack from "webpack";
import express from "express";
import nodemon from "nodemon";
import dotenv from 'dotenv';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import paths from "../config/paths";
import getConfig from "../config/webpack.config.ts";
import { logMessage, compilerPromise } from "./utils";

dotenv.config();

const {
  PORT: port,
  DEV_SERVER_HOST: devServerHost,
  WEBPACK_PORT: webpackPort,
} = process.env;

const webpackConfig = getConfig(process.env.NODE_ENV || "development");

const app = express();

(async () => {
  const WEBPACK_PORT =
    webpackPort || !isNaN(Number(port)) ? Number(port) + 1 : 8501;
  console.log('devServerHost: ', devServerHost);
  const DEV_SERVER_HOST = devServerHost ? devServerHost : "http://localhost";
  const publicPath = paths.publicPath;
  const [clientConfig, serverConfig] = webpackConfig;
  clientConfig.output.publicPath = [
    `${DEV_SERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");
  serverConfig.output.publicPath = [
    `${DEV_SERVER_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join("/")
    .replace(/([^:+])\/+/g, "$1/");

  const multiCompiler = webpack([clientConfig, serverConfig]);

  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use("/static", express.static(paths.clientBuild));

  app.listen(WEBPACK_PORT, () => {
    console.log(`App running on port ${WEBPACK_PORT}`);
  });

  serverCompiler.watch(watchOptions, (err, stats) => {
    if (!err && !stats.hasErrors()) {
      console.log(stats.toString());
      return;
    }

    if (err) {
      logMessage(err.message, "error");
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split("\n");
      logMessage(errors[0], "error");
      logMessage(errors[1], "error");
      logMessage(errors[2], "error");
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (err) {
    logMessage(err, "error");
  }

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: [
      "src",
      "scripts",
      "config",
      "./*.*",
      "build/client",
      "**/locales",
      "**/tmp",
    ],
    delay: 200,
  });

  script.on("restart", () => {
    logMessage("Server side app has been restarted.", "warning");
  });

  script.on("quit", () => {
    console.log("Process ended");
    process.exit();
  });

  script.on("error", () => {
    logMessage("An error occurred. Exiting", "error");
    process.exit(1);
  });
})();
