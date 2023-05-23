## Intro

This take-home project will test your back-end coding abilities. We will be evaulating how well directions can be followed including setting up the project, how quickly you can learn & adapt to a new framework, as well as document and follow best practices.

This project will consist of importing a CSV file of users into mongo, creating a REST API with basic CRUD functionality and searching, validation, documenting endpoints using swagger, and aggregating user statistics.

## Summary

**Todos**

- Create basic users schema
- CRUD REST API
- Search endpoint
- Import users CSV into mongo localhost
- Validation
- Script to get demographic data and insert into postgres table
  - income, education, employment, birthdate, gender
  - first names that start with "m" will throw error
- SQL stats calculation
- Interceptor Logger
- Supertest integration tests
- Cypress Automation Test (separate UI)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
