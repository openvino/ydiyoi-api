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
  ExperienceSurvey,
} from '../models';
import {ExperienceRepository} from '../repositories';

export class ExperienceExperienceSurveyController {
  constructor(
    @repository(ExperienceRepository) protected experienceRepository: ExperienceRepository,
  ) { }

  @get('/experiences/{id}/experience-survey', {
    responses: {
      '200': {
        description: 'Experience has one ExperienceSurvey',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ExperienceSurvey),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExperienceSurvey>,
  ): Promise<ExperienceSurvey> {
    return this.experienceRepository.experienceSurvey(id).get(filter);
  }

  @post('/experiences/{id}/experience-survey', {
    responses: {
      '200': {
        description: 'Experience model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExperienceSurvey)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Experience.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceSurvey, {
            title: 'NewExperienceSurveyInExperience',
            exclude: ['id'],
            optional: ['experienceId']
          }),
        },
      },
    }) experienceSurvey: Omit<ExperienceSurvey, 'id'>,
  ): Promise<ExperienceSurvey> {
    return this.experienceRepository.experienceSurvey(id).create(experienceSurvey);
  }

  @patch('/experiences/{id}/experience-survey', {
    responses: {
      '200': {
        description: 'Experience.ExperienceSurvey PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceSurvey, {partial: true}),
        },
      },
    })
    experienceSurvey: Partial<ExperienceSurvey>,
    @param.query.object('where', getWhereSchemaFor(ExperienceSurvey)) where?: Where<ExperienceSurvey>,
  ): Promise<Count> {
    return this.experienceRepository.experienceSurvey(id).patch(experienceSurvey, where);
  }

  @del('/experiences/{id}/experience-survey', {
    responses: {
      '200': {
        description: 'Experience.ExperienceSurvey DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExperienceSurvey)) where?: Where<ExperienceSurvey>,
  ): Promise<Count> {
    return this.experienceRepository.experienceSurvey(id).delete(where);
  }
}
