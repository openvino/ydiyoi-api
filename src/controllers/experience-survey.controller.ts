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
import {Experience, ExperienceSurvey} from '../models';
import {ExperienceSurveyRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';

export class ExperienceSurveyController {
  constructor(
    @repository(ExperienceSurveyRepository)
    public experienceSurveyRepository: ExperienceSurveyRepository,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
  @post('/experience-surveys')
  @response(200, {
    description: 'ExperienceSurvey model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExperienceSurvey)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceSurvey, {
            title: 'NewExperienceSurvey',
            exclude: ['id'],
          }),
        },
      },
    })
    experienceSurvey: Omit<ExperienceSurvey, 'id'>,
  ): Promise<ExperienceSurvey> {
    return this.experienceSurveyRepository.create(experienceSurvey);
  }

  @authenticate("jwt")
  @get('/experience-surveys/count')
  @response(200, {
    description: 'ExperienceSurvey model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExperienceSurvey) where?: Where<ExperienceSurvey>,
  ): Promise<Count> {
    return this.experienceSurveyRepository.count(where);
  }

  @authenticate("jwt")
  @get('/experience-surveys')
  @response(200, {
    description: 'Array of ExperienceSurvey model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExperienceSurvey, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExperienceSurvey) filter?: Filter<ExperienceSurvey>,
  ): Promise<ExperienceSurvey[]> {
    return this.experienceSurveyRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/experience-surveys')
  @response(200, {
    description: 'ExperienceSurvey PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceSurvey, {partial: true}),
        },
      },
    })
    experienceSurvey: ExperienceSurvey,
    @param.where(ExperienceSurvey) where?: Where<ExperienceSurvey>,
  ): Promise<Count> {
    return this.experienceSurveyRepository.updateAll(experienceSurvey, where);
  }

  @authenticate("jwt")
  @get('/experience-surveys/{id}')
  @response(200, {
    description: 'ExperienceSurvey model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExperienceSurvey, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ExperienceSurvey, {exclude: 'where'}) filter?: FilterExcludingWhere<ExperienceSurvey>
  ): Promise<ExperienceSurvey> {
    return this.experienceSurveyRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @patch('/experience-surveys/{id}')
  @response(204, {
    description: 'ExperienceSurvey PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceSurvey, {partial: true}),
        },
      },
    })
    experienceSurvey: ExperienceSurvey,
  ): Promise<void> {
    await this.experienceSurveyRepository.updateById(id, experienceSurvey);
  }

  // @authenticate("jwt")
  // @put('/experience-surveys/{id}')
  // @response(204, {
  //   description: 'ExperienceSurvey PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() experienceSurvey: ExperienceSurvey,
  // ): Promise<void> {
  //   await this.experienceSurveyRepository.replaceById(id, experienceSurvey);
  // }

  @authenticate("jwt")
  @del('/experience-surveys/{id}')
  @response(204, {
    description: 'ExperienceSurvey DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.experienceSurveyRepository.deleteById(id);
  }

  // from experience-survey-experience.controller
  @authenticate("jwt")
  @get('/experience-surveys/{id}/experience', {
    responses: {
      '200': {
        description: 'Experience belonging to ExperienceSurvey',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Experience)},
          },
        },
      },
    },
  })
  async getExperience(
    @param.path.number('id') id: typeof ExperienceSurvey.prototype.id,
  ): Promise<Experience> {
    return this.experienceSurveyRepository.experience(id);
  }
}
