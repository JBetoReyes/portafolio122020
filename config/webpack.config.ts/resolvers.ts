import path from "path";
import paths from "../paths";

export default {
  extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".css"],
  modules: paths.resolveModules,
};
