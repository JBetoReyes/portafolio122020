import paths from "../paths";
import { join } from "path";
import TerserPlugin from "terser-webpack-plugin";
import { client as clientLoaders } from "./loaders";
import resolvers from "./resolvers";
import { sharedPlugins, clientPlugins } from "./plugins";

const config = {
  name: "client",
  target: "web",
  entry: {
    bundle: [paths.srcClient],
  },
  output: {
    path: join(paths.clientBuild as string, paths.publicPath as string),
    filename: "bundle.js",
    publicPath: paths.publicPath,
    chunkFilename: "[name].[chunkhash:8].chunk.js",
  },
  module: {
    rules: clientLoaders,
  },
  resolve: { ...resolvers },
  plugins: [...sharedPlugins, ...clientPlugins],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Terser Plugin config is taken entirely from react-scripts
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 2017,
          },
          compress: {
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
      }),
    ],
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};

export default config;
