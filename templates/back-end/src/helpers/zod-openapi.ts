import {OpenApiGeneratorV3, OpenAPIRegistry} from '../libs/zod-to-openapi/src';
import fs from 'fs';
import * as yaml from 'yaml';
import config from 'config';

export const openApiRegistry = new OpenAPIRegistry();

export const openApiBearerAuth = openApiRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
});

export function getOpenApiDocumentation() {
    const generator = new OpenApiGeneratorV3(openApiRegistry.definitions);
    const OPEN_API_URL = config.get<string>('OPEN_API_URL');
    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Bunny RESTFul API',
            description: 'Bunny RESTFul API description',
        },
        servers: [{url: OPEN_API_URL}],
    });
}

export function writeDocumentation() {
    const {cwd} = process;
    // OpenAPI JSON
    const docs = getOpenApiDocumentation();
    fs.writeFileSync(`${cwd()}/src/openapi/generated.json`, JSON.stringify(docs), {
        encoding: 'utf-8',
    });

    // YAML equivalent
    const fileContent = yaml.stringify(docs);
    fs.writeFileSync(`${cwd()}/src/openapi/generated.yaml`, fileContent, {
        encoding: 'utf-8',
    });
}
