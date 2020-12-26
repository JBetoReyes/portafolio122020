import rimraf from "rimraf";
import paths from "../config/paths";

rimraf.sync(paths.serverBuild);
rimraf.sync(paths.clientBuild);

require("./start-ssr");
