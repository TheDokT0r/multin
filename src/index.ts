#! /usr/bin/env node

import ora from 'ora';
import inquirer from 'inquirer';
import clone from 'git-clone';
import { PackageManager } from './@types/PackageManager';

let gitUrl = process.argv[2];
let projectName = process.argv[3];
let packageManager = process.argv[4];

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
}
clone('https://github.com/TheDokT0r/Revisionary-Redux.git');
