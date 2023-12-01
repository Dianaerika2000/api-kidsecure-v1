import { IsString } from "class-validator";

export class UpdateInterestDto {
    @IsString()
    name:string
}