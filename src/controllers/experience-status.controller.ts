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
  Status,
} from '../models';
import {ExperienceRepository} from '../repositories';

export class ExperienceStatusController {
  constructor(
    @repository(ExperienceRepository) protected experienceRepository: ExperienceRepository,
  ) { }

  @get('/experiences/{id}/status', {
    responses: {
      '200': {
        description: 'Experience has one Status',
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
    return this.experienceRepository.status(id).get(filter);
  }

  @post('/experiences/{id}/status', {
    responses: {
      '200': {
        description: 'Experience model instance',
        content: {'application/json': {schema: getModelSchemaRef(Status)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Experience.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Status, {
            title: 'NewStatusInExperience',
            exclude: ['id'],
            optional: ['experienceId']
          }),
        },
      },
    }) status: Omit<Status, 'id'>,
  ): Promise<Status> {
    return this.experienceRepository.status(id).create(status);
  }

  @patch('/experiences/{id}/status', {
    responses: {
      '200': {
        description: 'Experience.Status PATCH success count',
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
    return this.experienceRepository.status(id).patch(status, where);
  }

  @del('/experiences/{id}/status', {
    responses: {
      '200': {
        description: 'Experience.Status DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Status)) where?: Where<Status>,
  ): Promise<Count> {
    return this.experienceRepository.status(id).delete(where);
  }
}
