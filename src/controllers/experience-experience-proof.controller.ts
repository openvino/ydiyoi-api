import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Experience,
  ExperienceProof,
} from '../models';
import {ExperienceRepository} from '../repositories';

export class ExperienceExperienceProofController {
  constructor(
    @repository(ExperienceRepository) protected experienceRepository: ExperienceRepository,
  ) { }

  @get('/experiences/{id}/experience-proofs', {
    responses: {
      '200': {
        description: 'Array of Experience has many ExperienceProof',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExperienceProof)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExperienceProof>,
  ): Promise<ExperienceProof[]> {
    return this.experienceRepository.experienceProofs(id).find(filter);
  }

  @post('/experiences/{id}/experience-proofs', {
    responses: {
      '200': {
        description: 'Experience model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExperienceProof)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Experience.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProof, {
            title: 'NewExperienceProofInExperience',
            exclude: ['id'],
            optional: ['experienceId']
          }),
        },
      },
    }) experienceProof: Omit<ExperienceProof, 'id'>,
  ): Promise<ExperienceProof> {
    return this.experienceRepository.experienceProofs(id).create(experienceProof);
  }

  @patch('/experiences/{id}/experience-proofs', {
    responses: {
      '200': {
        description: 'Experience.ExperienceProof PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProof, {partial: true}),
        },
      },
    })
    experienceProof: Partial<ExperienceProof>,
    @param.query.object('where', getWhereSchemaFor(ExperienceProof)) where?: Where<ExperienceProof>,
  ): Promise<Count> {
    return this.experienceRepository.experienceProofs(id).patch(experienceProof, where);
  }

  @del('/experiences/{id}/experience-proofs', {
    responses: {
      '200': {
        description: 'Experience.ExperienceProof DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExperienceProof)) where?: Where<ExperienceProof>,
  ): Promise<Count> {
    return this.experienceRepository.experienceProofs(id).delete(where);
  }
}
