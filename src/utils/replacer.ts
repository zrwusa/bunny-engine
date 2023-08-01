import type {Config, LogConfig, Options, Rules} from '../types';
import {copySync, ensureDirSync, readFileSync, renameSync, writeFileSync} from 'fs-extra';
import {globSync} from 'glob';
import {minimatch} from 'minimatch';
import * as path from 'path';
import {logger} from '../helpers';
import {IgnoreType} from '../constants';

export class Replacer {
    private readonly sourceDir: string;
    private readonly outputDir: string;
    private readonly replaceConfig: Config;
    private readonly renameConfig: Config;
    private readonly readFileIgnoreRules: Rules;
    private readonly replaceIgnoreRules: Rules;
    private readonly renameIgnoreRules: Rules;
    private readonly encoding: BufferEncoding;
    private readonly logConfig?: LogConfig;

    constructor(options: Options) {
        const {
            sourceDir,
            outputDir,
            replaceConfig,
            renameConfig,
            readFileIgnoreRules,
            replaceIgnoreRules,
            renameIgnoreRules,
            logConfig,
        } = options;
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
        this.replaceConfig = replaceConfig;
        this.renameConfig = renameConfig;
        this.readFileIgnoreRules = readFileIgnoreRules;
        this.replaceIgnoreRules = replaceIgnoreRules;
        this.renameIgnoreRules = renameIgnoreRules;
        this.encoding = 'utf-8';
        this.logConfig = logConfig ? logConfig : {
            ignore: {
                result: true, path: true, type: true, rule: true
            },
            replace: {
                path: true, rule: false
            },
            rename: {
                path: true, rule: false, renamed: true
            }
        };
    }

    // Replace the content of a file
    async replaceInFile(filePath: string, replaceRules: { [key: string]: string }) {
        const {encoding, outputDir} = this;

        let content = readFileSync(filePath, {encoding});
        let contentStr = content.toString();
        let isReplaced = false;

        for (const [search, replace] of Object.entries(replaceRules)) {
            const searchRegex = new RegExp(search, 'g');
            isReplaced = searchRegex.test(contentStr);
            contentStr = contentStr.replace(searchRegex, replace);
        }

        writeFileSync(filePath, Buffer.from(contentStr, encoding));
        const {logConfig} = this;
        if (logConfig) {
            const {replace} = logConfig;
            if (replace) {
                let logMsg = '';
                const relativeFilePath = path.relative(outputDir, filePath);
                if (isReplaced) {
                    if (replace.path) logMsg += `Successfully replaced file: ${relativeFilePath}`;
                    if (replace.rule) logMsg += `, rule: ${replaceRules}`;
                    logger.info(logMsg);
                } else {
                    if (replace.path) logMsg += `Successfully copied   file: ${relativeFilePath}`;
                    logger.info(logMsg);
                }
            }
        }
    }

    // Rename a file
    async renameFile(filePath: string, renameRules: { [key: string]: string }) {
        let newFilePath = filePath;

        for (const [search, replace] of Object.entries(renameRules)) {
            const searchRegex = new RegExp(search, 'g');
            newFilePath = newFilePath.replace(searchRegex, replace);
        }

        if (filePath !== newFilePath) {
            renameSync(filePath, newFilePath);
            const {logConfig, outputDir} = this;
            if (logConfig) {
                const {rename} = logConfig;
                if (rename) {
                    let logMsg = '';
                    const relativeFilePath = path.relative(outputDir, filePath);
                    if (rename.path) logMsg += `Successfully renamed  file: ${relativeFilePath}`;
                    if (rename.rule) logMsg += `, rule: ${renameRules}`;
                    const relativeNewFilePath = path.relative(outputDir, newFilePath);
                    if (rename.renamed) logMsg += ` -> file: ${relativeNewFilePath}`;
                    logger.info(logMsg);
                }
            }
        }
    }

    async run() {
        try {
            await this.processFiles(this.sourceDir, this.outputDir);
            logger.info('Files replacement, renaming completed successfully!');
        } catch (error) {
            logger.error('An error occurred while replacing files:', error);
        }
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

            if (!this.shouldIgnore(file, replaceIgnoreRules, IgnoreType.REPLACE)) {
                await this.replaceInFile(newFilePath, replaceConfig);
            }

            if (!this.shouldIgnore(file, renameIgnoreRules, IgnoreType.RENAME)) {
                await this.renameFile(newFilePath, renameConfig);
            }
        }
    }

    // To assert whether the files need to be ignored
    private shouldIgnore(filePath: string, ignoreRules: string[], type: IgnoreType) {
        const {sourceDir} = this;
        const relativeFilePath = path.relative(sourceDir, filePath);
        return ignoreRules.some((rule) => {
            const ruleRegex = minimatch.makeRe(rule);
            if (ruleRegex) {
                const testResult = ruleRegex.test(relativeFilePath);
                // logger.info(`Ignore result: ${testResult}, filePath: ${filePath}, Ignore type: ${type}, ruleRegex: ${ruleRegex}`);

                if (this.logConfig) {
                    const {ignore} = this.logConfig;
                    if (ignore) {
                        if (testResult) {
                            const logMsg = {
                                ...(ignore.result ? {result: testResult} : {}),
                                ...(ignore.path ? {path: relativeFilePath} : {}),
                                ...(ignore.type ? {type} : {}),
                                ...(ignore.rule ? {rule} : {}),
                            }
                            logger.info(JSON.stringify(logMsg));
                        }
                    }
                }

                return testResult;
            } else return false;
        });
    }
}