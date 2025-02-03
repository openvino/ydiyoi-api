import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Experience, Wine, WineRelations} from '../models';
import {ExperienceRepository} from './experience.repository';

export class WineRepository extends DefaultCrudRepository<
  Wine,
  typeof Wine.prototype.id,
  WineRelations
> {

  public readonly experience: BelongsToAccessor<Experience, typeof Wine.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceRepository') protected experienceRepositoryGetter: Getter<ExperienceRepository>,
  ) {
    super(Wine, dataSource);
    this.experience = this.createBelongsToAccessorFor('experience', experienceRepositoryGetter,);
    this.registerInclusionResolver('experience', this.experience.inclusionResolver);
  }
}
