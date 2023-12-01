import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nacionality } from './entities/nacionality.entity';
import { Repository } from 'typeorm';
import { CreateNacionalityDto } from './dto/create-nacionality.dto';
import { UpdateNacionalityDto } from './dto/update-nacionality.dto';

@Injectable()
export class NacionalityService {

    constructor(
        @InjectRepository(Nacionality) private nacionalityRepository: Repository<Nacionality>,
    ) { }

    async createNacionality(nacionality: CreateNacionalityDto) {
        const nacionalityFound = await this.nacionalityRepository.findOne({
            where: {
                name: nacionality.name
            }
        })

        if (nacionalityFound) {
            return new HttpException('Nacionality already exists', HttpStatus.CONFLICT);
        }
        const newNacionality = this.nacionalityRepository.create(nacionality);
        return { message: 'succes', data: await this.nacionalityRepository.save(newNacionality) };

    }

    async createNacionalities(nacionalities: CreateNacionalityDto[]) {
        const createdNacionalities = [];

        for (const nacionality of nacionalities) {
            const nacionalityFound = await this.nacionalityRepository.findOne({
                where: {
                    name: nacionality.name,
                },
            });

            if (!nacionalityFound) {
                const newNacionality = this.nacionalityRepository.create(nacionality);
                await this.nacionalityRepository.save(newNacionality);
                createdNacionalities.push(newNacionality);
            }
        }
        return { message: 'success', data: createdNacionalities };
    }

    async getNacionalities() {
        return { message: 'succes', data: await this.nacionalityRepository.find() };
    }

    async getNacionality(id: number) {
        const nacionalityFound = await this.nacionalityRepository.findOne({ where: { id } });
        if (!nacionalityFound) {
            return new HttpException('Nacionality not found', HttpStatus.NOT_FOUND)
        }
        return { message: 'succes', data: nacionalityFound };
    }

    async deleteNacionality(id: number) {
        const result = await this.nacionalityRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('Nacionality not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'succes' };
    }

    async updateNacionality(id: number, nacionality: UpdateNacionalityDto) {
        const nacionalityFound = await this.nacionalityRepository.findOne({ where: { id } });
        if (!nacionalityFound) {
            return new HttpException('Nacionality not found', HttpStatus.NOT_FOUND)
        }
        //return this.nacionalityRepository.update({ id }, nacionality);//FORMA UNO 
        const updateNacionality = Object.assign(nacionalityFound, nacionality);//FORMA DOS
        return { message: 'succes', data: await this.nacionalityRepository.save(updateNacionality) };
    }
}
