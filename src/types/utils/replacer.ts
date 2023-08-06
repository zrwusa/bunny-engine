export type Config = { [key: string]: string };

export type Rules = string[];

export type Options = {
    sourcePath: string,
    outputPath: string,
    replaceConfig: Config,
    renameConfig: Config,
    readFileIgnoreRules: Rules,
    replaceIgnoreRules: Rules,
    renameIgnoreRules: Rules,
    logConfig?: LogConfig,
}

export type LogConfig = {
    ignore?: { result?: boolean, path?: boolean, type?: boolean, rule?: boolean },
    replace?: { path?: boolean, rule?: boolean },
    rename?: { path?: boolean, rule?: boolean, renamed?: boolean },
}