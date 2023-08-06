import {insertIntoFile, toCamelCase, toKebabCase, toPascalCase} from '../utils';
import {projectConfig} from '../templates/materials';
import {BunnyEntity} from '../types';
import * as fs from 'fs';
import path from 'path';

export const makeService = (entity: BunnyEntity) => {
    const {name} = entity;
    return `import type {DeepPartial, FindManyOptions, FindOptionsWhere} from 'typeorm';
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

export const writeServices = (outputPath: string, servicesPath: string = 'src/services/') => {
    const {entities} = projectConfig;
    for (const entity of entities) {
        const data = makeService(entity);
        const {name} = entity;
        const servicesPathR = path.join(outputPath, servicesPath);
        fs.writeFileSync(`${servicesPathR}${toKebabCase(name)}-service.ts`, data, 'utf8');
        insertIntoFile(`${servicesPathR}index.ts`, '/*@1*/', `export * from './${toKebabCase(name)}-service';
`);
    }
}
