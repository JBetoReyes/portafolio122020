import MiniCssExtractPlugin from "mini-css-extract-plugin";

const cssRegex = /\.s?css$/;
const cssModuleRegex = /\.module\.s?css$/;

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

const cssLoaderServer = {
    test: cssRegex,
    use: [MiniCssExtractPlugin.loader, require.resolve('css-loader'), require.resolve('sass-loader')],
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true,
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    require.resolve("css-loader"),
    require.resolve('sass-loader'),
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

const fileLoaderServer = {
    exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
                emitFile: false,
            },
        },
    ],
};

const server = [
  {
    oneOf: [babelLoader, cssLoaderServer, fileLoaderServer],
  },
];

const client = [
  {
    oneOf: [babelLoader, cssLoaderClient, urlLoaderClient, fileLoaderClient],
  },
];

export { server, client };
