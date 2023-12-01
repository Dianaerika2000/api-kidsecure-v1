import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateLanguageDto {
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    icon_image?: string;
}