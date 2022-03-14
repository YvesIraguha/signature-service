# Signature-service

[API Specification](https://signature-server.herokuapp.com/api-docs/)

signature-service is a service which helps users to create devices which they can refer to later to sign different piece of information mainly transactions

## Technologies

- nodejs
- typescript
- postgres
- sequelize
- heroku
- jest
- supertest
- OpenAPISpec
- Git & GitHub

## Setting up local development environment

- clone the repository by running `git clone repo_url`
- `cd` into the repository
- install both `dependencies` and `dev-dependencies` by running `npm run i`
- ensure that you have content of dotenv

  ```
  DB_USERNAME=database_username
  DB_PASSWORD=database_password
  DB_NAME=database_name
  PASSPHRASE=secret passphrase
  SERVER_URL = server_url

  ```

- run migrations by running `npm run migrate`
- start your local server by running `npm run dev`
- Read this [documentation](https://signature-server.herokuapp.com/api-docs/) for available endpoints
- run tests by running `npm run test`, tests should all pass.

## Points for improvement

- add CI/CD, preferrably github actions
- add authentication/authorization layer
- refactor validators

<<<<<<< HEAD

## Contributors

- [YvesIraguha](https://yvesiraguha.github.io/portfolio/#/)
