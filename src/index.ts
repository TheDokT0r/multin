#! /usr/bin/env node

import ora from 'ora';
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

    ora().start('Checking input...');
    checkInputErrors(gitUrl, projectName, packageManager);

    ora().start('Cloning repository...');
    clone(gitUrl, projectName);

    installPackages(projectName, packageManager);
}

menu();