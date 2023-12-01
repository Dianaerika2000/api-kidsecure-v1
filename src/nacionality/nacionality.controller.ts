import { Controller, Get, Post, Body, Delete, Param, Put, ParseIntPipe } from '@nestjs/common';
import { CreateNacionalityDto } from './dto/create-nacionality.dto';
import { NacionalityService } from "./nacionality.service";
import { Nacionality } from './entities/nacionality.entity';
import { UpdateNacionalityDto } from './dto/update-nacionality.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Nacionality')
@Controller('nacionality')
export class NacionalityController {

    constructor(private nacionalitiesService: NacionalityService) { }


    @Get()
    getNacionalities() {
        return this.nacionalitiesService.getNacionalities();
    }

    @Post()
    createNacionality(@Body() newNacionality: CreateNacionalityDto) {
        return this.nacionalitiesService.createNacionality(newNacionality);
    }

    //Registrar una lista de nacioalidades
    @Post('create')
    createNacionalities(@Body() newNationalities: CreateNacionalityDto[]) {
        return this.nacionalitiesService.createNacionalities(newNationalities);
    }

    @Get(':id')
    getNacionality(@Param('id', ParseIntPipe) id: number) {
        return this.nacionalitiesService.getNacionality(id);
    }

    @Delete(':id')
    deleteNacionality(@Param('id', ParseIntPipe) id: number) {
        return this.nacionalitiesService.deleteNacionality(id);
    }

    @Put(':id')
    updateNacionality(@Param('id', ParseIntPipe) id: number, @Body() nacionality: UpdateNacionalityDto) {
        return this.nacionalitiesService.updateNacionality(id, nacionality);
    }
}