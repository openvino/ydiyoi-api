import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ExperienceProof, ExperienceProofWithRelations} from './experience-proof.model';

@model()
export class ExperienceProofSurvey extends Entity {
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

  @belongsTo(() => ExperienceProof)
  experienceProofId: number;

  constructor(data?: Partial<ExperienceProofSurvey>) {
    super(data);
  }
}

export interface ExperienceProofSurveyRelations {
  // describe navigational properties here
  experienceProof?: ExperienceProofWithRelations;

}

export type ExperienceProofSurveyWithRelations = ExperienceProofSurvey & ExperienceProofSurveyRelations;
