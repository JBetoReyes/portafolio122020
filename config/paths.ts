import { resolve } from 'path';
import fs from 'fs';

const appRootPath = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => resolve(appRootPath, relativePath);

const paths: Record<string, string> = {
    src: resolveApp('src'),
    serverBuild: resolveApp('build/server')
};

export default paths;