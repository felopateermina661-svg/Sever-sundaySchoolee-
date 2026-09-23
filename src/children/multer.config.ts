import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import * as fs from 'fs'; // 👈 إضافة fs

export const childPhotoStorage = diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = './uploads/children-photos';
    // إنشاء المجلد تلقائياً لو مش موجود
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `child-${uniqueSuffix}${ext}`);
  },
});

export function imageFileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    return callback(
      new BadRequestException('مسموح بس بصور jpg, jpeg, png, webp'),
      false,
    );
  }
  callback(null, true);
}
