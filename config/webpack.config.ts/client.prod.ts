import baseConfig from "./client.base";
import { merge } from "webpack-merge";
import CompressionWebpackPlugin from "compression-webpack-plugin";

const generateSourceMap = process.env.OMIT_SOURCEMAP === "true" ? false : true;

const config = {
  ...merge(baseConfig, {
    mode: "production",
    devtool: generateSourceMap ? "source-map" : false,
    plugins: [
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        filename: "[path][base].gz",
      }),
    ],
  } as any),
};

config.output.filename = "bundle.[hash:8].js";

export default config;
