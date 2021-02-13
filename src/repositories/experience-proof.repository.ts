import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ExperienceProof, ExperienceProofRelations, Experience} from '../models';
import {ExperienceRepository} from './experience.repository';

export class ExperienceProofRepository extends DefaultCrudRepository<
  ExperienceProof,
  typeof ExperienceProof.prototype.id,
  ExperienceProofRelations
> {

  public readonly experience: BelongsToAccessor<Experience, typeof ExperienceProof.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceRepository') protected experienceRepositoryGetter: Getter<ExperienceRepository>,
  ) {
    super(ExperienceProof, dataSource);
    this.experience = this.createBelongsToAccessorFor('experience', experienceRepositoryGetter,);
    this.registerInclusionResolver('experience', this.experience.inclusionResolver);
  }
}
