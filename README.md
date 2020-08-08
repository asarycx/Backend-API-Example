# Server API

Simple version of [Clean & Consistent Express.js Controllers ](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/)

## Structure

### Main

- `src/app/middlewares` Route Middlewares
- `src/app/modules/admin/[module_name]/useCase` Main CRUDs methods
- `src/app/modules/admin/[module_name]/validation` Request validator methods
- `src/app/modules/admin/[module_name]/mapper` 
- `src/app/modules/helper` Helper methods
- `src/app/modules/auth` Authentication methods
- `src/app/routes` Routes registeries

### Database

- `src/app/database/entity` Main Entity
- `src/app/database/entity/seeds` Seeder data

### Utility

- `src/app/utils` Helper functions
- `src/app/utils/mapper` Data Mapper for consistency

---

## Setting up

- run `yarn install`
- Populate .env

## Dev

- run `yarn serve:dev`

## Production

- run `yarn build`
- run `yarn serve:pm2`

## Local Production

- run `yarn build`
- run `yarn serve:local`

## Seeding

- run `yarn seed:run`

set available Pages and Permission in `/src/database/entity/seeds/perm.seeds`

## .env

- APP_PORT - **Server Port**
- BASE_URL - **Server BaseURL**
- ORIGIN - **Client Soruce BaseURL**
- JWT_TOKEN= - **Token for JWT**
- JWT_TIMER - **Timer for JWT Expiration(12h)**
- DB_TYPE - **Database Type (mysql,postgresql, etc)**
- DB_NAME - **Table name in database**
- DB_PORT **Database Port**
- DB_USER - **Databse User**
- DB_PASS - **Database Password**


## Links
- https://en.wikipedia.org/wiki/Separation_of_concerns
- https://en.wikipedia.org/wiki/Single-responsibility_principle
- https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/