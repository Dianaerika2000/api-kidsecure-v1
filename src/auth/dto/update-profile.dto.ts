import { IsOptional } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    photo_url: string;

    @IsOptional()
    name: string;

    @IsOptional()
    lastname: string;

    @IsOptional()
    username: string;

    @IsOptional()
    birthDate: Date;

    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    nationality: string;

    @IsOptional()
    gender:string;
}