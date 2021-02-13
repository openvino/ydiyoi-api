import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {ExperienceProof, ExperienceProofWithRelations} from './experience-proof.model';
import {Status, StatusWithRelations} from './status.model';
import {User, UserWithRelations} from './user.model';
import {Wine, WineWithRelations} from './wine.model';

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

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => ExperienceProof)
  experienceProofs: ExperienceProof[];

  @hasMany(() => Wine)
  wines: Wine[];

  @hasOne(() => Status)
  status: Status;

  constructor(data?: Partial<Experience>) {
    super(data);
  }
}

export interface ExperienceRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  status?: StatusWithRelations;
  experienceProofs?: ExperienceProofWithRelations[];
  wines?: WineWithRelations[];
}

export type ExperienceWithRelations = Experience & ExperienceRelations;
