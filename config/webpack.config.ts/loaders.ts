const babelLoader = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
    cacheCompression: process.env.NODE_ENV === 'production',
    compact: process.env.NODE_ENV === 'production'
  }
}

const server = [
  {
    oneOf: [
      babelLoader
    ]
  }
];

export { server };
