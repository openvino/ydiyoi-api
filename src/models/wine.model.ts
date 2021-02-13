import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ExperienceWithRelations, Experience} from './experience.model';

@model()
export class Wine extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  qrValue?: string;

  @property({
    type: 'string',
  })
  tokenSymbol?: string;

  @property({
    type: 'number',
  })
  tokenValue?: number;

  @belongsTo(() => Experience)
  experienceId: number;

  constructor(data?: Partial<Wine>) {
    super(data);
  }
}

export interface WineRelations {
  // describe navigational properties here
  experience?: ExperienceWithRelations;
}

export type WineWithRelations = Wine & WineRelations;
