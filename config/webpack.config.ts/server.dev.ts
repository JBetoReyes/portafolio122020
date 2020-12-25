import { merge } from 'webpack-merge';
import baseConfig from './server.base';

const config = {
  ...merge(baseConfig, {
    mode: 'development'
  } as any)
};

export default config;
