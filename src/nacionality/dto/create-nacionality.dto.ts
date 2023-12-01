import { IsString } from "class-validator";

export class CreateNacionalityDto {
    @IsString()
    name: string;
}