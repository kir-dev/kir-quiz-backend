import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Answer {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsNotEmpty()
  correct: boolean;

  @IsString()
  @IsNotEmpty()
  questionId: string;
}
