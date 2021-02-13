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
  User,
  Status,
} from '../models';
import {UserRepository} from '../repositories';

export class UserStatusController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/status', {
    responses: {
      '200': {
        description: 'User has one Status',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Status),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Status>,
  ): Promise<Status> {
    return this.userRepository.status(id).get(filter);
  }

  @post('/users/{id}/status', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Status)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatusInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) status: Omit<Status, 'id'>,
  ): Promise<Status> {
    return this.userRepository.status(id).create(status);
  }

  @patch('/users/{id}/status', {
    responses: {
      '200': {
        description: 'User.Status PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {partial: true}),
        },
      },
    })
    status: Partial<Status>,
    @param.query.object('where', getWhereSchemaFor(Status)) where?: Where<Status>,
  ): Promise<Count> {
    return this.userRepository.status(id).patch(status, where);
  }

  @del('/users/{id}/status', {
    responses: {
      '200': {
        description: 'User.Status DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Status)) where?: Where<Status>,
  ): Promise<Count> {
    return this.userRepository.status(id).delete(where);
  }
}
