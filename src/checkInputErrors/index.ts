import { PackageManager } from '../@types/PackageManager';

const allPackageManagers = ['npm', 'pnpm', 'yarn'];

/**
 * Checks for errors in the input and returns an error message if there is one.
 * @param {string} gitUrl The git url to clone from.
 * @param {string} outDirName The name of the output directory.
 * @param {PackageManager} packageManager The package manager to use.
 * @throws {Error} If there is an error in the input.
 */
export default (
  gitUrl: string,
  outDirName: string,
  packageManager: PackageManager,
) => {
  isGitValid(gitUrl);
  isOutDirNameValid(outDirName);
  isPackageManagerValid(packageManager);
};

const isGitValid = (gitUrl: string) => {
  if (!gitUrl) throw new Error('Git URL is required.');

  // Check if it's a valid url
  // const gitUrlRegex =
  //   /^(https?:\/\/)?[a-zA-Z0-9]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9/._-]+(\.git)?$/;

  if (!gitUrl) throw new Error('Git URL is required.');

  // if (!gitUrlRegex.test(gitUrl)) {
  //     throw new Error('Invalid Git URL.');
  // }
};

const isOutDirNameValid = (outDirName: string) => {
  if (!outDirName) throw new Error('Output directory name is required.');
  const outDirNameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!outDirNameRegex.test(outDirName)) {
    throw new Error('Invalid output directory name.');
  }
};

const isPackageManagerValid = (packageManager: PackageManager) => {
  if (!packageManager) throw new Error('Package manager is required.');
  if (!allPackageManagers.includes(packageManager)) {
    throw new Error('Invalid package manager.');
  }
};
