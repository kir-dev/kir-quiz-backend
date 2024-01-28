import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    return await this.prisma.answer.create({ data: createAnswerDto });
  }

  async findAll() {
    return await this.prisma.answer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.answer.findUnique({ where: { id } });
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return await this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.answer.delete({ where: { id } });
  }
}
