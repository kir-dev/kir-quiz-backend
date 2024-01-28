import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prisma.question.create({ data: createQuestionDto });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async getRandom() {
    const totalQuestions = await this.prisma.question.count();
    const randomOffset = Math.floor(Math.random() * totalQuestions);

    const randomQuestion = await this.prisma.question.findFirst({
      skip: randomOffset,
    });

    return randomQuestion;
  }

  async findOne(id: string) {
    return await this.prisma.question.findUnique({ where: { id } });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.question.delete({ where: { id } });
  }
}
