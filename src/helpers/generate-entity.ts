import {insertIntoFile, toKebabCase, toPascalCase, toSnakeCase} from '../utils';
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

export const generateEntity = (entity: BunnyEntity) => {
    const {name} = entity;
    return `import {Column, Entity} from 'typeorm';
import {CommonEntity} from './common-entity';

@Entity('${toSnakeCase(name)}')
export class ${toPascalCase(name)}Entity extends CommonEntity {
${makeEntity(entity)}
    
}
`;
}

export const writeEntities = (outputPath: string, entitiesPath: string = 'src/entities/',) => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const data = generateEntity(entity);
        const {name} = entity;
        const entitiesPathR = path.join(outputPath, entitiesPath);
        const helpersPathR = path.join(outputPath, 'src/helpers/');
        fs.writeFileSync(`${entitiesPathR}${toKebabCase(name)}-entity.ts`, data, 'utf8');
        insertIntoFile(`${entitiesPathR}index.ts`, '/*@1*/', `export * from './${toKebabCase(name)}-entity';
`, false);
        insertIntoFile(`${helpersPathR}postgres-data-source.ts`, '/*@1*/', `,
    ${toPascalCase(name)}Entity`);
        insertIntoFile(`${helpersPathR}postgres-data-source.ts`, '/*@2*/', `, ${toPascalCase(name)}Entity`);
    }
}