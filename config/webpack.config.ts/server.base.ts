import paths from "../paths";
import { resolve } from "path";
import nodeExternals from "webpack-node-externals";
import { sharedPlugins, serverPlugins } from "./plugins";
import { server as serverLoaders } from "./loaders";
import resolvers from "./resolvers";

export default {
  name: "server",
  target: "node",
  entry: {
    server: [
      require.resolve("core-js/stable"),
      require.resolve("regenerator-runtime/runtime"),
      resolve(paths.srcServer as string, "index.ts"),
    ],
  },
  externals: [
    nodeExternals({
      allowlist: /\.css$/,
    }),
  ],
  output: {
    path: paths.serverBuild,
    filename: "server.js",
    publicPath: paths.publicPath,
  },
  resolve: {
    ...resolvers,
  },
  module: {
    rules: serverLoaders,
  },
  plugins: [...sharedPlugins, ...serverPlugins],
  stats: {
    all: true,
    // assets: true,
    // cached: false,
    // cachedAssets: false,
    // chunks: false,
    // chunkModules: false,
    // children: false,
    // colors: true,
    // hash: false,
    // modules: false,
    // performance: false,
    // reasons: false,
    // timings: true,
    // version: false,
    // moduleAssets: true,
  },
  node: {
    __dirname: false,
  },
};
