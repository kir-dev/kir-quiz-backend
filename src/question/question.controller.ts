import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { DeleteFileExceptionFilter } from 'src/util/DeleteFileExceptionFilter';
import { IconInterceptor, IconValidators } from 'src/util/iconHelper';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @UseInterceptors(IconInterceptor)
  @UseFilters(DeleteFileExceptionFilter)
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: IconValidators,
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.questionService.create(createQuestionDto, file?.filename);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('random')
  getRandom(@Query('number') nrOfQuestions: number) {
    return this.questionService.getRandom(nrOfQuestions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(IconInterceptor)
  @UseFilters(DeleteFileExceptionFilter)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: IconValidators,
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.questionService.update(id, updateQuestionDto, file?.filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
