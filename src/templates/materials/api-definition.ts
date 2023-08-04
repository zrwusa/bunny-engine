import {BunnyEntity} from '../../types';

export const apiDefinition: {entities: BunnyEntity[], components: any, paths: any} = {
    entities: [
        {
            name: 'gummy',
            zhName: '软糖',
            properties: {
                title: {
                    type: ['varchar', 'string'],
                    maxLength: 127,
                    example: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens'
                },
                description: {
                    type: ['text', 'string'],
                    nullable: true,
                    minLength: 20,
                    maxLength: 2047,
                    example: 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.'
                },
                price: {
                    type: ['decimal', 'number'],
                    precision: 10,
                    scale: 2,
                    minimum: 0.01,
                    maximum: 99999999.99,
                    example: 168.98
                },
                image: {
                    type: ['varchar', 'string'],
                    nullable: true,
                    maxLength: 511,
                    example: 'https://i.imgur.com/QlRphfQ.jpg'
                }
            }
        },
        {
            name: 'umbrella',
            zhName: '雨伞',
            properties: {
                title: {
                    type: ['varchar', 'string'],
                    maxLength: 127,
                    example: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens'
                },
                description: {
                    type: ['text', 'string'],
                    nullable: true,
                    minLength: 20,
                    maxLength: 2047,
                    example: 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.'
                },
                price: {
                    type: ['decimal', 'number'],
                    precision: 10,
                    scale: 2,
                    minimum: 0.01,
                    maximum: 99999999.99,
                    example: 168.98
                },
                image: {
                    type: ['varchar', 'string'],
                    nullable: true,
                    maxLength: 511,
                    example: 'https://i.imgur.com/QlRphfQ.jpg'
                }
            }
        }

    ],
    'components': {
        'securitySchemes': {
            'bearerAuth': {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT'
            }
        },
        'schemas': {
            'CreateProductSuccess': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 200
                            },
                            'message': {
                                'type': 'string',
                                'example': 'OK'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the request has succeeded.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'APP_PRODUCT_0001'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Create product success'
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {
                            'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                            'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                            'price': 879.99,
                            'image': 'https://i.imgur.com/QlRphfQ.jpg',
                            'id': 'fa74780a-e684-4d50-9be8-06e0813de7b7',
                            'create_at': '2023-08-02T23:58:12.246Z',
                            'update_at': '2023-08-02T23:58:12.246Z'
                        }
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'ValidationFailedProtocol': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 400
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Bad Request'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'SYSTEM_0002'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Request validated failed'
                            },
                            'payload': {
                                'type': 'array',
                                'items': {
                                    'nullable': true
                                },
                                'example': [
                                    {
                                        'code': 'invalid_type',
                                        'expected': 'string',
                                        'received': 'undefined',
                                        'path': [
                                            'query',
                                            'skip'
                                        ],
                                        'message': 'skip is required'
                                    },
                                    {
                                        'code': 'invalid_type',
                                        'expected': 'string',
                                        'received': 'undefined',
                                        'path': [
                                            'query',
                                            'take'
                                        ],
                                        'message': 'take is required'
                                    }
                                ]
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'payload'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {}
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'InternalServerErrorProtocol': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 500
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Internal Server Error'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'SYSTEM_0001'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Internal server error'
                            },
                            'payload': {
                                'nullable': true,
                                'example': {
                                    'code': '23505',
                                    'message': 'duplicate key value violates unique constraint "UQ_e12875dfb3b1d92d7d7c5377e22"',
                                    'stack': 'QueryFailedError: duplicate key value violates unique constraint "UQ_e12875dfb3b1d92d7d7c5377e22"\n    at PostgresQueryRunner.query (/Users/revone/projects/bunny-rest/src/driver/postgres/PostgresQueryRunner.ts:299:19)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at InsertQueryBuilder.execute (/Users/revone/projects/bunny-rest/src/query-builder/InsertQueryBuilder.ts:163:33)\n    at SubjectExecutor.executeInsertOperations (/Users/revone/projects/bunny-rest/src/persistence/SubjectExecutor.ts:434:42)\n    at SubjectExecutor.execute (/Users/revone/projects/bunny-rest/src/persistence/SubjectExecutor.ts:137:9)\n    at EntityPersistExecutor.execute (/Users/revone/projects/bunny-rest/src/persistence/EntityPersistExecutor.ts:182:21)'
                                }
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {}
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'GetProductSuccess': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 200
                            },
                            'message': {
                                'type': 'string',
                                'example': 'OK'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the request has succeeded.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'APP_PRODUCT_0003'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Get product success'
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {
                            'id': 'dc36b869-8c59-4036-8ec9-14eb389928c6',
                            'create_at': '2023-08-01T06:18:23.531Z',
                            'update_at': '2023-08-01T06:18:41.421Z',
                            'title': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
                            'description': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
                            'price': '6068.98',
                            'image': 'https://i.imgur.com/QlRphfQ.jpg'
                        }
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'GetProductListSuccess': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 200
                            },
                            'message': {
                                'type': 'string',
                                'example': 'OK'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the request has succeeded.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'APP_PRODUCT_0004'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Get product list success'
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': [
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
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'UpdateProductSuccess': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 200
                            },
                            'message': {
                                'type': 'string',
                                'example': 'OK'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the request has succeeded.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'APP_PRODUCT_0005'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Update product success'
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {
                            'generatedMaps': [],
                            'raw': [],
                            'affected': 1
                        }
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            },
            'DeleteProductSuccess': {
                'type': 'object',
                'properties': {
                    'http': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'number',
                                'example': 200
                            },
                            'message': {
                                'type': 'string',
                                'example': 'OK'
                            },
                            'description': {
                                'type': 'string',
                                'example': 'indicates that the request has succeeded.'
                            }
                        },
                        'required': [
                            'code',
                            'message',
                            'description'
                        ]
                    },
                    'bizLogic': {
                        'type': 'object',
                        'properties': {
                            'code': {
                                'type': 'string',
                                'example': 'APP_PRODUCT_0006'
                            },
                            'message': {
                                'type': 'string',
                                'example': 'Delete product success'
                            }
                        },
                        'required': [
                            'code',
                            'message'
                        ]
                    },
                    'resData': {
                        'nullable': true,
                        'example': {
                            'raw': [],
                            'affected': 1
                        }
                    }
                },
                'required': [
                    'http',
                    'bizLogic'
                ]
            }
        },
        'parameters': {}
    },
    'paths': {
        '/api/v1/products': {
            'post': {
                'description': 'Create a product.',
                'summary': 'Create a product.',
                'tags': [
                    'Product'
                ],
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTc0NDFhLWIwM2ItNGRiYy04YjUzLTFmMWI3ZGYzMmIyNSIsImNyZWF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsInVwZGF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJQYWJsbyBSaW9zIiwiaWF0IjoxNjg5NjcyOTE4LCJleHAiOjE2ODk2NzY1MTh9.ltd7QrDKTRp9ticxVd0lBsqFh6Cq9rnVdN2c-yos1iyv8lGBKqJy1wxWottTOwiTQH6UKi3wQ6YjhjTd3y46J6aXSCOWM7thBaJSBTJHUsDoZ_tgV3gN1Cf1uTjrQSxwWNG1sOr5TPf37XkLqWWXV0tztpFyaj_VJkrzXPK6hFTHorJ30IVuJ91GRgoCh7fUktxWasujCi7k5_UFrgVAMDJpVOrXdCY6a6Wx9YxpgXu8LAIj3PDMceWaC_cOcWihKH5Yf0wY2bh6yGesxtZXoelM78Zb8xFdSaIjEDHWqmab10d1DIjdoM5cCmp1VZqFfd_sRY1NauRElfbaCkCQZ7Z31n5ZVf5ZCipNOrDJgTm50v0TE2xZeDH1SFhnltME6tXPh3EAPfolraqMWsTvAmbC7jorxs8oNCEihxnX9GTfz1k2cChfd-0_mPMeRO85WpAKpP2RBE_o-p_7nnoUCfulbXukjr-D5BrvaJTkItLN0_taApc2QrU5uYiGHIMsF4Fx0TjzNAG2qsjRDthZnnL8e6VcJHqVmJsVkCrJOpVzKN8_ix9M11gu22603Zojg7KCGLkZ479o6qyaje6xMoBG_SGQgE06C4FT4h8w6DyNrtP1j84mTwPQ7iHQyBtM1sbe2jeiMv5uxDbM4JtjOi5ENffT31X2Pygb65z-ZTU'
                        },
                        'required': true,
                        'name': 'x-refresh',
                        'in': 'header',
                        'description': 'Refresh token'
                    }
                ],
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                'type': 'object',
                                'properties': {
                                    'title': {
                                        'type': 'string',
                                        'maxLength': 127,
                                        'example': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens'
                                    },
                                    'description': {
                                        'type': 'string',
                                        'minLength': 20,
                                        'maxLength': 2047,
                                        'example': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.'
                                    },
                                    'price': {
                                        'type': 'number',
                                        'minimum': 0.01,
                                        'maximum': 99999999.99,
                                        'example': 168.98
                                    },
                                    'image': {
                                        'type': 'string',
                                        'maxLength': 511,
                                        'example': 'https://i.imgur.com/QlRphfQ.jpg'
                                    }
                                },
                                'required': [
                                    'title',
                                    'price',
                                    'image'
                                ]
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
                        'description': 'Create product success',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/CreateProductSuccess'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Request validated failed',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/ValidationFailedProtocol'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal server error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/InternalServerErrorProtocol'
                                }
                            }
                        }
                    }
                }
            },
            'get': {
                'description': 'Get a product list by a number skip and a number take',
                'summary': 'Get product list',
                'tags': [
                    'Product'
                ],
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'schema': {
                            'type': 'string',
                            'example': '0'
                        },
                        'required': true,
                        'name': 'skip',
                        'in': 'query',
                        'description': 'The skip number of the product list'
                    },
                    {
                        'schema': {
                            'type': 'string',
                            'example': '10'
                        },
                        'required': true,
                        'name': 'take',
                        'in': 'query',
                        'description': 'The total number of the product list'
                    },
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTc0NDFhLWIwM2ItNGRiYy04YjUzLTFmMWI3ZGYzMmIyNSIsImNyZWF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsInVwZGF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJQYWJsbyBSaW9zIiwiaWF0IjoxNjg5NjcyOTE4LCJleHAiOjE2ODk2NzY1MTh9.ltd7QrDKTRp9ticxVd0lBsqFh6Cq9rnVdN2c-yos1iyv8lGBKqJy1wxWottTOwiTQH6UKi3wQ6YjhjTd3y46J6aXSCOWM7thBaJSBTJHUsDoZ_tgV3gN1Cf1uTjrQSxwWNG1sOr5TPf37XkLqWWXV0tztpFyaj_VJkrzXPK6hFTHorJ30IVuJ91GRgoCh7fUktxWasujCi7k5_UFrgVAMDJpVOrXdCY6a6Wx9YxpgXu8LAIj3PDMceWaC_cOcWihKH5Yf0wY2bh6yGesxtZXoelM78Zb8xFdSaIjEDHWqmab10d1DIjdoM5cCmp1VZqFfd_sRY1NauRElfbaCkCQZ7Z31n5ZVf5ZCipNOrDJgTm50v0TE2xZeDH1SFhnltME6tXPh3EAPfolraqMWsTvAmbC7jorxs8oNCEihxnX9GTfz1k2cChfd-0_mPMeRO85WpAKpP2RBE_o-p_7nnoUCfulbXukjr-D5BrvaJTkItLN0_taApc2QrU5uYiGHIMsF4Fx0TjzNAG2qsjRDthZnnL8e6VcJHqVmJsVkCrJOpVzKN8_ix9M11gu22603Zojg7KCGLkZ479o6qyaje6xMoBG_SGQgE06C4FT4h8w6DyNrtP1j84mTwPQ7iHQyBtM1sbe2jeiMv5uxDbM4JtjOi5ENffT31X2Pygb65z-ZTU'
                        },
                        'required': true,
                        'name': 'x-refresh',
                        'in': 'header',
                        'description': 'Refresh token'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'Get product list success',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/GetProductListSuccess'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Request validated failed',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/ValidationFailedProtocol'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal server error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/InternalServerErrorProtocol'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/v1/products/{id}': {
            'get': {
                'description': 'Get a single product by the id',
                'summary': 'Get a single product',
                'tags': [
                    'Product'
                ],
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'd8803348-8521-42d4-b9a6-40c88902a800'
                        },
                        'required': true,
                        'name': 'id',
                        'in': 'path',
                        'description': 'ID of the product'
                    },
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTc0NDFhLWIwM2ItNGRiYy04YjUzLTFmMWI3ZGYzMmIyNSIsImNyZWF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsInVwZGF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJQYWJsbyBSaW9zIiwiaWF0IjoxNjg5NjcyOTE4LCJleHAiOjE2ODk2NzY1MTh9.ltd7QrDKTRp9ticxVd0lBsqFh6Cq9rnVdN2c-yos1iyv8lGBKqJy1wxWottTOwiTQH6UKi3wQ6YjhjTd3y46J6aXSCOWM7thBaJSBTJHUsDoZ_tgV3gN1Cf1uTjrQSxwWNG1sOr5TPf37XkLqWWXV0tztpFyaj_VJkrzXPK6hFTHorJ30IVuJ91GRgoCh7fUktxWasujCi7k5_UFrgVAMDJpVOrXdCY6a6Wx9YxpgXu8LAIj3PDMceWaC_cOcWihKH5Yf0wY2bh6yGesxtZXoelM78Zb8xFdSaIjEDHWqmab10d1DIjdoM5cCmp1VZqFfd_sRY1NauRElfbaCkCQZ7Z31n5ZVf5ZCipNOrDJgTm50v0TE2xZeDH1SFhnltME6tXPh3EAPfolraqMWsTvAmbC7jorxs8oNCEihxnX9GTfz1k2cChfd-0_mPMeRO85WpAKpP2RBE_o-p_7nnoUCfulbXukjr-D5BrvaJTkItLN0_taApc2QrU5uYiGHIMsF4Fx0TjzNAG2qsjRDthZnnL8e6VcJHqVmJsVkCrJOpVzKN8_ix9M11gu22603Zojg7KCGLkZ479o6qyaje6xMoBG_SGQgE06C4FT4h8w6DyNrtP1j84mTwPQ7iHQyBtM1sbe2jeiMv5uxDbM4JtjOi5ENffT31X2Pygb65z-ZTU'
                        },
                        'required': true,
                        'name': 'x-refresh',
                        'in': 'header',
                        'description': 'Refresh token'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'Get product success',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/GetProductSuccess'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Request validated failed',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/ValidationFailedProtocol'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal server error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/InternalServerErrorProtocol'
                                }
                            }
                        }
                    }
                }
            },
            'put': {
                'description': 'Update a product.',
                'summary': 'Update a product.',
                'tags': [
                    'Product'
                ],
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'd8803348-8521-42d4-b9a6-40c88902a800'
                        },
                        'required': true,
                        'name': 'id',
                        'in': 'path',
                        'description': 'ID of the product'
                    },
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTc0NDFhLWIwM2ItNGRiYy04YjUzLTFmMWI3ZGYzMmIyNSIsImNyZWF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsInVwZGF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJQYWJsbyBSaW9zIiwiaWF0IjoxNjg5NjcyOTE4LCJleHAiOjE2ODk2NzY1MTh9.ltd7QrDKTRp9ticxVd0lBsqFh6Cq9rnVdN2c-yos1iyv8lGBKqJy1wxWottTOwiTQH6UKi3wQ6YjhjTd3y46J6aXSCOWM7thBaJSBTJHUsDoZ_tgV3gN1Cf1uTjrQSxwWNG1sOr5TPf37XkLqWWXV0tztpFyaj_VJkrzXPK6hFTHorJ30IVuJ91GRgoCh7fUktxWasujCi7k5_UFrgVAMDJpVOrXdCY6a6Wx9YxpgXu8LAIj3PDMceWaC_cOcWihKH5Yf0wY2bh6yGesxtZXoelM78Zb8xFdSaIjEDHWqmab10d1DIjdoM5cCmp1VZqFfd_sRY1NauRElfbaCkCQZ7Z31n5ZVf5ZCipNOrDJgTm50v0TE2xZeDH1SFhnltME6tXPh3EAPfolraqMWsTvAmbC7jorxs8oNCEihxnX9GTfz1k2cChfd-0_mPMeRO85WpAKpP2RBE_o-p_7nnoUCfulbXukjr-D5BrvaJTkItLN0_taApc2QrU5uYiGHIMsF4Fx0TjzNAG2qsjRDthZnnL8e6VcJHqVmJsVkCrJOpVzKN8_ix9M11gu22603Zojg7KCGLkZ479o6qyaje6xMoBG_SGQgE06C4FT4h8w6DyNrtP1j84mTwPQ7iHQyBtM1sbe2jeiMv5uxDbM4JtjOi5ENffT31X2Pygb65z-ZTU'
                        },
                        'required': true,
                        'name': 'x-refresh',
                        'in': 'header',
                        'description': 'Refresh token'
                    }
                ],
                'requestBody': {
                    'content': {
                        'application/json': {
                            'schema': {
                                'type': 'object',
                                'properties': {
                                    'title': {
                                        'type': 'string',
                                        'maxLength': 127,
                                        'example': 'Canon EOS 1500D DSLR Camera with 18-55mm Lens'
                                    },
                                    'description': {
                                        'type': 'string',
                                        'minLength': 20,
                                        'maxLength': 2047,
                                        'example': 'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.'
                                    },
                                    'price': {
                                        'type': 'number',
                                        'minimum': 0.01,
                                        'maximum': 99999999.99,
                                        'example': 168.98
                                    },
                                    'image': {
                                        'type': 'string',
                                        'maxLength': 511,
                                        'example': 'https://i.imgur.com/QlRphfQ.jpg'
                                    }
                                },
                                'required': [
                                    'title',
                                    'price',
                                    'image'
                                ]
                            }
                        }
                    }
                },
                'responses': {
                    '200': {
                        'description': 'Update product success',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/UpdateProductSuccess'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Request validated failed',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/ValidationFailedProtocol'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal server error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/InternalServerErrorProtocol'
                                }
                            }
                        }
                    }
                }
            },
            'delete': {
                'description': 'Delete a single product by the id',
                'summary': 'Delete a single product',
                'tags': [
                    'Product'
                ],
                'security': [
                    {
                        'bearerAuth': []
                    }
                ],
                'parameters': [
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'd8803348-8521-42d4-b9a6-40c88902a800'
                        },
                        'required': true,
                        'name': 'id',
                        'in': 'path',
                        'description': 'ID of the product'
                    },
                    {
                        'schema': {
                            'type': 'string',
                            'example': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTc0NDFhLWIwM2ItNGRiYy04YjUzLTFmMWI3ZGYzMmIyNSIsImNyZWF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsInVwZGF0ZV9hdCI6IjIwMjMtMDctMTdUMDM6NDc6MjAuMDQyWiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsIm5hbWUiOiJQYWJsbyBSaW9zIiwiaWF0IjoxNjg5NjcyOTE4LCJleHAiOjE2ODk2NzY1MTh9.ltd7QrDKTRp9ticxVd0lBsqFh6Cq9rnVdN2c-yos1iyv8lGBKqJy1wxWottTOwiTQH6UKi3wQ6YjhjTd3y46J6aXSCOWM7thBaJSBTJHUsDoZ_tgV3gN1Cf1uTjrQSxwWNG1sOr5TPf37XkLqWWXV0tztpFyaj_VJkrzXPK6hFTHorJ30IVuJ91GRgoCh7fUktxWasujCi7k5_UFrgVAMDJpVOrXdCY6a6Wx9YxpgXu8LAIj3PDMceWaC_cOcWihKH5Yf0wY2bh6yGesxtZXoelM78Zb8xFdSaIjEDHWqmab10d1DIjdoM5cCmp1VZqFfd_sRY1NauRElfbaCkCQZ7Z31n5ZVf5ZCipNOrDJgTm50v0TE2xZeDH1SFhnltME6tXPh3EAPfolraqMWsTvAmbC7jorxs8oNCEihxnX9GTfz1k2cChfd-0_mPMeRO85WpAKpP2RBE_o-p_7nnoUCfulbXukjr-D5BrvaJTkItLN0_taApc2QrU5uYiGHIMsF4Fx0TjzNAG2qsjRDthZnnL8e6VcJHqVmJsVkCrJOpVzKN8_ix9M11gu22603Zojg7KCGLkZ479o6qyaje6xMoBG_SGQgE06C4FT4h8w6DyNrtP1j84mTwPQ7iHQyBtM1sbe2jeiMv5uxDbM4JtjOi5ENffT31X2Pygb65z-ZTU'
                        },
                        'required': true,
                        'name': 'x-refresh',
                        'in': 'header',
                        'description': 'Refresh token'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'Delete product success',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DeleteProductSuccess'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Request validated failed',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/ValidationFailedProtocol'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal server error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/InternalServerErrorProtocol'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}