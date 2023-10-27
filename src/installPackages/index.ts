import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { PackageManager } from '../@types/PackageManager';
import { exec } from 'child_process';
import { createSpinner } from 'nanospinner';

const execAsync = promisify(exec);

export default async (rootDirName: string, packagerManager: PackageManager) => {
  const rootDir = process.cwd();

  if (fs.existsSync(path.join(rootDir, rootDirName, 'package.json'))) {
    const spinner = createSpinner(
      `Installing dependencies for ${rootDirName}...`,
    ).start();
    const { stdout, stderr } = await execAsync(`${packagerManager} install`, {
      cwd: path.join(rootDir, rootDirName),
    });
    // console.log(`stdout: ${stdout}`);

    // if(stderr) {
    //     spinner.error({ text: `Failed to install dependencies for ${rootDirName}` });
    //     console.error(`stderr: ${stderr}`);
    // }

    spinner.success({ text: `Dependencies installed for ${rootDirName}` });
  }

  const subdirectories = fs
    .readdirSync(rootDirName, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const subdirectory of subdirectories) {
    const packageJsonPath = path.join(
      rootDirName,
      subdirectory,
      'package.json',
    );

    if (fs.existsSync(packageJsonPath)) {
      const spinner = createSpinner(
        `Installing dependencies for ${subdirectory}...`,
      ).start();
      const { stdout, stderr } = await execAsync(`${packagerManager} install`, {
        cwd: path.join(rootDir, rootDirName, subdirectory),
      });
      // console.log(`stdout: ${stdout}`);

      // if(stderr) {
      //     spinner.error({ text: `Failed to install dependencies for ${subdirectory}` });
      //     console.error(`stderr: ${stderr}`);
      // }

      spinner.success({ text: `Dependencies installed for ${subdirectory}` });
    }
  }
};
