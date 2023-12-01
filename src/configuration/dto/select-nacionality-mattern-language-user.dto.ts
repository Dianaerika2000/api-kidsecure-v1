import { IsBoolean, IsNumber } from "class-validator";

export class SelectNacionalityMatternLanguageUserDto{
    @IsNumber()
    language_id:number;
}