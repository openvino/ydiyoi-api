import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Wine} from '../models';
import {WineRepository} from '../repositories';

export class WineController {
  constructor(
    @repository(WineRepository)
    public wineRepository : WineRepository,
  ) {}

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

  @put('/wines/{id}')
  @response(204, {
    description: 'Wine PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() wine: Wine,
  ): Promise<void> {
    await this.wineRepository.replaceById(id, wine);
  }

  @del('/wines/{id}')
  @response(204, {
    description: 'Wine DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wineRepository.deleteById(id);
  }
}
