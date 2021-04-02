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
import {ExperienceProofSurvey} from '../models';
import {ExperienceProofSurveyRepository} from '../repositories';

export class ExperienceProofSurveyController {
  constructor(
    @repository(ExperienceProofSurveyRepository)
    public experienceProofSurveyRepository : ExperienceProofSurveyRepository,
  ) {}

  @post('/experience-proof-surveys')
  @response(200, {
    description: 'ExperienceProofSurvey model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExperienceProofSurvey)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProofSurvey, {
            title: 'NewExperienceProofSurvey',
            exclude: ['id'],
          }),
        },
      },
    })
    experienceProofSurvey: Omit<ExperienceProofSurvey, 'id'>,
  ): Promise<ExperienceProofSurvey> {
    return this.experienceProofSurveyRepository.create(experienceProofSurvey);
  }

  @get('/experience-proof-surveys/count')
  @response(200, {
    description: 'ExperienceProofSurvey model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExperienceProofSurvey) where?: Where<ExperienceProofSurvey>,
  ): Promise<Count> {
    return this.experienceProofSurveyRepository.count(where);
  }

  @get('/experience-proof-surveys')
  @response(200, {
    description: 'Array of ExperienceProofSurvey model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExperienceProofSurvey, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExperienceProofSurvey) filter?: Filter<ExperienceProofSurvey>,
  ): Promise<ExperienceProofSurvey[]> {
    return this.experienceProofSurveyRepository.find(filter);
  }

  @patch('/experience-proof-surveys')
  @response(200, {
    description: 'ExperienceProofSurvey PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProofSurvey, {partial: true}),
        },
      },
    })
    experienceProofSurvey: ExperienceProofSurvey,
    @param.where(ExperienceProofSurvey) where?: Where<ExperienceProofSurvey>,
  ): Promise<Count> {
    return this.experienceProofSurveyRepository.updateAll(experienceProofSurvey, where);
  }

  @get('/experience-proof-surveys/{id}')
  @response(200, {
    description: 'ExperienceProofSurvey model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExperienceProofSurvey, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ExperienceProofSurvey, {exclude: 'where'}) filter?: FilterExcludingWhere<ExperienceProofSurvey>
  ): Promise<ExperienceProofSurvey> {
    return this.experienceProofSurveyRepository.findById(id, filter);
  }

  @patch('/experience-proof-surveys/{id}')
  @response(204, {
    description: 'ExperienceProofSurvey PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProofSurvey, {partial: true}),
        },
      },
    })
    experienceProofSurvey: ExperienceProofSurvey,
  ): Promise<void> {
    await this.experienceProofSurveyRepository.updateById(id, experienceProofSurvey);
  }

  @put('/experience-proof-surveys/{id}')
  @response(204, {
    description: 'ExperienceProofSurvey PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() experienceProofSurvey: ExperienceProofSurvey,
  ): Promise<void> {
    await this.experienceProofSurveyRepository.replaceById(id, experienceProofSurvey);
  }

  @del('/experience-proof-surveys/{id}')
  @response(204, {
    description: 'ExperienceProofSurvey DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.experienceProofSurveyRepository.deleteById(id);
  }
}
