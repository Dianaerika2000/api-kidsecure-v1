import { Controller, Get, Post, Body, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { LanguageService } from './language.service';
import { Language } from './entities/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Language')
@Controller('language')
export class LanguageController {

    constructor(private languageService: LanguageService) { }


    @Get()
    getLanguages() {
        return this.languageService.getLanguages();
    }

    @Post()
    createLanguage(@Body() newLanguage: CreateLanguageDto) {
        return this.languageService.createLanguage(newLanguage);
    }
    //Registrar una lista de languages
    @Post('create')
    createLanguages(@Body() newLanguages: CreateLanguageDto[]) {
        return this.languageService.createLanguages(newLanguages);
    }

    @Get(':id')
    getLanguage(@Param('id', ParseIntPipe) id: number) {
        return this.languageService.getLanguage(id);
    }

    @Delete(':id')
    deleteLanguage(@Param('id', ParseIntPipe) id: number) {
        return this.languageService.deleteLanguage(id);
    }

    @Put(':id')
    updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() Language: UpdateLanguageDto) {
        return this.languageService.updateLanguage(id, Language);
    }
}
