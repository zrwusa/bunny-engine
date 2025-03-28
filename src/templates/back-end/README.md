# Architecture

<table>
<thead><tr><th>Feature</th><th>Desc</th></tr></thead>
<tbody>
<tr><td>Development, test, production environment</td><td></td></tr>
<tr><td>RESTFul & API protocol</td><td>Standard RESTFul API with a protocol structured encapsulated response</td></tr>
<tr><td>GraphQL</td><td></td></tr>
<tr><td>Docker</td><td>Containers manager</td></tr>
<tr><td>Postgres</td><td>RDB</td></tr>
<tr><td>MongoDB</td><td>NoSQL</td></tr>
<tr><td>Redis</td><td>Memory cache & session storage</td></tr>
<tr><td>Nginx</td><td>Load Balancing</td></tr>
<tr><td>I18n</td><td>Supports translation</td></tr>
<tr><td>Swagger</td><td>API docs</td></tr>
<tr><td>Pino</td><td>Logger</td></tr>
<tr><td>Prometheus,Prom-client</td><td>API performance monitoring with Prometheus</td></tr>
<tr><td>Mailer</td><td></td></tr>
</tbody>
</table>

## Standard RESTFul API with a protocol structured encapsulated response

```
{
    "http": {
        "code": 200,
        "message": "OK",
        "description": "indicates that the request has succeeded."
    },
    "bizLogic": {
        "code": "APP_ORDER_0060",
        "message": "Associate order with products success"
    },
    "resData": {
        "id": "95da24dd-9200-4e87-90b4-bff84e52011f",
        "create_at": "2023-07-19T16:27:29.429Z",
        "update_at": "2023-07-19T16:27:29.429Z",
        "price": "56936.52",
        "address": "test address",
        "amount": 1,
        "products": [
            {
                "id": "7f4b18ad-1621-45f3-a572-9826a9071f9a",
                "create_at": "2023-07-19T16:26:55.667Z",
                "update_at": "2023-07-19T16:27:14.618Z",
                "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
                "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
                "price": "1699.99",
                "image": "https://i.imgur.com/QlRphfQ.jpg"
            }
        ]
    }
}
```

## Standard validation response 

```
{
    "http": {
        "code": 400,
        "message": "Bad Request",
        "description": "indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process."
    },
    "bizLogic": {
        "code": "AUTH_0049",
        "message": "Request validated failed",
        "payload": [
            {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                    "body",
                    "password"
                ],
                "message": "Password is required"
            }
        ]
    },
    "resData": null
}
```

Modular Architecture: Divide the entire system into multiple modules or services, with each module responsible for specific functionalities. This modular design improves the maintainability and scalability of the system. The frontend and backend can be developed and deployed as separate modules.

Microservices Architecture: Further divide the system into independent microservices. Each microservice can be deployed, scaled, and maintained independently, providing specific business functionalities. Docker containerization can simplify the deployment and management of microservices.

Load Balancing: Use load balancing to distribute traffic and requests, ensuring the system can handle a high volume of concurrent requests. Nginx can serve as a reverse proxy server for load balancing, distributing requests to multiple backend service instances.

Caching: Utilize caching to enhance system performance and response time. Redis can be used as a caching server to store frequently accessed data and alleviate the load on the database.

Database Selection: Choose the appropriate database based on your business requirements. PostgreSQL and MongoDB are suitable for structured and document-oriented data storage, respectively. You can select which database(s) to use or employ a combination based on your specific needs.

Asynchronous Task Processing: Employ message queues or task queues to handle asynchronous tasks such as sending emails, processing background tasks, etc. RabbitMQ or Kafka can serve as message queues, helping decouple system components.

Security: Ensure the system's security by implementing mechanisms such as authentication, authorization, and data encryption. Use JWT (JSON Web Token) or other authentication mechanisms to verify user identities, and employ HTTPS for data encryption during transmission.

Monitoring and Logging: Utilize monitoring tools (e.g., Prometheus) and logging libraries (e.g., Pino) to track system performance, errors, and log information. These tools assist in quickly diagnosing and resolving issues.

High Availability and Fault Tolerance: Improve system availability by designing redundant and backup architectures. Container orchestration tools like Kubernetes can aid in managing and automating container deployment and scaling.

Automated Deployment and Continuous Integration/Continuous Delivery (CI/CD): Employ tools like Jenkins, GitLab CI/CD, or Travis CI to automate deployment and establish a CI/CD pipeline, streamlining development, testing, and deployment processes.

# Dependencies 

<table>
<thead><tr><th>Application</th><th>Version</th></tr></thead>
<tbody>
<tr><td>Docker</td><td>Engine: 24.0.2</td></tr>
<tr><td>Node.js</td><td>v19.9.0</td></tr>
</tbody>
</table>

# Development

## develop

### prepare, create .env.development file, then config it

```dotenv 
      - NODE_ENV=development
      - PORT=8080
      - MONGO_DB_URI=mongodb://root_dev:root_dev_password@mongo-dev:27017/bunny_rest_dev?authSource=admin
      - SALT_WORK_FACTOR=10
      - ACCESS_TOKEN_TTL=0.1m
      - REFRESH_TOKEN_TTL=60m
      - METRICS_PORT=9090
      - REDIS_URI=redis://@redis-dev:6379
      - POSTGRES_URI=postgresql://postgres:root_dev_password@postgres-dev:5432/bunny_rest_dev
      - APOLLO_PORT=7070
      - CORS_ORIGINS=http://localhost:3000,http://localhost:3001
      - OPEN_API_URL=http://example.com
```

### start

```shell script
yarn install
yarn dev:prepare
yarn dev
```

### stop

```shell script
yarn dev:unprepare
```


## Docker development

### start(all services including Bunny-rest, Swagger, prom-client, Nginx, Postgres, MongoDB, Redis)

Afterward, you can write code locally and have the changes automatically synced to the Docker containers. This approach is designed specifically for debugging issues that cannot be replicated in the local environment, for example, when the testing environment has complete test data and you need to debug in that environment. However, for regular local development, it is still recommended to use the first approach where Docker is used solely as containers for the dependent services while the local environment serves as the development environment.

```shell script
yarn dev:all-in-docker
```

### start(not including Nginx as loading balance, neither bunny-rest)

```shell script
yarn dev:prepare
yarn dev
```

### elastic https
curl -k -u elastic:dev_password https://localhost:9200

# Architecture principles

Understand the optimization process, but don't optimize prematurely

## Separation of Concern

## Feature Encapsulation

This means that we group the files related to a single feature together. This has helped me to reuse my codebase across
projects. Let's face it we do not write everything again and again but rather copy-paste the code once perfected to all
the required places. If all the things are clubbed together then it's super easy to achieve this safely. This also helps
in building a logical structure in mind to find a particular file while writing code that needs it as a dependency.

## Better Error Handling

This is very important for the application to be consistent with errors and the corresponding API responses. So,
adopting the separation of concern principle and also the uniformity in the API responses.

## Better Response Handling

The same reason as provided in the above error handling example is also valid for the response handling.

## Better Promise Management

The callback is replaced by Promises and now the Promise chain is replaced by the async/await. This greatly enhances the
coding experience. One problem with this implementation is to write the ugly try/catch block.
<!--## Robust Unit Tests
The primary purpose of Unit-test is not to detect incorrect grammar but to validate behaviors of logics.-->

## Avoiding side effects, always keep functional purity

<!--## Simple Deployability
Dockerfile and docker-compose.yml to simplify the deployment of the application. It is also possible to manually deploy the application.-->


[//]: # (docker network create esnet)

[//]: # (docker run -d --name elasticsearch --net esnet -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.5.0)

[//]: # (docker run -d --name kibana --net esnet -p 5601:5601 docker.elastic.co/kibana/kibana:8.5.0)


