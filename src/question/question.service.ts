/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs';
import { PrismaService } from 'nestjs-prisma';
import { join } from 'path';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto, filename?: string) {
    try {
      return await this.prisma.question.create({
        data: { ...createQuestionDto, image: filename },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException(
          'The text violates the unique constraint!',
        );
      }
      throw e;
    }
  }

  async findAll() {
    return await this.prisma.question.findMany({
      include: {
        answers: true,
      },
    });
  }

  async getRandom() {
    const allQuestions = await this.prisma.question.findMany({
      select: {
        id: true,
      },
    });

    if (!allQuestions || allQuestions.length === 0) {
      return null;
    }

    const ids = allQuestions.map((question) => question.id);
    const randomIndex = Math.floor(Math.random() * ids.length);
    const randomId = ids[randomIndex];

    const randomQuestion = await this.prisma.question.findUnique({
      where: {
        id: randomId,
      },
    });

    return randomQuestion;
  }

  async findOne(id: string) {
    return await this.prisma.question.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
    filename?: string,
  ) {
    try {
      const oldQuestion = await this.prisma.question.findUnique({
        where: { id },
      });
      const newQuestion = await this.prisma.question.update({
        where: { id },
        data: { ...updateQuestionDto, image: filename },
      });
      if (oldQuestion.image) {
        unlink(join(process.cwd(), '/static', oldQuestion.image), () => {});
      }
      return newQuestion;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException(
          'The text violates the unique constraint!',
        );
      }
      throw e;
    }
  }

  async remove(id: string) {
    return await this.prisma.question.delete({ where: { id } });
  }
}
