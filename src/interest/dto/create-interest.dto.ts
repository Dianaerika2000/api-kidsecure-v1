import { IsString } from "class-validator";

export class CreateInterestDto {
    @IsString()
    name:string
}