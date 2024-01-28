import { OmitType } from '@nestjs/mapped-types';
import { Question } from '../entities/question.entity';

export class CreateQuestionDto extends OmitType(Question, ['id']) {}
