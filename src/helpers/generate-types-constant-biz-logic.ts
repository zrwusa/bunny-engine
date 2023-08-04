import {toPascalCase, toConstantCase, appendIntoFile, toKebabCase, insertIntoFile} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import fs from 'fs';
import path from 'path';

export const makeTypesConstantBizLogic = (entity: BunnyEntity) => {
    const {name} = entity;
    return `import { BLCodeAndTrans } from "./common";

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

export const makeTypesConstantBizLogics = (outputPath: string, typesConstantsPath: string = 'src/types/constants/biz-logic/',) => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const data = makeTypesConstantBizLogic(entity);
        const {name} = entity;
        const typesConstantsPathR = path.join(outputPath, typesConstantsPath);
        fs.writeFileSync(`${typesConstantsPathR}${toKebabCase(name)}.ts`, data, 'utf8');
        insertIntoFile(`${typesConstantsPathR}index.ts`, '/*@1*/', `import {BLAndTrans${toPascalCase(name)}} from './${toKebabCase(name)}';
`);
        insertIntoFile(`${typesConstantsPathR}common.ts`, '/*@1*/', `APP_${toConstantCase(name)} = 'APP_${toConstantCase(name)}',
`, false);
        insertIntoFile(`${typesConstantsPathR}index.ts`, `/*@2*/`, ` 
    & BLAndTrans${toPascalCase(name)}`, false);
        insertIntoFile(`${typesConstantsPathR}index.ts`,  '/*@3*/',`export * from './${toKebabCase(name)}';
`, false);
    }
}
