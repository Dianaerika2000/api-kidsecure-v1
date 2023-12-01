import { IsBoolean, IsNumber } from "class-validator";

export class CreateInappropriateContentUserDto{

    @IsBoolean()
    status: boolean;

    @IsNumber()
    inappropriate_content_id: number;
}