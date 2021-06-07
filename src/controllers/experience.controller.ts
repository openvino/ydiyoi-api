import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterBuilder,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post,
  requestBody,
  response
} from '@loopback/rest';
import {TokenServiceBindings} from '../keys';
import {Experience, User, Wine} from '../models';
import {ExperienceRepository, WineRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';


export class ExperienceController {
  constructor(
    @repository(ExperienceRepository)
    public experienceRepository: ExperienceRepository,

    @repository(WineRepository)
    public wineRepository: WineRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
  @post('/experiences')
  @response(200, {
    description: 'Experience model instance',
    content: {'application/json': {schema: getModelSchemaRef(Experience)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {
            title: 'NewExperience',
            exclude: ['id'],
          }),
        },
      },
    })
    experience: Omit<Experience, 'id'>,
  ): Promise<Experience> {
    // create new experience and get the returning inserted object
    const newExperience = await this.experienceRepository.create(experience);

    //get qrvalue and new id
    const newQrValue = experience.qrValue;
    const newXpId = newExperience.id!;
    // console.log(newExperience);

    //Search for wine by the qr_id
    const filterBuilder = new FilterBuilder<Wine>();
    const filtr = filterBuilder
      .where({qrValue: newQrValue})
      .build();
    let wine = await this.wineRepository.findOne(filtr);

    // update wine with experience.id
    if (wine != undefined) {
      //TODO: check if the wine already have an experienceId
      wine.experienceId = newXpId;
      await this.wineRepository.update(wine);
    } else {
      //TODO: inform error if the wine is not found
    }

    return newExperience;
  }

  @authenticate("jwt")
  @get('/experiences/count')
  @response(200, {
    description: 'Experience model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Experience) where?: Where<Experience>,
  ): Promise<Count> {
    return this.experienceRepository.count(where);
  }

  @authenticate("jwt")
  @get('/experiences')
  @response(200, {
    description: 'Array of Experience model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Experience, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Experience) filter?: Filter<Experience>,
  ): Promise<Experience[]> {
    return this.experienceRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/experiences')
  @response(200, {
    description: 'Experience PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {partial: true}),
        },
      },
    })
    experience: Experience,
    @param.where(Experience) where?: Where<Experience>,
  ): Promise<Count> {
    return this.experienceRepository.updateAll(experience, where);
  }

  @authenticate("jwt")
  @get('/experiences/{id}')
  @response(200, {
    description: 'Experience model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Experience, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Experience, {exclude: 'where'}) filter?: FilterExcludingWhere<Experience>
  ): Promise<Experience> {
    return this.experienceRepository.findById(id, filter);
  }

  @authenticate("jwt")
  @patch('/experiences/{id}')
  @response(204, {
    description: 'Experience PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {partial: true}),
        },
      },
    })
    experience: Experience,
  ): Promise<void> {
    await this.experienceRepository.updateById(id, experience);
  }

  // @authenticate("jwt")
  // @put('/experiences/{id}')
  // @response(204, {
  //   description: 'Experience PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() experience: Experience,
  // ): Promise<void> {
  //   await this.experienceRepository.replaceById(id, experience);
  // }

  @authenticate("jwt")
  @del('/experiences/{id}')
  @response(204, {
    description: 'Experience DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.experienceRepository.deleteById(id);
  }

  // moved her from experience-user.controller
  @authenticate("jwt")
  @get('/experiences/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Experience',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Experience.prototype.id,
  ): Promise<User> {
    return this.experienceRepository.user(id);
  }

}
