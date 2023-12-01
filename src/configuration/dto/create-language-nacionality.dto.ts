import { IsBoolean, IsNumber } from "class-validator";

export class CreateLanguageNacionalityDto{

    @IsNumber()
    language_id: number;
}