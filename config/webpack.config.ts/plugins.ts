import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CaseSensitivePlugin from "case-sensitive-paths-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import { join } from "path";
import webpack from "webpack";
import paths from "../paths";

const isDev = () => process.env.NODE_ENV === "development";

export const sharedPlugins = [
  new MiniCssExtractPlugin({
    filename: isDev() ? "[name].css" : "[name].[contenthash].css",
  }),
  new CaseSensitivePlugin(),
];

export const clientPlugins = [
  new HtmlWebpackPlugin({
    filename: join(paths.clientBuild as string, "index.html"),
    inject: true,
    template: paths.appHtml as string,
  }),
  new WebpackManifestPlugin({
    fileName: "manifest.json",
  }),
];

export const serverPlugins = [
  new webpack.DefinePlugin({
    __SERVER__: "true",
    __BROWSER__: "false",
  }),
];
