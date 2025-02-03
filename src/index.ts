import {ApplicationConfig, YdiYoiApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {

  //* Enabling HTTPS
  // var fs = require('fs');
  // const optionssl = {
  //   rest: {
  //     protocol: 'https',
  //     key: fs.readFileSync('./cert/privatekey.pem'),
  //     cert: fs.readFileSync('./cert/certificate.pem'),
  //   }
  // };
  // const app = new YdiYoiApplication(optionssl);

  const app = new YdiYoiApplication(options);

  await app.boot();
  // migrate BD en every start
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`YDI-YOI API is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
