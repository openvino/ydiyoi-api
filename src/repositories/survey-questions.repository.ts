import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {SurveyQuestions, SurveyQuestionsRelations} from '../models';

export class SurveyQuestionsRepository extends DefaultCrudRepository<
  SurveyQuestions,
  typeof SurveyQuestions.prototype.id,
  SurveyQuestionsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SurveyQuestions, dataSource);
  }
}
