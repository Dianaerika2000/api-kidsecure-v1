import { IsString } from "class-validator";

export class UpdateNacionalityDto{
    @IsString()
    name: string
}