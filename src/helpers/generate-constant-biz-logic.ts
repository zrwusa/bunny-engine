import {
    appendIntoFile,
    insertIntoFile,
    toConstantCase,
    toKebabCase,
    toPascalCase,
    toSentenceCase,
    toTitleCase
} from '../utils';
import {projectConfig} from '../templates/materials';
import {BunnyEntity} from '../types';
import fs from 'fs';
import path from 'path';

export const makeConstantBizLogic = (entity: BunnyEntity) => {
    const {name, zhName} = entity;
    return `import {BLAndTrans${toPascalCase(name)}, E_BL_CATE} from '../../types';

export const BL${toPascalCase(name)}: BLAndTrans${toPascalCase(name)} = {
    CREATE_${toConstantCase(name)}_SUCCESS: {
        key: 'CREATE_${toConstantCase(name)}_SUCCESS',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0001\`,
        en: 'Create ${toTitleCase(name)} success',
        zh: '创建${zhName}成功'
    },
    NULL_${toConstantCase(name)}: {
        key: 'NULL_${toConstantCase(name)}',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0002\`,
        en: '${toSentenceCase(name)} not exists',
        zh: '${zhName}不纯在'
    },
    GET_${toConstantCase(name)}_SUCCESS: {
        key: 'GET_${toConstantCase(name)}_SUCCESS',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0003\`,
        en: 'Get ${toTitleCase(name)} success',
        zh: '获取${zhName}成功'
    },
    GET_${toConstantCase(name)}_LIST_SUCCESS: {
        key: 'GET_${toConstantCase(name)}_LIST_SUCCESS',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0004\`,
        en: 'Get ${toTitleCase(name)} list success',
        zh: '获取${zhName}列表成功'
    },
    UPDATE_${toConstantCase(name)}_SUCCESS: {
        key: 'UPDATE_${toConstantCase(name)}_SUCCESS',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0005\`,
        en: 'Update ${toTitleCase(name)} success',
        zh: '更新${zhName}成功'
    },
    DELETE_${toConstantCase(name)}_SUCCESS: {
        key: 'DELETE_${toConstantCase(name)}_SUCCESS',
        code: \`\${E_BL_CATE.APP_${toConstantCase(name)}}_0006\`,
        en: 'Delete ${toTitleCase(name)} success',
        zh: '删除${zhName}成功'
    },
}
`
}

export const writeConstantBizLogics = (outputPath: string,constantsPath: string = 'src/constants/biz-logic/',) => {
    const {entities} = projectConfig;
    for (const entity of entities) {
        const data = makeConstantBizLogic(entity);
        const {name} = entity;
        const constantsPathR = path.join(outputPath, constantsPath);
        fs.writeFileSync(`${constantsPathR}${toKebabCase(name)}.ts`, data, 'utf8');
        appendIntoFile(`${constantsPathR}index.ts`, `export * from './${toKebabCase(name)}';
`, false);
        insertIntoFile(`${constantsPathR}biz-logic.ts`, '/*@1*/', `import { BL${toPascalCase(name)} } from './${toKebabCase(name)}';
`, false);
        insertIntoFile(`${constantsPathR}biz-logic.ts`, `/*@2*/`, `...BL${toPascalCase(name)},`);
    }
}
