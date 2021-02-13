import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ExperienceProof,
  Experience,
} from '../models';
import {ExperienceProofRepository} from '../repositories';

export class ExperienceProofExperienceController {
  constructor(
    @repository(ExperienceProofRepository)
    public experienceProofRepository: ExperienceProofRepository,
  ) { }

  @get('/experience-proofs/{id}/experience', {
    responses: {
      '200': {
        description: 'Experience belonging to ExperienceProof',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Experience)},
          },
        },
      },
    },
  })
  async getExperience(
    @param.path.number('id') id: typeof ExperienceProof.prototype.id,
  ): Promise<Experience> {
    return this.experienceProofRepository.experience(id);
  }
}
