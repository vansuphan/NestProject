import {
  HttpException,
  HttpStatus,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { randStr } from 'src/core/helpers/file';
const path = require('path');
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

const prefix_upload_tmp = 'tmp';

// Multer configuration
export const multerConfig = {
  dest: prefix_upload_tmp,
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: +50000000000000000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (
    req: Request,
    file: {
      /** Field name specified in the form */
      fieldname: string;
      /** Name of the file on the user's computer */
      originalname: string;
      /** Encoding type of the file */
      encoding: string;
      /** Mime type of the file */
      mimetype: string;
      /** Size of the file in bytes */
      size: number;
      /** The folder to which the file has been saved (DiskStorage) */
      destination: string;
      /** The name of the file within the destination (DiskStorage) */
      filename: string;
      /** Location of the uploaded file (DiskStorage) */
      path: string;
      /** A Buffer of the entire file (MemoryStorage) */
      buffer: Buffer;
    },
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
            message: `Type not suport ${extname(file.originalname)}`,
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
      const uploadPath = multerConfig.dest;
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

export function singleField(field: string): Type<NestInterceptor> {
  return FileInterceptor(field, multerOptions);
}

export function multiField(
  fields: string,
  maxCount: number,
): Type<NestInterceptor> {
  return FilesInterceptor(fields, maxCount, multerOptions);
}
