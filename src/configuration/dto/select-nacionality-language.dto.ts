import { IsNumber } from "class-validator";

export class SelectNacionalityLanguageUserDto{
    @IsNumber()
    language_id:number;

    @IsNumber()
    nationality_id:number;
}