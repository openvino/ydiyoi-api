import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Experience, ExperienceRelations, ExperienceSurvey, User, Wine} from '../models';
import {ExperienceSurveyRepository} from './experience-survey.repository';
import {UserRepository} from './user.repository';
import {WineRepository} from './wine.repository';

export class ExperienceRepository extends DefaultCrudRepository<
  Experience,
  typeof Experience.prototype.id,
  ExperienceRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Experience.prototype.id>;

  public readonly wine: HasOneRepositoryFactory<Wine, typeof Experience.prototype.id>;

  public readonly experienceSurvey: HasOneRepositoryFactory<ExperienceSurvey, typeof Experience.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('WineRepository') protected wineRepositoryGetter: Getter<WineRepository>, @repository.getter('ExperienceSurveyRepository') protected experienceSurveyRepositoryGetter: Getter<ExperienceSurveyRepository>,
  ) {
    super(Experience, dataSource);
    this.experienceSurvey = this.createHasOneRepositoryFactoryFor('experienceSurvey', experienceSurveyRepositoryGetter);
    this.registerInclusionResolver('experienceSurvey', this.experienceSurvey.inclusionResolver);
    this.wine = this.createHasOneRepositoryFactoryFor('wine', wineRepositoryGetter);
    this.registerInclusionResolver('wine', this.wine.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
