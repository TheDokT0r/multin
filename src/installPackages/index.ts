import fs from 'fs';
import path from 'path';
import { PackageManager } from '../@types/PackageManager';
import { exec } from 'child_process';
import ora from 'ora';

export default (rootDirName: string, packagerManager: PackageManager) => {
    const subdirectories = fs.readdirSync(rootDirName, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const subdirectory of subdirectories) {
        ora().start(`Installing dependencies for ${subdirectory}...`);
        const packageJsonPath = path.join(rootDirName, subdirectory, 'package.json');

        if (fs.existsSync(packageJsonPath)) {
            exec(`${packagerManager} install`, { cwd: path.join(__dirname, rootDirName, subdirectory) });
        }
    }
};