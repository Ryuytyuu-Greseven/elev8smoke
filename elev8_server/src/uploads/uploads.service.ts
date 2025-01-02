import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as nano from 'nanoid';

@Injectable()
export class UploadsService {
  s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_RYU_548_AKSDHFG,
      secretAccessKey: process.env.AWS_ACCESS_VALU_RYU_516_ASDNUO,
    });
  }

  async getPresignedUrl(fileName: string, fileType: 'jpeg' | 'jpg' | 'png') {
    try {
      const newFileName = `${nano.nanoid()}.${fileName.split('.').pop()}`;
      console.log('New fileType:', fileName, fileType);
      const params = {
        Bucket: 'sample.streaming',
        Key: newFileName,
        // Expires: 180,
        ContentType: fileType,
      };
      const url = await this.s3.getSignedUrlPromise('putObject', params);
      return { success: true, url, newFileName };
    } catch (error) {
      console.log('Error while generating presigned url');
      console.log(error);
      return { success: false, url: null };
    }
  }

  // single fetch file
  generatePresignedDownloadUrl = async (filePath: string) => {
    const params = {
      Bucket: 'sample.streaming',
      Key: filePath,
      Expires: 60 * 60 * 24,
    };

    try {
      const url = await this.s3.getSignedUrlPromise('getObject', params);
      console.log('Presigned URL:', url);
      return { url };
    } catch (err) {
      console.error('Error generating presigned URL', err);
      throw err;
    }
  };
}
