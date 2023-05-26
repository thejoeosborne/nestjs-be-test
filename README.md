## Intro

This take-home project will test your back-end coding abilities. We will be evaulating how well directions can be followed including setting up the project, how quickly you can learn & adapt to a new framework, as well as document and follow best practices.

This project will consist of importing a CSV file of users into mongo, creating a REST API with basic CRUD functionality and searching, validation, documenting endpoints using swagger, and aggregating user statistics.

Frameworks Used

- [NestJS](https://docs.nestjs.com/)

This project was set up using Node version **v14.19.0**

I recommend installing [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) to manage different NodeJS versions locally.

## Installation / Set Up

### Install Mongo

Download and install the community edition of MongoDB from https://www.mongodb.com/docs/manual/installation/.

After installing, you'll want to start the service.

Next, download and install [Studio 3T](https://robomongo.org). This is a GUI for connecting to your Mongo database, and will allow you to query your database for easier debugging and troubleshooting.

Open up Studio 3T and connect to localhost:27017.

Once connected, go ahead and create a new database named "soldcom".

![Studio 3T Screenshot](./img/studio-3t.png)

```bash
$ npm install
```

### Configuration / Environment Variables

Before starting the app, you'll need to create a new **.env** file in the root folder.

See [.env.example](.env.example)

## Running the app

```bash
nest start -w
```

This will start a local server at http://localhost:9000/swagger

## Requirements

The **UsersModule** has already been set up for you and includes a bunch of helper classes.

**Todos**

- [Intro](#intro)
- [Installation / Set Up](#installation--set-up)
  - [Install Mongo](#install-mongo)
  - [Configuration / Environment Variables](#configuration--environment-variables)
- [Running the app](#running-the-app)
- [Requirements](#requirements)
  - [Users Schema](#users-schema)
  - [REST API](#rest-api)
  - [Interceptor Logger](#interceptor-logger)
  - [Validation](#validation)
  - [Data Import](#data-import)
  - [Filtering, Sorting \& Pagination](#filtering-sorting--pagination)
- [Tests (Bonus)](#tests-bonus)

After reviewing the todos, I suggest reviewing at least the following basics of NestJS.

It will definitely help with this project.

There are also plenty of tutorials and youtube videos online.

Other than that, happy coding!!!

![nestjs-suggested-docs](img/nestjs-docs.png)

### Users Schema

Create a new users schema using [nestjs/mongoose package](https://docs.nestjs.com/techniques/mongodb).

The user schema should contain AT LEAST the following properties:

- **\_id** (mongo object id)
- **firstName** _required_
- **lastName** _required_
- **email** _required_
- **phone** _required_
- **marketingSource** ("provider" column from users.csv)
- **birthDate** _required_
- **status**
- **createdAt**
- **updatedAt**
- **isDeleted**

To ensure performance, please add appropriate indexes where it makes sense.

To prevent duplicates, you will also want to ensure "unique"-ness where it makes sense.

### REST API

Please create a basic CRUD api with AT LEAST the following endpoints:

- POST /users (_create a new user_)
  - Should return new user
- GET /users (_fetch existing users_)
  - Should return an array of users
- PATCH /users/:\_id (_update a single user_)
  - Should return updated user
- DELETE /users/:\_id (_soft delete a single user - do NOT actually delete user from mongo_)
  - Should return soft deleted user

**_Note_: All api endpoints should NOT return soft deleted users.\***

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
[Nest] 64047  - 05/26/2023, 11:25:01 AM     LOG [UsersInterceptor] (MjAyMy0wNS0yNlQxODoyNTowMS45MTZa) GET /users {}
```

**Response Log**

- Request ID
- Response Status Code
- Response JSON (stringified)

```log
# Examples
[Nest] 64047  - 05/26/2023, 11:25:01 AM     LOG [UsersInterceptor] (MjAyMy0wNS0yNlQxODoyNTowMS45MTZa) []
```

**Recommended Reading**

- [NestJS Request Life Cycle](https://docs.nestjs.com/faq/request-lifecycle#summary)
- https://docs.nestjs.com/interceptors

### Validation

When building web applications, it is always a good idea to enable some basic validation.

The first thing to always check for is to NOT allow empty or null values.

We also don't want phone numbers with alphabetical letters or emails that are not correctly formatted email addresses.

This should be blocked not only at the REST API level, but also at the database level (hint: mongoose schema validation).

To do this, we use class validator decorators in NestJS (see recommended reading below).

Lastly, ensure any required or optional fields are also reflected in the swagger api docs.

![Swagger Required Fields](img/swagger-required-fields.png)

**Recommended Reading**

- https://docs.nestjs.com/techniques/validation
- [Swagger Intro](https://docs.nestjs.com/openapi/introduction)

### Data Import

If you've gotten this far, it is now time to put your new api to the test.

Import all rows from users.csv file into our new users collection.

(This file will be sent as a separate attachment)

Create a new data seeding endpoint that will upload a CSV file and insert the new users.

```log
POST /users/upload
```

Should return success and failed count.

See [src/modules/users/dto/upload-users-response.dto.ts](src/modules/users/dto/upload-users-response.dto.ts)

**Bonus**

Extra points will be given for implementing a "bulk" insert, that inserts many at a time. Not just one user at a time.

### Filtering, Sorting & Pagination

For our REST api to be more useful, we need to be able to search and filter records we need.

Please update the GET /users endpoint, to accept url query parameters that allow for this ability.

For example, I want to be able to fetch records like so:

```log
GET /users?firstName=michael&sort=1&sortBy=lastName&limit=20&page=1
```

This will return the first 20 users with first name "michael", sorted by last name alphabetically.

Update the **GET /users** endpoint to return a paginated users response.

Default query values should be:

- page = 1
- sort = 1
- sortBy = 'createdAt'

Start by updating the api response type and return types

```typescript
export class UsersController {
  // ... code

  @Get('/')
  @ApiOperation({ summary: `Return a list of users` })
  @ApiOkResponsePaginated(User)
  async getUsers(
    @Query() query: QueryUserDto,
  ): Promise<PaginatedResponseDto<User>> {
    /**
     * @todo
     * Add filter, sorting, pagination logic here
     */

    return new PaginatedResponseDto({
      data: [],
      limit: query.limit,
      page: query.page,
      sort: query.sort,
      sortBy: query.sortBy,
    });
  }
}
```

**_Note_: All api endpoints should NOT return soft deleted users.\***

See [Query User DTO (data transfer object) here](src/modules/users/dto/query-user.dto.ts)

## Tests (Bonus)

We have a separate automation test, so this section will be bonus.

Please create integration tests for your api.

You can use any testing framework of your choice.

Please include how to run your tests in this section of readme.
