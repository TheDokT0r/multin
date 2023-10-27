# Multin
### The easiest way to clone a NodeJS git repo

[![NPM](https://nodei.co/npm/multin.png)](https://nodei.co/npm/multin/)

![NPM](https://img.shields.io/npm/l/multin)
[![npm version](https://badge.fury.io/js/multin.svg)](https://badge.fury.io/js/multin)
[![install size](https://packagephobia.com/badge?p=quick-random)](https://packagephobia.com/result?p=quick-random)

Multin is a simple tool that allows you to clone a node git repo and install its dependencies in one command. It is a wrapper around `git clone` and `npm install` that allows you to clone a repo and install its dependencies in one command.

## Usage
```bash
npx multin <repo-url> <project-name> <package-manager>
```

you can also use multin without providing any arguments, in which case it will prompt you for the repo url, project name and package manager.
```bash
npx multin
```

of course, you can also install multin globally and use it without the `npx` command.
```bash
npm i -g multin
multin
```

## Does this package uses `npm`, `pnpm` or `yarn`?
The package allows you to use either 'npm', 'yarn' or 'pnpm' to install the dependencies.

THE FREEDOM IS YOURS!


## License
This package uses GNU GPLv3 license. You can read the license [here](https://github.com/TheDokT0r/multinode/blob/main/LICENSE).

## Contributing
If you want to contribute to this project, you can fork it and create a pull request. You can also open an issue if you find a bug or have a suggestion.