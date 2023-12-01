import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import isBoolean from "validator/lib/isBoolean";

export class UpdateLanguageNacionalityDto {
    @IsBoolean()
    status: boolean;

    @IsNumber()
    language_id: number;
}