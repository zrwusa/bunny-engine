import {Replacer} from './src/utils';

const projectName = 'dog-raise';

// Source files directory
const sourceDir = 'templates/back-end'; // The files in the directory need to be content replaced, renamed and written to the dist
const outputDir = `dist/${projectName}/back-end`; // The directory for storing the content replaced, renamed and written files

// Config of replacement
const replaceConfig: { [key: string]: string } = {
    'bunny_rest': 'dog_raise',
    'bunny-rest': 'dog-raise',
};

// Config of renaming files
const renameConfig: { [key: string]: string } = {
    'bunny_rest': 'dog_raise',
    'bunny-rest': 'dog-raise',
};

// Ignore rules of writing files
const readFileIgnoreRules: string[] = [
    '**/node_modules/**',
];

// Ignore rules of content replacement
const replaceIgnoreRules: string[] = [
    'dir1/dir2/*.txt',
];

// Ignore rules of renaming
const renameIgnoreRules: string[] = [
    'dir1/dir2/*.ts',
];

const replacer = new Replacer({
    sourceDir,
    outputDir,
    replaceConfig,
    renameConfig,
    readFileIgnoreRules,
    replaceIgnoreRules,
    renameIgnoreRules
});

replacer.run().then();