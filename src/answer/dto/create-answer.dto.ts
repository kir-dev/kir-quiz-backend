import { OmitType } from '@nestjs/mapped-types';
import { Answer } from '../entities/answer.entity';

export class CreateAnswerDto extends OmitType(Answer, ['id']) {}
