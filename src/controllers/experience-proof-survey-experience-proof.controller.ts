import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ExperienceProofSurvey,
  ExperienceProof,
} from '../models';
import {ExperienceProofSurveyRepository} from '../repositories';

export class ExperienceProofSurveyExperienceProofController {
  constructor(
    @repository(ExperienceProofSurveyRepository)
    public experienceProofSurveyRepository: ExperienceProofSurveyRepository,
  ) { }

  @get('/experience-proof-surveys/{id}/experience-proof', {
    responses: {
      '200': {
        description: 'ExperienceProof belonging to ExperienceProofSurvey',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExperienceProof)},
          },
        },
      },
    },
  })
  async getExperienceProof(
    @param.path.number('id') id: typeof ExperienceProofSurvey.prototype.id,
  ): Promise<ExperienceProof> {
    return this.experienceProofSurveyRepository.experienceProof(id);
  }
}
