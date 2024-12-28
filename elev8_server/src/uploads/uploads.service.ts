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
      const newFileName = nano.nanoid();
      console.log('New filename:', fileName);
      const params = {
        Bucket: 'sample.streaming',
        Key: newFileName,
        Expires: 180, // URL expiry time in seconds
        ContentType: fileType,
      };
      const url = await this.s3.getSignedUrlPromise('putObject', params);
      return { success: true, url };
    } catch (error) {
      console.log('Error while generating presigned url');
      console.log(error);
      return { success: false, url: null };
    }
  }
}
