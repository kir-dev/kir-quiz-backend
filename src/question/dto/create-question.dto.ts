import { OmitType } from '@nestjs/swagger';
import { Question } from '../entities/question.entity';

export class CreateQuestionDto extends OmitType(Question, ['id']) {}
