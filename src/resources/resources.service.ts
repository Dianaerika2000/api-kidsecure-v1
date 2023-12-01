import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import * as AWS from 'aws-sdk';
import { ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';

dotenv.config();
const configService = new ConfigService();
const AWS_S3_BUCKET_NAME = configService.get('AWS_BUCKET');
const AWS_ACCESS_KEY_ID = configService.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = configService.get('AWS_SECRET_ACCESS_KEY');
const AWS_DEFAULT_REGION = configService.get('AWS_DEFAULT_REGION');
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_DEFAULT_REGION
});

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) { }

  async create(createResourceDto: CreateResourceDto) {
    let resource;

    if (createResourceDto.type == 'I') {
      const base64Image = createResourceDto.pathDevice.replace(/^data:image\/[a-z]+;base64,/, '');
      const imageBuffer = Buffer.from(base64Image, 'base64');

      const uploadImage = await s3.upload({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `${Date.now().toString()} - ${createResourceDto.pathDevice}`,
        Body: imageBuffer,
        ACL: 'public-read',
        ContentType: 'image/png',
      }).promise();

      resource = new Image();
      resource.pathDevice = createResourceDto.pathDevice;
      resource.url = uploadImage.Location;
      resource.content = await this.getLabelFromRekognition(imageBuffer);
    } else if (createResourceDto.type == 'T') {
      //TODO: Make code for save message type text
    }

    return this.resourceRepository.save(createResourceDto);
  }

  findAll() {
    return this.resourceRepository.find();
  }

  findOne(id: number) {
    return this.resourceRepository.findOne({ where: {id} });
  }

  async remove(id: number) {
    const resourceToRemove = await this.resourceRepository.findOne({ where: {id} });

    if (!resourceToRemove) {
      throw new NotFoundException(`Resource with ID ${id} not found`);   
    }
    return this.resourceRepository.remove(resourceToRemove);
  }

  async getLabelFromRekognition(image: any) {
    if (!image) {
      throw new Error('Image is missing.');
    }

    const rekognition = new AWS.Rekognition({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_DEFAULT_REGION'),
    });

    const params = {
      Image: {
        Bytes: image.buffer,
      },
    };

    try {
      const response = await rekognition.detectModerationLabels(params).promise();
      const resultLabels = response.ModerationLabels[0].Name;
      return resultLabels;
    } catch (error) {
      console.error(error);
      throw new Error('Error detecting moderation labels.');
    }
  }
}
