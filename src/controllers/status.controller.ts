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
import {Status} from '../models';
import {StatusRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';

export class StatusController {
  constructor(
    @repository(StatusRepository)
    public statusRepository: StatusRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
  @post('/statuses')
  @response(200, {
    description: 'Status model instance',
    content: {'application/json': {schema: getModelSchemaRef(Status)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    status: Omit<Status, 'id'>,
  ): Promise<Status> {
    return this.statusRepository.create(status);
  }

  @authenticate("jwt")
  @get('/statuses/count')
  @response(200, {
    description: 'Status model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.count(where);
  }

  @authenticate("jwt")
  @get('/statuses')
  @response(200, {
    description: 'Array of Status model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Status, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Status) filter?: Filter<Status>,
  ): Promise<Status[]> {
    return this.statusRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/statuses')
  @response(200, {
    description: 'Status PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
    @param.where(Status) where?: Where<Status>,
  ): Promise<Count> {
    return this.statusRepository.updateAll(status, where);
  }

  @authenticate("jwt")
  @get('/statuses/{id}')
  @response(200, {
    description: 'Status model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Status, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Status, {exclude: 'where'}) filter?: FilterExcludingWhere<Status>
  ): Promise<Status> {
    return this.statusRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @patch('/statuses/{id}')
  @response(204, {
    description: 'Status PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Status,
  ): Promise<void> {
    await this.statusRepository.updateById(id, status);
  }

  // @authenticate("jwt")
  // @put('/statuses/{id}')
  // @response(204, {
  //   description: 'Status PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() status: Status,
  // ): Promise<void> {
  //   await this.statusRepository.replaceById(id, status);
  // }

  @authenticate("jwt")
  @del('/statuses/{id}')
  @response(204, {
    description: 'Status DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.statusRepository.deleteById(id);
  }
}
