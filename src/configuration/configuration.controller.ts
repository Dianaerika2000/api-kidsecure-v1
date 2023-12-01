import { Body, Controller, Get, Post, Put, Param, ParseIntPipe } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateLanguageUserDto } from './dto/create-language-user.dto';
import { SelectNacionalityUserDto } from './dto/select-nacionality-user.dto';
import { SelectNacionalityMatternLanguageUserDto } from './dto/select-nacionality-mattern-language-user.dto';
import { CreateInappropriateContentUserDto } from './dto/create-inappropriate-content-user.dto';
import { CreateInterestUserDto } from './dto/create-interest-user.dto';
import { SelectNacionalityLanguageUserDto } from './dto/select-nacionality-language.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Configuration')
@Controller('configuration')
export class ConfigurationController {
    constructor(private configurationService: ConfigurationService) { }
    //*****************LANGUAGE USER******************************
    //Obtiene  de un usuario todos los lenguajes que estan con status en true
    @Get('/language-user/:id')
    getLanguagesUser(@Param('id', ParseIntPipe) id: number) {
        return this.configurationService.getLanguagesUser(id);
    }
    //actualiza los lenguajes seleccionado por un usuario
    @Post('/language-user/:id') //para actualizar los lenguajes seleccionados
    updateSelectLanguageUser(@Param('id', ParseIntPipe) id: number, @Body() newLanguageUser: CreateLanguageUserDto[]) {
        return this.configurationService.updateSelectLanguageUser(id, newLanguageUser);
    }
    //actualiza los lenguajes seleccionados por un usuario con un array de nombre
    @Post('user/:id/language-user') //para actualizar los lenguajes seleccionados
    updateSelectLanguagesUser(@Param('id', ParseIntPipe) id: number, @Body() newLanguageUser: string[]) {
        return this.configurationService.updateSelectLanguagesUser(id, newLanguageUser);
    }
    //crea la relación por defecto entre todos los lenguajes y un usuario 
    @Post('/language-user/default/:id')
    createSelectLanguageUser(@Param('id', ParseIntPipe) id: number) {
        return this.configurationService.createSelectLanguageUser(id);
    }
    //Seleccionar lengua materna según los lenguajes de su nacionalidad, siempre debe estar con el status en true mientras sea lengua materna
    @Post('language-user/mattern/:id')
    selectMatternLanguageUser(@Param('id', ParseIntPipe) id: number, @Body() newSelectMatternLanguage: SelectNacionalityMatternLanguageUserDto) {
        return this.configurationService.selectMatternLanguage(id, newSelectMatternLanguage);
    }
      //Seleccionar inicial de language y nacionality
    @Post('user/:id/language-nacionality')
    selectLanguageNationalityUser(@Param('id', ParseIntPipe) id: number, @Body() newSelectNacionalityLanguageUser:SelectNacionalityLanguageUserDto) {
        
      // return newSelectNacionalityLanguageUser;
        // const language_id = parseInt(newSelectNacionalityLanguageUser.language_id, 10);
        // const nationality_id = parseInt(newSelectNacionalityLanguageUser.nationality_id, 10);
        // //return language_id;
        // //console.log("nationality_id: ",nationality_id);
        // const newSelectNacionalityLanguageUsers = new SelectNacionalityLanguageUserDto();
        // newSelectNacionalityLanguageUsers.language_id = language_id;
        // newSelectNacionalityLanguageUsers.nationality_id = nationality_id;
        return this.configurationService.selectLanguageNationalityUser(id, newSelectNacionalityLanguageUser);
    }
    //*****************USER NACIONALITY************************
    //Selección de una nacionalidad para el usuario
    @Post(':id/nacionality') //para actualizar los lenguages seleccionados
    selectNacionalityUser(@Param('id', ParseIntPipe) id: number, @Body() newSelectNacionalityUser: SelectNacionalityUserDto) {
        return this.configurationService.selectNacionalityUser(id, newSelectNacionalityUser);
    }
    //********************USER INAPPROPRIATE CONTENT **********************
    //Obtiene de un usuario todos los contenidos inapropiados que estan con status en true
    @Get('/inappropriate-content-user/:id')
    getInappropriateContentsUser(@Param('id', ParseIntPipe) id: number) {
        return this.configurationService.getInappropriateContentUser(id);
    }
    //actualiza los contenidos inapropiados seleccionados por un usuario
    @Post('user/:id/inappropriate-content-user/') //para actualizar los contenidos inapropiados seleccionados
    updateSelectInappropriateContentUser(@Param('id', ParseIntPipe) id: number, @Body() newInappropriateContentUser: CreateInappropriateContentUserDto[]) {
        return this.configurationService.updateSelectInappropriateContentUser(id, newInappropriateContentUser);
    }
    //actualiza los contenidos inapropiados seleccionados
    @Post('user/:id/inappropriate-contents-user/') //para actualizar los contenidos inapropiados seleccionados
    updateSelectInappropriateContentsUser(@Param('id', ParseIntPipe) id: number, @Body() newInappropriateContentUser: string[]) {
        return this.configurationService.updateSelectInappropriateContentsUser(id, newInappropriateContentUser);
    }
    //crea la relación por defecto entre todos los contenidos inapropiados y un usuario 
    @Post('/inappropriate-content-user/default/:id')
    createSelectInappropriateContentUser(@Param('id', ParseIntPipe) id: number) {
        return this.configurationService.createSelectInappropriateContentUser(id);
    }
    //********************USER INTEREST **********************
     //Obtiene de un usuario todos los intereses que estan con status en true
     @Get('/interest-user/:id')
     getInterestsUser(@Param('id', ParseIntPipe) id: number) {
         return this.configurationService.getInterestsUser(id);
     }
     //actualiza los intereses seleccionados por un usuario
     @Post('user/:id/interest-user') //para actualizar los contenidos inapropiados seleccionados
     updateSelectInterestUser(@Param('id', ParseIntPipe) id: number, @Body() newInterestUser: CreateInterestUserDto[]) {
         return this.configurationService.updateSelectInterestUser(id, newInterestUser);
     }
     //actualiza los intereses seleccionados por un usuario
     @Post('user/:id/interests-user') //para actualizar los contenidos inapropiados seleccionados
     updateSelectInterestsUser(@Param('id', ParseIntPipe) id: number, @Body() newInterestUser: string[]) {
         return this.configurationService.updateSelectInterestsUser(id, newInterestUser);
     }
     //crea la relación por defecto entre todos los intereses y un usuario 
     @Post('/interest-user/default/:id')
     createSelectInterestUser(@Param('id', ParseIntPipe) id: number) {
         return this.configurationService.createSelectInterestUser(id);
     }
}
