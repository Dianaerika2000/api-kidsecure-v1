import { IsNumber } from "class-validator";

export class SelectNacionalityUserDto{
    @IsNumber()
    nacionality_id:number;
}