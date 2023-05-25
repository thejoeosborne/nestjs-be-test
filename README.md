## Intro

This take-home project will test your back-end coding abilities. We will be evaulating how well directions can be followed including setting up the project, how quickly you can learn & adapt to a new framework, as well as document and follow best practices.

This project will consist of importing a CSV file of users into mongo, creating a REST API with basic CRUD functionality and searching, validation, documenting endpoints using swagger, and aggregating user statistics.

## Requirements

**Todos**

- [Intro](#intro)
- [Requirements](#requirements)
  - [Users Schema](#users-schema)
  - [REST API](#rest-api)
  - [Interceptor Logger](#interceptor-logger)
  - [Validation](#validation)
  - [Data Import](#data-import)
  - [Filtering, Sorting \& Pagination](#filtering-sorting--pagination)
- [Installation](#installation)
- [Running the app](#running-the-app)



### Users Schema

Create a new users schema using [nestjs/mongoose package](https://docs.nestjs.com/techniques/mongodb).

The user schema should contain AT LEAST the following properties:
- **_id** (mongo object id)
- **firstName**
- **lastName**
- **email**
- **phone**
- **marketingSource** ("provider" column from users.csv)
- **birthDate**
- **status**
- **createdAt**
- **updatedAt**

To ensure performance, please add appropriate indexes where it makes sense.

To prevent duplicates, you will also want to ensure "unique"-ness where it makes sense.

### REST API

Please create a basic CRUD api with AT LEAST the following endpoints:
- POST /users (*create a new user*)
- GET /users (*fetch existing users*)
- PATCH /users/:_id (*update a single user*)
- DELETE /users/:_id (*delete a single user*)

### Interceptor Logger

There is a saying, "We live and die by our logs".

Without good logs, it becomes very difficult to troubleshoot any future issues or problems.

That is why we should set that up now.

Create a controller-level interceptor that will log AT LEAST the following logs in a single log statement (single-line):

**Request Log**
- Request ID
- HTTP Method
- URL Path
- Request Body (if exists)

```log
# Examples
[UserInterceptor] (MjAyMy0wNS0yNVQyMjoxMjozMy45NzJa) GET /users
POST /users {"firstName":"michael"}
```

**Response Log**
- Request ID
- Response Status Code
- Response JSON (stringified)

```log
# Examples
[UserInterceptor] (MjAyMy0wNS0yNVQyMjoxMjozMy45NzJa) 400 {""}
```

### Validation

When building web applications, it is always a good idea to enable some basic validation.

The first thing to always check for is to NOT allow empty or null values.

We also don't want phone numbers with alphabetical letters or emails that are not correctly formatted email addresses.

This should be blocked not only at the REST API level, but also at the database level (hint: mongoose schema validation).

To do this, we use class validator decorators in NestJS.

### Data Import

If you've gotten this far, it is now time to put your new api to the test.

Import all rows from users.csv file into our new users collection.

(This file will be sent as a separate attachment)

Create a new data seeding endpoint that will upload a CSV file and insert the new users.

POST /users/upload

**Extra Credit**

Extra points will be given for implementing a bulk insert.

### Filtering, Sorting & Pagination

For our REST api to be more useful, we need to be able to search and filter records we need.

Please update the GET /users endpoint, to accept url query parameters that allow for this ability.

For example, I want to be able to fetch records like so:

```log
GET /users?firstName=michael&sort=1&sortBy=lastName&limit=20&page=1
```

This will return the first 20 users with first name "michael", sorted by last name alphabetically.

See interface here


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
