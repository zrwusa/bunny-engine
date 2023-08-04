import {insertIntoFile, toCamelCase, toKebabCase, toPascalCase} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import * as fs from 'fs';
import path from 'path';

export const makeRoute = (entity: BunnyEntity) => {
    const {name} = entity;
    return `import express from 'express';
import {jwtAuth, validateRequest} from '../../middlewares';
import {
    create${toPascalCase(name)}Schema,
    delete${toPascalCase(name)}Schema,
    get${toPascalCase(name)}ListSchema,
    get${toPascalCase(name)}Schema,
    update${toPascalCase(name)}Schema,
} from '../../schemas';
import {
    create${toPascalCase(name)}Ctrl,
    delete${toPascalCase(name)}Ctrl,
    get${toPascalCase(name)}Ctrl,
    get${toPascalCase(name)}ListCtrl,
    update${toPascalCase(name)}Ctrl,
} from '../../controllers';

const ${toCamelCase(name)}Router = express.Router();

${toCamelCase(name)}Router.post('/', [jwtAuth, validateRequest(create${toPascalCase(name)}Schema)], create${toPascalCase(name)}Ctrl);

${toCamelCase(name)}Router.get('/:id', [jwtAuth, validateRequest(get${toPascalCase(name)}Schema)], get${toPascalCase(name)}Ctrl);

${toCamelCase(name)}Router.get('/', [jwtAuth, validateRequest(get${toPascalCase(name)}ListSchema)], get${toPascalCase(name)}ListCtrl);

${toCamelCase(name)}Router.put('/:id', [jwtAuth, validateRequest(update${toPascalCase(name)}Schema)], update${toPascalCase(name)}Ctrl);

${toCamelCase(name)}Router.delete('/:id', [jwtAuth, validateRequest(delete${toPascalCase(name)}Schema)], delete${toPascalCase(name)}Ctrl);

export {${toCamelCase(name)}Router};
`
}
export const writeRoutes = (outputPath: string,routesPath: string = 'src/routes/v1/') => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const data = makeRoute(entity);
        const {name} = entity;
        const routesPathR = path.join(outputPath, routesPath);
        fs.writeFileSync(`${routesPathR}${toKebabCase(name)}.ts`, data, 'utf8');
        insertIntoFile(`${routesPathR}router-v1.ts`, '/*@1*/', `import {${toCamelCase(name)}Router} from './${toKebabCase(name)}';
`, false);
        insertIntoFile(`${routesPathR}router-v1.ts`, '/*@2*/', `routerV1.use('/${toKebabCase(name)}s', ${toCamelCase(name)}Router);
`, false);
    }
}
