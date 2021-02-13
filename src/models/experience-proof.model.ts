import {Entity, model, property} from '@loopback/repository';

@model()
export class ExperienceProof extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
  })
  surveyLink?: string;

  @property({
    type: 'string',
  })
  surveyQuestions?: string;

  @property({
    type: 'string',
  })
  surveyAnswers?: string;


  constructor(data?: Partial<ExperienceProof>) {
    super(data);
  }
}

export interface ExperienceProofRelations {
  // describe navigational properties here
}

export type ExperienceProofWithRelations = ExperienceProof & ExperienceProofRelations;
