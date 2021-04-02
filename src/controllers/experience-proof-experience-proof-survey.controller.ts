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
  ExperienceProof,
  ExperienceProofSurvey,
} from '../models';
import {ExperienceProofRepository} from '../repositories';

export class ExperienceProofExperienceProofSurveyController {
  constructor(
    @repository(ExperienceProofRepository) protected experienceProofRepository: ExperienceProofRepository,
  ) { }

  @get('/experience-proofs/{id}/experience-proof-survey', {
    responses: {
      '200': {
        description: 'ExperienceProof has one ExperienceProofSurvey',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ExperienceProofSurvey),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExperienceProofSurvey>,
  ): Promise<ExperienceProofSurvey> {
    return this.experienceProofRepository.experienceProofSurvey(id).get(filter);
  }

  @post('/experience-proofs/{id}/experience-proof-survey', {
    responses: {
      '200': {
        description: 'ExperienceProof model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExperienceProofSurvey)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ExperienceProof.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProofSurvey, {
            title: 'NewExperienceProofSurveyInExperienceProof',
            exclude: ['id'],
            optional: ['experienceProofId']
          }),
        },
      },
    }) experienceProofSurvey: Omit<ExperienceProofSurvey, 'id'>,
  ): Promise<ExperienceProofSurvey> {
    return this.experienceProofRepository.experienceProofSurvey(id).create(experienceProofSurvey);
  }

  @patch('/experience-proofs/{id}/experience-proof-survey', {
    responses: {
      '200': {
        description: 'ExperienceProof.ExperienceProofSurvey PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExperienceProofSurvey, {partial: true}),
        },
      },
    })
    experienceProofSurvey: Partial<ExperienceProofSurvey>,
    @param.query.object('where', getWhereSchemaFor(ExperienceProofSurvey)) where?: Where<ExperienceProofSurvey>,
  ): Promise<Count> {
    return this.experienceProofRepository.experienceProofSurvey(id).patch(experienceProofSurvey, where);
  }

  @del('/experience-proofs/{id}/experience-proof-survey', {
    responses: {
      '200': {
        description: 'ExperienceProof.ExperienceProofSurvey DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExperienceProofSurvey)) where?: Where<ExperienceProofSurvey>,
  ): Promise<Count> {
    return this.experienceProofRepository.experienceProofSurvey(id).delete(where);
  }
}
