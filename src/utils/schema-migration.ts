import {YdiYoiApplication} from '../application';
import {juggler} from '@loopback/repository';

/**
 * Drop legacy constraints or indexes that conflict with LoopBack's automigrate.
 * For Postgres we must explicitly drop the unique constraint instead of the backing index.
 */
export async function dropLegacyWineConstraints(app: YdiYoiApplication) {
  let dataSource: juggler.DataSource;
  try {
    dataSource = await app.get('datasources.db');
  } catch (error) {
    console.warn('Could not resolve datasource "db" before migration:', error);
    return;
  }

  const statements = [
    'ALTER TABLE IF EXISTS "public"."wine" DROP CONSTRAINT IF EXISTS "uq_wine_qrvalue";',
    'DROP INDEX IF EXISTS "public"."uq_wine_qrvalue";',
  ];

  for (const statement of statements) {
    try {
      await dataSource.execute(statement);
    } catch (error) {
      console.warn(`Skipping statement due to error: ${statement}`, error);
    }
  }
}
