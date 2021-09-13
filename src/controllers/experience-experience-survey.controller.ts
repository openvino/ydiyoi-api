import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
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
import {create} from 'ipfs-http-client';
import {TokenServiceBindings} from '../keys';
import {
  Experience,
  ExperienceSurvey
} from '../models';
import {ExperienceRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';

//IPFS conf
const client = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})


export class ExperienceExperienceSurveyController {
  constructor(
    @repository(ExperienceRepository) protected experienceRepository: ExperienceRepository,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
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

  @authenticate("jwt")
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

    const newExperienceSurvey = await this.experienceRepository.experienceSurvey(id).create(experienceSurvey);

    // get Experiece detail to JSON
    const filterBuilder = new FilterBuilder<Experience>();
    const filter = filterBuilder
      .fields('id', 'date', 'ipfsUrl')
      .include({
        relation: 'wine', scope: {
          fields: ['experienceId', 'id', 'name', 'qrValue']
        }
      }, {relation: 'experienceSurvey'})
      .where({id: id})
      .build();

    const newExperienceDetail = await this.experienceRepository.find(filter);
    console.log(newExperienceDetail);

    // upload experience JSON to IPFS
    const jsonObj = JSON.stringify(newExperienceDetail);
    console.log("jsonObj: " + jsonObj);
    const added = await client.add(jsonObj);

    // update experience JSON  IPFS URL
    const newExperience = await this.experienceRepository.findById(id);
    newExperience.ipfsUrlJson = "https://ipfs.io/ipfs/" + added.path;
    await this.experienceRepository.update(newExperience);

    return newExperienceSurvey;
  }

  @authenticate("jwt")
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

  @authenticate("jwt")
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
