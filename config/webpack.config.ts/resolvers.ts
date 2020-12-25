import path from 'path';
import paths from '../paths';

export default {
  extensions: ['.js', '.json', '.jsx', '.tsx', '.css'],
  modules: paths.resolveModules,
};
