import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { PackageManager } from '../@types/PackageManager';
import { exec } from 'child_process';
import { createSpinner } from 'nanospinner';

const execAsync = promisify(exec);

export default async (repoName:string, packagerManager: PackageManager) => {
  const rootDir = process.cwd();

  if (fs.existsSync(path.join(rootDir, 'package.json'))) {
    const spinner = createSpinner(
      `Installing dependencies for ${repoName}...`,
    ).start();
    await execAsync(`${packagerManager} install`, {
      cwd: path.join(rootDir, repoName),
    });
    // console.log(`stdout: ${stdout}`);

    // if(stderr) {
    //     spinner.error({ text: `Failed to install dependencies for ${rootDirName}` });
    //     console.error(`stderr: ${stderr}`);
    // }

    spinner.success({ text: `Dependencies installed for ${repoName}` });
  }

  const subdirectories = fs
    .readdirSync(repoName, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const subdirectory of subdirectories) {
    const packageJsonPath = path.join(
      repoName,
      subdirectory,
      'package.json',
    );

    if (fs.existsSync(packageJsonPath)) {
      const spinner = createSpinner(
        `Installing dependencies for ${subdirectory}...`,
      ).start();
      await execAsync(`${packagerManager} install`, {
        cwd: path.join(rootDir, repoName, subdirectory),
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
