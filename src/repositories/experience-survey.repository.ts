import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Experience, ExperienceSurvey, ExperienceSurveyRelations} from '../models';
import {ExperienceRepository} from './experience.repository';

export class ExperienceSurveyRepository extends DefaultCrudRepository<
  ExperienceSurvey,
  typeof ExperienceSurvey.prototype.id,
  ExperienceSurveyRelations
> {

  public readonly experience: BelongsToAccessor<Experience, typeof ExperienceSurvey.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceRepository') protected experienceRepositoryGetter: Getter<ExperienceRepository>,
  ) {
    super(ExperienceSurvey, dataSource);
    this.experience = this.createBelongsToAccessorFor('experience', experienceRepositoryGetter,);
    this.registerInclusionResolver('experience', this.experience.inclusionResolver);
  }
}
