import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Wine,
  Experience,
} from '../models';
import {WineRepository} from '../repositories';

export class WineExperienceController {
  constructor(
    @repository(WineRepository)
    public wineRepository: WineRepository,
  ) { }

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
}
