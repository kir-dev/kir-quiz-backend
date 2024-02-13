import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';
import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty } from 'class-validator';

export class createQuestionWithAnswersDTO extends CreateQuestionDto {
  @IsNotEmpty()
  answers: CreateAnswerDto[];
}
