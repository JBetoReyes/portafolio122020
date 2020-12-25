import paths from '../paths';
import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';
import resolvers from './resolvers';

export default {
    name: 'server',
    target: 'node',
    entry: {
      server: [
        require.resolve('regenerator-runtime/runtime'),
        resolve(paths.srcServer as string, 'index.ts'),
      ]
    },
    externals: [
      nodeExternals({
        allowlist: /\.css$/
      })
    ],
    output: {
      path: paths.serverBuild,
      filename: 'server.js',
      publicPath: paths.publicPath
    },
    resolve: {
      ...resolvers,
    },
    node: {
      __dirname: false,
    }
};
