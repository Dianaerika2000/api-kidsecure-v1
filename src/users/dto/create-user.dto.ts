import { IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    photo_url: string;
    name: string;
    lastname: string;
    username: string;
    birthDate: Date;
    email: string;
    password: string;
    activationToken: string;
    type: string;
}
