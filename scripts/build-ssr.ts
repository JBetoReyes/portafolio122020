import webpack from "webpack";
import rimraf from "rimraf";
import chalk from "chalk";
import nodemon from "nodemon";
import { choosePort } from "react-dev-utils/WebpackDevServerUtils";
import fs from "fs";
import puppeteer from "puppeteer";
import getConfig from "../config/webpack.config.ts";
import paths from "../config/paths";
import { logMessage, compilerPromise, sleep } from "../scripts/utils";

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

const webpackConfig = getConfig(process.env.NODE_ENV || "development");

const HOST = process.env.HOST || "http://localhost";

const generateStaticHTML = async () => {
  const PORT = await choosePort("localhost", 8506);
  process.env.PORT = String(PORT);
  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ["*"],
  });
  script.on("start", async () => {
    try {
      await sleep(2000);
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      console.log("go to page:", `${HOST}:${PORT}`);
      await page.goto(`${HOST}:${PORT}`);
      const pageContent = await page.content();
      fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
      await browser.close();
      script.emit("quit");
    } catch (err) {
      script.emit("quit");
      console.log(err);
    }
    script.on("exit", (code: any) => {
      process.exit(code);
    });
    script.on("crash", () => {
      process.exit(1);
    });
  });
};

(async () => {
  const [clientConfig, serverConfig] = webpackConfig;
  const multiCompiler = webpack([clientConfig, serverConfig]);

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  serverCompiler.watch({}, (error: any, stats: any) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
    console.error(chalk.red(stats.compilation.errors));
  });

  clientCompiler.watch({}, (error: any, stats: any) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    console.error(chalk.red(stats.compilation.errors));
  });
  // wait until client and server is compiled
  try {
    await serverPromise;
    await clientPromise;
    await generateStaticHTML();
    logMessage("Done!", "info");
  } catch (error) {
    logMessage(error, "error");
  }
})();
