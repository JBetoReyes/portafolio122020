import { merge } from 'webpack-merge';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import baseConfig from './client.base';

const config = {
  ...merge(baseConfig, {
    mode: 'development',
    plugins: [
      new WriteFileWebpackPlugin()
    ]
  } as any)
};

export default config;
