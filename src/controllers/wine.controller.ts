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
  getModelSchemaRef, param,
  patch, post,
  requestBody,
  response
} from '@loopback/rest';
import {TokenServiceBindings} from '../keys';
import {Experience, Wine} from '../models';
import {WineRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';


export class WineController {
  constructor(
    @repository(WineRepository)
    public wineRepository: WineRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

  ) { }

  @authenticate("jwt")
  @post('/wines')
  @response(200, {
    description: 'Wine model instance',
    content: {'application/json': {schema: getModelSchemaRef(Wine)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wine, {
            title: 'NewWine',
            exclude: ['id'],
          }),
        },
      },
    })
    wine: Omit<Wine, 'id'>,
  ): Promise<Wine> {
    return this.wineRepository.create(wine);
  }

  @authenticate("jwt")
  @get('/wines/count')
  @response(200, {
    description: 'Wine model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Wine) where?: Where<Wine>,
  ): Promise<Count> {
    return this.wineRepository.count(where);
  }

  @authenticate("jwt")
  @get('/wines')
  @response(200, {
    description: 'Array of Wine model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Wine, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Wine) filter?: Filter<Wine>,
  ): Promise<Wine[]> {
    return this.wineRepository.find(filter);
  }

  @authenticate("jwt")
  @patch('/wines')
  @response(200, {
    description: 'Wine PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wine, {partial: true}),
        },
      },
    })
    wine: Wine,
    @param.where(Wine) where?: Where<Wine>,
  ): Promise<Count> {
    return this.wineRepository.updateAll(wine, where);
  }

  @authenticate("jwt")
  @patch('/wines/{id}')
  @response(204, {
    description: 'Wine PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wine, {partial: true}),
        },
      },
    })
    wine: Wine,
  ): Promise<void> {
    await this.wineRepository.updateById(id, wine);
  }

  // @authenticate("jwt")
  // @put('/wines/{id}')
  // @response(204, {
  //   description: 'Wine PUT success',
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() wine: Wine,
  // ): Promise<void> {
  //   await this.wineRepository.replaceById(id, wine);
  // }

  @authenticate("jwt")
  @del('/wines/{id}')
  @response(204, {
    description: 'Wine DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wineRepository.deleteById(id);
  }

  @get('/wines/{id}')
  @response(200, {
    description: 'Wine model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Wine, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Wine, {exclude: 'where'}) filter?: FilterExcludingWhere<Wine>
  ): Promise<Wine> {
    return this.wineRepository.findById(id, filter);
  }

  // from wine-experience.controller
  @authenticate("jwt")
  @get('/wines/{id}/experience', {
    responses: {
      '200': {
        description: 'Experience belonging to Wine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Experience)},
          },
        },
      },
    },
  })
  async getExperience(
    @param.path.number('id') id: typeof Wine.prototype.id,
  ): Promise<Experience> {
    return this.wineRepository.experience(id);
  }

  // get status by wine qr_id
  @get('/qrstatus/{qr_id}')
  @response(200, {
    description: 'Wine QR status',
    content: {
      'application/json': {
        schema: {type: 'string'},
      },
    },
  })
  async findByQR_Id(
    @param.path.string('qr_id') qr_id: string,
    @param.filter(Wine, {exclude: 'where'}) filter?: FilterExcludingWhere<Wine>
  ): Promise<string> {

    //Search for Wine and if there is an experience related to that qr_id
    const filterBuilder = new FilterBuilder<Wine>();
    const filtr = filterBuilder
      .fields('id', 'qrValue', 'experienceId')
      .include({relation: 'experience', scope: {fields: ['id', 'userId', 'statusId']}})
      .where({qrValue: qr_id})
      .build();

    const wine = await this.wineRepository.find(filtr);
    let allowClaim = false;
    let xpStatus = 1;

    if (wine[0] != undefined) {
      if (wine[0].experience != undefined) {  //if has a related experience, test status
        xpStatus = wine[0].experience?.statusId;
        if (xpStatus == 6) {  //6	Rejected
          allowClaim = true;
        }
      } else {
        allowClaim = true;
      }
    }

    const retVal = `{ "statusId" : ${xpStatus?.toString()} , "allowClaim" : ${allowClaim} }`;

    return retVal;
  }

}

/*
Status
1	New	New User or Experience
2	Pending Validation	user or experience waiting to be validated by an administrator user
3	Active	Active User
4	Inactive	Inactive User
5	Valid	Experience validated by admin
6	Rejected	Experience rejected by admin

*/
