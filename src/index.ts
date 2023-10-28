#! /usr/bin/env node

import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import { PackageManager } from './@types/PackageManager';
import checkInputErrors from './checkInputErrors';
import installPackages from './installPackages';
import { exec } from 'child_process';
import { promisify } from 'util';


const execAsync = promisify(exec);

let gitUrl = process.argv[2];
let packageManager = process.argv[3] as PackageManager;

const menu = async () => {
  if (!gitUrl) {
    const git = await inquirer.prompt({
      type: 'input',
      name: 'url',
      message: 'Git URL: ',
    });

    gitUrl = gitUrl || git.url;
  }

  if (!packageManager) {
    const manager = await inquirer.prompt({
      type: 'list',
      name: 'manager',
      message: 'Package Manager: ',
      choices: ['npm', 'pnpm', 'yarn'],
    });

    packageManager = packageManager || (manager.manager as PackageManager);
  }

  console.time('time to execute');
  const inputSpinner = createSpinner('Checking input...').start();
  checkInputErrors(gitUrl, packageManager);
  inputSpinner.success({ text: 'Input checked' });

  const cloningSpinner = createSpinner('Cloning repository...').start();

  try {
    await execAsync(`git clone ${gitUrl}`);
  } catch (err) {
    cloningSpinner.error({ text: 'Failed to clone repository' });
    process.exit(1);
  }

  cloningSpinner.success({ text: 'Repository cloned' });

  const repoName = gitUrl.split('/').pop()?.split('.')[0];

  if (!repoName) {
    throw new Error('Failed to get repository name');
  }

  await installPackages(repoName, packageManager);
};


menu().then(() => {
  createSpinner().success({ text: 'Done!' });
  console.timeEnd('time to execute');
});
