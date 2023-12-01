import { IsString } from "class-validator";

export class CreateInappropriateContentDto {
    @IsString()
    name:string;

    @IsString()
    original_name:string;
}