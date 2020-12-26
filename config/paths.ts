import { resolve } from 'path';
import fs from 'fs';

const appRootPath = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string): string => resolve(appRootPath, relativePath);

const paths: Record<string, string | string[]> = {
    appHtml: resolveApp('config/webpack.config.ts/template.html'),
    src: resolveApp('src'),
    config: resolveApp('config'),
    serverBuild: resolveApp('build/server'),
    clientBuild: resolveApp('build/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    srcClient: resolveApp('src/client'),
    publicPath: '/static/'
};

paths.resolveModules = [
    paths.srcClient as string,
    paths.srcServer as string,
    paths.srcShared as string,
    paths.src as string,
    paths.config as string,
    'node_modules'
];

export default paths;
