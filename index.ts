import * as fs from 'fs-extra';
import {globSync} from 'glob';
import {minimatch} from 'minimatch';
import * as path from 'path';

// Config of replacement
const replaceConfig: { [key: string]: string } = {
    'old': 'new',
};

// Config of renaming files
const renameConfig: { [key: string]: string } = {
    'old': 'new',
};

// Ignore rules of writing files
const writeFileIgnoreRules: string[] = [
    // Add write files ignore rules here
    'dir/**/*',
    'node_modules/**/*'
];

// Ignore rules of content replacement
const replaceIgnoreRules: string[] = [
    // Add replace ignore rules here
    'dir1/dir2/*.txt',
];

// Ignore rules of renaming
const renameIgnoreRules: string[] = [
    // Add rename ignore rules here
    'dir1/dir2/*.ts',
];

// Source files directory
const sourceDir = 'source-dir'; // The files in the directory need to be content replaced, renamed and written to the dist
const projectName = 'output-dir';
const outputDir = `dist/${projectName}`; // The directory for storing the content replaced, renamed and written files

// Iterate, replace content, rename and write the files
async function processFiles(directory: string, outputPath: string) {
    const files = globSync(`${directory}/**/*`, { nodir: true });

    for (const file of files) {
        if (shouldIgnore(file, writeFileIgnoreRules)) continue;

        const relativePath = file.replace(directory, '');
        const newFilePath = outputPath + relativePath;

        await fs.ensureDirSync(outputPath);
        await fs.copySync(file, newFilePath);

        if (!shouldIgnore(file, replaceIgnoreRules)) {
            await replaceInFile(newFilePath, replaceConfig);
        }

        if (!shouldIgnore(file, renameIgnoreRules)) {
            await renameFile(newFilePath, renameConfig);
        }
    }
}

// To assert whether the files need to be ignored
function shouldIgnore(filePath: string, ignoreRules: string[]) {
    const relativeFilePath = path.relative(sourceDir, filePath);
    return ignoreRules.some((rule) => {
        const ruleRegex = minimatch.makeRe(rule);
        if (ruleRegex) return ruleRegex.test(relativeFilePath);
        else return false;
    });
}

// Replace the content of a file
async function replaceInFile(filePath: string, replaceRules: { [key: string]: string }) {
    let content = await fs.readFile(filePath, 'utf-8');

    for (const [search, replace] of Object.entries(replaceRules)) {
        const searchRegex = new RegExp(search, 'g');
        content = content.replace(searchRegex, replace);
    }

    await fs.writeFile(filePath, content, 'utf-8');
}

// Rename a file
async function renameFile(filePath: string, renameRules: { [key: string]: string }) {
    let newFilePath = filePath;

    for (const [search, replace] of Object.entries(renameRules)) {
        const searchRegex = new RegExp(search, 'g');
        newFilePath = newFilePath.replace(searchRegex, replace);
    }

    if (filePath !== newFilePath) {
        await fs.rename(filePath, newFilePath);
    }
}


async function runFileReplacer() {
    try {
        await processFiles(sourceDir, outputDir);
        console.log('File replacement completed successfully!');
    } catch (error) {
        console.error('An error occurred while replacing files:', error);
    }
}

runFileReplacer().then();
