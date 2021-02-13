import {Entity, model, property} from '@loopback/repository';

@model()
export class Experience extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  xpDate?: string;

  @property({
    type: 'string',
  })
  xpLocation?: string;


  constructor(data?: Partial<Experience>) {
    super(data);
  }
}

export interface ExperienceRelations {
  // describe navigational properties here
}

export type ExperienceWithRelations = Experience & ExperienceRelations;
