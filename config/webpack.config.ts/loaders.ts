import MiniCssExtractPlugin from "mini-css-extract-plugin";

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin,
    {
      loader: require.resolve("css-loader"),
      options: {
        localsConvention: "camelCase",
      },
    },
  ],
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    require.resolve("css-hot-loader"),
    MiniCssExtractPlugin.loader,
    require.resolve("css-loader"),
  ],
};

const babelLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  // exclude: /node_modules/,
  loader: require.resolve("babel-loader"),
  options: {
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === "production",
    compact: process.env.NODE_ENV === "production",
  },
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)?/,
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "assets/[name].[hash:8].[ext]",
  },
};

const fileLoaderClient = {
  test: /\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/,
  use: {
    loader: require.resolve("file-loader"),
    options: {
      name: "assets/[name].[hash:8].[ext]",
    },
  },
};

const server = [
  {
    oneOf: [babelLoader],
  },
];

const client = [
  {
    oneOf: [babelLoader, cssLoaderClient, urlLoaderClient, fileLoaderClient],
  },
];

export { server, client };
