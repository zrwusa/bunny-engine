import {E_ProtocolSchemaType, MakeProtocolSchemaOptions} from '../types';
import {makeProtocolSchema} from '../schemas/protocol-schema';
import {BLSystem} from '../constants';
import {StringUtil} from '../utils/string';
import {ZodType} from 'zod';
import {ReferenceObject, SchemaObject} from 'openapi3-ts/oas30';
import {ResponseConfig, ZodRequestBody} from '../libs/zod-to-openapi/src';

export function makeOpenApiResponse(options: MakeProtocolSchemaOptions): ResponseConfig {
    const {httpStatus, bizLogicCodeAndTrans, protocolSchemaType, resDataExample, schemaName} = options;

    return {
        description: bizLogicCodeAndTrans.en,
        content: {
            'application/json': {
                schema: makeProtocolSchema(schemaName || StringUtil.toPascalCase(bizLogicCodeAndTrans.key), {
                    httpStatus,
                    bizLogicCodeAndTrans,
                    protocolSchemaType,
                    resDataExample,
                }),
            }
        }
    }
}

export function makeOpenApiRequestBody(body: ZodType<unknown> | SchemaObject | ReferenceObject): ZodRequestBody {
    return {content: {'application/json': {schema: body}}}
}
export const commonOpenApiResponseContent = {
    400: makeOpenApiResponse({
        httpStatus: '400',
        bizLogicCodeAndTrans: BLSystem.VALIDATE_REQUEST_FAILED,
        protocolSchemaType: E_ProtocolSchemaType.VALIDATION,
        schemaName: 'ValidationFailedProtocol',
    }),
    500: makeOpenApiResponse({
        httpStatus: '500',
        bizLogicCodeAndTrans: BLSystem.INTERNAL_SERVER_ERROR,
        protocolSchemaType: E_ProtocolSchemaType.INTERNAL_ERROR,
        schemaName: 'InternalServerErrorProtocol'
    })
}