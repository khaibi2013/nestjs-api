import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Observable, of } from 'rxjs';
import {v4 as uuidv4 } from 'uuid';
export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename} ${extension}`);
        }
    })
}

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file): Observable<Object> {
        console.log(file);
        
        return of({imagePath: file.filename});
}
}






