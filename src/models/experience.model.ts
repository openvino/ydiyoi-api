import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {ExperienceSurvey, ExperienceSurveyWithRelations} from './experience-survey.model';
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
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'string',
  })
  photoFileName?: string;

  @property({
    type: 'number',
    required: true,
  })
  statusId: number;

  @belongsTo(() => User)
  userId: number;

  @hasOne(() => Wine)
  wine: Wine;

  @hasOne(() => ExperienceSurvey)
  experienceSurvey: ExperienceSurvey;

  constructor(data?: Partial<Experience>) {
    super(data);
  }
}

export interface ExperienceRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  experienceSurvey?: ExperienceSurveyWithRelations;
  wine?: WineWithRelations;
}

export type ExperienceWithRelations = Experience & ExperienceRelations;
