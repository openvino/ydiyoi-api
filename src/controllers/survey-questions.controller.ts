import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  requestBody,
  response
} from '@loopback/rest';
import {TokenServiceBindings} from '../keys';
import {SurveyQuestions} from '../models';
import {SurveyQuestionsRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';

export class SurveyQuestionsController {
  constructor(
    @repository(SurveyQuestionsRepository)
    public surveyQuestionsRepository: SurveyQuestionsRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
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

  @authenticate("jwt")
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

  @authenticate("jwt")
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

  @authenticate("jwt")
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

  @authenticate("jwt")
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

  @authenticate("jwt")
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

  // @authenticate("jwt")
  // @put('/survey-questions/{id}')
  // @response(204, {
  //   description: 'SurveyQuestions PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() surveyQuestions: SurveyQuestions,
  // ): Promise<void> {
  //   await this.surveyQuestionsRepository.replaceById(id, surveyQuestions);
  // }

  @authenticate("jwt")
  @del('/survey-questions/{id}')
  @response(204, {
    description: 'SurveyQuestions DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.surveyQuestionsRepository.deleteById(id);
  }
}
