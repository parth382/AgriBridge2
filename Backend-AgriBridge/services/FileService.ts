// src/services/fileService.ts
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Request } from 'express';
//import '@types/multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'agribridge',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        }
      );

      uploadStream.end(file.buffer);
    });
  }
}