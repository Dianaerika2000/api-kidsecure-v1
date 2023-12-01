import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateLanguageDto {
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    icon_image?: string;
}