import {toPascalCase, toCamelCase, toConstantCase, insertIntoFile, toKebabCase, appendIntoFile} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import * as fs from 'fs';
import path from 'path';

export const makeController = (entity: BunnyEntity) => {
    const {name} = entity;
    return `
import type {NextFunction, Request, Response} from 'express';

import {create${toPascalCase(name)}, delete${toPascalCase(name)}, get${toPascalCase(name)}, get${toPascalCase(name)}List, update${toPascalCase(name)},} from '../services';
import {wrapSend} from '../helpers';
import {
    Create${toPascalCase(name)}Body,
    Delete${toPascalCase(name)}Params,
    Get${toPascalCase(name)}ListQuery,
    Get${toPascalCase(name)}Params,
    Update${toPascalCase(name)}Params,
    Update${toPascalCase(name)}Req
} from '../schemas';
import {BL, httpStatusMap} from '../constants';
import {ParamsDictionary} from '../types';

export async function create${toPascalCase(name)}Ctrl(req: Request<ParamsDictionary, null, Create${toPascalCase(name)}Body>, res: Response, next: NextFunction) {
    const {body} = req;

    try {
        const ${toCamelCase(name)} = await create${toPascalCase(name)}(body);
        return wrapSend(res, httpStatusMap.ok, BL.CREATE_${toConstantCase(name)}_SUCCESS, ${toCamelCase(name)});
    } catch (err) {
        next(err);
    }
}

export async function get${toPascalCase(name)}Ctrl(req: Request<Get${toPascalCase(name)}Params>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
        const ${toCamelCase(name)} = await get${toPascalCase(name)}({id});
        if (!${toCamelCase(name)}) return wrapSend(res, httpStatusMap.notFound, BL.NULL_${toConstantCase(name)});
        return wrapSend(res, httpStatusMap.ok, BL.GET_${toConstantCase(name)}_SUCCESS, ${toCamelCase(name)});
    } catch (err) {
        next(err);
    }
}

export async function get${toPascalCase(name)}ListCtrl(req: Request<ParamsDictionary, null, null, Get${toPascalCase(name)}ListQuery>, res: Response, next: NextFunction) {
    const {skip, take} = req.query;
    try {
        const ${toCamelCase(name)}s = await get${toPascalCase(name)}List({skip: parseInt(skip), take: parseInt(take)});
        return wrapSend(res, httpStatusMap.ok, BL.GET_${toConstantCase(name)}_LIST_SUCCESS, ${toCamelCase(name)}s);
    } catch (err) {
        next(err);
    }
}

export async function update${toPascalCase(name)}Ctrl(req: Request<Update${toPascalCase(name)}Params, null, Update${toPascalCase(name)}Req>, res: Response, next: NextFunction) {
    const {id} = req.params;
    const {body} = req;

    try {
        const ${toCamelCase(name)} = await get${toPascalCase(name)}({id});
        if (!${toCamelCase(name)}) return wrapSend(res, httpStatusMap.notFound, BL.NULL_${toConstantCase(name)});
        const updated${toPascalCase(name)} = await update${toPascalCase(name)}(id, body);
        return wrapSend(res, httpStatusMap.ok, BL.UPDATE_${toConstantCase(name)}_SUCCESS, updated${toPascalCase(name)});
    } catch (err) {
        next(err);
    }
}

export async function delete${toPascalCase(name)}Ctrl(req: Request<Delete${toPascalCase(name)}Params>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
        const ${toCamelCase(name)} = await get${toPascalCase(name)}({id});
        if (!${toCamelCase(name)}) return wrapSend(res, httpStatusMap.notFound, BL.NULL_${toConstantCase(name)});
        const deleted${toPascalCase(name)} = await delete${toPascalCase(name)}({id});
        return wrapSend(res, httpStatusMap.ok, BL.DELETE_${toConstantCase(name)}_SUCCESS, deleted${toPascalCase(name)});
    } catch (err) {
        next(err);
    }
}

`
}

export const writeControllers = (outputPath: string,
                                 controllersPath: string = 'src/controllers/') => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const xxx = makeController(entity);
        // console.log(xxx);
        const {name} = entity;
        const pathR = path.join(outputPath, controllersPath);
        appendIntoFile(`${pathR}index.ts`,  `export * from './${toKebabCase(name)}-controller';
`);
        fs.writeFileSync(`${pathR}${toKebabCase(name)}-controller.ts`, xxx, 'utf8');
    }
}
