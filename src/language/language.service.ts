import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';


@Injectable()
export class LanguageService {

    constructor(
        @InjectRepository(Language) private languageRepository: Repository<Language>
    ) { }

    async createLanguage(language: CreateLanguageDto) {
        const languageFound = await this.languageRepository.findOne({
            where: {
                name: Language.name
            }
        })

        if (languageFound) {
            return new HttpException('Language already exists', HttpStatus.CONFLICT);
        }
        const newLanguage = this.languageRepository.create(language);
        return { message: 'succes', data: await this.languageRepository.save(newLanguage) };

    }
    async createLanguages(languages: CreateLanguageDto[]) {
        const createdLanguages = [];

        for (const language of languages) {
            const languageFound = await this.languageRepository.findOne({
                where: {
                    name: language.name,
                },
            });

            if (!languageFound) {
                const newLanguage = this.languageRepository.create(language);
                await this.languageRepository.save(newLanguage);
                createdLanguages.push(newLanguage);
            }
        }

        return { message: 'success', data: createdLanguages };
    }


    async getLanguages() {
        return { message: 'succes', data: await this.languageRepository.find() };
    }

    async getLanguage(id: number) {
        const languageFound = await this.languageRepository.findOne({ where: { id } });
        if (!languageFound) {
            return new HttpException('Language not found', HttpStatus.NOT_FOUND)
        }
        return { message: 'succes', data: languageFound };
    }

    async deleteLanguage(id: number) {
        const result = await this.languageRepository.delete({ id });
        if (result.affected === 0) {
            return new HttpException('Language not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'succes' }
    }

    async updateLanguage(id: number, language: UpdateLanguageDto) {
        const languageFound = await this.languageRepository.findOne({ where: { id } });
        if (!languageFound) {
            return new HttpException('Language not found', HttpStatus.NOT_FOUND)
        }

        const updateLanguage = Object.assign(languageFound, language);//FORMA DOS
        return { message: 'succes', data: await this.languageRepository.save(updateLanguage) };
    }

}
