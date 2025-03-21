# bunny-engine

A microservices codebase generator for unified TypeScript-based backend: 

<table>
  <tr>
    <th>Item</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>database</td>
    <td></td>
  </tr>
  <tr>
    <td>model code</td>
    <td></td>
  </tr>
  <tr>
    <td>controller code</td>
    <td></td>
  </tr>
  <tr>
    <td>service layers c</td>
    <td></td>
  </tr>
  <tr>
    <td>route rules code</td>
    <td></td>
  </tr>
  <tr>
    <td>API auth code</td>
    <td></td>
  </tr>
  <tr>
    <td>validation code</td>
    <td></td>
  </tr>
  <tr>
    <td>I18n code</td>
    <td></td>
  </tr>
  <tr>
    <td>OpenAPI docs</td>
    <td></td>
  </tr>
  <tr>
    <td>metrics</td>
    <td></td>
  </tr>
  <tr>
    <td>logs</td>
    <td></td>
  </tr>
  <tr>
    <td>Docker-compose</td>
    <td></td>
  </tr>
</table>
 

[//]: # (Frontend generates CRUD pages, components, Redux Saga API requests, user auth, tracing logs, API protocols, etc.)

## step 1: 'my-app' + yarn generate -> A ready to go project.

Generate a complete web server code with a single command, use the specified project name.

Configure the project name and data schema in the **src/templates/materials/project-config.ts**

![bunny-engine_project](https://github.com/zrwusa/assets/blob/master/images/bunny-engine_project.webp)

1、Node.js
2、install Docker
3、modify variable "projectName" in "src/templates/materials/project-config.ts"

```bash
yarn generate
cd dist/my-app/back-end
yarn dev:prepare
yarn dev
```

## step 2: Database design -> API code.

Directly generate a complete set of API source code based on the database design

![bunny-engine_entity](https://github.com/zrwusa/assets/blob/master/images/bunny-engine_entity.webp)

1、Add entity element into projectConfig.entities
2、Repeat step 1

### Entity example

```json
{
  "name": "post",
  "zhName": "博文",
  "fields": {
    "title": {
      "type": ["varchar", "string"],
      "maxLength": 127,
      "example": "What is Node.js: A Comprehensive Guide"
    },
    "content": {
      "type": ["text", "string"],
      "nullable": true,
      "minLength": 20,
      "maxLength": 2047,
      "example": "Why Do We Use NodeJs?There are many reasons for which we prefer using NodeJs for the server side of our application, some of them are discussed in the following:NodeJs is built on Google Chrome’s V8 engine, and for this reason its execution time is very fast and it runs very quickly.There are more than 50,000 bundles available in the Node Package Manager and for that reason developers can import any of the packages any time according to their needed functionality for which a lot of time is saved.As NodeJs do not need to wait for an API to return data , so for building real time and data intensive web applications, it is very useful. It is totally asynchronous in nature that means it is totally non-blocking.The loading time for an audio or video is reduced by NodeJs because there is better synchronization of the code between the client and server for having the same code base.As NodeJs is open-source and it is nothing but a JavaScript framework , so for the developers who are already used to JavaScript, for them starting developing their projects with NodeJs is very easy."
    },
    "price": {
      "type": ["decimal", "number"],
      "precision": 10,
      "scale": 2,
      "minimum": 0.01,
      "maximum": 99999999.99,
      "example": 168.98
    },
    "image": {
      "type": ["varchar", "string"],
      "nullable": true,
      "maxLength": 511,
      "example": "https://i.imgur.com/QlRphfQ.jpg"
    }
  }
}
```

## Standardized API code

Functionalities for creating, updating, fetching, listing, and deleting data.
Input validation rules, API authorization, session management, and consistent business logic and error handling.

```json
{
  "http": {
    "code": 200,
    "message": "OK",
    "description": "indicates that the request has succeeded."
  },
  "bizLogic": {
    "code": "APP_PRODUCT_0003",
    "message": "Get product success"
  },
  "resData": {
    "id": "79d12907-bd59-4fea-bb7e-f09d92bef2ad",
    "create_at": "2023-08-07T18:18:37.919Z",
    "update_at": "2023-08-07T18:18:38.044Z",
    "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    "price": "6068.98",
    "image": "https://i.imgur.com/QlRphfQ.jpg"
  }
}


```

```json
{
  "http": {
    "code": 400,
    "message": "Bad Request",
    "description": "indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process."
  },
  "bizLogic": {
    "code": "SYSTEM_0002",
    "message": "请求验证失败",
    "payload": [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": [
          "query",
          "skip"
        ],
        "message": "Required"
      }
    ]
  },
  "resData": null
}
```

## CA

```shell
openssl req -x509 -nodes -new -sha256 -days 365 -keyout certs/ca.key -out certs/ca.crt -subj "/CN=Elasticsearch CA"
openssl genpkey -algorithm RSA -out certs/http.key
openssl req -new -key certs/http.key -out certs/http.csr -subj "/CN=elasticsearch-dev"
openssl x509 -req -in certs/http.csr -CA certs/ca.crt -CAkey certs/ca.key -CAcreateserial -out certs/http.crt -days 365 -sha256
```

![bunny-engine_api-docs1](https://github.com/zrwusa/assets/blob/master/images/bunny-engine_api-docs1.png)

![bunny-engine_api-docs2](https://github.com/zrwusa/assets/blob/master/images/bunny-engine_api-docs2.png)

![bunny-engine_api-docs3](https://github.com/zrwusa/assets/blob/master/images/bunny-engine_api-docs3.png)

## API documentation and documentation service.

## Docker

Docker development environment, testing and debugging environment, testing environment deployment, and production environment deployment.

## API service metrics monitoring.

## Logging system.

## Technology stack

Typescript + Express + Docker + GraphQL + PostgreSQL + MongoDB + Redis + Nginx + Swagger + Pino + Prom-client.