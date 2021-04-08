import {
  Count,
  CountSchema,
  Filter,
  FilterBuilder,
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
import {
  Experience, User
} from '../models';
import {ExperienceRepository, UserRepository} from '../repositories';

export class UserExperienceController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ExperienceRepository) public experienceRepository: ExperienceRepository,
  ) { }

  @get('/users/{id}/experiences', {
    responses: {
      '200': {
        description: 'Array of User has many Experience',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Experience)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Experience>,
  ): Promise<Experience[]> {
    return this.userRepository.experiences(id).find(filter);
  }

  @post('/users/{id}/experiences', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Experience)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {
            title: 'NewExperienceInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) experience: Omit<Experience, 'id'>,
  ): Promise<Experience> {
    return this.userRepository.experiences(id).create(experience);
  }

  @patch('/users/{id}/experiences', {
    responses: {
      '200': {
        description: 'User.Experience PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {partial: true}),
        },
      },
    })
    experience: Partial<Experience>,
    @param.query.object('where', getWhereSchemaFor(Experience)) where?: Where<Experience>,
  ): Promise<Count> {
    return this.userRepository.experiences(id).patch(experience, where);
  }

  @del('/users/{id}/experiences', {
    responses: {
      '200': {
        description: 'User.Experience DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Experience)) where?: Where<Experience>,
  ): Promise<Count> {
    return this.userRepository.experiences(id).delete(where);
  }

  // Array of Experience detail
  @get('/users/{id}/experiencesdetail', {
    responses: {
      '200': {
        description: 'Array of Experience detail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Experience)},
          },
        },
      },
    },
  })
  async findDetail(
    @param.path.number('id') id: number,
  ): Promise<Experience[]> {

    // relation: Experience HasOne Wine
    // fields returned: Experience.id, Experience.date, Experience.Status
    // Wine.id, Wine.name, Wine.TokenSymbol, Wine.TokenValue,

    const filterBuilder = new FilterBuilder<Experience>();
    const filter = filterBuilder
      .fields('id', 'date', 'statusId')
      .include({
        relation: 'wine', scope: {
          fields: ['experienceId', 'name',
            'tokenSymbol', 'tokenValue']
        }
      })
      .where({userId: id})
      .build();

    return this.experienceRepository.find(filter);

  }
}
