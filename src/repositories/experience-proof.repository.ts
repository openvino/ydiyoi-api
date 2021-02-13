import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ExperienceProof, ExperienceProofRelations} from '../models';

export class ExperienceProofRepository extends DefaultCrudRepository<
  ExperienceProof,
  typeof ExperienceProof.prototype.id,
  ExperienceProofRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ExperienceProof, dataSource);
  }
}
