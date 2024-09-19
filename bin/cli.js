#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (e) {
        console.error(`\n\nFailed to execute ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.argv[2] ?? 'my-turbo-repo';
const gitCheckoutCommand = `git clone --depth 1 https://github.com/mauro-arcelles/create-turbo ${repoName}`;

console.log(`Initializing the repository...\n\n`);
const checkedout = runCommand(gitCheckoutCommand);
if (!checkedout) process.exit(-1);

// Eliminar la carpeta .git
const gitFolder = path.join(process.cwd(), repoName, '.git');
fs.rmSync(gitFolder, { recursive: true, force: true });

// Eliminar la carpeta bin
const binFolder = path.join(process.cwd(), repoName, 'bin');
fs.rmSync(binFolder, { recursive: true, force: true });

console.log(`\nInstalling dependencies...\n\n`);
const installDepsCommand = `cd ${repoName} && pnpm install`;
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(`The turborepo project ${repoName} has been created successfully!`);