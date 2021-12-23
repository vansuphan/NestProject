import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import { randStr } from '../core/helpers/file';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

export const fileConfig = {
  // Enable file size limits
  limits: {
    fileSize: +50000000000000000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (
    _req: Request,
    file: any,
    cb: (result, isValid) => void,
  ): void => {
    if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          {
            status: false,
            status_code: 404,
            message: `Type is not suport ${extname(file.originalname)}`,
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'tmp';
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Calling the callback passing the random name generated with the original extension name
      const timestamp = Date.now();
      const baseExt = extname(file.originalname);
      const baseName = path.basename(file.originalname, baseExt);
      // const newName = baseName.toLowerCase().replace(/(\ |-|_)+/g, "") + `${randStr(4)}${timestamp}`;
      const newName =
        baseName.toLowerCase().replace(/([ \-_])+/g, '') +
        `${randStr(4)}${timestamp}`;
      cb(null, `${newName}${baseExt}`);
    },
  }),
};
