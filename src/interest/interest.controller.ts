import { Controller, Get, Post, Delete, Put, Body, Param, ParseIntPipe} from '@nestjs/common';
import { InterestService } from './interest.service';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Interest')
@Controller('interest')
export class InterestController {
    constructor(private interestService:InterestService) {}
    @Get()
    getInterests(){
        return this.interestService.getInterests();
    }

    @Post()
    createInterest(@Body() newInterest: CreateInterestDto) {
        return this.interestService.createInterest(newInterest);
    }
    @Post("create")
    createInterests(@Body() newInterest: CreateInterestDto[]) {
        return this.interestService.createInterests(newInterest);
    }


    @Get(':id')
    getInterest(@Param('id', ParseIntPipe) id: number) {
        return this.interestService.getInterest(id);
    }

    @Delete(':id')
    deleteInterest(@Param('id', ParseIntPipe) id: number) {
        return this.interestService.deleteInterest(id);
    }

    @Put(':id')
    updateInterest(@Param('id', ParseIntPipe) id: number, @Body() interest: UpdateInterestDto) {
        return this.interestService.updateInterest(id, interest);
    }
}
