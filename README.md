## Link to Hosted App:

```
Link to hosted version: https://newsyon.herokuapp.com/api

```

## Project Summary

This is a back-end project which has multiple endpoint in order to navigate a "news" site. The site includes 'articles', 'topics', 'users', and 'comments' which are linked through SQL tables. The /api endpoint provides all the possible endpoint options and descriptions of what each will return.

## Prerequisites - Connecting to the Local Databases:

- Create .env.test and .env.development files then add 'PGDATABASE=nc_news_test' and 'PGDATABASE=nc_news' respectively

- .env. environments should be gitignored. '.env.\*' should be written in the '.gitignore' file

## Dev Dependencies:

Install the following with npm:

```
npm install -D <dependency>
```

- husky
- jest
- jest-sorted - https://github.com/P-Copley/jest-sorted
- supertest - https://github.com/visionmedia/supertest
- pg-format

## Dependencies:

Install the following with npm:

```
npm install <dependency>
```

- dotenv
- express
- pg

## Seed Local Databases

package.json scripts must include:

```
"scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js"
    }
```

Run 'setup-dbs' to setup the local databases; this will then allow you to run 'seed' in order to seed the databases.

## Tests

Command for running tests:

```
npm test app
```

Tests automatically DROP and CREATE the database tables, hence tests will not affect one another through modification of the tables.

Tests require the above dependencies in order to run.

## Min. Version Requirements

- Node.js - 18.1.0
- Postgres - 14.2
