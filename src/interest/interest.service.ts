import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Repository } from 'typeorm';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Injectable()
export class InterestService {

    constructor(
        @InjectRepository(Interest) private interestRepository: Repository<Interest>
    ) { }

    async createInterest(interest: CreateInterestDto) {
        const interestFound = await this.interestRepository.findOne({
            where: {
                name: interest.name
            }
        })

        if (interestFound) {
            return new HttpException('Interest already exists', HttpStatus.CONFLICT);
        }
        const newInterest = this.interestRepository.create(interest);
        return { message: 'succes', data: await this.interestRepository.save(newInterest)};

    }
    async createInterests(interests: CreateInterestDto[]) {
       
        const createdInterest = [];

        for (const interest of interests) {
            const interestFound = await this.interestRepository.findOne({
                where: {
                    name: interest.name
                }
            })
            if (!interestFound) {
                const newInterest = this.interestRepository.create(interest);
                await this.interestRepository.save(newInterest);
                createdInterest.push(newInterest);
            }
        }

        return { message: 'success', data: createdInterest };
    }

    async getInterests() {
        return { message: 'succes', data: await this.interestRepository.find()};
    }

    async getInterest(id: number) {
        const interestFound = await this.interestRepository.findOne({ where: { id } });
        if (!interestFound) {
            return new HttpException('Interest not found', HttpStatus.NOT_FOUND)
        }
        return { message: 'succes', data: interestFound};
    }

    async deleteInterest(id: number) {
        const result = await this.interestRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('Interest not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'succes'}
    }

    async updateInterest(id: number, interest: UpdateInterestDto) {
        const interestFound = await this.interestRepository.findOne({ where: { id } });
        if (!interestFound) {
            return new HttpException('Interest not found', HttpStatus.NOT_FOUND)
        }
      
        const updateInterest = Object.assign(interestFound, Interest);//FORMA DOS
        return { message: 'succes', data: await this.interestRepository.save(updateInterest)};
    }
}
