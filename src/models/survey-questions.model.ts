import {Entity, model, property} from '@loopback/repository';

@model()
export class SurveyQuestions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  question1: string;

  @property({
    type: 'string',
    required: true,
  })
  question2: string;

  @property({
    type: 'string',
    required: true,
  })
  question3: string;

  @property({
    type: 'boolean',
    required: true,
  })
  active: boolean;


  constructor(data?: Partial<SurveyQuestions>) {
    super(data);
  }
}

export interface SurveyQuestionsRelations {
  // describe navigational properties here
}

export type SurveyQuestionsWithRelations = SurveyQuestions & SurveyQuestionsRelations;
