import {Model, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class LoginResponse extends Model {
  @property({
    type: 'string',
  })
  token: string;

  @property({
    type: 'User',
  })
  user: User;


  constructor(data?: Partial<LoginResponse>) {
    super(data);
  }
}

export interface LoginResponseRelations {
  // describe navigational properties here
}

export type LoginResponseWithRelations = LoginResponse & LoginResponseRelations;
