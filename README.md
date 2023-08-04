# bunny-engine
A microservices codebase generator for unified TypeScript-based frontend and backend. Backend includes standardized database setup, model, controller, service layers, route rules, API auth, docs, validation, I18n, metrics, logs, Docker. Frontend generates CRUD pages, components, Redux Saga API requests, user auth, tracing logs, API protocols, etc.

# step 1: 'my-app' + yarn generate -> A ready to go project.

Generate a complete web server code with a single command, use the specified project name.

# step 2: Database design -> API code.

Directly generate a complete set of API source code based on the database design, including:

## Standardized API code 

Functionalities for creating, updating, fetching, listing, and deleting data.
Input validation rules, API authorization, session management, and consistent business logic and error handling.

## API documentation and documentation service.

## Docker development environment, testing and debugging environment, testing environment deployment, and production environment deployment.

## API service metrics monitoring.

## Logging system.

# Technology stack: Typescript + Express + Docker + GraphQL + PostgreSQL + MongoDB + Redis + Nginx + Swagger + Pino + Prom-client.