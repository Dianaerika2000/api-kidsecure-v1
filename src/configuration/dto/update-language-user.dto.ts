import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateLanguageUserDto {
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsOptional()
    @IsNumber()
    language_id?: number;
}