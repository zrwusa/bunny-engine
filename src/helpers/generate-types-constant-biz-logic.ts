import {toPascalCase, toConstantCase, appendIntoFile, toKebabCase, insertIntoFile} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import fs from 'fs';
import path from 'path';

export const makeTypesConstantBizLogic = (entity: BunnyEntity) => {
    const {name} = entity;
    return `
import { BLCodeAndTrans } from "./common";

export type BLAndTrans${toPascalCase(name)} = {
    CREATE_${toConstantCase(name)}_SUCCESS: BLCodeAndTrans;
    NULL_${toConstantCase(name)}: BLCodeAndTrans;
    GET_${toConstantCase(name)}_SUCCESS: BLCodeAndTrans;
    GET_${toConstantCase(name)}_LIST_SUCCESS: BLCodeAndTrans;
    UPDATE_${toConstantCase(name)}_SUCCESS: BLCodeAndTrans;
    DELETE_${toConstantCase(name)}_SUCCESS: BLCodeAndTrans;
};

`
}

export const makeTypesConstantBizLogics = (outputPath: string,
                                           typesConstantsPath: string = 'src/types/constants/biz-logic/',) => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const xxx = makeTypesConstantBizLogic(entity);
        // console.log(xxx);
        const {name} = entity;

        const pathR = path.join(outputPath, typesConstantsPath);
        insertIntoFile(`${pathR}index.ts`, 'export * from \'./common\';', `import {BLAndTrans${toPascalCase(name)}} from './${toKebabCase(name)}';
    `);
        insertIntoFile(`${pathR}common.ts`, 'APP_FACEBOOK = \'APP_FACEBOOK\'', `APP_${toConstantCase(name)} = 'APP_${toConstantCase(name)}',
`, false);
        insertIntoFile(`${pathR}index.ts`, `;

export type BLAndTransKeys = keyof BLAndTrans;`, ` & BLAndTrans${toPascalCase(name)}
`, false);
        insertIntoFile(`${pathR}index.ts`,  'export type BLAndTrans =',`export * from './${toKebabCase(name)}';
        
`, false);

        fs.writeFileSync(`${pathR}${toKebabCase(name)}.ts`, xxx, 'utf8');
    }
}
