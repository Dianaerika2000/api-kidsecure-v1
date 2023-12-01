import { IsBoolean, IsNumber} from "class-validator";

export class CreateInterestUserDto{

    @IsBoolean()
    status: boolean;

    @IsNumber()
    interest_id: number;
}