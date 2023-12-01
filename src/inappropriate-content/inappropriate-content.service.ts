import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InappropriateContent } from './entities/inappropriate-content.entity';
import { CreateInappropriateContentDto } from './dto/create-inappropriate-content.dto';
import { UpdateInappropriateContentDto } from './dto/update-inappropriate-content.dto';

@Injectable()
export class InappropriateContentService {
    constructor(
        @InjectRepository(InappropriateContent) private inappropriateContentRepository: Repository<InappropriateContent>
    ) { }

    async createInappropriateContent(inappropriateContent: CreateInappropriateContentDto) {
        const inappropriateContentFound = await this.inappropriateContentRepository.findOne({
            where: {
                name: inappropriateContent.name
            }
        })

        if (inappropriateContentFound) {
            return new HttpException('Inappropriate Content already exists', HttpStatus.CONFLICT);
        }
        const newInappropriateContent = this.inappropriateContentRepository.create(inappropriateContent);
        return { message: 'success', data: await this.inappropriateContentRepository.save(newInappropriateContent) };

    }
    async createInappropriateContents(inappropriateContents: CreateInappropriateContentDto[]) {
        const createdInappropriateContents = [];

        for (const inappropriateContent of inappropriateContents) {
            const inappropriateContentFound = await this.inappropriateContentRepository.findOne({
                where: {
                    name: inappropriateContent.name
                }
            })

            if (!inappropriateContentFound) {
                const newInappropriateContent = this.inappropriateContentRepository.create(inappropriateContent);
                await this.inappropriateContentRepository.save(newInappropriateContent);
                createdInappropriateContents.push(newInappropriateContent);
            }
        }

        return { message: 'success', data: createdInappropriateContents };
    }
    
    async getInappropriateContents() {
        return { message: 'success', data: await this.inappropriateContentRepository.find() };
    }

    async getInappropriateContent(id: number) {
        const inappropriateContentFound = await this.inappropriateContentRepository.findOne({ where: { id } });
        if (!inappropriateContentFound) {
            return new HttpException('Inappropriate Content not found', HttpStatus.NOT_FOUND)
        }
        return { message: 'success', data: inappropriateContentFound };
    }

    async deleteInappropriateContent(id: number) {
        const result = await this.inappropriateContentRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('Inappropriate Content not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'success' };
    }

    async updateInappropriateContent(id: number, inappropriateContent: UpdateInappropriateContentDto) {
        const inappropriateContentFound = await this.inappropriateContentRepository.findOne({ where: { id } });
        if (!inappropriateContentFound) {
            return new HttpException('Inappropriate Content not found', HttpStatus.NOT_FOUND)
        }

        const updateInappropriateContent = Object.assign(inappropriateContentFound, inappropriateContent);//FORMA DOS
        return { message: 'success', data: await this.inappropriateContentRepository.save(updateInappropriateContent) };
    }
}
