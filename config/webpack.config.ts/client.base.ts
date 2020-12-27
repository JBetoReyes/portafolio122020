import paths from '../paths';
import { join } from 'path';
import { client as clientLoaders } from './loaders';
import resolvers from './resolvers';
import { sharedPlugins, clientPlugins } from './plugins';

const config = {
  name: 'client',
  target: 'web',
  entry: {
    bundle: [
      paths.srcClient,
    ]
  },
  output: {
    path: join(paths.clientBuild as string, paths.publicPath as string),
    filename: 'bundle.js',
    publicPath: paths.publicPath,
  },
  module: {
    rules: clientLoaders
  },
  resolve: { ...resolvers },
  plugins: [ ...sharedPlugins, ...clientPlugins ],
};

export default config;
