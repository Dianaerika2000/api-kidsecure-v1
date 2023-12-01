import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NacionalityModule } from './nacionality/nacionality.module';
import { LanguageModule } from './language/language.module';
import { InterestModule } from './interest/interest.module';
import { InappropriateContentModule } from './inappropriate-content/inappropriate-content.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { MailModule } from './mail/mail.module';
import { ResourcesModule } from './resources/resources.module';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        logging: true,
        autoLoadEntities: true,
        synchronize: true,
        cache: false
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    NacionalityModule,
    LanguageModule,
    InterestModule,
    InappropriateContentModule,
    ConfigurationModule,
    MailModule,
    ResourcesModule,
    ChatGptAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
