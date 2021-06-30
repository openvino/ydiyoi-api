import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';


const dbDatabase = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT || '')
const dbPortN = Number.isInteger(dbPort) ? dbPort : 5432
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;



// ** db config
const config = {
  name: 'db',
  connector: 'postgresql',
  host: dbHost,
  port: dbPortN,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase,
  ssl: true,
  sslmode: 'require'
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
