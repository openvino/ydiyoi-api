import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// host: 'localhost' or 'psqldock' for Docker postgres://postgres:***REMOVED***@psqldock:5433/ydiyoi
const config = {
  name: 'db',
  connector: 'postgresql',
  host: 'psqldock',
  port: 5433,
  user: 'postgres',
  password: '***REMOVED***',
  database: 'ydiyoi'
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
