#! /usr/bin/env node

import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import clone from 'git-clone';
import { PackageManager } from './@types/PackageManager';
import checkInputErrors from './checkInputErrors';
import installPackages from './installPackages';

let gitUrl = process.argv[2];
let projectName = process.argv[3];
let packageManager = process.argv[4] as PackageManager;

const menu = async () => {
    if (!gitUrl) {
        const git = await inquirer.prompt({
            type: 'input',
            name: 'url',
            message: 'Git URL: '
        });

        gitUrl = gitUrl || git.url;
    }


    if (!projectName) {
        const project = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Project Name: '
        });

        projectName = projectName || project.name;
    }


    if (!packageManager) {
        const manager = await inquirer.prompt({
            type: 'list',
            name: 'manager',
            message: 'Package Manager: ',
            choices: ['npm', 'pnpm', 'yarn']
        });

        packageManager = packageManager || manager.manager as PackageManager;
    }

    const inputSpinner = createSpinner('Checking input...').start();
    checkInputErrors(gitUrl, projectName, packageManager);
    inputSpinner.success({ text: 'Input checked' });

    const cloningSpinner = createSpinner('Cloning repository...').start();
    clone(gitUrl, projectName, {}, async (err) => {
        if (err) {
            cloningSpinner.error({ text: 'Failed to clone repository' });
            process.exit(1);
        }

        cloningSpinner.success({ text: 'Repository cloned' });
        await installPackages(projectName, packageManager);
    });
}

console.time('time to execute');
menu().then(() => {
    createSpinner().success({ text: 'Done!' });
    console.timeEnd('time to execute');
});