import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: ['dist/src/**/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});