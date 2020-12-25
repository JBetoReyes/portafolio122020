import { resolve } from 'path';
import fs from 'fs';

const appRootPath = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => resolve(appRootPath, relativePath);

const paths: Record<string, string | string[]> = {
    src: resolveApp('src'),
    serverBuild: resolveApp('build/server'),
    srcServer: resolveApp('src/server'),
    publicPath: '/static/'
};

paths.resolveModules = [
    paths.srcServer as string,
    paths.src as string,
    'node_modules'
];

export default paths;
