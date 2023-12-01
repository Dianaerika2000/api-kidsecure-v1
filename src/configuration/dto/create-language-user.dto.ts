import { IsBoolean, IsNumber} from "class-validator";

export class CreateLanguageUserDto{

    @IsBoolean()
    status: boolean;

    @IsNumber()
    language_id: number;
}