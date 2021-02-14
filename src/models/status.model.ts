import {Entity, model, property} from '@loopback/repository';

@model()
export class Status extends Entity {
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

  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
