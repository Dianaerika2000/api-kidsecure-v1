import { Module } from '@nestjs/common';
import { NacionalityService } from './nacionality.service';
import { NacionalityController } from './nacionality.controller';
import { Nacionality } from './entities/nacionality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualUser } from 'src/users/entities/individual-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nacionality,IndividualUser])],
  controllers: [NacionalityController],
  providers: [NacionalityService],
})
export class NacionalityModule {}
