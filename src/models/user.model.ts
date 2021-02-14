import {Entity, hasMany, model, property} from '@loopback/repository';
import {Experience, ExperienceWithRelations} from './experience.model';

@model()
export class User extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  address_1?: string;

  @property({
    type: 'string',
  })
  address_2?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  walletAddress?: string;

  @hasMany(() => Experience)
  experiences: Experience[];

  @property({
    type: 'number',
    required: true,
  })
  roleId: number;

  @property({
    type: 'number',
    required: true,
  })
  statusId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  experiences?: ExperienceWithRelations[];
}

export type UserWithRelations = User & UserRelations;
