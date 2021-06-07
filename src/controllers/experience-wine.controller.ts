import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {TokenServiceBindings} from '../keys';
import {
  Experience,
  Wine
} from '../models';
import {ExperienceRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';


export class ExperienceWineController {
  constructor(
    @repository(ExperienceRepository) protected experienceRepository: ExperienceRepository,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
  @get('/experiences/{id}/wine', {
    responses: {
      '200': {
        description: 'Experience has one Wine',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Wine),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Wine>,
  ): Promise<Wine> {
    return this.experienceRepository.wine(id).get(filter);
  }

  @authenticate("jwt")
  @post('/experiences/{id}/wine', {
    responses: {
      '200': {
        description: 'Experience model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wine)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Experience.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wine, {
            title: 'NewWineInExperience',
            exclude: ['id'],
            optional: ['experienceId']
          }),
        },
      },
    }) wine: Omit<Wine, 'id'>,
  ): Promise<Wine> {
    return this.experienceRepository.wine(id).create(wine);
  }

  @authenticate("jwt")
  @patch('/experiences/{id}/wine', {
    responses: {
      '200': {
        description: 'Experience.Wine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wine, {partial: true}),
        },
      },
    })
    wine: Partial<Wine>,
    @param.query.object('where', getWhereSchemaFor(Wine)) where?: Where<Wine>,
  ): Promise<Count> {
    return this.experienceRepository.wine(id).patch(wine, where);
  }

  @authenticate("jwt")
  @del('/experiences/{id}/wine', {
    responses: {
      '200': {
        description: 'Experience.Wine DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Wine)) where?: Where<Wine>,
  ): Promise<Count> {
    return this.experienceRepository.wine(id).delete(where);
  }
}
