import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ExperienceProof} from '../models';
import {ExperienceProofRepository} from '../repositories';

export class ExperienceProofController {
  constructor(
    @repository(ExperienceProofRepository)
    public experienceProofRepository : ExperienceProofRepository,
  ) {}

  @post('/experience-proofs')
  @response(200, {
    description: 'ExperienceProof model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExperienceProof)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProof, {
            title: 'NewExperienceProof',
            exclude: ['id'],
          }),
        },
      },
    })
    experienceProof: Omit<ExperienceProof, 'id'>,
  ): Promise<ExperienceProof> {
    return this.experienceProofRepository.create(experienceProof);
  }

  @get('/experience-proofs/count')
  @response(200, {
    description: 'ExperienceProof model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExperienceProof) where?: Where<ExperienceProof>,
  ): Promise<Count> {
    return this.experienceProofRepository.count(where);
  }

  @get('/experience-proofs')
  @response(200, {
    description: 'Array of ExperienceProof model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExperienceProof, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExperienceProof) filter?: Filter<ExperienceProof>,
  ): Promise<ExperienceProof[]> {
    return this.experienceProofRepository.find(filter);
  }

  @patch('/experience-proofs')
  @response(200, {
    description: 'ExperienceProof PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProof, {partial: true}),
        },
      },
    })
    experienceProof: ExperienceProof,
    @param.where(ExperienceProof) where?: Where<ExperienceProof>,
  ): Promise<Count> {
    return this.experienceProofRepository.updateAll(experienceProof, where);
  }

  @get('/experience-proofs/{id}')
  @response(200, {
    description: 'ExperienceProof model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExperienceProof, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ExperienceProof, {exclude: 'where'}) filter?: FilterExcludingWhere<ExperienceProof>
  ): Promise<ExperienceProof> {
    return this.experienceProofRepository.findById(id, filter);
  }

  @patch('/experience-proofs/{id}')
  @response(204, {
    description: 'ExperienceProof PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProof, {partial: true}),
        },
      },
    })
    experienceProof: ExperienceProof,
  ): Promise<void> {
    await this.experienceProofRepository.updateById(id, experienceProof);
  }

  @put('/experience-proofs/{id}')
  @response(204, {
    description: 'ExperienceProof PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() experienceProof: ExperienceProof,
  ): Promise<void> {
    await this.experienceProofRepository.replaceById(id, experienceProof);
  }

  @del('/experience-proofs/{id}')
  @response(204, {
    description: 'ExperienceProof DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.experienceProofRepository.deleteById(id);
  }
}
