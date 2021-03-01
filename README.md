# You drink it, you own it! API

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

To create foreing keys and insert test data en DB execute:

```sh
postmigratescript.sql
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## JWT authentication

[Inspired by this repository](https://github.com/HrithikMittal/Loopback4-auth)

## Tests

```sh
npm test
```

## Docker


After making changes to the project, generate docker image

```sh
npm run docker:build
```

To test the app in its own container

```sh
npm run docker:run
```

Start the containers defined in docker-compose.yml file

```sh
docker-compose build
docker-compose up -d
```

If necessary, access DB container and migrate database

```sh
docker exec -it (container_id) sh
npm run build
npm run migrate
```


## What's next

...



[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
