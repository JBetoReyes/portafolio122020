import webpack from 'webpack';
import { merge } from 'webpack-merge';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './client.base';

const config = {
  ...merge(baseConfig, {
    mode: 'development',
    plugins: [
      new WriteFileWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
            sockIntegration: 'whm',
        },
      }),
    ]
  } as any)
};

export default config;
