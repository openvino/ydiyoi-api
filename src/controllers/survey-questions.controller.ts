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
import {SurveyQuestions} from '../models';
import {SurveyQuestionsRepository} from '../repositories';

export class SurveyQuestionsController {
  constructor(
    @repository(SurveyQuestionsRepository)
    public surveyQuestionsRepository : SurveyQuestionsRepository,
  ) {}

  @post('/survey-questions')
  @response(200, {
    description: 'SurveyQuestions model instance',
    content: {'application/json': {schema: getModelSchemaRef(SurveyQuestions)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SurveyQuestions, {
            title: 'NewSurveyQuestions',
            exclude: ['id'],
          }),
        },
      },
    })
    surveyQuestions: Omit<SurveyQuestions, 'id'>,
  ): Promise<SurveyQuestions> {
    return this.surveyQuestionsRepository.create(surveyQuestions);
  }

  @get('/survey-questions/count')
  @response(200, {
    description: 'SurveyQuestions model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SurveyQuestions) where?: Where<SurveyQuestions>,
  ): Promise<Count> {
    return this.surveyQuestionsRepository.count(where);
  }

  @get('/survey-questions')
  @response(200, {
    description: 'Array of SurveyQuestions model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SurveyQuestions, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SurveyQuestions) filter?: Filter<SurveyQuestions>,
  ): Promise<SurveyQuestions[]> {
    return this.surveyQuestionsRepository.find(filter);
  }

  @patch('/survey-questions')
  @response(200, {
    description: 'SurveyQuestions PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SurveyQuestions, {partial: true}),
        },
      },
    })
    surveyQuestions: SurveyQuestions,
    @param.where(SurveyQuestions) where?: Where<SurveyQuestions>,
  ): Promise<Count> {
    return this.surveyQuestionsRepository.updateAll(surveyQuestions, where);
  }

  @get('/survey-questions/{id}')
  @response(200, {
    description: 'SurveyQuestions model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SurveyQuestions, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SurveyQuestions, {exclude: 'where'}) filter?: FilterExcludingWhere<SurveyQuestions>
  ): Promise<SurveyQuestions> {
    return this.surveyQuestionsRepository.findById(id, filter);
  }

  @patch('/survey-questions/{id}')
  @response(204, {
    description: 'SurveyQuestions PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SurveyQuestions, {partial: true}),
        },
      },
    })
    surveyQuestions: SurveyQuestions,
  ): Promise<void> {
    await this.surveyQuestionsRepository.updateById(id, surveyQuestions);
  }

  @put('/survey-questions/{id}')
  @response(204, {
    description: 'SurveyQuestions PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() surveyQuestions: SurveyQuestions,
  ): Promise<void> {
    await this.surveyQuestionsRepository.replaceById(id, surveyQuestions);
  }

  @del('/survey-questions/{id}')
  @response(204, {
    description: 'SurveyQuestions DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.surveyQuestionsRepository.deleteById(id);
  }
}
