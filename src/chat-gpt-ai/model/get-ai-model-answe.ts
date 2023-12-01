import { IsNotEmpty, IsString } from "class-validator";

export class GetAiModelAnswer{
    
    @IsString()
    @IsNotEmpty()
    question:string

    @IsString()
    @IsNotEmpty()
    origin_language:string

    @IsString()
    @IsNotEmpty()
    target_language:string
}