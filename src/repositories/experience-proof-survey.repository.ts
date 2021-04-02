import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ExperienceProofSurvey, ExperienceProofSurveyRelations, ExperienceProof} from '../models';
import {ExperienceProofRepository} from './experience-proof.repository';

export class ExperienceProofSurveyRepository extends DefaultCrudRepository<
  ExperienceProofSurvey,
  typeof ExperienceProofSurvey.prototype.id,
  ExperienceProofSurveyRelations
> {

  public readonly experienceProof: BelongsToAccessor<ExperienceProof, typeof ExperienceProofSurvey.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExperienceProofRepository') protected experienceProofRepositoryGetter: Getter<ExperienceProofRepository>,
  ) {
    super(ExperienceProofSurvey, dataSource);
    this.experienceProof = this.createBelongsToAccessorFor('experienceProof', experienceProofRepositoryGetter,);
    this.registerInclusionResolver('experienceProof', this.experienceProof.inclusionResolver);
  }
}
