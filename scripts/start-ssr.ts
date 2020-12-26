import webpack from "webpack";
import express from "express";
import nodemon from "nodemon";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import paths from "../config/paths";
import getConfig from "../config/webpack.config.ts";
import { logMessage, compilerPromise } from "./utils";

const webpackConfig = getConfig(process.env.NODE_ENV || "development");

const app = express();

const APP_PORT = 3001;

(async () => {
  const [clientConfig, serverConfig] = webpackConfig;
  console.log(JSON.stringify(serverConfig, undefined, 4));
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

  app.use((req, res, next) => {
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

  app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`);
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
