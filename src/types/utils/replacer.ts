export type Config = { [key: string]: string };

export type Rules = string[];

export type Options = {
    sourceDir: string,
    outputDir: string,
    replaceConfig: Config,
    renameConfig: Config,
    readFileIgnoreRules: Rules,
    replaceIgnoreRules: Rules,
    renameIgnoreRules: Rules,
}