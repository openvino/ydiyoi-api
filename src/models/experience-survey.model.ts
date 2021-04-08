import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Experience} from './experience.model';

@model()
export class ExperienceSurvey extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  question1?: string;

  @property({
    type: 'string',
  })
  answer1?: string;

  @property({
    type: 'string',
  })
  question2?: string;

  @property({
    type: 'string',
  })
  answer2?: string;

  @property({
    type: 'string',
  })
  question3?: string;

  @property({
    type: 'string',
  })
  answer3?: string;

  @belongsTo(() => Experience)
  experienceId: number;

  constructor(data?: Partial<ExperienceSurvey>) {
    super(data);
  }
}

export interface ExperienceSurveyRelations {
  // describe navigational properties here
}

export type ExperienceSurveyWithRelations = ExperienceSurvey & ExperienceSurveyRelations;
