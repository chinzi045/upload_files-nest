import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { File } from 'buffer';
import multer, { Multer, diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'asd/product',
        filename: (req, file, cb) => {
          const extension = file.originalname.split('.').pop();
          const hash = uuidv4().replaceAll('-', '');
          const filename = `${hash}.${extension}`;

          cb(null, filename);
        },
      }),
    }),
  )
  Upload() {
    // console.log('file', file);
    return 'success';
  }
  @Post('/multiplee')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'avatar',
        maxCount: 1,
      },
      {
        name: 'mark',
        maxCount: 1,
      },
    ]),
  )
  multiple(
    @UploadedFile()
    files: {
      avatar?: Express.Multer.File[];
      mark?: Express.Multer.File[];
    },
  ) {
    console.log(files, 'files');
    return 'success';
  }
}
