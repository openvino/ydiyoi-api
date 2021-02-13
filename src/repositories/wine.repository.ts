import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Wine, WineRelations} from '../models';

export class WineRepository extends DefaultCrudRepository<
  Wine,
  typeof Wine.prototype.id,
  WineRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Wine, dataSource);
  }
}
