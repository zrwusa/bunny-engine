import {
    getRangeFromPrecisionScale,
    insertIntoFile,
    toConstantCase,
    toKebabCase,
    toPascalCase,
    toTitleCase
} from '../utils';
import {apiDefinition} from '../templates/materials';
import {BunnyEntity} from '../types';
import * as fs from 'fs';
import path from 'path';

export const makeSchema = (entity: BunnyEntity) => {
    const {properties} = entity;
    return Object.keys(properties).map(key => {
            const {type, nullable, maxLength, minLength, maximum, minimum, precision, scale, example} = properties[key];
            return `
       ${key}: ${type[1]}()
        ${typeof minLength === 'number' ? '.min(' + `${minLength}` + ')' : ''}
        ${typeof maxLength === 'number' ? '.max(' + `${maxLength}` + ')' : ''}
        ${typeof minimum === 'number' ? '.gte(' + `${minimum}` + ')' : (typeof precision === 'number' && typeof scale === 'number' && precision > scale) ? '.gte(' + `${getRangeFromPrecisionScale(precision, scale).minimum}` + ')' : ''} 
        ${typeof maximum === 'number' ? '.lte(' + `${maximum}` + ')' : (typeof precision === 'number' && typeof scale === 'number' && precision > scale) ? '.gte(' + `${getRangeFromPrecisionScale(precision, scale).maximum}` + ')' : ''}
        ${typeof example === 'string' ? '.openapi({example: ' + `'${example}'` + '})' : ''} 
        ${nullable ? '.optional()' : ''}
        ,
`
        }
    ).join('')
}

export const writeSchemas = (outputPath: string, schemasPath: string = 'src/schemas/') => {
    const {entities} = apiDefinition;
    for (const entity of entities) {
        const data = generateSchema(entity);
        const {name} = entity;
        const schemasPathR = path.join(outputPath, schemasPath);
        fs.writeFileSync(`${schemasPathR}${toKebabCase(name)}-schema.ts`, data, 'utf8');
        insertIntoFile(`${schemasPathR}index.ts`, '/*@1*/', `export * from './${toKebabCase(name)}-schema';
`);
    }
}
export const generateSchema = (entity: BunnyEntity) => {
    const {name} = entity;
    return `import {number, object, string, TypeOf} from 'zod';
import {
    commonOpenApiResponseContent,
    makeOpenApiRequestBody,
    makeOpenApiResponse,
    makeSecurity,
    openApiRegistry
} from '../helpers';
import {acceptLanguageSchema, xRefreshTokenSchema} from './auth-schema';
import {BL${toPascalCase(name)}} from '../constants';
import {E_ProtocolSchemaType} from '../types';

const body = object({
    ${makeSchema(entity)}
});

const params = object({
    id: string()
        .openapi({
            param: {
                name: 'id',
                in: 'path',
                description: 'ID of the ${toTitleCase(name)}s',
                required: true,
            },
            example: 'd8803348-8521-42d4-b9a6-40c88902a800',
        }),
});

const queryGetList = object({
    skip: string()
        .openapi({
            param: {
                name: 'skip',
                in: 'query',
                description: 'The skip number of the ${toTitleCase(name)}s list',
                required: true,
            },
            example: '0',
        }),
    take: string()
        .openapi({
            param: {
                name: 'take',
                in: 'query',
                description: 'The total number of the ${toTitleCase(name)}s list',
                required: true,
            },
            example: '10',
        }),
});

export const create${toPascalCase(name)}Schema = object({body,});
export const get${toPascalCase(name)}Schema = object({params});
export const get${toPascalCase(name)}ListSchema = object({query: queryGetList});
export const update${toPascalCase(name)}Schema = object({params, body,});
export const delete${toPascalCase(name)}Schema = object({params});

export type Create${toPascalCase(name)}Body = TypeOf<typeof body>;
export type Get${toPascalCase(name)}Params = TypeOf<typeof params>;
export type Get${toPascalCase(name)}ListQuery = TypeOf<typeof queryGetList>;
export type Update${toPascalCase(name)}Params = TypeOf<typeof params>;
export type Update${toPascalCase(name)}Req = TypeOf<typeof body>;
export type Delete${toPascalCase(name)}Params = TypeOf<typeof params>;

/* For OpenApi to generating generated.yaml/generated.json */
openApiRegistry.registerPath({
    method: 'post',
    path: '/api/v1/${toKebabCase(name)}s',
    description: 'Create a ${toTitleCase(name)}.',
    summary: 'Create a ${toTitleCase(name)}.',
    tags: ['${toTitleCase(name)}'],
    security: makeSecurity(),
    request: {
        params: xRefreshTokenSchema.merge(acceptLanguageSchema),
        body: makeOpenApiRequestBody(body),
    },
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BL${toPascalCase(name)}.CREATE_${toConstantCase(name)}_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: {
                'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                'price': 879.99,
                'image': 'https://i.imgur.com/QlRphfQ.jpg',
                'id': 'fa74780a-e684-4d50-9be8-06e0813de7b7',
                'create_at': '2023-08-02T23:58:12.246Z',
                'update_at': '2023-08-02T23:58:12.246Z'
            }
        }),
    },
});

openApiRegistry.registerPath({
    method: 'get',
    path: '/api/v1/${toKebabCase(name)}s/{id}',
    description: 'Get a single ${toTitleCase(name)} by the id',
    summary: 'Get a single ${toTitleCase(name)}',
    tags: ['${toTitleCase(name)}'],
    security: makeSecurity(),
    request: {params: params.merge(xRefreshTokenSchema).merge(acceptLanguageSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BL${toPascalCase(name)}.GET_${toConstantCase(name)}_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: {
                'id': 'dc36b869-8c59-4036-8ec9-14eb389928c6',
                'create_at': '2023-08-01T06:18:23.531Z',
                'update_at': '2023-08-01T06:18:41.421Z',
                'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                'price': '6068.98',
                'image': 'https://i.imgur.com/QlRphfQ.jpg'
            }
        }),
    },
});

openApiRegistry.registerPath({
    method: 'get',
    path: '/api/v1/${toKebabCase(name)}s',
    description: 'Get a ${toTitleCase(name)} list by a number skip and a number take',
    summary: 'Get ${toTitleCase(name)} list',
    tags: ['${toTitleCase(name)}'],
    security: makeSecurity(),
    request: {params: queryGetList.merge(xRefreshTokenSchema).merge(acceptLanguageSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BL${toPascalCase(name)}.GET_${toConstantCase(name)}_LIST_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: [
                {
                    'id': '7f4b18ad-1621-45f3-a572-9826a9071f9a',
                    'create_at': '2023-07-19T08:26:55.667Z',
                    'update_at': '2023-07-19T08:27:14.618Z',
                    'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                    'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                    'price': '1699.99',
                    'image': 'https://i.imgur.com/QlRphfQ.jpg'
                },
                {
                    'id': 'c75c7bb5-8d5a-438c-b2ae-81ef56b81c3e',
                    'create_at': '2023-07-19T08:33:42.333Z',
                    'update_at': '2023-07-19T08:33:42.333Z',
                    'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                    'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                    'price': '879.99',
                    'image': 'https://i.imgur.com/QlRphfQ.jpg'
                }
            ]
        }),
    },
});

openApiRegistry.registerPath({
    method: 'put',
    path: '/api/v1/${toKebabCase(name)}s/{id}',
    description: 'Update a ${toTitleCase(name)}.',
    summary: 'Update a ${toTitleCase(name)}.',
    tags: ['${toTitleCase(name)}'],
    security: makeSecurity(),
    request: {
        params: params.merge(xRefreshTokenSchema).merge(acceptLanguageSchema),
        body: makeOpenApiRequestBody(body),
    },
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BL${toPascalCase(name)}.UPDATE_${toConstantCase(name)}_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: {
                'generatedMaps': [],
                'raw': [],
                'affected': 1
            }
        }),
    },
});

openApiRegistry.registerPath({
    method: 'delete',
    path: '/api/v1/${toKebabCase(name)}s/{id}',
    description: 'Delete a single ${toTitleCase(name)} by the id',
    summary: 'Delete a single ${toTitleCase(name)}',
    tags: ['${toTitleCase(name)}'],
    security: makeSecurity(),
    request: {params: params.merge(xRefreshTokenSchema).merge(acceptLanguageSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BL${toPascalCase(name)}.DELETE_${toConstantCase(name)}_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: {
                'raw': [],
                'affected': 1
            }
        }),
    },
});
`;
}