import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ExperienceProof, ExperienceProofRelations, Experience, ExperienceProofSurvey} from '../models';
import {ExperienceRepository} from './experience.repository';
import {ExperienceProofSurveyRepository} from './experience-proof-survey.repository';

export class ExperienceProofRepository extends DefaultCrudRepository<
  ExperienceProof,
  typeof ExperienceProof.prototype.id,
  ExperienceProofRelations
> {

  public readonly experience: BelongsToAccessor<Experience, typeof ExperienceProof.prototype.id>;

  public readonly experienceProofSurvey: HasOneRepositoryFactory<ExperienceProofSurvey, typeof ExperienceProof.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceRepository') protected experienceRepositoryGetter: Getter<ExperienceRepository>, @repository.getter('ExperienceProofSurveyRepository') protected experienceProofSurveyRepositoryGetter: Getter<ExperienceProofSurveyRepository>,
  ) {
    super(ExperienceProof, dataSource);
    this.experienceProofSurvey = this.createHasOneRepositoryFactoryFor('experienceProofSurvey', experienceProofSurveyRepositoryGetter);
    this.registerInclusionResolver('experienceProofSurvey', this.experienceProofSurvey.inclusionResolver);
    this.experience = this.createBelongsToAccessorFor('experience', experienceRepositoryGetter,);
    this.registerInclusionResolver('experience', this.experience.inclusionResolver);
  }
}
