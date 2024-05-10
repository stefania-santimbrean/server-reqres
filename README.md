# server-reqres

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Prep

MongoDB & RabbitMQ
`docker compose -f ./docker-compose.yml up -d`
`docker compose -f ./docker-compose.yml down`

Go to http://localhost:15672/#/queues to check out the users-queue
Use https://nosqlbooster.com/downloads to browse MongoDB using connection link: mongodb://root:example@localhost:27017
Go to http://localhost:8080/ to check out the mail sent

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
