# Specify Backend Architecture assignment

This project contains a CRUD application for user's entity with a password, email, username, firstname, lastname.

## Server

The app exposes different endpoints for users:

- `GET /users` list all the users
- `GET /users/{id}` list a user with a specific id
- `POST /users` creates a new user
- `PUT /users/{id}` updates a user with specific id
- `DELETE /users/{id}` remove a user with a specific id

## Database

The database provided is contained in the `database.db` file.
The current sql database contains 1 table: `user`. you can use sqlite commands tp explore what's inside the database
using vscode extension.

## TypeOrm

we used typeorm to manage all the database actions:

- Create the user entity
- Managing the CRUD operations
- Running migrations to apply changes to our database : _Run `npm run typeorm migration: generate -n UserEntity` to generate a migration that will apply changes if you need to the local database. A migration file should be created in `src/migration`. Note that this migration will not apply immediately. It will be applied once you run the server._

## Swagger

We use OpenAPI Swagger documentation for the server and the mount point for the documentation is `/`.

- The documentation is written in the swagger **swagger.json** .

## Running the app

To start the app you need to run the following commands

```bash
$ npm install

#development
$ npm start

# watch mode
$ npm run start:dev
```

## Test

For this project some of the user service actions have unit tests written. to run them:

```bash
#unit tests
$ npm run test
```
