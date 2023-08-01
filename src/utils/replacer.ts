import {copySync, ensureDirSync, writeFileSync, readFileSync, renameSync} from 'fs-extra';
import {globSync} from 'glob';
import {minimatch} from 'minimatch';
import * as path from 'path';
import type {Config, Options, Rules} from '../types';

export class Replacer {
    private readonly sourceDir: string;
    private readonly outputDir: string;
    private readonly replaceConfig: Config;
    private readonly renameConfig: Config;
    private readonly readFileIgnoreRules: Rules;
    private readonly replaceIgnoreRules: Rules;
    private readonly renameIgnoreRules: Rules;
    private readonly encoding: BufferEncoding = 'utf-8';

    constructor(options: Options) {
        const {
            sourceDir,
            outputDir,
            replaceConfig,
            renameConfig,
            readFileIgnoreRules,
            replaceIgnoreRules,
            renameIgnoreRules
        } = options;
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
        this.replaceConfig = replaceConfig;
        this.renameConfig = renameConfig;
        this.readFileIgnoreRules = readFileIgnoreRules;
        this.replaceIgnoreRules = replaceIgnoreRules;
        this.renameIgnoreRules = renameIgnoreRules;
        this.encoding = 'utf-8';
    }

    // Iterate, replace content, rename and write the files
    private async processFiles(directory: string, outputPath: string) {
        const {replaceConfig, renameConfig, readFileIgnoreRules, replaceIgnoreRules, renameIgnoreRules} = this;
        const files = globSync(`${directory}/**/*`, {nodir: true, dot: true, ignore: readFileIgnoreRules});

        for (const file of files) {
            const relativePath = file.replace(directory, '');
            const newFilePath = outputPath + relativePath;

            ensureDirSync(outputPath);
            copySync(file, newFilePath);

            if (!this.shouldIgnore(file, replaceIgnoreRules)) {
                await this.replaceInFile(newFilePath, replaceConfig);
            }

            if (!this.shouldIgnore(file, renameIgnoreRules)) {
                await this.renameFile(newFilePath, renameConfig);
            }
        }
    }

    // To assert whether the files need to be ignored
    private shouldIgnore(filePath: string, ignoreRules: string[]) {
        const {sourceDir} = this;
        const relativeFilePath = path.relative(sourceDir, filePath);
        return ignoreRules.some((rule) => {
            const ruleRegex = minimatch.makeRe(rule);
            if (ruleRegex) return ruleRegex.test(relativeFilePath);
            else return false;
        });
    }


    // Replace the content of a file
    async replaceInFile(filePath: string, replaceRules: { [key: string]: string }) {
        const {encoding} = this;

        let content = readFileSync(filePath, {encoding});
        let contentStr = content.toString();

        for (const [search, replace] of Object.entries(replaceRules)) {
            const searchRegex = new RegExp(search, 'g');
            contentStr = contentStr.replace(searchRegex, replace);
        }

        writeFileSync(filePath, Buffer.from(contentStr, encoding));
    }

    // Rename a file
    async renameFile(filePath: string, renameRules: { [key: string]: string }) {
        let newFilePath = filePath;

        for (const [search, replace] of Object.entries(renameRules)) {
            const searchRegex = new RegExp(search, 'g');
            newFilePath = newFilePath.replace(searchRegex, replace);
        }

        if (filePath !== newFilePath) renameSync(filePath, newFilePath);
    }

    async run() {
        try {
            await this.processFiles(this.sourceDir, this.outputDir);
            console.log('File replacement completed successfully!');
        } catch (error) {
            console.error('An error occurred while replacing files:', error);
        }
    }
}