import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class Question {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  image: string;
}
