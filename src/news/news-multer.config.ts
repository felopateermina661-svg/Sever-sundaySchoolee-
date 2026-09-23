import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import * as fs from 'fs'; // 👈 إضافة مكتبة fs

export const newsPhotoStorage = diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = './uploads/news-photos';
    // إنشاء الفولدر تلقائياً لو مش موجود على السيرفر
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    callback(null, uploadPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `news-${uniqueSuffix}${ext}`);
  },
});

export function newsImageFileFilter(
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
