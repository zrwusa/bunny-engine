import {number, object, string, TypeOf} from 'zod';
import {
    commonOpenApiResponseContent,
    makeOpenApiRequestBody,
    makeOpenApiResponse,
    makeSecurity,
    openApiRegistry
} from '../helpers';
import {xRefreshTokenSchema} from './auth-schema';
import {BLProduct} from '../constants';
import {E_ProtocolSchemaType} from '../types';

const body = object({
    title: string()
        .max(127)
        .openapi({example: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens'}),
    description: string()
        .min(20)
        .max(2047)
        .openapi({example: 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.'})
        .optional(),
    price: number()
        .gte(0.01)
        .lte(99999999.99)
        .openapi({example: 168.98}),
    image: string()
        .max(511)
        .openapi({example: 'https://i.imgur.com/QlRphfQ.jpg'}),
});

const params = object({
    id: string()
        .openapi({
            param: {
                name: 'id',
                in: 'path',
                description: 'ID of the product',
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
                description: 'The skip number of the product list',
                required: true,
            },
            example: '0',
        }),
    take: string()
        .openapi({
            param: {
                name: 'take',
                in: 'query',
                description: 'The total number of the product list',
                required: true,
            },
            example: '10',
        }),
});

export const createProductSchema = object({body,});
export const getProductSchema = object({params});
export const getProductListSchema = object({query: queryGetList});
export const updateProductSchema = object({params, body,});
export const deleteProductSchema = object({params});

export type CreateProductBody = TypeOf<typeof body>;
export type GetProductParams = TypeOf<typeof params>;
export type GetProductListQuery = TypeOf<typeof queryGetList>;
export type UpdateProductParams = TypeOf<typeof params>;
export type UpdateProductReq = TypeOf<typeof body>;
export type DeleteProductParams = TypeOf<typeof params>;

/* For OpenApi to generating generated.yaml/generated.json */
openApiRegistry.registerPath({
    method: 'post',
    path: '/api/v1/products',
    description: 'Create a product.',
    summary: 'Create a product.',
    tags: ['Product'],
    security: makeSecurity(),
    request: {
        params: xRefreshTokenSchema,
        body: makeOpenApiRequestBody(body),
    },
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BLProduct.CREATE_PRODUCT_SUCCESS,
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
    path: '/api/v1/products/{id}',
    description: 'Get a single product by the id',
    summary: 'Get a single product',
    tags: ['Product'],
    security: makeSecurity(),
    request: {params: params.merge(xRefreshTokenSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BLProduct.GET_PRODUCT_SUCCESS,
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
    path: '/api/v1/products',
    description: 'Get a product list by a number skip and a number take',
    summary: 'Get product list',
    tags: ['Product'],
    security: makeSecurity(),
    request: {params: queryGetList.merge(xRefreshTokenSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BLProduct.GET_PRODUCT_LIST_SUCCESS,
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
    path: '/api/v1/products/{id}',
    description: 'Update a product.',
    summary: 'Update a product.',
    tags: ['Product'],
    security: makeSecurity(),
    request: {
        params: params.merge(xRefreshTokenSchema),
        body: makeOpenApiRequestBody(body),
    },
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BLProduct.UPDATE_PRODUCT_SUCCESS,
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
    path: '/api/v1/products/{id}',
    description: 'Delete a single product by the id',
    summary: 'Delete a single product',
    tags: ['Product'],
    security: makeSecurity(),
    request: {params: params.merge(xRefreshTokenSchema),},
    responses: {
        ...commonOpenApiResponseContent,
        200: makeOpenApiResponse({
            httpStatus: '200',
            bizLogicCodeAndTrans: BLProduct.DELETE_PRODUCT_SUCCESS,
            protocolSchemaType: E_ProtocolSchemaType.DEFAULT,
            resDataExample: {
                'raw': [],
                'affected': 1
            }
        }),
    },
});