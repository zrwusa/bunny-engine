import {toPascalCase, toCamelCase, appendIntoFile, toKebabCase} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import * as fs from 'fs';
import path from 'path';

export const makeService = (entity: BunnyEntity) => {
    const {name} = entity;
    return `
import type {DeepPartial, FindManyOptions, FindOptionsWhere} from 'typeorm';
import {${toPascalCase(name)}Entity} from '../entities';
import {serviceProfile} from '../helpers';

export async function create${toPascalCase(name)}(input: DeepPartial<${toPascalCase(name)}Entity>) {
    const ${toCamelCase(name)} = ${toPascalCase(name)}Entity.create(input);
    return await serviceProfile('create${toPascalCase(name)}', async () => await ${toPascalCase(name)}Entity.save(${toCamelCase(name)}));
}

export async function get${toPascalCase(name)}(options: FindOptionsWhere<${toPascalCase(name)}Entity>) {
    return await serviceProfile('get${toPascalCase(name)}', async () => await ${toPascalCase(name)}Entity.findOneBy(options));
}

export async function get${toPascalCase(name)}List(options: FindManyOptions<${toPascalCase(name)}Entity>) {
    return await serviceProfile('get${toPascalCase(name)}List', async () => await ${toPascalCase(name)}Entity.find(options));
}

export async function update${toPascalCase(name)}(id: ${toPascalCase(name)}Entity['id'], update: DeepPartial<${toPascalCase(name)}Entity>) {
    return await serviceProfile('update${toPascalCase(name)}', async () => await ${toPascalCase(name)}Entity.update(id, {...update}));
}

export async function delete${toPascalCase(name)}(options: Pick<FindOptionsWhere<${toPascalCase(name)}Entity>, 'id'>) {
    return await serviceProfile('delete${toPascalCase(name)}', async () => await ${toPascalCase(name)}Entity.delete(options));
}

`
}

export const writeServices = (outputPath: string,
                              servicesPath: string = 'src/services/') => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const xxx = makeService(entity);
        // console.log(xxx);
        const {name} = entity;
        const pathR = path.join(outputPath, servicesPath);
        appendIntoFile(`${pathR}index.ts`,  `export * from './${toKebabCase(name)}-service';
`);
        fs.writeFileSync(`${pathR}${toKebabCase(name)}-service.ts`, xxx, 'utf8');
    }
}