import { IsString } from "class-validator";

export class UpdateInappropriateContentDto {
    @IsString()
    name:string;

    @IsString()
    original_name:string;
}