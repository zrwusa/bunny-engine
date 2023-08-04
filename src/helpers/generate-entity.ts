import {appendIntoFile, insertIntoFile, toCamelCase, toKebabCase, toPascalCase, toSnakeCase} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import fs from 'fs';
import path from 'path';

export const makeEntity = (entity: BunnyEntity) => {
    const {properties} = entity;
    return Object.keys(properties).map(key => {
            const {type, nullable, maxLength, minLength, maximum, minimum, precision, scale, example} = properties[key];
            return `

    @Column({
        type: '${type[0]}',
        ${nullable ? 'nullable: ' + true + ',' : ''}
        ${typeof maxLength === 'number' && type[0] === 'varchar' ? 'length: ' + `${maxLength},` : ''}
        ${typeof precision === 'number' ? 'precision: ' + `${precision},` : ''}
        ${typeof scale === 'number' ? 'scale: ' + `${scale},` : ''}
    })
    ${key}${!nullable ? '!' : ''}: ${type[1]} ${nullable ? ' | undefined' : ''};`
        }
    ).join('')
}

export const writeEntities = (outputPath: string,
                              entitiesPath: string = 'src/entities/',) => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const xxx = generateEntity(entity);
        // console.log(xxx);
        const {name} = entity;

        const pathR = path.join(outputPath, entitiesPath);
        const pathHelpers = path.join(outputPath, 'src/helpers/')
        appendIntoFile(`${pathR}index.ts`,  `export * from './${toKebabCase(name)}-entity';
`, false);

        insertIntoFile(`${pathHelpers}postgres-data-source.ts`, `
} from '../entities';`, `,
    ${toPascalCase(name)}Entity`);
        insertIntoFile(`${pathHelpers}postgres-data-source.ts`, `],
    synchronize: true,`, `, ${toPascalCase(name)}Entity`);
        fs.writeFileSync(`${pathR}${toKebabCase(name)}-entity.ts`, xxx, 'utf8');
    }
}
export const generateEntity = (entity: BunnyEntity) => {
    const {name} = entity;
    const output = `
import {Column, Entity} from 'typeorm';
import {CommonEntity} from './common-entity';

@Entity('${toSnakeCase(name)}')
export class ${toPascalCase(name)}Entity extends CommonEntity {
${makeEntity(entity)}
    
}
`;
return output;
}