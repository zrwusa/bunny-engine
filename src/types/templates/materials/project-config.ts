export interface ProjectConfig {
    name: string,
    replacer: {
        sourcePath: string,
        outputPath:string,
        replaceConfig: { [key: string]: string },
        renameConfig:{ [key: string]: string },
        readFileIgnoreRules:string[],
        replaceIgnoreRules:string[],
        renameIgnoreRules: string[],
    },
    entities: BunnyEntity[]
}

export interface BunnyEntity {
    name: string,
    zhName: string,
    fields: {[key in string]: BunnyField}
}

export interface BunnyField {
    type: string[],
    maxLength?: number,
    example: string | number,
    nullable?: boolean,
    minLength?: number,
    precision?: number,
    scale?: number,
    minimum?: number,
    maximum?: number,
}

