import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InappropriateContentUser } from './entities/inappropriate_content_user.entity';
import { InterestUser } from './entities/interest_user.entity';
import { LanguageUser } from './entities/language_user.entity';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { Language } from 'src/language/entities/language.entity';
import { User } from 'src/users/entities/user.entity';
import { Nacionality } from 'src/nacionality/entities/nacionality.entity';
import { InappropriateContent } from 'src/inappropriate-content/entities/inappropriate-content.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { IndividualUser } from 'src/users/entities/individual-user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InappropriateContentUser, InterestUser, LanguageUser, Language, User, IndividualUser, Nacionality, InappropriateContent, Interest])],
    controllers: [ConfigurationController],
    providers: [ConfigurationService]
})
export class ConfigurationModule { }
