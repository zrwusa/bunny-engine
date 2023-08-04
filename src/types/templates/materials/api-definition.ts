export interface BunnyEntity {
    name: string,
    zhName: string,
    properties: {[key in string]: BunnyField}
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

